export type PartnerEnvironment = 'sandbox' | 'live';
export type PartnerStatus = 'draft_profile' | 'sandbox_enabled' | 'sandbox_testing' | 'live_review_requested' | 'live_changes_required' | 'live_approved' | 'live_suspended';
export type PartnerScope =
  | 'checks:company.read'
  | 'checks:company.create'
  | 'checks:company.status'
  | 'reports:read'
  | 'webhooks:manage'
  | 'usage:read'
  | 'billing:read';

export interface PartnerAccountBlueprint {
  id: string;
  accountId: string;
  legalName: string;
  status: PartnerStatus;
  pricingTier: 'starter' | 'pro' | 'agency' | 'custom';
  canAccessSandbox: boolean;
  canAccessLive: boolean;
  declaredUseCaseRequired: boolean;
  liveReviewRequired: boolean;
}

export interface PartnerApiKeyBlueprint {
  id: string;
  partnerAccountId: string;
  environment: PartnerEnvironment;
  label: string;
  prefix: string;
  secretHash: string;
  scopes: PartnerScope[];
  allowedIps?: string[];
  rateLimitProfileCode: string;
  revokedAt?: string;
  lastUsedAt?: string;
}

export interface PartnerUsageLedgerEntryBlueprint {
  id: string;
  partnerAccountId: string;
  environment: PartnerEnvironment;
  type: 'credit_purchase' | 'subscription_grant' | 'usage_reservation' | 'usage_commit' | 'usage_release' | 'manual_adjustment' | 'refund_credit' | 'chargeback_hold' | 'chargeback_release';
  amountCents: number;
  currency: 'EUR';
  serviceCode?: string;
  idempotencyKey?: string;
  marginSnapshot?: {
    partnerPriceCents: number;
    providerCostCents: number;
    paymentFeeCents: number;
    grossMarginCents: number;
    pricingVersion: string;
  };
}

export interface PartnerWebhookEndpointBlueprint {
  id: string;
  partnerAccountId: string;
  environment: PartnerEnvironment;
  url: string;
  secretHash: string;
  events: string[];
  disabledAt?: string;
}
