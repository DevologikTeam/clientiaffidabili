export type PlatformSettingValueSource = 'default' | 'environment' | 'database' | 'secret_ref' | 'computed';
export type PlatformSettingEnvironment = 'all' | 'local' | 'staging' | 'production';
export type PlatformSettingSensitivity = 'public_admin' | 'restricted_admin' | 'secret_write_only';

export interface PlatformSettingDesignContract {
  namespace: string;
  key: string;
  label: string;
  valueSource: PlatformSettingValueSource;
  environment: PlatformSettingEnvironment;
  sensitivity: PlatformSettingSensitivity;
  requiresReasonOnChange: boolean;
  requiresVerificationAfterChange: boolean;
  operationalImpact: string;
  safeDefault: unknown;
}

export interface PurchaseKillSwitchDesignContract {
  purchasesEnabled: boolean;
  disabledReasonCustomerCopy?: string;
  disabledUntil?: string;
  allowExistingOrdersToComplete: boolean;
  reasonRequired: true;
  enforcedAt: Array<'order_create' | 'checkout_session_create' | 'credit_purchase' | 'subscription_create' | 'partner_api_purchase'>;
}

export interface OperationalErrorLedgerDesignContract {
  category: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  status: 'new' | 'investigating' | 'waiting_provider' | 'fix_pending' | 'refund_pending' | 'refunded' | 'resolved' | 'ignored';
  safeMessage: string;
  technicalSummary: string;
  redactedPayload?: Record<string, unknown>;
  linkedObjects: Record<string, string | undefined>;
  allowedActions: Array<'assign' | 'retry' | 'link_refund' | 'link_fix' | 'resolve' | 'ignore' | 'escalate'>;
}

export interface BuyerIpAuditDesignContract {
  eventType: 'checkout_session_created' | 'payment_confirmed' | 'refund_requested' | 'report_downloaded' | 'partner_api_consumed';
  buyerIpHash: string;
  buyerIpPrefix?: string;
  userAgentHash?: string;
  linkedOrderId?: string;
  linkedPaymentId?: string;
  retentionClass: 'security_short' | 'financial_audit' | 'fraud_review';
}
