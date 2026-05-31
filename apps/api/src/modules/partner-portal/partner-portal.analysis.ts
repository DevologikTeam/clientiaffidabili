export type PartnerTier = 'starter' | 'pro' | 'agency' | 'enterprise';
export type PartnerAccessStatus = 'requested' | 'sandbox_active' | 'production_review' | 'production_active' | 'suspended' | 'rejected';
export type PartnerApiKeyEnvironment = 'sandbox' | 'production';
export type PartnerApiScope =
  | 'checks:create'
  | 'checks:read'
  | 'reports:read'
  | 'reports:download'
  | 'wallet:read'
  | 'webhooks:manage'
  | 'sandbox:simulate';

export const apiPartnerResellerAnalysis = {
  sprint: 'M12-A',
  version: '0.38.0',
  decision: 'Build a controlled partner and reseller portal before exposing production APIs.',
  partnerSegments: [
    'software-house-and-erp-integrators',
    'b2b-sales-agencies',
    'professional-studios',
    'marketplaces-and-procurement-platforms',
  ],
  mvpModel: {
    onboarding: 'manual-approved',
    sandbox: 'enabled before production',
    production: 'requires compliance and technical review',
    billing: 'credit wallet first, subscription later',
    resellerMargin: 'manual-assisted until payout/legal model is validated',
  },
  requiredEntities: [
    'PartnerAccount',
    'PartnerProfile',
    'PartnerApiKey',
    'PartnerApiScopeGrant',
    'PartnerWebhookEndpoint',
    'PartnerUsageLedgerEntry',
    'PartnerCreditReservation',
    'PartnerProductionAccessRequest',
    'PartnerAdminReview',
  ],
  securityGuardrails: [
    'API keys stored only as hash',
    'ca_test and ca_live prefixes',
    'scope based authorization',
    'rate limit per key account and IP',
    'idempotency key required for paid requests',
    'object-level authorization for every partner resource',
    'no raw provider payload exposed to partners',
    'signed partner webhooks',
    'sandbox and production are isolated',
    'usage ledger is append-only',
  ],
  productionBlockers: [
    'partner legal terms not validated',
    'credit reservation not atomic',
    'production API key rotation not tested',
    'cross-partner authorization tests missing',
    'rate limits not persistent',
    'webhook signature delivery not tested',
  ],
} as const;

export function requiresIdempotency(scope: PartnerApiScope): boolean {
  return scope === 'checks:create' || scope === 'reports:download';
}

export function canAccessProduction(status: PartnerAccessStatus): boolean {
  return status === 'production_active';
}

export function isSensitivePartnerScope(scope: PartnerApiScope): boolean {
  return ['checks:create', 'reports:read', 'reports:download', 'webhooks:manage'].includes(scope);
}
