export type SandboxScenarioStatus = 'not_started' | 'ready_to_run' | 'running' | 'passed' | 'failed' | 'blocked' | 'waived';
export type SandboxRunStatus = 'queued' | 'running' | 'passed' | 'failed' | 'blocked' | 'cancelled';
export type SandboxProviderMode = 'mock' | 'sandbox' | 'manual';

export type SandboxScenarioRow = {
  id: string;
  area: string;
  title: string;
  status: SandboxScenarioStatus;
  blockerForRc: boolean;
  providerMode: SandboxProviderMode;
  automationLevel: string;
  evidence: string[];
  nextAction: string;
  rollbackAction: string;
  ownerRole: string;
};

export type SandboxRunResult = {
  id: string;
  scenarioKey: string;
  area: string;
  title: string;
  status: SandboxScenarioStatus;
  attempt: number;
  evidenceCount: number;
  safeMessage: string;
  errorLedgerId?: string;
  rollbackAction: string;
};

export type SandboxEvidencePreview = {
  id: string;
  scenarioKey: string;
  type: string;
  safeLabel: string;
  redactedPayload: Record<string, string | number | boolean>;
};

export const sandboxCertificationRuntimeVersion = '0.68.0';

export const sandboxCertificationSummary = {
  status: 'blocked' as SandboxRunStatus,
  totalScenarios: 15,
  blockerScenarios: 11,
  passed: 13,
  blocked: 1,
  failed: 0,
  waived: 1,
  notStarted: 1,
  lastRunId: 'm19s-preview-run',
  nextAction: 'Allegare smoke reale Docker/Coolify oppure mantenere la RC bloccata fino alla prova manuale.',
};

export const sandboxScenarioRows: SandboxScenarioRow[] = [
  {
    id: 'stripe-payment-success',
    area: 'payments.stripe',
    title: 'Stripe sandbox payment success creates coherent order and ledger',
    status: 'passed',
    blockerForRc: true,
    providerMode: 'mock',
    automationLevel: 'sandbox_adapter',
    evidence: ['payment_ledger', 'webhook_event', 'order_snapshot'],
    nextAction: 'Sostituire mock con test Stripe sandbox e allegare webhook firmato.',
    rollbackAction: 'Disabilitare Stripe e mantenere ordini in pending review.',
    ownerRole: 'billing_admin',
  },
  {
    id: 'stripe-refund-full',
    area: 'payments.stripe',
    title: 'Stripe full refund updates refund ledger and customer notification',
    status: 'passed',
    blockerForRc: true,
    providerMode: 'mock',
    automationLevel: 'sandbox_adapter',
    evidence: ['refund_ledger', 'email_delivery', 'audit_event'],
    nextAction: 'Eseguire rimborso sandbox reale prima di RC.',
    rollbackAction: 'Passare rimborsi automatici a review billing.',
    ownerRole: 'billing_admin',
  },
  {
    id: 'paypal-payment-success',
    area: 'payments.paypal',
    title: 'PayPal sandbox payment success is reconciled without enabling unverified live flow',
    status: 'waived',
    blockerForRc: false,
    providerMode: 'mock',
    automationLevel: 'sandbox_adapter',
    evidence: ['payment_ledger', 'settings_snapshot'],
    nextAction: 'Lasciare PayPal disabilitato se non viene certificato in sandbox.',
    rollbackAction: 'Tenere payments.paypal.enabled disattivato.',
    ownerRole: 'billing_admin',
  },
  {
    id: 'openapi-provider-post-payment',
    area: 'provider.openapi',
    title: 'Openapi provider call can run only after confirmed payment or reserved credit',
    status: 'passed',
    blockerForRc: true,
    providerMode: 'mock',
    automationLevel: 'sandbox_adapter',
    evidence: ['provider_request', 'cost_snapshot', 'order_payment_state'],
    nextAction: 'Certificare sandbox Openapi con idempotency key e cost snapshot.',
    rollbackAction: 'Disabilitare openapi.callsEnabled e mantenere report in attesa.',
    ownerRole: 'operations_admin',
  },
  {
    id: 'email-pdf-secure-link',
    area: 'email.delivery',
    title: 'Document ready email uses secure link and delivery ledger',
    status: 'passed',
    blockerForRc: true,
    providerMode: 'mock',
    automationLevel: 'sandbox_adapter',
    evidence: ['email_delivery', 'secure_link', 'report_snapshot'],
    nextAction: 'Eseguire invio provider sandbox e verificare webhook delivery.',
    rollbackAction: 'Usare fallback dashboard e rigenerazione secure link.',
    ownerRole: 'support_admin',
  },
  {
    id: 'docker-coolify-smoke',
    area: 'docker.coolify',
    title: 'Docker and Coolify smoke commands are prepared and block RC until executed',
    status: 'blocked',
    blockerForRc: true,
    providerMode: 'manual',
    automationLevel: 'manual_evidence',
    evidence: ['docker_smoke', 'settings_snapshot'],
    nextAction: 'Eseguire build/healthcheck nel tuo ambiente e allegare evidenza.',
    rollbackAction: 'Bloccare la RC fino a smoke reale superato.',
    ownerRole: 'devops_admin',
  },
];

export const sandboxRunResults: SandboxRunResult[] = sandboxScenarioRows.map((row, index) => ({
  id: `result-${index + 1}`,
  scenarioKey: row.id,
  area: row.area,
  title: row.title,
  status: row.status,
  attempt: 1,
  evidenceCount: row.evidence.length,
  safeMessage: row.status === 'blocked' ? row.nextAction : 'Scenario predisposto e certificabile tramite runner M19-S mock-first.',
  errorLedgerId: row.status === 'blocked' ? 'error-ledger-preview-docker-smoke' : undefined,
  rollbackAction: row.rollbackAction,
}));

export const sandboxEvidencePreview: SandboxEvidencePreview[] = [
  {
    id: 'ev-stripe-ledger',
    scenarioKey: 'stripe-payment-success',
    type: 'payment_ledger',
    safeLabel: 'Payment ledger append-only coerente',
    redactedPayload: { orderState: 'paid', providerMode: 'mock', rawPayload: 'redacted' },
  },
  {
    id: 'ev-openapi-cost',
    scenarioKey: 'openapi-provider-post-payment',
    type: 'provider_request',
    safeLabel: 'Provider call consentita solo dopo pagamento',
    redactedPayload: { calledBeforePayment: false, idempotencyKey: 'present', rawProviderPayload: 'redacted' },
  },
  {
    id: 'ev-email-link',
    scenarioKey: 'email-pdf-secure-link',
    type: 'secure_link',
    safeLabel: 'Secure link token hash-only',
    redactedPayload: { publicUrl: false, tokenHashOnly: true, expiresInHours: 24 },
  },
];
