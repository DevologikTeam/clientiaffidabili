import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import {
  CancelSubscriptionInput,
  NormalizedProviderWebhookEvent,
  PaymentProviderAdapter,
  ProviderSubscriptionResult,
} from '../payment-provider.contract';
import {
  PaymentProviderCode,
  ProviderCheckoutInput,
  ProviderCheckoutSession,
  ProviderRefundInput,
  ProviderRefundResult,
} from '../payment-providers-subscriptions.types';

@Injectable()
export class PayPalPaymentProviderAdapter implements PaymentProviderAdapter {
  readonly provider: PaymentProviderCode = 'paypal';

  constructor(private readonly config: ConfigService) {}

  async createOneShotCheckout(input: ProviderCheckoutInput): Promise<ProviderCheckoutSession> {
    const id = this.createReference('paypal_order');
    return {
      provider: 'paypal',
      providerSessionId: id,
      providerReference: id,
      redirectUrl: this.buildMockOrApprovalUrl(input.successUrl, id, 'order'),
      status: 'pending',
      expiresAt: new Date(Date.now() + 30 * 60_000).toISOString(),
    };
  }

  async createSubscriptionCheckout(input: ProviderCheckoutInput): Promise<ProviderCheckoutSession> {
    const id = this.createReference('paypal_subscription');
    return {
      provider: 'paypal',
      providerSessionId: id,
      providerReference: id,
      redirectUrl: this.buildMockOrApprovalUrl(input.successUrl, id, 'subscription'),
      status: 'pending',
      expiresAt: new Date(Date.now() + 30 * 60_000).toISOString(),
    };
  }

  async createRefund(input: ProviderRefundInput): Promise<ProviderRefundResult> {
    const id = this.createReference('paypal_refund');
    return { provider: 'paypal', providerRefundId: id, status: 'provider_pending', amountCents: input.amountCents, currency: input.currency, traceReference: input.idempotencyKey };
  }

  async cancelSubscription(input: CancelSubscriptionInput): Promise<ProviderSubscriptionResult> {
    return {
      provider: 'paypal',
      providerSubscriptionId: input.providerSubscriptionId,
      status: input.cancelMode === 'cancel_now' ? 'cancelled' : 'cancel_scheduled',
      currentPeriodEnd: input.cancelMode === 'cancel_at_period_end' ? new Date(Date.now() + 30 * 24 * 60 * 60_000).toISOString() : undefined,
    };
  }

  async suspendSubscription(input: CancelSubscriptionInput): Promise<ProviderSubscriptionResult> {
    return { provider: 'paypal', providerSubscriptionId: input.providerSubscriptionId, status: 'suspended' };
  }

  async resumeSubscription(input: CancelSubscriptionInput): Promise<ProviderSubscriptionResult> {
    return { provider: 'paypal', providerSubscriptionId: input.providerSubscriptionId, status: 'active' };
  }

  async parseWebhook(rawBody: Buffer | string, headers: Record<string, string>): Promise<NormalizedProviderWebhookEvent> {
    const payload = typeof rawBody === 'string' ? JSON.parse(rawBody) : JSON.parse(rawBody.toString('utf8'));
    const resource = payload.resource ?? {};
    return {
      provider: 'paypal',
      providerEventId: String(payload.id ?? `paypal_evt_${randomUUID()}`),
      eventType: String(payload.event_type ?? 'unknown'),
      providerObjectId: String(resource.id ?? resource.billing_agreement_id ?? 'unknown'),
      occurredAt: String(payload.create_time ?? new Date().toISOString()),
      normalizedStatus: String(resource.status ?? payload.summary ?? ''),
      rawPayloadRedacted: { id: payload.id, event_type: payload.event_type, create_time: payload.create_time, resource: { id: resource.id, status: resource.status } },
    };
  }

  private createReference(prefix: string): string {
    const enabled = this.config.get<string>('ENABLE_PAYPAL') === 'true';
    const mode = enabled ? 'sandbox_ready' : 'mock';
    return `${prefix}_${mode}_${randomUUID()}`;
  }

  private buildMockOrApprovalUrl(successUrl: string, id: string, mode: 'order' | 'subscription'): string {
    return `${successUrl}?provider=paypal&mode=${mode}&session_id=${id}`;
  }
}
