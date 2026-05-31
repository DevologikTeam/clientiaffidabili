export type PaymentProviderCode = 'stripe' | 'paypal' | 'manual_bank_transfer';

export type PaymentCommercialModel =
  | 'one_shot_report'
  | 'credit_pack'
  | 'monthly_subscription'
  | 'annual_subscription'
  | 'monitoring_subscription'
  | 'api_partner_plan';

export interface PaymentProviderAnalysisItem {
  provider: PaymentProviderCode;
  role: 'primary' | 'secondary' | 'assisted';
  supportsOneShot: boolean;
  supportsSubscriptions: boolean;
  recommendedForMvp: boolean;
  rolloutGuard: string;
  risks: string[];
}

export interface SubscriptionModelAnalysisItem {
  code: string;
  label: string;
  commercialModel: PaymentCommercialModel;
  recommended: boolean;
  requiresCreditLedger: boolean;
  requiresEntitlementGate: boolean;
  notes: string;
}

export const paymentProvidersSubscriptionAnalysis = {
  version: '0.26.0',
  sprint: 'M4B-A',
  sourceOfTruth: 'internal_subscription_credit_entitlement_ledger',
  providers: [
    {
      provider: 'stripe',
      role: 'primary',
      supportsOneShot: true,
      supportsSubscriptions: true,
      recommendedForMvp: true,
      rolloutGuard: 'enable only with signed webhook verification and sandbox end-to-end tests',
      risks: ['fee impact on low-price products', 'failed renewal lifecycle', 'subscription mapping drift'],
    },
    {
      provider: 'paypal',
      role: 'secondary',
      supportsOneShot: true,
      supportsSubscriptions: true,
      recommendedForMvp: false,
      rolloutGuard: 'feature flag disabled until sandbox webhooks and reconciliation are validated',
      risks: ['different subscription lifecycle', 'merchant pricing variability', 'additional QA surface'],
    },
    {
      provider: 'manual_bank_transfer',
      role: 'assisted',
      supportsOneShot: true,
      supportsSubscriptions: false,
      recommendedForMvp: false,
      rolloutGuard: 'admin-only assisted activation with reason and audit',
      risks: ['manual reconciliation', 'delayed activation', 'support workload'],
    },
  ] satisfies PaymentProviderAnalysisItem[],
  subscriptionModels: [
    {
      code: 'starter_credit_subscription',
      label: 'Starter con crediti mensili',
      commercialModel: 'monthly_subscription',
      recommended: true,
      requiresCreditLedger: true,
      requiresEntitlementGate: true,
      notes: 'Best first recurring model: predictable, margin-controlled, no unlimited usage.',
    },
    {
      code: 'credit_pack_topup',
      label: 'Pacchetto crediti prepagati',
      commercialModel: 'credit_pack',
      recommended: true,
      requiresCreditLedger: true,
      requiresEntitlementGate: true,
      notes: 'Ideal for micro-verifications and repeat customers.',
    },
    {
      code: 'monitoring_subscription',
      label: 'Monitoraggio fornitori/clienti',
      commercialModel: 'monitoring_subscription',
      recommended: false,
      requiresCreditLedger: true,
      requiresEntitlementGate: true,
      notes: 'Requires scheduled provider cost modeling and stricter quotas.',
    },
  ] satisfies SubscriptionModelAnalysisItem[],
  permanentGuards: [
    'no unlimited plans',
    'no provider data call without paid order or reserved credits',
    'webhooks must be signed and idempotent',
    'credits and entitlements are internal source of truth',
    'admin economic corrections require reason and audit',
    'payment fees are included in margin snapshots',
  ],
} as const;
