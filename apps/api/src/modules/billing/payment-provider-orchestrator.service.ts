import { BadRequestException, Injectable } from '@nestjs/common';
import { PaymentProviderAdapter } from './payment-provider.contract';
import { PayPalPaymentProviderAdapter } from './providers/paypal-payment-provider.adapter';
import { StripePaymentProviderAdapter } from './providers/stripe-payment-provider.adapter';
import { PaymentProviderCode } from './payment-providers-subscriptions.types';

@Injectable()
export class PaymentProviderOrchestrator {
  constructor(
    private readonly stripe: StripePaymentProviderAdapter,
    private readonly paypal: PayPalPaymentProviderAdapter,
  ) {}

  adapter(provider: PaymentProviderCode): PaymentProviderAdapter {
    if (provider === 'stripe') return this.stripe;
    if (provider === 'paypal') return this.paypal;
    if (provider === 'mock') return this.stripe;
    throw new BadRequestException(`Provider pagamento non supportato: ${provider}`);
  }
}
