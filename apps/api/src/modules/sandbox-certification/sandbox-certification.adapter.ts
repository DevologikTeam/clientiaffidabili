import { Injectable } from '@nestjs/common';
import type { SandboxScenarioStatus } from './sandbox-certification-design.types';
import type {
  SandboxCertificationProviderMode,
  SandboxEvidencePayload,
  SandboxScenarioRunOutcome,
  SandboxScenarioRuntime,
} from './sandbox-certification-runtime.types';

export interface SandboxCertificationAdapter {
  runScenario(scenario: SandboxScenarioRuntime, input: { providerMode: SandboxCertificationProviderMode; runId: string; attempt: number }): Promise<SandboxScenarioRunOutcome>;
}

const manualOnlyScenarios = new Set(['docker-coolify-smoke']);
const failureLedgerScenarios = new Set(['openapi-provider-failure-ledger']);

@Injectable()
export class MockSandboxCertificationAdapter implements SandboxCertificationAdapter {
  async runScenario(
    scenario: SandboxScenarioRuntime,
    input: { providerMode: SandboxCertificationProviderMode; runId: string; attempt: number },
  ): Promise<SandboxScenarioRunOutcome> {
    const providerMode = input.providerMode === 'sandbox' && scenario.automationLevel === 'manual_evidence' ? 'manual' : input.providerMode;
    const status = this.resolveStatus(scenario, providerMode);
    const safeMessage = this.safeMessageFor(scenario, status, providerMode);
    const evidence = this.evidenceFor(scenario, input.runId, input.attempt, providerMode, status);
    return {
      scenarioKey: scenario.id,
      area: scenario.area,
      status,
      providerMode,
      safeMessage,
      failureSafeMessage: status === 'failed' || status === 'blocked' ? this.failureMessageFor(scenario, status) : undefined,
      evidence,
      refundRelevant: scenario.refundRelevant,
      retryEligible: scenario.retryEligible,
      rollbackAction: scenario.rollbackAction,
      durationMs: Math.max(100, scenario.estimatedDurationSeconds * 100),
    };
  }

  private resolveStatus(scenario: SandboxScenarioRuntime, providerMode: SandboxCertificationProviderMode): SandboxScenarioStatus {
    if (manualOnlyScenarios.has(scenario.id) && providerMode !== 'manual') return 'blocked';
    if (failureLedgerScenarios.has(scenario.id)) return 'passed';
    return 'passed';
  }

  private safeMessageFor(scenario: SandboxScenarioRuntime, status: SandboxScenarioStatus, providerMode: SandboxCertificationProviderMode) {
    if (status === 'blocked') return `Scenario ${scenario.id} richiede evidenza manuale: ${scenario.rollbackAction}`;
    if (providerMode === 'sandbox') return `Scenario ${scenario.id} predisposto per adapter sandbox reale con evidenze redatte.`;
    if (providerMode === 'manual') return `Scenario ${scenario.id} registrato come evidenza manuale da allegare prima della RC.`;
    return `Scenario ${scenario.id} eseguito in modalita mock-first senza chiamate provider reali.`;
  }

  private failureMessageFor(scenario: SandboxScenarioRuntime, status: SandboxScenarioStatus) {
    if (status === 'blocked') return `Blocco RC: serve evidenza per ${scenario.title}.`;
    return `Scenario fallito: aprire Operational Error Ledger e seguire rollback: ${scenario.rollbackAction}`;
  }

