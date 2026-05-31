import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { BillingSubscription } from './entities/billing-subscription.entity';
import { PaymentProviderOrchestrator } from './payment-provider-orchestrator.service';
import { CreditWalletService } from './credit-wallet.service';
import { PaymentProviderCode } from './payment-providers-subscriptions.types';

const DEMO_CUSTOMER_ACCOUNT_ID = '00000000-0000-0000-0000-000000000001';

const PLAN_CATALOG: Record<string, { name: string; amountCents: number; monthlyCredits: number; includedChecks: number }> = {
  starter: { name: 'Starter Affidabilità', amountCents: 2900, monthlyCredits: 3, includedChecks: 3 },
  pro: { name: 'Pro Affidabilità', amountCents: 7900, monthlyCredits: 10, includedChecks: 10 },
  agency: { name: 'Agency Affidabilità', amountCents: 19900, monthlyCredits: 30, includedChecks: 30 },
};

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly config: ConfigService,
    private readonly providers: PaymentProviderOrchestrator,
    private readonly wallet: CreditWalletService,
    @InjectRepository(BillingSubscription) private readonly subscriptions: Repository<BillingSubscription>,
  ) {}

  listPlans() {
    return Object.entries(PLAN_CATALOG).map(([code, plan]) => ({ code, ...plan, currency: 'EUR', providerReady: { stripe: true, paypal: this.config.get<string>('ENABLE_PAYPAL') === 'true' } }));
  }

  async createSubscriptionCheckout(input: { planCode: string; provider?: PaymentProviderCode; customerAccountId?: string; successUrl?: string; cancelUrl?: string }) {
    if (this.config.get<string>('ENABLE_SUBSCRIPTIONS') !== 'true') {
      // In MVP scaffold resta generabile in mock per validare UX, ma non attiva rinnovi reali.
    }
    const plan = PLAN_CATALOG[input.planCode];
    if (!plan) throw new BadRequestException('Piano abbonamento non valido.');
    const provider = input.provider ?? 'stripe';
    const customerAccountId = input.customerAccountId ?? DEMO_CUSTOMER_ACCOUNT_ID;
    const appUrl = this.config.get<string>('APP_URL') ?? 'http://localhost:3000';
    const checkout = await this.providers.adapter(provider).createSubscriptionCheckout({
      provider,
      mode: 'subscription',
      customerAccountId,
      planCode: input.planCode,
      amountCents: plan.amountCents,
      currency: 'EUR',
      successUrl: input.successUrl ?? `${appUrl}/dashboard/abbonamento?checkout=success`,
      cancelUrl: input.cancelUrl ?? `${appUrl}/dashboard/abbonamento?checkout=cancel`,
      idempotencyKey: `sub_${customerAccountId}_${input.planCode}_${Date.now()}`,
      metadata: { customerAccountId, planCode: input.planCode, internalMode: 'subscription' },
    });
    return { ...checkout, planCode: input.planCode, customerAccountId, monthlyCredits: plan.monthlyCredits };
  }

  async activateFromProvider(input: { customerAccountId: string; provider: PaymentProviderCode; providerSubscriptionId: string; planCode: string; idempotencyKey?: string }) {
    const plan = PLAN_CATALOG[input.planCode];
    if (!plan) throw new BadRequestException('Piano abbonamento non valido.');
    const existing = await this.subscriptions.findOne({ where: { provider: input.provider, providerSubscriptionId: input.providerSubscriptionId } });
    const entity = existing ?? this.subscriptions.create({ customerAccountId: input.customerAccountId, provider: input.provider, providerSubscriptionId: input.providerSubscriptionId, planCode: input.planCode });
    entity.status = 'active';
    entity.amountCents = plan.amountCents;
    entity.monthlyCredits = plan.monthlyCredits;
    entity.includedChecks = plan.includedChecks;
    entity.currentPeriodStart = new Date();
    entity.currentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60_000);
    entity.entitlementSnapshot = { canRequestChecks: true, canUseWalletCredits: true, canAccessReports: true, planCode: input.planCode, capturedAt: new Date().toISOString() };
    const saved = await this.subscriptions.save(entity);
    await this.wallet.grantCredits({ customerAccountId: input.customerAccountId, amount: plan.monthlyCredits, type: 'subscription_renewal', reason: `Rinnovo piano ${input.planCode}`, sourceType: 'subscription', sourceId: saved.id, idempotencyKey: input.idempotencyKey ?? `sub_credit_${input.provider}_${input.providerSubscriptionId}_${saved.currentPeriodEnd?.toISOString()}` });
    return saved;
  }

  async cancel(input: { subscriptionId: string; cancelMode: 'cancel_now' | 'cancel_at_period_end'; reason: string; idempotencyKey?: string }) {
    if (!input.reason || input.reason.trim().length < 8) throw new BadRequestException('Reason obbligatoria per annullare un abbonamento.');
    const subscription = await this.subscriptions.findOne({ where: { id: input.subscriptionId } });
    if (!subscription) throw new NotFoundException('Abbonamento non trovato.');
    const result = await this.providers.adapter(subscription.provider).cancelSubscription({ provider: subscription.provider, internalSubscriptionId: subscription.id, providerSubscriptionId: subscription.providerSubscriptionId, cancelMode: input.cancelMode, reason: input.reason, idempotencyKey: input.idempotencyKey ?? `cancel_${subscription.id}_${randomUUID()}` });
    subscription.status = input.cancelMode === 'cancel_now' ? 'cancelled' : 'cancel_scheduled';
    subscription.cancelAt = input.cancelMode === 'cancel_at_period_end' && result.currentPeriodEnd ? new Date(result.currentPeriodEnd) : new Date();
    subscription.cancelledAt = input.cancelMode === 'cancel_now' ? new Date() : undefined;
    subscription.providerSnapshot = { lastCancelResult: result, reason: input.reason };
    return this.subscriptions.save(subscription);
  }

  async listCustomerSubscriptions(customerAccountId = DEMO_CUSTOMER_ACCOUNT_ID) {
    return this.subscriptions.find({ where: { customerAccountId }, order: { createdAt: 'DESC' } });
  }
}
