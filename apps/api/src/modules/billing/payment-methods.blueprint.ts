import type { PaymentCommercialMode, SubscriptionPlanBlueprint } from '@clientiaffidabili/shared';

export interface PaymentProviderCapability {
  provider: 'stripe' | 'paypal' | 'bank_transfer';
  oneTimePayments: boolean;
  subscriptions: boolean;
  hostedCheckout: boolean;
  webhookRequired: boolean;
  recommendedPhase: 'mvp' | 'post_mvp' | 'b2b_assisted';
  notes: string[];
}

export const PAYMENT_PROVIDER_CAPABILITIES: PaymentProviderCapability[] = [
  {
    provider: 'stripe',
    oneTimePayments: true,
    subscriptions: true,
    hostedCheckout: true,
    webhookRequired: true,
    recommendedPhase: 'mvp',
    notes: ['Provider primario per checkout hosted e abbonamenti futuri.', 'Usare mode=payment per report singolo e mode=subscription per piani ricorrenti.'],
  },
  {
    provider: 'paypal',
    oneTimePayments: true,
    subscriptions: true,
    hostedCheckout: true,
    webhookRequired: true,
    recommendedPhase: 'post_mvp',
    notes: ['Provider secondario per aumentare conversione.', 'Subscriptions richiede product/plan/subscription lifecycle dedicato.'],
  },
  {
    provider: 'bank_transfer',
    oneTimePayments: true,
    subscriptions: false,
    hostedCheckout: false,
    webhookRequired: false,
    recommendedPhase: 'b2b_assisted',
    notes: ['Solo manual-assisted.', 'Avvio provider dati solo dopo riconciliazione pagamento.'],
  },
];

export const SUBSCRIPTION_PLAN_BLUEPRINTS: SubscriptionPlanBlueprint[] = [
  {
    code: 'BASIC_MONITORING_MONTHLY',
    name: 'Monitoraggio Basic',
    provider: 'stripe',
    commercialMode: 'subscription',
    monthlyPriceNetCents: 1990,
    includedCredits: 2,
    overagePolicy: 'manual_review',
    allowedPaymentMethods: ['stripe', 'paypal'],
  },
  {
    code: 'PRO_VERIFICATION_MONTHLY',
    name: 'Verifiche Pro',
    provider: 'stripe',
    commercialMode: 'subscription',
    monthlyPriceNetCents: 4990,
    includedCredits: 6,
    overagePolicy: 'block',
    allowedPaymentMethods: ['stripe', 'paypal'],
  },
];

export const PAYMENT_COMMERCIAL_MODES: PaymentCommercialMode[] = ['one_time', 'subscription', 'usage_topup', 'manual_invoice'];
