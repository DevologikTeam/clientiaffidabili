import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash } from 'crypto';
import { Repository } from 'typeorm';
import type { NormalizedCheckResult, ProviderAdminQueueItem, ProviderRequestStatus } from '@clientiaffidabili/shared';
import { PROVIDER_SERVICE_MAPPINGS } from './provider-mapping.registry';
import { buildProviderIdempotencyKey, ProviderRequestContext } from './provider.types';
import { OpenapiAdapterService } from './openapi-adapter.service';
import { SettingsAdminService } from '../settings-admin/settings-admin.service';
import { ProviderCostLedgerEntry } from './entities/provider-cost-ledger-entry.entity';
import { ProviderRawPayloadVault } from './entities/provider-raw-payload-vault.entity';
import { ProviderRequestEvent } from './entities/provider-request-event.entity';
import { ProviderRequest } from './entities/provider-request.entity';

export interface DispatchProviderCheckInput {
  organizationId: string;
  orderId: string;
  checkId: string;
  productCode: string;
  subject: Record<string, unknown>;
  paymentConfirmedAt?: Date;
}

export interface DispatchProviderCheckResult {
  providerRequest: ProviderRequest;
  checkStatus: 'provider_requested' | 'waiting_callback' | 'completed' | 'requires_review' | 'failed';
  normalizedResult?: NormalizedCheckResult;
}

@Injectable()
export class ProviderRuntimeService {
  constructor(
    @InjectRepository(ProviderRequest) private readonly requests: Repository<ProviderRequest>,
    @InjectRepository(ProviderRequestEvent) private readonly events: Repository<ProviderRequestEvent>,
    @InjectRepository(ProviderCostLedgerEntry) private readonly costLedger: Repository<ProviderCostLedgerEntry>,
    @InjectRepository(ProviderRawPayloadVault) private readonly rawVault: Repository<ProviderRawPayloadVault>,
    private readonly openapi: OpenapiAdapterService,
    private readonly settingsAdmin: SettingsAdminService,
  ) {}

  async dispatchAfterPayment(input: DispatchProviderCheckInput): Promise<DispatchProviderCheckResult> {
    if (!input.paymentConfirmedAt) {
      throw new BadRequestException('La richiesta provider puo partire solo dopo pagamento confermato.');
    }

    const mapping = PROVIDER_SERVICE_MAPPINGS.find((item) => item.productCode === input.productCode);
    if (!mapping) throw new NotFoundException(`Mapping provider non configurato per ${input.productCode}.`);
    const providerSettings = await this.settingsAdmin.listNamespace('provider_openapi');
    const callsEnabled = providerSettings.settings.find((setting) => setting.key === 'openapi.callsEnabled')?.displayValue === true;
    if (!callsEnabled) throw new BadRequestException('Chiamate provider Openapi disabilitate da admin.');

    const legalUseConfirmed = Boolean(input.subject.legalUseConfirmed ?? input.subject.termsAccepted ?? input.subject.lawfulUseConfirmed);
    const validation = this.openapi.validateInput(mapping, input.subject);
    const cost = this.openapi.estimateCost(mapping);
    const idempotencyKey = buildProviderIdempotencyKey({
      providerName: mapping.providerName,
      orderId: input.orderId,
      checkId: input.checkId,
      productCode: input.productCode,
      mappingVersion: mapping.providerServiceVersion,
    });

    const existing = await this.requests.findOne({ where: { idempotencyKey } });
    if (existing) return this.toDispatchResult(existing);

    if (!validation.ok) {
      return this.createBlockedRequest(input, mapping, idempotencyKey, cost.estimatedCostCents, cost.maxAcceptedCostCents, 'validation_error', validation.messages.join(' '));
    }
    if (cost.costGuardStatus === 'blocked') {
      return this.createBlockedRequest(input, mapping, idempotencyKey, cost.estimatedCostCents, cost.maxAcceptedCostCents, 'paid_provider_error', cost.messages.join(' '));
    }

    const providerRequest = await this.requests.save(this.requests.create({
      organizationId: input.organizationId,
      orderId: input.orderId,
      checkId: input.checkId,
      productCode: input.productCode,
      providerName: mapping.providerName,
      providerServiceCode: mapping.providerServiceCode,
      mappingVersion: mapping.providerServiceVersion,
      idempotencyKey,
      status: 'validated',
      deliveryMode: mapping.deliveryMode,
      retryPolicy: mapping.retryPolicy,
      providerCostSnapshotCents: cost.estimatedCostCents,
      maxAcceptedCostCents: cost.maxAcceptedCostCents,
      requestPayloadPreview: this.safePayloadPreview(input.subject),
    }));

    await this.appendEvent(providerRequest.id, 'created_after_payment', { paymentConfirmedAt: input.paymentConfirmedAt.toISOString() });
    await this.appendCost(providerRequest.id, 'estimated', cost.estimatedCostCents, { mappingVersion: mapping.providerServiceVersion });
    await this.appendCost(providerRequest.id, 'reserved', cost.estimatedCostCents, { reason: 'pre-dispatch provider reserve' });

    const context: ProviderRequestContext = {
      orderId: input.orderId,
      checkId: input.checkId,
      productCode: input.productCode,
      subject: input.subject,
      paymentConfirmedAt: input.paymentConfirmedAt.toISOString(),
      legalUseConfirmed,
    };

    try {
      const dispatch = await this.openapi.createRequest(mapping, context);
      providerRequest.status = dispatch.status;
      providerRequest.providerExternalId = dispatch.providerRequestId;
      providerRequest.attempts += 1;
      providerRequest.sentAt = new Date();
      providerRequest.nextPollAt = dispatch.nextPollAt ? new Date(dispatch.nextPollAt) : undefined;
      if (dispatch.rawPayloadVaultRequired) {
        const vault = await this.storeRawPayload(providerRequest.id, {
          mode: 'mock_or_sandbox_response',
          productCode: input.productCode,
          subject: this.safePayloadPreview(input.subject),
          providerExternalId: dispatch.providerRequestId,
        });
        providerRequest.rawPayloadVaultId = vault.id;
      }
      if (dispatch.status === 'completed' || dispatch.status === 'requires_review') {
        const normalized = this.openapi.normalize(mapping, { ...input.subject, productCode: input.productCode });
        providerRequest.normalizedResult = normalized;
        providerRequest.completedAt = dispatch.status === 'completed' ? new Date() : undefined;
        await this.appendCost(providerRequest.id, dispatch.status === 'completed' ? 'consumed_success' : 'consumed_failed', cost.estimatedCostCents, { dispatchStatus: dispatch.status });
      }
      await this.requests.save(providerRequest);
      await this.appendEvent(providerRequest.id, 'dispatch_result', { status: providerRequest.status, providerExternalId: providerRequest.providerExternalId });
      return this.toDispatchResult(providerRequest);
    } catch (error) {
      const classified = this.openapi.classifyError(error);
      providerRequest.status = classified.retryPolicy === 'manual_only' ? 'requires_review' : 'retry_scheduled';
      providerRequest.errorCategory = classified.category;
      providerRequest.errorMessage = classified.message;
      providerRequest.nextPollAt = classified.retryPolicy === 'safe_once' ? new Date(Date.now() + 10 * 60 * 1000) : undefined;
      await this.requests.save(providerRequest);
      await this.appendEvent(providerRequest.id, 'dispatch_error', classified);
      await this.appendCost(providerRequest.id, 'consumed_failed', cost.estimatedCostCents, { category: classified.category });
      return this.toDispatchResult(providerRequest);
    }
  }

