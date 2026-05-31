export const providerIntegrationAnalysis = {
  sprint: 'M5-A Provider Integration Analysis',
  version: '0.14.0',
  provider: 'Openapi',
  publicPositioning: 'Cliente finale compra un controllo leggibile; la complessita degli endpoint resta nascosta.',
  coreDecision: 'Adapter Openapi server-side, contract-first, con mock controllato finche credenziali e documentazione partner non sono validate.',
  lifecycle: [
    'paid order confirmed',
    'check queued',
    'provider request created with idempotency key',
    'provider response/callback received',
    'normalization and evidence mapping',
    'report ready or manual review',
  ],
  blockedBehaviours: [
    'calling provider before payment webhook',
    'exposing provider keys in frontend',
    'retrying paid/manual endpoints without idempotency decision',
    'showing raw provider payload to the customer',
    'claiming that the report guarantees payment or solvency',
  ],
} as const;

