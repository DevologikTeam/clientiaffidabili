import {
  ProviderCheckoutInput,
  ProviderCheckoutSession,
  ProviderRefundInput,
  ProviderRefundResult,
  PaymentProviderCode,
} from './payment-providers-subscriptions.types';

export interface NormalizedProviderWebhookEvent {
  provider: PaymentProviderCode;
  providerEventId: string;
  eventType: string;
  providerObjectId: string;
  occurredAt: string;
  normalizedStatus?: string;
  rawPayloadRedacted: Record<string, unknown>;
}

export interface CancelSubscriptionInput {
  provider: PaymentProviderCode;
  internalSubscriptionId: string;
  providerSubscriptionId: string;
  cancelMode: 'cancel_now' | 'cancel_at_period_end';
  reason: string;
  idempotencyKey: string;
}

export interface ProviderSubscriptionResult {
  provider: PaymentProviderCode;
  providerSubscriptionId: string;
  status: string;
  currentPeriodEnd?: string;
}

export interface PaymentProviderAdapter {
  readonly provider: PaymentProviderCode;

  createOneShotCheckout(input: ProviderCheckoutInput): Promise<ProviderCheckoutSession>;

  createSubscriptionCheckout(input: ProviderCheckoutInput): Promise<ProviderCheckoutSession>;

  createRefund(input: ProviderRefundInput): Promise<ProviderRefundResult>;

  cancelSubscription(input: CancelSubscriptionInput): Promise<ProviderSubscriptionResult>;

  suspendSubscription?(input: CancelSubscriptionInput): Promise<ProviderSubscriptionResult>;

  resumeSubscription?(input: CancelSubscriptionInput): Promise<ProviderSubscriptionResult>;

  parseWebhook(rawBody: Buffer | string, headers: Record<string, string>): Promise<NormalizedProviderWebhookEvent>;
}

export const PAYMENT_PROVIDER_FEATURE_FLAGS = {
  stripe: 'ENABLE_STRIPE_PAYMENTS',
  paypal: 'ENABLE_PAYPAL',
  subscriptions: 'ENABLE_SUBSCRIPTIONS',
  refunds: 'ENABLE_REFUNDS',
} as const;
