export class CreateSubscriptionCheckoutDto {
  planCode!: string;
  provider?: 'stripe' | 'paypal' | 'mock';
  customerAccountId?: string;
  successUrl?: string;
  cancelUrl?: string;
}
