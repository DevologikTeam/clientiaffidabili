import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from '../orders/orders.module';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { BillingProfile } from './entities/billing-profile.entity';
import { CheckoutSession } from './entities/checkout-session.entity';
import { Invoice } from './entities/invoice.entity';
import { Payment } from './entities/payment.entity';
import { PaymentLedgerEntry } from './entities/payment-ledger-entry.entity';
import { PaymentWebhookEvent } from './entities/payment-webhook-event.entity';
import { PaymentProviderAdapter } from './payment-provider.adapter';
import { BillingSubscription } from './entities/billing-subscription.entity';
import { CreditWallet } from './entities/credit-wallet.entity';
import { CreditLedgerEntry } from './entities/credit-ledger-entry.entity';
import { RefundRequest } from './entities/refund-request.entity';
import { PaymentDispute } from './entities/payment-dispute.entity';
import { StripePaymentProviderAdapter } from './providers/stripe-payment-provider.adapter';
import { PayPalPaymentProviderAdapter } from './providers/paypal-payment-provider.adapter';
import { PaymentProviderOrchestrator } from './payment-provider-orchestrator.service';
import { CreditWalletService } from './credit-wallet.service';
import { SubscriptionService } from './subscription.service';
import { RefundService } from './refund.service';
import { PaymentReconciliationService } from './payment-reconciliation.service';
import { SettingsAdminModule } from '../settings-admin/settings-admin.module';

@Module({
  imports: [
    OrdersModule,
    SettingsAdminModule,
    TypeOrmModule.forFeature([BillingProfile, CheckoutSession, Payment, PaymentLedgerEntry, PaymentWebhookEvent, Invoice, BillingSubscription, CreditWallet, CreditLedgerEntry, RefundRequest, PaymentDispute]),
  ],
  controllers: [BillingController],
  providers: [BillingService, PaymentProviderAdapter, StripePaymentProviderAdapter, PayPalPaymentProviderAdapter, PaymentProviderOrchestrator, CreditWalletService, SubscriptionService, RefundService, PaymentReconciliationService],
  exports: [BillingService, CreditWalletService, SubscriptionService, RefundService],
})
export class BillingModule {}
