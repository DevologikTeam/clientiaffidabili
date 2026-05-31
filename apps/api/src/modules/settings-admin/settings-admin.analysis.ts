export type PlatformSettingNamespace =
  | 'commerce'
  | 'payment'
  | 'openapi'
  | 'openai'
  | 'email'
  | 'security'
  | 'crm'
  | 'partner'
  | 'launch';

export type PlatformSettingStatus = 'draft' | 'active' | 'disabled' | 'error' | 'requires_review';

export interface PlatformSettingAnalysisItem {
  namespace: PlatformSettingNamespace;
  key: string;
  description: string;
  sensitive: boolean;
  requiresReasonOnChange: boolean;
  goLiveBlocker?: boolean;
}

export interface OperationalErrorCategoryAnalysis {
  category: string;
  examples: string[];
  recommendedActions: string[];
  refundRelevant: boolean;
}

export const platformSettingsAnalysis: PlatformSettingAnalysisItem[] = [
  {
    namespace: 'commerce',
    key: 'purchases.enabled',
    description: 'Server-side switch that enables or disables creation of new checkout/payment sessions.',
    sensitive: false,
    requiresReasonOnChange: true,
    goLiveBlocker: true,
  },
  {
    namespace: 'payment',
    key: 'stripe.secretKey',
    description: 'Stripe secret key or secret reference. Must never be exposed after save.',
    sensitive: true,
    requiresReasonOnChange: true,
    goLiveBlocker: true,
  },
  {
    namespace: 'payment',
    key: 'paypal.clientSecret',
    description: 'PayPal client secret or secret reference. Must remain backend-only.',
    sensitive: true,
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openapi',
    key: 'provider.callsEnabled',
    description: 'Controls whether paid provider calls can be executed.',
    sensitive: false,
    requiresReasonOnChange: true,
    goLiveBlocker: true,
  },
  {
    namespace: 'openai',
    key: 'openai.enabled',
    description: 'Enables OpenAI-powered internal features only after redaction and usage policies are configured.',
    sensitive: false,
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.apiKey',
    description: 'OpenAI API key or secret reference. Must never be exposed to frontend, logs, or admin reads.',
    sensitive: true,
    requiresReasonOnChange: true,
  },
];

export const operationalErrorCategoryAnalysis: OperationalErrorCategoryAnalysis[] = [
  {
    category: 'payment',
    examples: ['checkout session creation failed', 'payment confirmation mismatch', 'webhook signature failed'],
    recommendedActions: ['investigate', 'retry_safe_operation', 'contact_customer', 'refund_review'],
    refundRelevant: true,
  },
  {
    category: 'openapi_provider',
    examples: ['provider timeout', 'cost mismatch', 'payload normalization failed'],
    recommendedActions: ['retry_if_idempotent', 'manual_review', 'block_report', 'refund_review'],
    refundRelevant: true,
  },
  {
    category: 'openai_api',
    examples: ['AI request failed', 'budget exceeded', 'redaction guard blocked request'],
    recommendedActions: ['fallback', 'disable_use_case', 'fix_prompt_policy'],
    refundRelevant: false,
  },
  {
    category: 'email_delivery',
    examples: ['contact email failed after inbox save', 'transactional email bounced'],
    recommendedActions: ['retry_email', 'manual_contact', 'fix_provider_settings'],
    refundRelevant: false,
  },
];

export const m15bAnalysisDecision = {
  module: 'M15B Platform Settings, Bootstrap Admin & Operational Error Ledger',
  currentSprint: 'M15B-A',
  decision: 'Proceed to M15B-P with a server-side settings control room, bootstrap admin, purchase kill switch, provider settings governance, operational error ledger and buyer IP audit.',
};
