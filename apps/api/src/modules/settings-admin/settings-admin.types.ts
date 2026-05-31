export type PlatformSettingNamespace =
  | 'commerce'
  | 'payments'
  | 'provider_openapi'
  | 'openai'
  | 'email'
  | 'security'
  | 'launch';

export type PlatformSettingState = 'draft' | 'active' | 'disabled' | 'requires_review' | 'error';

export interface PlatformSettingBlueprint {
  namespace: PlatformSettingNamespace;
  key: string;
  label: string;
  description: string;
  state: PlatformSettingState;
  isSecret: boolean;
  requiresReasonOnChange: boolean;
  visibleToRoles: string[];
}

export type OperationalErrorCategory =
  | 'payment'
  | 'refund'
  | 'subscription'
  | 'openapi_provider'
  | 'openai_api'
  | 'email_delivery'
  | 'webhook'
  | 'report_generation'
  | 'checkout'
  | 'auth'
  | 'crm_contact'
  | 'partner_api'
  | 'cms_publish';

export type OperationalErrorSeverity = 'info' | 'warning' | 'error' | 'critical';
export type OperationalErrorStatus = 'new' | 'investigating' | 'waiting_provider' | 'fix_pending' | 'refunded' | 'resolved' | 'ignored';

export interface OperationalErrorEventBlueprint {
  category: OperationalErrorCategory;
  severity: OperationalErrorSeverity;
  status: OperationalErrorStatus;
  sourceModule: string;
  sourceAction: string;
  safeMessage: string;
  technicalSummary: string;
  redactedPayload?: Record<string, unknown>;
  linkedObjectIds: Record<string, string | undefined>;
}
