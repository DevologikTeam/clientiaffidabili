import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import Stripe from 'stripe';
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
export class StripePaymentProviderAdapter implements PaymentProviderAdapter {
  readonly provider: PaymentProviderCode = 'stripe';

  constructor(private readonly config: ConfigService) {}

  async createOneShotCheckout(input: ProviderCheckoutInput): Promise<ProviderCheckoutSession> {
    if (!this.isEnabled()) return this.mockSession(input, 'stripe_disabled_payment');
    const stripe = this.client();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: input.successUrl,
      cancel_url: input.cancelUrl,
      client_reference_id: input.orderId ?? input.customerAccountId,
      metadata: input.metadata,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'eur',
            unit_amount: input.amountCents,
            product_data: { name: input.productCode ?? 'ClientiAffidabili.it' },
          },
        },
      ],
    }, { idempotencyKey: input.idempotencyKey });
    return {
      provider: 'stripe',
      providerSessionId: session.id,
      providerReference: String(session.payment_intent ?? session.id),
      redirectUrl: session.url ?? input.cancelUrl,
      status: 'pending',
      expiresAt: session.expires_at ? new Date(session.expires_at * 1000).toISOString() : undefined,
    };
  }

  async createSubscriptionCheckout(input: ProviderCheckoutInput): Promise<ProviderCheckoutSession> {
    if (!this.isEnabled()) return this.mockSession(input, 'stripe_disabled_subscription');
    const priceId = input.metadata?.stripePriceId ?? this.config.get<string>(`STRIPE_PRICE_${input.planCode?.toUpperCase()}`);
    if (!priceId) throw new ServiceUnavailableException('Stripe priceId non configurato per il piano selezionato.');
    const stripe = this.client();
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      success_url: input.successUrl,
      cancel_url: input.cancelUrl,
      client_reference_id: input.customerAccountId,
      metadata: input.metadata,
      line_items: [{ price: priceId, quantity: 1 }],
    }, { idempotencyKey: input.idempotencyKey });
    return {
      provider: 'stripe',
      providerSessionId: session.id,
      providerReference: String(session.subscription ?? session.id),
      redirectUrl: session.url ?? input.cancelUrl,
      status: 'pending',
      expiresAt: session.expires_at ? new Date(session.expires_at * 1000).toISOString() : undefined,
    };
  }

  async createRefund(input: ProviderRefundInput): Promise<ProviderRefundResult> {
    if (!this.isEnabled()) {
      return { provider: 'stripe', providerRefundId: `mock_stripe_refund_${randomUUID()}`, status: 'succeeded', amountCents: input.amountCents, currency: input.currency, traceReference: input.idempotencyKey };
    }
    const stripe = this.client();
    const refund = await stripe.refunds.create({
      payment_intent: input.providerPaymentReference,
      amount: input.amountCents,
      metadata: { internalPaymentId: input.paymentId, reason: input.reason },
    }, { idempotencyKey: input.idempotencyKey });
    return {
      provider: 'stripe',
      providerRefundId: refund.id,
      status: refund.status === 'succeeded' ? 'succeeded' : 'provider_pending',
      amountCents: refund.amount,
      currency: 'EUR',
      failureReason: refund.failure_reason ?? undefined,
      traceReference: refund.id,
    };
  }

  async cancelSubscription(input: CancelSubscriptionInput): Promise<ProviderSubscriptionResult> {
    if (!this.isEnabled()) return { provider: 'stripe', providerSubscriptionId: input.providerSubscriptionId, status: input.cancelMode === 'cancel_now' ? 'cancelled' : 'cancel_scheduled' };
    const stripe = this.client();
    const subscription = input.cancelMode === 'cancel_at_period_end'
      ? await stripe.subscriptions.update(input.providerSubscriptionId, { cancel_at_period_end: true, metadata: { internalReason: input.reason } }, { idempotencyKey: input.idempotencyKey })
      : await stripe.subscriptions.cancel(input.providerSubscriptionId, { cancellation_details: { comment: input.reason } }, { idempotencyKey: input.idempotencyKey });
    return {
      provider: 'stripe',
      providerSubscriptionId: subscription.id,
      status: subscription.status,
      currentPeriodEnd: subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : undefined,
    };
  }

  async parseWebhook(rawBody: Buffer | string, headers: Record<string, string>): Promise<NormalizedProviderWebhookEvent> {
    const payload = typeof rawBody === 'string' ? JSON.parse(rawBody) : JSON.parse(rawBody.toString('utf8'));
    const obj = payload?.data?.object ?? {};
    return {
      provider: 'stripe',
      providerEventId: String(payload.id ?? `evt_missing_${randomUUID()}`),
      eventType: String(payload.type ?? 'unknown'),
      providerObjectId: String(obj.id ?? obj.payment_intent ?? obj.subscription ?? 'unknown'),
      occurredAt: new Date(((payload.created as number | undefined) ?? Math.floor(Date.now() / 1000)) * 1000).toISOString(),
      normalizedStatus: String(obj.status ?? obj.payment_status ?? ''),
      rawPayloadRedacted: this.redact(payload),
    };
  }

  private client(): Stripe {
    return new Stripe(this.config.get<string>('STRIPE_SECRET_KEY') ?? '', { apiVersion: '2024-06-20' });
  }

  private isEnabled(): boolean {
    return this.config.get<string>('ENABLE_STRIPE_PAYMENTS') === 'true' && Boolean(this.config.get<string>('STRIPE_SECRET_KEY'));
  }

  private mockSession(input: ProviderCheckoutInput, reason: string): ProviderCheckoutSession {
    const id = `mock_stripe_${input.mode}_${randomUUID()}`;
    return { provider: 'stripe', providerSessionId: id, providerReference: id, redirectUrl: `${input.successUrl}?session_id=${id}&provider=stripe&mock_reason=${reason}`, status: 'pending', expiresAt: new Date(Date.now() + 30 * 60_000).toISOString() };
  }

  private redact(payload: Record<string, unknown>): Record<string, unknown> {
    return { id: payload.id, type: payload.type, created: payload.created, data: { object: { id: (payload as any)?.data?.object?.id, status: (payload as any)?.data?.object?.status } } };
  }
}
