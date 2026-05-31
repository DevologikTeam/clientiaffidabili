export class CreateCreditPackCheckoutDto {
  packCode!: 'credits_10' | 'credits_25' | 'credits_50' | string;
  provider?: 'stripe' | 'paypal' | 'mock';
  customerAccountId?: string;
  successUrl?: string;
  cancelUrl?: string;
}
