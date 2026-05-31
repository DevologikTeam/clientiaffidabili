import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { createHash } from 'crypto';
import { PartnerApiKeyService } from './partner-api-key.service';
import { PartnerUsageLedgerService } from './partner-usage-ledger.service';
import { PartnerRateLimitService } from './partner-rate-limit.service';
import { PartnerSandboxService } from './partner-sandbox.service';
import type { PartnerEnvironment, PartnerScope } from './partner-portal.types';

@Injectable()
export class PartnerPortalService {
  constructor(
    private readonly apiKeys: PartnerApiKeyService,
    private readonly ledger: PartnerUsageLedgerService,
    private readonly rateLimit: PartnerRateLimitService,
    private readonly sandbox: PartnerSandboxService,
  ) {}

  getDashboard(partnerAccountId = 'partner_demo') {
    return {
      partnerAccountId,
      status: 'sandbox_enabled',
      canAccessSandbox: true,
      canAccessLive: false,
      nextAction: {
        label: 'Completa i test sandbox',
        href: '/dashboard/partner/docs',
        reason: 'L’accesso live richiede webhook configurato, usage test e review operations.',
      },
      credits: {
        availableCents: this.ledger.getBalance(partnerAccountId),
        reservedCents: 0,
        currency: 'EUR',
      },
      stats: {
        apiKeys: 1,
        sandboxCallsToday: 12,
        failedWebhookDeliveries: 0,
        liveRequestsOpen: 0,
      },
      guardrails: ['Sandbox attiva', 'Live non approvata', 'Raw payload nascosto', 'Webhook firmati'],
    };
  }

  createApiKey(input: { partnerAccountId: string; environment: PartnerEnvironment; label: string; scopes: PartnerScope[] }) {
    if (input.environment === 'live') {
      throw new ForbiddenException('Le API key live richiedono approvazione operations. Usa prima sandbox o invia richiesta go-live.');
    }
    return this.apiKeys.generateKey({ label: input.label, environment: input.environment, scopes: input.scopes });
  }

  requestLiveAccess(input: { partnerAccountId: string; declaredUseCase: string; technicalContactEmail: string; acceptedApiTermsVersion: string }) {
    if (!input.declaredUseCase || input.declaredUseCase.length < 20) {
      throw new BadRequestException('Descrivi il caso d’uso con almeno 20 caratteri.');
    }
    return {
      id: `plar_${Date.now()}`,
      partnerAccountId: input.partnerAccountId,
      status: 'submitted',
      declaredUseCase: input.declaredUseCase,
      technicalContactEmail: input.technicalContactEmail,
      acceptedApiTermsVersion: input.acceptedApiTermsVersion,
      nextAction: 'Attendi review operations o eventuali richieste di modifica.',
      createdAt: new Date().toISOString(),
    };
  }

  createPartnerCompanyCheck(input: { partnerAccountId: string; environment: PartnerEnvironment; serviceCode: string; subject: { vatNumber?: string; companyName?: string }; idempotencyKey?: string }) {
    if (!input.idempotencyKey) throw new BadRequestException('Header Idempotency-Key obbligatorio per creare una verifica.');
    if (input.environment === 'live') throw new ForbiddenException('Live API non attiva in MVP senza review e production gate.');
    const rate = this.rateLimit.check({ partnerAccountId: input.partnerAccountId, endpoint: 'POST /company-checks' });
    if (!rate.allowed) throw new BadRequestException('Rate limit superato. Riprova dopo il reset indicato.');
    const reservation = this.ledger.reserve({
      partnerAccountId: input.partnerAccountId,
      environment: input.environment,
      amountCents: -2490,
      serviceCode: input.serviceCode,
      idempotencyKey: input.idempotencyKey,
      reason: 'Sandbox reservation for partner company check',
    });
    const response = this.sandbox.createCompanyCheck({ ...input, idempotencyKey: input.idempotencyKey });
    this.ledger.commit({
      partnerAccountId: input.partnerAccountId,
      environment: input.environment,
      amountCents: 0,
      serviceCode: input.serviceCode,
      idempotencyKey: input.idempotencyKey,
      reason: `Commit sandbox request linked to ${reservation.id}`,
    });
    return response;
  }

  getUsage(partnerAccountId = 'partner_demo') {
    return {
      partnerAccountId,
      balanceCents: this.ledger.getBalance(partnerAccountId),
      entries: this.ledger.listForPartner(partnerAccountId),
    };
  }

  hashRequestPayload(payload: unknown) {
    return createHash('sha256').update(JSON.stringify(payload)).digest('hex');
  }
}
