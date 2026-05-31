import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
import { MockWebhookDto } from './dto/mock-webhook.dto';
import { UpsertBillingProfileDto } from './dto/upsert-billing-profile.dto';
import { CreateSubscriptionCheckoutDto } from './dto/create-subscription-checkout.dto';
import { CreateCreditPackCheckoutDto } from './dto/create-credit-pack-checkout.dto';
import { RequestRefundDto } from './dto/request-refund.dto';
import { CancelSubscriptionDto } from './dto/cancel-subscription.dto';
import { SubscriptionService } from './subscription.service';
import { RefundService } from './refund.service';
import { CreditWalletService } from './credit-wallet.service';
import { PaymentReconciliationService } from './payment-reconciliation.service';

@Controller('billing')
export class BillingController {
  constructor(
    private readonly billing: BillingService,
    private readonly subscriptions: SubscriptionService,
    private readonly refunds: RefundService,
    private readonly wallet: CreditWalletService,
    private readonly reconciliation: PaymentReconciliationService,
  ) {}

  @Post('profile')
  upsertProfile(@Body() body: UpsertBillingProfileDto) {
    return this.billing.upsertBillingProfile(body);
  }

  @Post('checkout-session')
  createCheckout(@Body() body: CreateCheckoutSessionDto, @Headers('x-forwarded-for') ip?: string, @Headers('user-agent') userAgent?: string) {
    return this.billing.createCheckoutSession(body.orderId, body.billingProfile, { ipAddress: ip, userAgent });
  }

  @Post('stripe/webhook')
  stripeWebhook(@Body() body: Record<string, unknown>, @Headers('stripe-signature') signature?: string) {
    return this.billing.handleStripeWebhook(body, signature);
  }

  @Post('mock/confirm')
  mockConfirm(@Body() body: MockWebhookDto) {
    return this.billing.confirmMockCheckout(body.orderId, body.externalId);
  }

  @Get('admin/queue')
  adminQueue() {
    return this.billing.getAdminQueue();
  }

  @Get('subscription/plans')
  subscriptionPlans() {
    return this.subscriptions.listPlans();
  }

  @Post('subscription/checkout')
  createSubscriptionCheckout(@Body() body: CreateSubscriptionCheckoutDto) {
    return this.subscriptions.createSubscriptionCheckout(body);
  }

  @Post('subscription/cancel')
  cancelSubscription(@Body() body: CancelSubscriptionDto) {
    return this.subscriptions.cancel(body);
  }

  @Get('wallet')
  getWallet() {
    return this.wallet.getOrCreate('00000000-0000-0000-0000-000000000001');
  }

  @Post('credit-pack/checkout')
  createCreditPackCheckout(@Body() body: CreateCreditPackCheckoutDto) {
    return {
      status: 'designed_for_mvp',
      message: 'Il pacchetto crediti userà lo stesso PaymentProviderOrchestrator in modalità credit_pack nello step di produzione reale.',
      body,
    };
  }

  @Post('refunds/request')
  requestRefund(@Body() body: RequestRefundDto) {
    return this.refunds.requestRefund(body);
  }

  @Get('admin/refunds')
  adminRefunds() {
    return this.refunds.listAdminRefunds();
  }

  @Post('paypal/webhook')
  paypalWebhook(@Body() body: Record<string, unknown>) {
    return this.reconciliation.ingestProviderWebhook('paypal', JSON.stringify(body), {});
  }
}

