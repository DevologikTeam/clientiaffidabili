import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash } from 'crypto';
import { Repository } from 'typeorm';
import type { BillingAdminQueueItem, BillingProfileInput, CheckoutSessionResult } from '@clientiaffidabili/shared';
import { OrdersService } from '../orders/orders.service';
import { SettingsAdminService } from '../settings-admin/settings-admin.service';
import type { PurchaseRequestContext } from '../settings-admin/settings-admin-runtime.types';
import { BillingProfile } from './entities/billing-profile.entity';
import { CheckoutSession } from './entities/checkout-session.entity';
import { Invoice } from './entities/invoice.entity';
import { Payment } from './entities/payment.entity';
import { PaymentLedgerEntry } from './entities/payment-ledger-entry.entity';
import { PaymentWebhookEvent } from './entities/payment-webhook-event.entity';
import { NormalizedPaymentEvent, PaymentProviderAdapter } from './payment-provider.adapter';

const DEMO_ORG_ID = '00000000-0000-0000-0000-000000000001';
const DEMO_USER_ID = '00000000-0000-0000-0000-000000000002';

@Injectable()
export class BillingService {
  constructor(
    private readonly config: ConfigService,
    private readonly orders: OrdersService,
    private readonly settingsAdmin: SettingsAdminService,
    private readonly provider: PaymentProviderAdapter,
    @InjectRepository(BillingProfile) private readonly billingProfiles: Repository<BillingProfile>,
    @InjectRepository(CheckoutSession) private readonly checkoutSessions: Repository<CheckoutSession>,
    @InjectRepository(Payment) private readonly payments: Repository<Payment>,
    @InjectRepository(PaymentLedgerEntry) private readonly ledger: Repository<PaymentLedgerEntry>,
    @InjectRepository(PaymentWebhookEvent) private readonly webhooks: Repository<PaymentWebhookEvent>,
    @InjectRepository(Invoice) private readonly invoices: Repository<Invoice>,
  ) {}

  async upsertBillingProfile(input: BillingProfileInput): Promise<BillingProfile> {
    const existing = await this.billingProfiles.findOne({ where: { organizationId: DEMO_ORG_ID, userId: DEMO_USER_ID } });
    const entity = existing ?? this.billingProfiles.create({ organizationId: DEMO_ORG_ID, userId: DEMO_USER_ID });
    Object.assign(entity, input);
    return this.billingProfiles.save(entity);
  }

  async createCheckoutSession(orderId: string, billingProfileInput?: BillingProfileInput, requestContext: PurchaseRequestContext = {}): Promise<CheckoutSessionResult> {
    await this.settingsAdmin.assertPurchasesEnabled();
    const order = await this.orders.findById(orderId);
    if (order.status !== 'pending_payment') {
      throw new ConflictException('Questo ordine non è più in stato pagabile. Controlla la dashboard o crea un nuovo ordine.');
    }
    const billingProfile = billingProfileInput ? await this.upsertBillingProfile(billingProfileInput) : undefined;
    const providerSession = await this.provider.createCheckoutSession({ order, billingProfile });
    const session = await this.checkoutSessions.save(
      this.checkoutSessions.create({
        orderId: order.id,
        provider: providerSession.provider,
        externalId: providerSession.externalId,
        status: 'created',
        amountTotalCents: order.totalCents,
        currency: 'EUR',
        checkoutUrl: providerSession.checkoutUrl,
        requestPayload: providerSession.requestPayload,
        responsePayload: providerSession.responsePayload,
        expiresAt: providerSession.expiresAt,
      }),
    );
    await this.orders.attachCheckoutSession(order.id, session.provider, session.externalId);
    await this.settingsAdmin.recordBuyerIpAudit({
      eventType: 'checkout_session_created',
      orderId: order.id,
      ipAddress: requestContext.ipAddress,
      userAgent: requestContext.userAgent,
      metadata: { provider: session.provider, checkoutSessionId: session.id },
    });
    await this.appendLedger(order.id, 'checkout_session_created', order.totalCents, session.externalId, {
      provider: session.provider,
      checkoutSessionId: session.id,
      noProviderDataCallBeforePayment: true,
    });
    return {
      orderId: order.id,
      checkoutUrl: session.checkoutUrl,
      provider: session.provider,
      externalId: session.externalId,
      status: session.status,
      amountTotalCents: session.amountTotalCents,
      currency: session.currency,
    };
  }

