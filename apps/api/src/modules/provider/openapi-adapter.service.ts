import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { CheckStatus, NormalizedCheckResult, ProviderErrorCategory, ProviderRetryPolicy, ProviderServiceMappingDesign } from '@clientiaffidabili/shared';
import type { ProviderAdapter, ProviderCostEstimate, ProviderDispatchResult, ProviderRequestContext, ProviderValidationResult } from './provider.types';

@Injectable()
export class OpenapiAdapterService implements ProviderAdapter {
  readonly providerName = 'openapi' as const;
  private readonly logger = new Logger(OpenapiAdapterService.name);

  constructor(private readonly config: ConfigService) {}

  validateInput(mapping: ProviderServiceMappingDesign, subject: Record<string, unknown>): ProviderValidationResult {
    const missingInputs = mapping.requiredInputs.filter((field) => !this.hasRequiredInput(field, subject));
    return {
      ok: missingInputs.length === 0,
      missingInputs,
      messages: missingInputs.length
        ? [`Dati mancanti per ${mapping.productCode}: ${missingInputs.join(', ')}`]
        : ['Input provider validato.'],
    };
  }

  estimateCost(mapping: ProviderServiceMappingDesign, _subject?: Record<string, unknown>): ProviderCostEstimate {
    const estimatedCostCents = mapping.estimatedCostCents;
    const maxAcceptedCostCents = mapping.maxAcceptedCostCents;
    return {
      estimatedCostCents,
      maxAcceptedCostCents,
      currency: 'EUR',
      costGuardStatus: estimatedCostCents <= maxAcceptedCostCents ? 'pass' : 'blocked',
      messages: estimatedCostCents <= maxAcceptedCostCents
        ? ['Costo provider entro soglia configurata.']
        : ['Costo provider superiore alla soglia massima: serve review admin.'],
    };
  }

  async createRequest(mapping: ProviderServiceMappingDesign, context: ProviderRequestContext): Promise<ProviderDispatchResult> {
    const callsEnabled = this.config.get<string>('ENABLE_PROVIDER_CALLS') === 'true';
    const environment = this.config.get<string>('PROVIDER_ENVIRONMENT') ?? 'sandbox';

    if (!context.legalUseConfirmed) {
      return { status: 'requires_review', deliveryMode: mapping.deliveryMode, rawPayloadVaultRequired: false };
    }

    if (!callsEnabled) {
      this.logger.warn(`Provider calls disabled. Mocking ${mapping.productCode}/${context.checkId}.`);
      return {
        status: mapping.requiresManualReview ? 'requires_review' : 'completed',
        providerRequestId: `mock-${context.checkId}`,
        deliveryMode: mapping.deliveryMode,
        rawPayloadVaultRequired: true,
      };
    }

    if (environment === 'production' && !mapping.enabledInProduction) {
      return { status: 'requires_review', deliveryMode: mapping.deliveryMode, rawPayloadVaultRequired: false };
    }

    // Production integration placeholder: real endpoints, auth, exact payload contracts and charge semantics must be verified in partner docs before enabling.
    return {
      status: mapping.deliveryMode === 'sync' ? 'sent_to_provider' : 'waiting_provider',
      providerRequestId: `openapi-${context.checkId}`,
      deliveryMode: mapping.deliveryMode,
      rawPayloadVaultRequired: true,
      nextPollAt: mapping.deliveryMode === 'async_polling' ? new Date(Date.now() + 15 * 60 * 1000).toISOString() : undefined,
    };
  }

