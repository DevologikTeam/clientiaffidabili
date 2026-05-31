import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { randomUUID } from 'crypto';
import { Order } from '../orders/order.entity';
import { BillingProfile } from './entities/billing-profile.entity';
import type { CheckoutProvider } from '@clientiaffidabili/shared';

export interface ProviderCheckoutSessionInput {
  order: Order;
  billingProfile?: BillingProfile;
}

export interface ProviderCheckoutSessionResult {
  provider: CheckoutProvider;
  externalId: string;
  checkoutUrl: string;
  requestPayload: Record<string, unknown>;
  responsePayload: Record<string, unknown>;
  expiresAt?: Date;
}

export interface NormalizedPaymentEvent {
  provider: CheckoutProvider;
  eventId: string;
  eventType: string;
  orderId?: string;
  externalSessionId?: string;
  providerPaymentId?: string;
  amountCents?: number;
  currency?: 'EUR';
  rawPayload: Record<string, unknown>;
  signatureValid: boolean;
}

@Injectable()
export class PaymentProviderAdapter {
  constructor(private readonly config: ConfigService) {}

  async createCheckoutSession(input: ProviderCheckoutSessionInput): Promise<ProviderCheckoutSessionResult> {
    const enableCheckout = this.config.get<string>('ENABLE_CHECKOUT') === 'true';
    const provider = (this.config.get<string>('BILLING_PROVIDER') || 'stripe') as CheckoutProvider;
    if (!enableCheckout || provider === 'mock' || !this.config.get<string>('STRIPE_SECRET_KEY')) {
      return this.createMockCheckoutSession(input);
    }
    return this.createStripeCheckoutSession(input);
  }

  normalizeStripeWebhook(payload: Record<string, unknown>, signature?: string): NormalizedPaymentEvent {
    const eventId = String(payload.id || `evt_missing_${randomUUID()}`);
    const eventType = String(payload.type || 'unknown');
    const data = payload.data as { object?: Record<string, unknown> } | undefined;
    const obj = data?.object ?? {};
    const metadata = (obj.metadata as Record<string, unknown> | undefined) ?? {};
    return {
      provider: 'stripe',
      eventId,
      eventType,
      orderId: typeof metadata.orderId === 'string' ? metadata.orderId : undefined,
      externalSessionId: typeof obj.id === 'string' ? obj.id : undefined,
      providerPaymentId: typeof obj.payment_intent === 'string' ? obj.payment_intent : undefined,
      amountCents: typeof obj.amount_total === 'number' ? obj.amount_total : undefined,
      currency: String(obj.currency || 'eur').toUpperCase() === 'EUR' ? 'EUR' : undefined,
      rawPayload: payload,
      signatureValid: Boolean(signature),
    };
  }

  normalizeMockPayment(orderId: string, externalId?: string): NormalizedPaymentEvent {
    return {
      provider: 'mock',
      eventId: `mock_evt_${orderId}_${Date.now()}`,
      eventType: 'checkout.session.completed',
      orderId,
      externalSessionId: externalId,
      providerPaymentId: `mock_pi_${orderId}`,
      rawPayload: { orderId, externalId, type: 'checkout.session.completed' },
      signatureValid: true,
    };
  }

  private createMockCheckoutSession({ order }: ProviderCheckoutSessionInput): ProviderCheckoutSessionResult {
    const appUrl = this.config.get<string>('APP_URL') ?? 'http://localhost:3000';
    const externalId = `mock_checkout_${order.id}_${Date.now()}`;
    return {
      provider: 'mock',
      externalId,
      checkoutUrl: `${appUrl}/checkout/success?order=${order.id}&session_id=${externalId}&mode=mock`,
      requestPayload: { orderId: order.id, amount: order.totalCents, currency: order.currency },
      responsePayload: { mode: 'mock', externalId },
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    };
  }

  private async createStripeCheckoutSession({ order, billingProfile }: ProviderCheckoutSessionInput): Promise<ProviderCheckoutSessionResult> {
    const stripe = new Stripe(this.config.get<string>('STRIPE_SECRET_KEY') ?? '', { apiVersion: '2024-06-20' });
    const appUrl = this.config.get<string>('APP_URL') ?? 'http://localhost:3000';
    const successUrl = this.config.get<string>('STRIPE_SUCCESS_URL') ?? `${appUrl}/checkout/success`;
    const cancelUrl = this.config.get<string>('STRIPE_CANCEL_URL') ?? `${appUrl}/checkout/cancel`;
    const unitAmount = order.totalCents;
    const productName = order.priceSnapshot?.productName ?? order.productCode ?? 'Verifica ClientiAffidabili';
    const requestPayload = {
      mode: 'payment',
      success_url: `${successUrl}?order=${order.id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${cancelUrl}?order=${order.id}`,
      customer_email: billingProfile?.email,
      metadata: { orderId: order.id, productCode: order.productCode ?? '' },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'eur',
            unit_amount: unitAmount,
            product_data: { name: productName },
          },
        },
      ],
    } satisfies Stripe.Checkout.SessionCreateParams;
    const session = await stripe.checkout.sessions.create(requestPayload);
    return {
      provider: 'stripe',
      externalId: session.id,
      checkoutUrl: session.url ?? `${appUrl}/checkout/pending?order=${order.id}`,
      requestPayload,
      responsePayload: { id: session.id, mode: session.mode, payment_status: session.payment_status },
      expiresAt: session.expires_at ? new Date(session.expires_at * 1000) : undefined,
    };
  }
}