  async receiveCallback(signatureValid: boolean, payload: Record<string, unknown>): Promise<{ received: boolean; providerRequest?: ProviderRequest }> {
    if (!signatureValid) throw new BadRequestException('Firma callback provider non valida.');
    const providerExternalId = String(payload.providerRequestId ?? payload.externalId ?? '');
    if (!providerExternalId) throw new BadRequestException('Callback provider senza identificativo richiesta.');
    const request = await this.requests.findOne({ where: { providerExternalId } });
    if (!request) throw new NotFoundException('Richiesta provider non trovata per callback.');
    const vault = await this.storeRawPayload(request.id, payload);
    request.rawPayloadVaultId = vault.id;
    request.status = 'received';
    request.receivedAt = new Date();
    await this.requests.save(request);
    await this.appendEvent(request.id, 'callback_received', { providerExternalId });
    return { received: true, providerRequest: request };
  }

  async adminQueue(): Promise<ProviderAdminQueueItem[]> {
    const rows = await this.requests.find({ order: { createdAt: 'DESC' }, take: 50 });
    return rows.map((row) => ({
      id: row.id,
      orderId: row.orderId,
      checkId: row.checkId,
      productCode: row.productCode,
      providerName: row.providerName,
      status: row.status,
      costCents: row.providerCostSnapshotCents,
      attempts: row.attempts,
      nextAction: this.nextAction(row.status, row.errorCategory),
      createdAt: row.createdAt.toISOString(),
    }));
  }

  private async createBlockedRequest(
    input: DispatchProviderCheckInput,
    mapping: typeof PROVIDER_SERVICE_MAPPINGS[number],
    idempotencyKey: string,
    costCents: number,
    maxCostCents: number,
    errorCategory: string,
    errorMessage: string,
  ): Promise<DispatchProviderCheckResult> {
    const request = await this.requests.save(this.requests.create({
      organizationId: input.organizationId,
      orderId: input.orderId,
      checkId: input.checkId,
      productCode: input.productCode,
      providerName: mapping.providerName,
      providerServiceCode: mapping.providerServiceCode,
      mappingVersion: mapping.providerServiceVersion,
      idempotencyKey,
      status: 'requires_review',
      deliveryMode: mapping.deliveryMode,
      retryPolicy: mapping.retryPolicy,
      providerCostSnapshotCents: costCents,
      maxAcceptedCostCents: maxCostCents,
      requestPayloadPreview: this.safePayloadPreview(input.subject),
      errorCategory,
      errorMessage,
    }));
    await this.appendEvent(request.id, 'blocked_before_dispatch', { errorCategory, errorMessage });
    await this.appendCost(request.id, 'estimated', costCents, { blocked: true });
    return this.toDispatchResult(request);
  }