  async handleStripeWebhook(payload: Record<string, unknown>, signature?: string): Promise<{ received: true; processed: boolean; eventId: string }> {
    const event = this.provider.normalizeStripeWebhook(payload, signature);
    const result = await this.processPaymentEvent(event);
    return { received: true, processed: result.processed, eventId: event.eventId };
  }

  async confirmMockCheckout(orderId: string, externalId?: string): Promise<{ processed: boolean; orderId: string }> {
    const event = this.provider.normalizeMockPayment(orderId, externalId);
    const result = await this.processPaymentEvent(event);
    return { processed: result.processed, orderId };
  }

  async getAdminQueue(): Promise<BillingAdminQueueItem[]> {
    const sessions = await this.checkoutSessions.find({ order: { createdAt: 'DESC' }, take: 25 });
    return sessions.map((session) => ({
      id: session.id,
      orderId: session.orderId,
      provider: session.provider,
      status: session.status,
      amountCents: session.amountTotalCents,
      currency: session.currency,
      createdAt: session.createdAt.toISOString(),
      nextAction: this.nextActionForSession(session),
    }));
  }

  private async processPaymentEvent(event: NormalizedPaymentEvent): Promise<{ processed: boolean }> {
    const existing = await this.webhooks.findOne({ where: { provider: event.provider, eventId: event.eventId } });
    if (existing?.processed) return { processed: false };
    const webhook = existing ?? this.webhooks.create({ provider: event.provider, eventId: event.eventId });
    webhook.eventType = event.eventType;
    webhook.signatureValid = event.signatureValid;
    webhook.payload = event.rawPayload;
    webhook.payloadHash = this.hashPayload(event.rawPayload);
    webhook.processed = false;
    await this.webhooks.save(webhook);

    try {
      if (!event.signatureValid) throw new BadRequestException('Firma webhook assente o non valida.');
      if (event.eventType !== 'checkout.session.completed') {
        await this.appendLedger(event.orderId ?? 'unknown', 'webhook_ignored', event.amountCents ?? 0, event.eventId, { eventType: event.eventType });
        webhook.processed = true;
        webhook.processedAt = new Date();
        await this.webhooks.save(webhook);
        return { processed: true };
      }

      const orderId = event.orderId ?? (await this.resolveOrderIdFromSession(event.externalSessionId));
      if (!orderId) throw new NotFoundException('Ordine non risolto dal webhook pagamento.');
      const order = await this.orders.findById(orderId);
      const session = await this.findCheckoutSession(event.provider, event.externalSessionId, order.id);
      const payment = await this.createSucceededPayment(event, order.id, session?.id, order.totalCents);
      if (session) {
        session.status = 'completed';
        session.completedAt = new Date();
        await this.checkoutSessions.save(session);
      }
      await this.orders.markPaid(order.id, event.provider, event.externalSessionId ?? session?.externalId ?? event.eventId);
      await this.settingsAdmin.recordBuyerIpAudit({ eventType: 'payment_confirmed', orderId: order.id, paymentId: payment.id, metadata: { provider: event.provider } });
      await this.appendLedger(order.id, 'payment_succeeded', payment.amountCents, event.providerPaymentId ?? event.eventId, {
        provider: event.provider,
        checkoutSessionId: session?.id,
        paymentId: payment.id,
      });
      await this.ensurePendingInvoice(order.id, payment.id);
      webhook.processed = true;
      webhook.processedAt = new Date();
      await this.webhooks.save(webhook);
      return { processed: true };
    } catch (error) {
      webhook.error = error instanceof Error ? error.message : 'Errore webhook sconosciuto';
      await this.webhooks.save(webhook);
      await this.settingsAdmin.recordOperationalError({
        category: 'payment',
        severity: 'error',
        sourceModule: 'billing',
        sourceAction: 'processPaymentEvent',
        safeMessage: 'Errore durante la riconciliazione di un pagamento.',
        technicalSummary: webhook.error,
        linkedObjects: { orderId: event.orderId, webhookEventId: event.eventId },
        redactedPayload: event.rawPayload,
        refundRelevant: true,
      });
      throw error;
    }
  }