  private evidenceFor(
    scenario: SandboxScenarioRuntime,
    runId: string,
    attempt: number,
    providerMode: SandboxCertificationProviderMode,
    status: SandboxScenarioStatus,
  ): SandboxEvidencePayload[] {
    const basePayload = {
      runId,
      attempt,
      scenarioKey: scenario.id,
      providerMode,
      status,
      rawPayload: 'redacted',
      token: 'redacted',
      secret: 'redacted',
      generatedBy: 'sandbox-certification-mock-adapter',
    };

    const byScenario: Record<string, SandboxEvidencePayload[]> = {
      'stripe-payment-success': [
        { type: 'payment_ledger', safeLabel: 'Payment ledger append-only coerente', redactedPayload: { ...basePayload, orderState: 'paid', ledgerEntries: 1 } },
        { type: 'webhook_event', safeLabel: 'Webhook Stripe idempotente', redactedPayload: { ...basePayload, signatureChecked: true, idempotencyKey: 'present' } },
      ],
      'stripe-payment-failure': [
        { type: 'payment_ledger', safeLabel: 'Pagamento fallito senza entitlement', redactedPayload: { ...basePayload, orderState: 'payment_failed', entitlementCreated: false } },
        { type: 'rollback_check', safeLabel: 'Retry pagamento disponibile', redactedPayload: { ...basePayload, retryAvailable: true } },
      ],
      'stripe-refund-full': [
        { type: 'refund_ledger', safeLabel: 'Refund ledger registrato una sola volta', redactedPayload: { ...basePayload, refundStatus: 'recorded', duplicatePrevented: true } },
        { type: 'email_delivery', safeLabel: 'Notifica rimborso tracciata', redactedPayload: { ...basePayload, deliveryStatus: 'queued_mock' } },
      ],
      'paypal-payment-success': [
        { type: 'payment_ledger', safeLabel: 'PayPal sandbox riconciliato', redactedPayload: { ...basePayload, provider: 'paypal', featureFlagChecked: true } },
        { type: 'settings_snapshot', safeLabel: 'PayPal live non abilitato senza certificazione', redactedPayload: { ...basePayload, liveEnabled: false } },
      ],
      'openapi-provider-post-payment': [
        { type: 'provider_request', safeLabel: 'Provider call bloccata prima del pagamento', redactedPayload: { ...basePayload, calledBeforePayment: false, idempotencyKey: 'present' } },
        { type: 'audit_event', safeLabel: 'Cost snapshot redatto', redactedPayload: { ...basePayload, costSnapshot: 'present', rawProviderPayload: 'redacted' } },
      ],
      'openapi-provider-failure-ledger': [
        { type: 'provider_request', safeLabel: 'Errore provider simulato e redatto', redactedPayload: { ...basePayload, providerStatus: 'failed_mock', retrySafe: true } },
        { type: 'audit_event', safeLabel: 'Operational Error Ledger collegabile', redactedPayload: { ...basePayload, errorLedgerRequired: true, refundRelevant: true } },
      ],
      'email-pdf-secure-link': [
        { type: 'email_delivery', safeLabel: 'Delivery ledger email documento pronto', redactedPayload: { ...basePayload, recipient: 'm***@example.test', status: 'queued_mock' } },
        { type: 'secure_link', safeLabel: 'Secure link con token hash-only', redactedPayload: { ...basePayload, tokenHashOnly: true, expiresInHours: 24 } },
      ],
      'report-pdf-access-control': [
        { type: 'secure_link', safeLabel: 'PDF non pubblico', redactedPayload: { ...basePayload, publicUrl: false, tokenHashOnly: true } },
        { type: 'report_snapshot', safeLabel: 'Accesso report auditato', redactedPayload: { ...basePayload, accountScoped: true, downloadAudit: true } },
      ],
      'openai-disabled-by-default': [
        { type: 'settings_snapshot', safeLabel: 'OpenAI disabilitato di default', redactedPayload: { ...basePayload, openaiEnabled: false, publicAutoPublish: false } },
        { type: 'openai_usage', safeLabel: 'Usage ledger non consuma budget in mock', redactedPayload: { ...basePayload, tokensUsed: 0, budgetCents: 0 } },
      ],
      'auth-password-reset-email': [
        { type: 'auth_event', safeLabel: 'Reset password con token hash-only', redactedPayload: { ...basePayload, tokenHashOnly: true, expiresInMinutes: 30 } },
        { type: 'email_delivery', safeLabel: 'Email reset tracciata', redactedPayload: { ...basePayload, deliveryStatus: 'queued_mock' } },
      ],
      'customer-dashboard-fallback': [
        { type: 'dashboard_state', safeLabel: 'Dashboard cliente con prossima azione chiara', redactedPayload: { ...basePayload, nextActionVisible: true, rawPayloadVisible: false } },
        { type: 'audit_event', safeLabel: 'Fallback supporto disponibile', redactedPayload: { ...basePayload, supportFallback: true } },
      ],
      'partner-api-sandbox-idempotency': [
        { type: 'partner_api_log', safeLabel: 'Idempotency key obbligatoria', redactedPayload: { ...basePayload, idempotencyRequired: true, liveCreditConsumed: false } },
        { type: 'audit_event', safeLabel: 'Scope sandbox verificato', redactedPayload: { ...basePayload, environment: 'sandbox' } },
      ],
      'seo-cms-publication-guardrail': [
        { type: 'cms_publication', safeLabel: 'Claim guardrail attivo', redactedPayload: { ...basePayload, forbiddenClaims: 0, schemaCoherent: true } },
        { type: 'security_scan', safeLabel: 'Banned claims scan pulito', redactedPayload: { ...basePayload, bannedClaimsFound: false } },
      ],
      'docker-coolify-smoke': [
        { type: 'docker_smoke', safeLabel: 'Smoke Docker/Coolify da allegare manualmente', redactedPayload: { ...basePayload, commandPrepared: true, executedInThisRun: providerMode === 'manual' } },
      ],
      'security-secret-scan': [
        { type: 'security_scan', safeLabel: 'Secret scan senza live key hardcoded', redactedPayload: { ...basePayload, liveKeysFound: false, publicSecretsFound: false } },
      ],
    };

    return byScenario[scenario.id] ?? [
      { type: 'audit_event', safeLabel: `Evidenza redatta per ${scenario.id}`, redactedPayload: basePayload },
    ];
  }
}
