export type PaymentProviderCode = 'mock' | 'stripe' | 'paypal';
export type PaymentMode = 'one_shot' | 'credit_pack' | 'subscription';

export type NormalizedPaymentStatus =
  | 'pending'
  | 'requires_action'
  | 'paid'
  | 'failed'
  | 'expired'
  | 'refunded'
  | 'partially_refunded'
  | 'disputed';

export type InternalSubscriptionStatus =
  | 'pending'
  | 'active'
  | 'past_due'
  | 'payment_failed'
  | 'cancel_scheduled'
  | 'cancelled'
  | 'suspended'
  | 'expired';

export type RefundRequestStatus =
  | 'draft'
  | 'requested'
  | 'policy_review'
  | 'approved'
  | 'rejected'
  | 'provider_pending'
  | 'succeeded'
  | 'failed'
  | 'cancelled';

export type RefundPolicyOutcome = 'eligible' | 'blocked' | 'manual_review_required';

export type RefundReasonCode =
  | 'NO_PROVIDER_COST'
  | 'PROVIDER_COST_INCURRED'
  | 'REPORT_DELIVERED'
  | 'SUBSCRIPTION_UNUSED_RENEWAL'
  | 'CREDITS_PARTIALLY_USED'
  | 'DISPUTE_OPEN'
  | 'OVER_REFUND_ATTEMPT';

export interface ProviderCheckoutInput {
  provider: PaymentProviderCode;
  mode: PaymentMode;
  customerAccountId: string;
  orderId?: string;
  planCode?: string;
  productCode?: string;
  amountCents: number;
  currency: 'EUR';
  successUrl: string;
  cancelUrl: string;
  idempotencyKey: string;
  metadata?: Record<string, string>;
}

export interface ProviderCheckoutSession {
  provider: PaymentProviderCode;
  providerSessionId: string;
  providerReference: string;
  redirectUrl: string;
  status: NormalizedPaymentStatus;
  expiresAt?: string;
}

export interface ProviderRefundInput {
  provider: PaymentProviderCode;
  paymentId: string;
  providerPaymentReference: string;
  amountCents: number;
  currency: 'EUR';
  reason: string;
  idempotencyKey: string;
}

export interface ProviderRefundResult {
  provider: PaymentProviderCode;
  providerRefundId: string;
  status: RefundRequestStatus;
  amountCents: number;
  currency: 'EUR';
  failureReason?: string;
  traceReference?: string;
}

export interface RefundPolicyInput {
  paymentId: string;
  paidAmountCents: number;
  alreadyRefundedAmountCents: number;
  requestedAmountCents: number;
  providerCostIncurredCents: number;
  reportPublished: boolean;
  reportDownloaded: boolean;
  creditsConsumedValueCents: number;
  hasOpenDispute: boolean;
  subscriptionRenewalUnused: boolean;
}

export interface RefundPolicyDecision {
  outcome: RefundPolicyOutcome;
  reasonCode: RefundReasonCode;
  maxRefundableAmountCents: number;
  customerMessage: string;
  adminMessage: string;
  requiresReason: boolean;
  requiresAdminApproval: boolean;
}

export interface CreditWalletSnapshot {
  customerAccountId: string;
  availableCredits: number;
  reservedCredits: number;
  expiresAt?: string;
  source: 'subscription' | 'credit_pack' | 'manual_adjustment';
}

export interface EntitlementSnapshot {
  customerAccountId: string;
  planCode?: string;
  status: InternalSubscriptionStatus;
  canRequestChecks: boolean;
  canUseWalletCredits: boolean;
  canAccessReports: boolean;
  maxUsers?: number;
  capturedAt: string;
}