  private toDispatchResult(providerRequest: ProviderRequest): DispatchProviderCheckResult {
    const normalized = providerRequest.normalizedResult ? this.toNormalizedCheckResult(providerRequest.normalizedResult) : undefined;
    return {
      providerRequest,
      checkStatus: this.toCheckStatus(providerRequest.status),
      normalizedResult: normalized,
    };
  }

  private toCheckStatus(status: ProviderRequestStatus): DispatchProviderCheckResult['checkStatus'] {
    if (status === 'completed') return 'completed';
    if (status === 'requires_review') return 'requires_review';
    if (status === 'failed') return 'failed';
    if (status === 'waiting_provider' || status === 'waiting_callback' || status === 'polling') return 'waiting_callback';
    return 'provider_requested';
  }

  private toNormalizedCheckResult(value: Record<string, unknown>): NormalizedCheckResult {
    const evidences = Array.isArray(value.evidences) ? value.evidences as Array<Record<string, unknown>> : [];
    return {
      riskLevel: (value.riskLevel as NormalizedCheckResult['riskLevel']) ?? 'unknown',
      summary: String(value.summary ?? 'Risultato normalizzato in attesa di revisione.'),
      redFlags: Array.isArray(value.warnings)
        ? (value.warnings as Array<Record<string, unknown>>).map((w) => ({ code: String(w.code ?? 'WARNING'), label: String(w.message ?? 'Avviso'), severity: 'unknown' as const }))
        : [],
      evidences: evidences.filter((item) => item.customerVisible !== false).map((item) => ({
        label: String(item.label ?? item.code ?? 'Evidenza'),
        value: String(item.value ?? ''),
        source: String(item.source ?? 'provider'),
      })),
      sourceTimestamp: String(value.sourceTimestamp ?? new Date().toISOString()),
    };
  }

  private async appendEvent(providerRequestId: string, eventType: string, metadata: Record<string, unknown>): Promise<void> {
    await this.events.save(this.events.create({ providerRequestId, eventType, actorType: 'system', metadata }));
  }

  private async appendCost(providerRequestId: string, entryType: ProviderCostLedgerEntry['entryType'], amountCents: number, metadata: Record<string, unknown>): Promise<void> {
    await this.costLedger.save(this.costLedger.create({ providerRequestId, entryType, amountCents, currency: 'EUR', metadata }));
  }

  private async storeRawPayload(providerRequestId: string, payload: Record<string, unknown>): Promise<ProviderRawPayloadVault> {
    const redactedPayload = this.redactPayload(payload);
    const payloadHash = createHash('sha256').update(JSON.stringify(redactedPayload)).digest('hex');
    return this.rawVault.save(this.rawVault.create({ providerRequestId, payloadHash, redactedPayload, retentionPolicy: 'standard', customerVisible: false }));
  }

  private safePayloadPreview(subject: Record<string, unknown>): Record<string, unknown> {
    const allowed = ['type', 'businessName', 'name', 'vatNumberOrTaxCode', 'vatNumber', 'taxCode', 'country', 'province', 'declaredBusinessPurpose', 'legalUseConfirmed', 'termsAccepted'];
    return Object.fromEntries(Object.entries(subject).filter(([key]) => allowed.includes(key)));
  }

  private redactPayload(payload: Record<string, unknown>): Record<string, unknown> {
    const clone = JSON.parse(JSON.stringify(payload));
    for (const key of Object.keys(clone)) {
      if (/iban|email|phone|mobile|token|secret|raw/i.test(key)) clone[key] = '[redacted]';
    }
    return clone;
  }

  private nextAction(status: ProviderRequestStatus, errorCategory?: string): string {
    if (status === 'completed') return 'Nessuna azione: richiesta completata.';
    if (status === 'requires_review') return errorCategory ? `Review operativa: ${errorCategory}.` : 'Review operativa prima della consegna.';
    if (status === 'waiting_provider' || status === 'waiting_callback' || status === 'polling') return 'Attendere callback/polling provider.';
    if (status === 'retry_scheduled') return 'Retry pianificato: verificare se il costo e idempotenza sono ancora sicuri.';
    if (status === 'failed') return 'Valutare supporto provider o rimborso se costo non consumato.';
    return 'Monitorare avanzamento richiesta provider.';
  }
}