  private async createSucceededPayment(event: NormalizedPaymentEvent, orderId: string, checkoutSessionId: string | undefined, fallbackAmountCents: number): Promise<Payment> {
    const providerPaymentId = event.providerPaymentId ?? `${event.provider}_${event.eventId}`;
    const existing = await this.payments.findOne({ where: { provider: event.provider, providerPaymentId } });
    if (existing) return existing;
    return this.payments.save(
      this.payments.create({
        orderId,
        checkoutSessionId,
        provider: event.provider,
        providerPaymentId,
        status: 'succeeded',
        amountCents: event.amountCents ?? fallbackAmountCents,
        currency: event.currency ?? 'EUR',
        paidAt: new Date(),
        rawPayload: event.rawPayload,
      }),
    );
  }

  private async ensurePendingInvoice(orderId: string, paymentId: string): Promise<Invoice> {
    const existing = await this.invoices.findOne({ where: { orderId } });
    if (existing) return existing;
    const order = await this.orders.findById(orderId);
    const profile = await this.billingProfiles.findOne({ where: { organizationId: order.organizationId, userId: order.userId } });
    const invoice = this.invoices.create({
      orderId,
      paymentId,
      billingProfileId: profile?.id,
      status: 'pending',
      amountNetCents: order.subtotalNetCents,
      vatCents: order.taxCents,
      totalCents: order.totalCents,
      currency: 'EUR',
      metadata: { mode: this.config.get<string>('BILLING_INVOICE_MODE') ?? 'manual_assisted' },
    });
    await this.appendLedger(orderId, 'invoice_pending', order.totalCents, paymentId, { billingProfileId: profile?.id });
    return this.invoices.save(invoice);
  }

  private async appendLedger(orderId: string, type: PaymentLedgerEntry['type'], amountCents: number, externalRef?: string, metadata: Record<string, unknown> = {}): Promise<PaymentLedgerEntry> {
    return this.ledger.save(this.ledger.create({ orderId, type, amountCents, currency: 'EUR', externalRef, metadata }));
  }

  private async resolveOrderIdFromSession(externalSessionId?: string): Promise<string | undefined> {
    if (!externalSessionId) return undefined;
    const session = await this.checkoutSessions.findOne({ where: { externalId: externalSessionId } });
    return session?.orderId;
  }

  private async findCheckoutSession(provider: string, externalSessionId?: string, orderId?: string): Promise<CheckoutSession | undefined> {
    if (externalSessionId) {
      const session = await this.checkoutSessions.findOne({ where: { provider: provider as CheckoutSession['provider'], externalId: externalSessionId } });
      if (session) return session;
    }
    if (orderId) {
      const session = await this.checkoutSessions.findOne({ where: { orderId }, order: { createdAt: 'DESC' } });
      return session ?? undefined;
    }
    return undefined;
  }

  private hashPayload(payload: Record<string, unknown>): string {
    return createHash('sha256').update(JSON.stringify(payload)).digest('hex');
  }

  private nextActionForSession(session: CheckoutSession): string {
    if (session.status === 'completed') return 'Verifica fattura pending e avvio report.';
    if (session.status === 'failed') return 'Controlla errore provider e contatta cliente se necessario.';
    if (session.status === 'expired' || session.status === 'cancelled') return 'Cliente può creare una nuova sessione checkout.';
    return 'Attendi webhook pagamento o verifica sessione provider.';
  }
}
