export type PlatformSettingNamespace =
  | 'commerce'
  | 'payments'
  | 'provider_openapi'
  | 'openai'
  | 'email'
  | 'security'
  | 'crm'
  | 'partner'
  | 'launch'
  | 'analytics';

export type PlatformSettingState = 'draft' | 'active' | 'disabled' | 'requires_review' | 'error';
export type PlatformSettingEnvironment = 'all' | 'local' | 'staging' | 'production';
export type PlatformSettingSensitivity = 'public_admin' | 'restricted_admin' | 'secret_write_only';

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
export type OperationalErrorStatus = 'new' | 'investigating' | 'waiting_provider' | 'fix_pending' | 'refund_pending' | 'refunded' | 'resolved' | 'ignored';

export interface SafeSettingView {
  id: string;
  namespace: PlatformSettingNamespace;
  key: string;
  label: string;
  description: string;
  state: PlatformSettingState;
  environment: PlatformSettingEnvironment;
  valueSource: string;
  sensitivity: PlatformSettingSensitivity;
  displayValue: unknown;
  requiresReasonOnChange: boolean;
  requiresVerificationAfterChange: boolean;
  goLiveBlocker: boolean;
  lastChangedAt?: string;
  lastChangeReason?: string;
}

export interface PurchaseRequestContext {
  ipAddress?: string;
  userAgent?: string;
  actorId?: string;
}
