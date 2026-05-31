export type SandboxCertificationArea =
  | 'stripe'
  | 'paypal'
  | 'openapi_provider'
  | 'openai_copilot'
  | 'email_provider'
  | 'pdf_secure_links'
  | 'docker_coolify'
  | 'playwright_e2e'
  | 'error_ledger_refunds';

export type SandboxCertificationStatus = 'not_started' | 'planned' | 'blocked' | 'ready_for_design';

export type SandboxCertificationCriterion = {
  area: SandboxCertificationArea;
  title: string;
  mustPassBeforeRc: boolean;
  blockerReason: string;
  expectedEvidence: string[];
};

export const sandboxCertificationAnalysisVersion = '0.66.0';

export const sandboxCertificationCriteria: SandboxCertificationCriterion[] = [
  {
    area: 'stripe',
    title: 'Stripe checkout, webhook, refund and dispute sandbox coverage',
    mustPassBeforeRc: true,
    blockerReason: 'Money movement cannot enter RC without idempotent payment/refund/dispute tests.',
    expectedEvidence: ['successful payment', 'failed payment', '3DS/SCA', 'full refund', 'partial refund', 'duplicate webhook safe'],
  },
  {
    area: 'paypal',
    title: 'PayPal sandbox normalized into internal payment ledger',
    mustPassBeforeRc: false,
    blockerReason: 'PayPal may remain disabled if Stripe is certified and PayPal is clearly feature-flagged.',
    expectedEvidence: ['sandbox order', 'capture', 'refund', 'webhook normalization', 'feature flag disabled by default'],
  },
  {
    area: 'openapi_provider',
    title: 'Provider calls post-payment only with idempotency and cost snapshot',
    mustPassBeforeRc: true,
    blockerReason: 'Provider spend and report generation require strict order/payment coupling.',
    expectedEvidence: ['payment-confirmed gate', 'provider kill switch', 'cost snapshot', 'raw payload vault', 'normalized result'],
  },
  {
    area: 'openai_copilot',
    title: 'OpenAI copilot mock/sandbox with redaction, budget and approval workflow',
    mustPassBeforeRc: false,
    blockerReason: 'AI can be disabled for RC, but if enabled it must be fully audited and controlled.',
    expectedEvidence: ['redaction preview', 'usage ledger', 'budget block', 'draft only output', 'error ledger event'],
  },
  {
    area: 'email_provider',
    title: 'Email provider sandbox with delivery ledger and secure PDF link',
    mustPassBeforeRc: true,
    blockerReason: 'Customer lifecycle depends on account, payment, document and security emails.',
    expectedEvidence: ['email event', 'delivery ledger', 'retry policy', 'suppression list', 'secure PDF link'],
  },
];

export const sandboxCertificationReadiness = {
  status: 'ready_for_design' as SandboxCertificationStatus,
  nextSprint: 'M19-P Sandbox Certification Design',
  rcPrinciple: 'Any external dependency not certified must be disabled by settings admin or feature flag before RC.',
};