  normalize(mapping: ProviderServiceMappingDesign, providerPayload: unknown) {
    const payload = typeof providerPayload === 'object' && providerPayload ? providerPayload as Record<string, unknown> : {};
    const subjectName = String(payload.name ?? payload.businessName ?? payload.vatNumberOrTaxCode ?? 'Soggetto verificato');
    const now = new Date().toISOString();
    return {
      riskLevel: mapping.requiresManualReview ? 'unknown' as const : 'low' as const,
      summary: mapping.requiresManualReview
        ? `${subjectName}: verifica ricevuta, richiede revisione operativa prima della consegna.`
        : `${subjectName}: dati normalizzati correttamente. Nessun segnale bloccante nella risposta mock/sandbox.`,
      sourceTimestamp: now,
      evidences: [
        {
          code: 'PROVIDER_SERVICE',
          label: 'Servizio provider',
          value: mapping.providerServiceCode,
          source: 'openapi' as const,
          sourceTimestamp: now,
          sensitivity: 'public_business' as const,
          customerVisible: true,
          retentionPolicy: 'standard' as const,
        },
        {
          code: 'NORMALIZATION_PROFILE',
          label: 'Profilo normalizzazione',
          value: mapping.normalizationProfile,
          source: 'system' as const,
          sourceTimestamp: now,
          sensitivity: 'business_confidential' as const,
          customerVisible: false,
          retentionPolicy: 'standard' as const,
        },
      ],
      warnings: mapping.requiresManualReview ? [{ code: 'MANUAL_REVIEW_REQUIRED', message: 'Output bloccato fino a revisione operativa.' }] : [],
      limitations: ['La verifica fotografa le fonti disponibili al momento della richiesta.', 'Non costituisce garanzia assoluta di solvibilita o puntualita futura.'],
      requiresManualReview: mapping.requiresManualReview,
    };
  }

  classifyError(error: unknown): { category: ProviderErrorCategory; retryPolicy: ProviderRetryPolicy; message: string } {
    const message = error instanceof Error ? error.message : String(error ?? 'Errore provider sconosciuto');
    if (message.toLowerCase().includes('timeout')) return { category: 'timeout', retryPolicy: 'safe_once', message };
    if (message.toLowerCase().includes('rate')) return { category: 'rate_limit', retryPolicy: 'safe_exponential', message };
    if (message.toLowerCase().includes('auth')) return { category: 'authentication', retryPolicy: 'manual_only', message };
    return { category: 'unknown', retryPolicy: 'manual_only', message };
  }

  async requestCheck(productCode: string, subject: Record<string, unknown>, context: { checkId: string }): Promise<{ status: CheckStatus; providerRequestId: string; normalizedResult?: NormalizedCheckResult }> {
    const displayName = String(subject.name ?? subject.businessName ?? subject.vatNumberOrTaxCode ?? subject.value ?? 'Soggetto verificato');
    const enabled = this.config.get<string>('ENABLE_PROVIDER_CALLS') === 'true';
    if (!enabled) {
      return { status: 'completed', providerRequestId: `mock-${context.checkId}`, normalizedResult: this.mockNormalize(productCode, displayName) };
    }
    return { status: 'waiting_callback', providerRequestId: `provider-${context.checkId}` };
  }

  verifyCallbackSignature(signature?: string): boolean {
    const expected = this.config.get<string>('OPENAPI_CALLBACK_SECRET');
    return Boolean(expected && signature && signature === expected);
  }

  private hasRequiredInput(field: string, subject: Record<string, unknown>): boolean {
    if (field === 'vatNumberOrTaxCode') return Boolean(subject.vatNumberOrTaxCode ?? subject.vatNumber ?? subject.taxCode);
    if (field === 'declaredBusinessPurpose') return Boolean(subject.declaredBusinessPurpose ?? subject.businessPurpose ?? subject.legalUsePurpose);
    return Boolean(subject[field]);
  }

  private mockNormalize(productCode: string, displayName: string): NormalizedCheckResult {
    return {
      riskLevel: 'low',
      summary: `${displayName}: profilo coerente nelle fixture demo. Nessun segnale bloccante rilevato.`,
      redFlags: [{ code: 'NO_BLOCKING_EVENTS', label: 'Nessun evento bloccante nella fixture demo', severity: 'low' }],
      evidences: [
        { label: 'Prodotto', value: productCode, source: 'mock-provider' },
        { label: 'Soggetto', value: displayName, source: 'input' },
      ],
      sourceTimestamp: new Date().toISOString(),
    };
  }
}
