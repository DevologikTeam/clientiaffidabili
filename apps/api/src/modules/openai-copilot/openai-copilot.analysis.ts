export type OpenAiCopilotRiskLevel = 'low' | 'medium' | 'high' | 'blocked';

export type OpenAiCopilotUseCaseCode =
  | 'cms_seo_geo_copy_assist'
  | 'support_reply_draft'
  | 'error_ledger_summary'
  | 'admin_operations_summary'
  | 'report_note_clarity'
  | 'qa_release_summary';

export interface OpenAiCopilotUseCaseAnalysis {
  code: OpenAiCopilotUseCaseCode;
  label: string;
  riskLevel: OpenAiCopilotRiskLevel;
  defaultEnabled: boolean;
  requiresHumanApproval: boolean;
  redactionRequired: boolean;
  canPublishAutomatically: boolean;
  blockedActions: string[];
}

export const OPENAI_COPILOT_USE_CASE_ANALYSIS: OpenAiCopilotUseCaseAnalysis[] = [
  {
    code: 'cms_seo_geo_copy_assist',
    label: 'CMS SEO/GEO copy assist',
    riskLevel: 'low',
    defaultEnabled: false,
    requiresHumanApproval: true,
    redactionRequired: true,
    canPublishAutomatically: false,
    blockedActions: ['publish_page', 'change_service_price', 'claim_zero_risk']
  },
  {
    code: 'support_reply_draft',
    label: 'Support reply draft',
    riskLevel: 'medium',
    defaultEnabled: false,
    requiresHumanApproval: true,
    redactionRequired: true,
    canPublishAutomatically: false,
    blockedActions: ['send_email_without_review', 'promise_refund', 'promise_payment_guarantee']
  },
  {
    code: 'error_ledger_summary',
    label: 'Operational error ledger summary',
    riskLevel: 'medium',
    defaultEnabled: false,
    requiresHumanApproval: true,
    redactionRequired: true,
    canPublishAutomatically: false,
    blockedActions: ['retry_provider_automatically', 'refund_automatically', 'expose_raw_payload']
  },
  {
    code: 'admin_operations_summary',
    label: 'Admin operations state explanation',
    riskLevel: 'medium',
    defaultEnabled: false,
    requiresHumanApproval: true,
    redactionRequired: true,
    canPublishAutomatically: false,
    blockedActions: ['change_settings', 'disable_checkout', 'enable_provider_calls']
  },
  {
    code: 'report_note_clarity',
    label: 'Report note clarity assistant',
    riskLevel: 'high',
    defaultEnabled: false,
    requiresHumanApproval: true,
    redactionRequired: true,
    canPublishAutomatically: false,
    blockedActions: ['decide_company_reliability', 'claim_solvency_guaranteed', 'publish_report_without_review']
  },
  {
    code: 'qa_release_summary',
    label: 'QA and release summary assistant',
    riskLevel: 'low',
    defaultEnabled: false,
    requiresHumanApproval: true,
    redactionRequired: true,
    canPublishAutomatically: false,
    blockedActions: ['mark_release_ready', 'skip_e2e_tests', 'skip_security_gate']
  }
];

export const OPENAI_COPILOT_FORBIDDEN_DATA = [
  'card_number',
  'iban_full',
  'api_key',
  'session_token',
  'reset_token',
  'raw_provider_payload',
  'password',
  'cookie',
  'ip_cleartext',
  'openapi_secret',
  'stripe_secret',
  'paypal_secret'
] as const;

export const OPENAI_COPILOT_REQUIRED_GUARDRAILS = [
  'disabled_by_default',
  'backend_only',
  'secret_reference_only',
  'redaction_before_request',
  'prompt_registry_versioned',
  'human_approval_required',
  'usage_budget_enforced',
  'operational_error_ledger',
  'audit_every_generation',
  'no_automatic_decisions'
] as const;
