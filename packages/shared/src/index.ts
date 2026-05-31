export type SubjectType = 'company' | 'person' | 'iban' | 'email' | 'mobile';
export type RiskLevel = 'low' | 'medium' | 'high' | 'unknown';
export type OrderStatus = 'draft' | 'pending_payment' | 'paid' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled';
export type CheckStatus = 'queued' | 'provider_requested' | 'waiting_callback' | 'processing_result' | 'completed' | 'requires_review' | 'failed';

export type CatalogPublicationStatus = 'draft' | 'review' | 'published' | 'paused' | 'assisted' | 'archived';
export type CatalogRiskLevel = 'low' | 'low-medium' | 'medium' | 'high';
export type PriceGuardStatus = 'pass' | 'warning' | 'blocked' | 'override_requested' | 'override_approved';

export interface NormalizedCheckResult {
  riskLevel: RiskLevel;
  summary: string;
  redFlags: Array<{ code: string; label: string; severity: RiskLevel }>;
  evidences: Array<{ label: string; value: string; source?: string }>;
  sourceTimestamp: string;
}

export interface MoneyAmount {
  cents: number;
  currency: 'EUR';
  formatted: string;
}

export interface PublicCatalogProduct {
  code: string;
  slug: string;
  name: string;
  category: string;
  scenario: 'new-client' | 'supplier' | 'payment-data' | 'partner-compliance';
  status: CatalogPublicationStatus;
  riskLevel: CatalogRiskLevel;
  delivery: string;
  description: string;
  publicPromise: string;
  priceNet: MoneyAmount;
  vatRate: number;
  priceVat: MoneyAmount;
  priceGross: MoneyAmount;
  requiredInputs: string[];
  reportOutputs: string[];
  limits: string[];
  primaryCta: string;
  recommended: boolean;
}

export interface PriceGuardResult {
  status: PriceGuardStatus;
  grossMarginRatio: number;
  targetGrossMarginRatio: number;
  minimumGrossMarginRatio: number;
  estimatedProviderCostCents: number;
  reservesCents: number;
  messages: string[];
}

export interface PriceSnapshot {
  productCode: string;
  productName: string;
  unitPriceNetCents: number;
  quantity: number;
  subtotalNetCents: number;
  vatRate: number;
  vatCents: number;
  totalGrossCents: number;
  currency: 'EUR';
  formatted: {
    unitPriceNet: string;
    subtotalNet: string;
    vat: string;
    totalGross: string;
  };
  guard: PriceGuardResult;
  createdAt: string;
}

export type CheckoutProvider = 'mock' | 'stripe' | 'paypal' | 'nexi' | 'mollie' | 'bank_transfer';
export type CheckoutSessionStatus = 'created' | 'redirected' | 'completed' | 'expired' | 'cancelled' | 'failed';
export type PaymentStatus = 'pending' | 'requires_action' | 'succeeded' | 'failed' | 'refunded' | 'disputed';
export type PaymentLedgerEntryType =
  | 'checkout_session_created'
  | 'checkout_session_completed'
  | 'payment_succeeded'
  | 'payment_failed'
  | 'invoice_pending'
  | 'refund_requested'
  | 'refund_succeeded'
  | 'dispute_opened'
  | 'webhook_received'
  | 'webhook_ignored';
export type InvoiceStatus = 'pending' | 'issued' | 'cancelled' | 'failed';

export interface BillingProfileInput {
  type: 'company' | 'professional';
  businessName: string;
  vatNumber?: string;
  taxId?: string;
  country: string;
  addressLine1: string;
  city: string;
  postalCode: string;
  province?: string;
  email: string;
  sdiCode?: string;
  pec?: string;
}

export interface CheckoutSessionResult {
  orderId: string;
  checkoutUrl: string;
  provider: CheckoutProvider;
  externalId: string;
  status: CheckoutSessionStatus;
  amountTotalCents: number;
  currency: 'EUR';
}

export interface BillingAdminQueueItem {
  id: string;
  orderId: string;
  status: string;
  provider: CheckoutProvider;
  amountCents: number;
  currency: 'EUR';
  nextAction: string;
  createdAt: string;
}

export type ProviderName = 'openapi' | 'mock' | 'manual' | 'manual_review';
export type ProviderEnvironment = 'sandbox' | 'production';
export type ProviderExecutionMode = 'mock_disabled' | 'mock_enabled' | 'sandbox' | 'production';
export type ProviderDeliveryMode = 'sync' | 'async_callback' | 'async_polling' | 'manual_assisted';
export type ProviderRequestStatus =
  | 'not_started'
  | 'queued_after_payment'
  | 'validated'
  | 'created'
  | 'queued'
  | 'sent'
  | 'sent_to_provider'
  | 'waiting_provider'
  | 'waiting_callback'
  | 'polling'
  | 'received'
  | 'normalizing'
  | 'processing_result'
  | 'completed'
  | 'requires_review'
  | 'retry_scheduled'
  | 'failed'
  | 'cancelled';
export type ProviderErrorCategory =
  | 'validation'
  | 'validation_error'
  | 'authentication'
  | 'auth_error'
  | 'authorization'
  | 'rate_limit'
  | 'rate_limited'
  | 'timeout'
  | 'provider_unavailable'
  | 'not_found'
  | 'ambiguous_subject'
  | 'paid_provider_error'
  | 'partial_response'
  | 'normalization_error'
  | 'compliance_block'
  | 'compliance_review_required'
  | 'unknown'
  | 'unknown_error';
export type ProviderRetryDecision = 'none' | 'safe_retry' | 'manual_review' | 'refund_review' | 'support_required';
export type ProviderRetryPolicy = 'never' | 'safe_once' | 'safe_exponential' | 'manual_only';
export type ProviderEvidenceSensitivity = 'public_business' | 'business_confidential' | 'personal_data' | 'payment_data' | 'compliance_sensitive';

export interface ProviderServiceMappingAnalysis {
  productCode: string;
  providerName: ProviderName;
  providerServiceCode: string;
  deliveryMode: ProviderDeliveryMode;
  requiredInputs: string[];
  optionalInputs: string[];
  expectedCostCents: number;
  costVolatility: 'low' | 'medium' | 'high';
  normalizationProfile: string;
  complianceNotes: string[];
}

export interface ProviderExecutionGuardrail {
  code: string;
  label: string;
  decision: 'block' | 'warn' | 'allow';
  reason: string;
  owner: 'system' | 'admin' | 'support' | 'customer';
}

export interface ProviderRequestAnalysisSnapshot {
  orderId: string;
  checkId: string;
  productCode: string;
  providerName: ProviderName;
  environment: ProviderEnvironment;
  status: ProviderRequestStatus;
  costSnapshotCents: number;
  idempotencyKey: string;
  guardrails: ProviderExecutionGuardrail[];
  retryDecision: ProviderRetryDecision;
}

export interface ProviderServiceMappingDesign {
  productCode: string;
  providerName: ProviderName;
  providerServiceCode: string;
  providerServiceVersion: string;
  deliveryMode: ProviderDeliveryMode;
  enabledInSandbox: boolean;
  enabledInProduction: boolean;
  requiredInputs: string[];
  optionalInputs: string[];
  estimatedCostCents: number;
  maxAcceptedCostCents: number;
  normalizationProfile: string;
  retryPolicy: ProviderRetryPolicy;
  requiresManualReview: boolean;
  legalUseConfirmationRequired: boolean;
  customerVisibleOutput: string[];
  hiddenProviderFields: string[];
}

export interface ProviderRequestDesignSnapshot {
  requestId: string;
  orderId: string;
  checkId: string;
  productCode: string;
  providerName: ProviderName;
  providerServiceCode: string;
  mappingVersion: string;
  idempotencyKey: string;
  status: ProviderRequestStatus;
  providerCostSnapshotCents: number;
  maxAcceptedCostCents: number;
  retryPolicy: ProviderRetryPolicy;
  rawPayloadVaultRef?: string;
  normalizedResultRef?: string;
}

export interface ProviderNormalizedEvidenceDesign {
  code: string;
  label: string;
  value: string;
  source: ProviderName | 'customer_input' | 'system';
  sourceTimestamp: string;
  sensitivity: ProviderEvidenceSensitivity;
  customerVisible: boolean;
  retentionPolicy: 'short' | 'standard' | 'extended_for_compliance';
}

export interface ProviderAdminQueueItemDesign {
  requestId: string;
  productCode: string;
  status: ProviderRequestStatus;
  priority: 'normal' | 'high' | 'urgent';
  reason: ProviderErrorCategory | 'waiting_sla' | 'cost_guard' | 'manual_review';
  safeActions: Array<'retry' | 'mark_requires_review' | 'request_provider_support' | 'refund_if_not_consumed' | 'complete_manually'>;
}

export interface ProviderAdminQueueItem {
  id: string;
  orderId: string;
  checkId: string;
  productCode: string;
  providerName: ProviderName;
  status: ProviderRequestStatus;
  costCents: number;
  attempts: number;
  nextAction: string;
  createdAt: string;
}

export type ReportPublicationStatus = 'queued' | 'composing' | 'review_required' | 'ready' | 'failed' | 'voided';
export type ReportAttentionLevel = 'low_attention' | 'medium_attention' | 'high_attention' | 'manual_review' | 'not_enough_data';
export type ReportEvidenceSeverity = 'positive' | 'info' | 'attention' | 'critical' | 'unavailable';
export type ReportEvidenceType = 'registry' | 'credit' | 'negative_event' | 'compliance' | 'identity' | 'payment_data' | 'technical';

export interface CustomerReportSubjectSnapshot {
  name: string;
  vatNumber?: string;
  taxCode?: string;
  country?: string;
  legalAddress?: string;
}

export interface CustomerReportEvidenceSnapshot {
  id: string;
  type: ReportEvidenceType;
  label: string;
  severity: ReportEvidenceSeverity;
  sourceName: string;
  sourceTimestamp?: string;
  observedAt: string;
  summary: string;
  details?: string;
  limits: string[];
}

export interface CustomerReportSectionSnapshot {
  code: string;
  title: string;
  summary: string;
  completeness: 'complete' | 'partial' | 'unavailable';
  evidenceIds: string[];
  limits: string[];
}

export interface CustomerReportSnapshot {
  id: string;
  orderId: string;
  checkId?: string;
  status: ReportPublicationStatus;
  title: string;
  templateCode: string;
  templateVersion: string;
  composerVersion: string;
  scoreModelVersion: string;
  subject: CustomerReportSubjectSnapshot;
  score: number | null;
  attentionLevel: ReportAttentionLevel;
  attentionLabel: string;
  executiveSummary: string;
  recommendedActions: string[];
  sections: CustomerReportSectionSnapshot[];
  evidence: CustomerReportEvidenceSnapshot[];
  sources: string[];
  globalLimits: string[];
  generatedAt?: string;
  publishedAt?: string;
  snapshotHash?: string;
}

export interface ReportAdminQueueItem {
  id: string;
  orderId: string;
  checkId?: string;
  status: ReportPublicationStatus;
  attentionLevel: ReportAttentionLevel;
  nextAction: string;
  createdAt: string;
}

export type PaymentCommercialMode = 'one_time' | 'subscription' | 'usage_topup' | 'manual_invoice';
export type SubscriptionProvider = 'stripe' | 'paypal';
export type SubscriptionStatus = 'draft' | 'pending_approval' | 'active' | 'past_due' | 'paused' | 'cancelled' | 'expired';

export interface SubscriptionPlanBlueprint {
  code: string;
  name: string;
  provider: SubscriptionProvider;
  commercialMode: Extract<PaymentCommercialMode, 'subscription'>;
  monthlyPriceNetCents: number;
  includedCredits: number;
  overagePolicy: 'block' | 'manual_review' | 'allow_with_limit';
  allowedPaymentMethods: SubscriptionProvider[];
}

export type CustomerDashboardCheckStatus =
  | 'payment_received'
  | 'processing'
  | 'internal_review'
  | 'report_ready'
  | 'action_required'
  | 'support_required'
  | 'refunded'
  | 'archived';

export type CustomerDashboardNotificationTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export interface CustomerDashboardNextAction {
  type:
    | 'open_report'
    | 'complete_request_data'
    | 'download_invoice'
    | 'complete_billing_profile'
    | 'start_new_check'
    | 'contact_support';
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  priority: 'high' | 'medium' | 'low';
}

export interface CustomerDashboardSummarySnapshot {
  readyReports: number;
  pendingChecks: number;
  actionRequired: number;
  unreadNotifications: number;
  totalChecks: number;
  nextBestAction: CustomerDashboardNextAction;
}

export interface CustomerDashboardCheckItem {
  id: string;
  orderId: string;
  reportId?: string;
  productCode: string;
  serviceName: string;
  subjectName: string;
  subjectIdentifier?: string;
  status: CustomerDashboardCheckStatus;
  statusLabel: string;
  statusDescription: string;
  requestedAt: string;
  updatedAt: string;
  reportReadyAt?: string;
  amountGrossCents?: number;
  currency: 'EUR';
  nextAction?: CustomerDashboardNextAction;
}

export interface CustomerDashboardTimelineStep {
  key: string;
  label: string;
  description: string;
  completed: boolean;
  current?: boolean;
  occurredAt?: string;
}

export interface CustomerDashboardCheckDetail extends CustomerDashboardCheckItem {
  timeline: CustomerDashboardTimelineStep[];
  reportAccess?: {
    reportId: string;
    status: ReportPublicationStatus;
    href: string;
    downloadable: boolean;
    downloadStatusLabel: string;
  };
  supportContext: {
    suggestedSubject: string;
    relatedType: 'check';
    relatedId: string;
  };
}

export interface CustomerDashboardInvoiceItem {
  id: string;
  orderId: string;
  label: string;
  taxableAmountCents: number;
  vatAmountCents: number;
  totalAmountCents: number;
  currency: 'EUR';
  status: 'preparing' | 'issued' | 'sent' | 'void';
  issuedAt?: string;
  downloadUrl?: string;
  nextActionLabel: string;
}

export interface CustomerDashboardNotificationItem {
  id: string;
  title: string;
  body: string;
  tone: CustomerDashboardNotificationTone;
  href?: string;
  status: 'unread' | 'read' | 'archived';
  createdAt: string;
}

export interface CustomerDashboardSupportTicketItem {
  id: string;
  subject: string;
  category: 'order' | 'report' | 'billing' | 'provider_delay' | 'account' | 'other';
  status: 'open' | 'waiting_customer' | 'in_review' | 'resolved' | 'closed';
  priority: 'normal' | 'high' | 'urgent';
  relatedType?: 'order' | 'check' | 'report' | 'invoice';
  relatedId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerDashboardSnapshot {
  summary: CustomerDashboardSummarySnapshot;
  checks: CustomerDashboardCheckItem[];
  invoices: CustomerDashboardInvoiceItem[];
  notifications: CustomerDashboardNotificationItem[];
  supportTickets: CustomerDashboardSupportTicketItem[];
}


export type CustomerTaxProfileStatus = 'draft' | 'complete' | 'requires_review' | 'locked';
export type CustomerFiscalDocumentStatus = 'draft' | 'queued' | 'requires_review' | 'ready_to_issue' | 'issued' | 'delivered' | 'credit_note_required' | 'adjusted' | 'failed' | 'cancelled';
export type CustomerFiscalDocumentType = 'invoice' | 'receipt' | 'credit_note' | 'debit_note' | 'proforma' | 'manual_adjustment';
export type CustomerLegalDocumentType = 'terms_of_service' | 'privacy_policy' | 'cookie_policy' | 'refund_policy' | 'acceptable_use_policy' | 'report_disclaimer' | 'api_terms';

export interface CustomerTaxProfileCardSnapshot {
  id: string;
  profileType: string;
  legalName: string;
  vatNumber?: string;
  taxCode?: string;
  pec?: string;
  sdiCode?: string;
  email: string;
  address: string;
  status: CustomerTaxProfileStatus;
  statusLabel: string;
  nextActionLabel: string;
  requiresFiscalReview: boolean;
}

export interface CustomerFiscalDocumentItem {
  id: string;
  orderId?: string;
  label: string;
  documentType: CustomerFiscalDocumentType;
  status: CustomerFiscalDocumentStatus;
  statusLabel: string;
  totalAmountCents: number;
  currency: 'EUR';
  issuedAt?: string;
  downloadUrl?: string;
  nextActionLabel: string;
}

export interface CustomerLegalAcceptanceItem {
  id: string;
  label: string;
  version: string;
  acceptedAt: string;
  source: 'checkout' | 'account' | 'admin_import' | 'api';
}

export interface CustomerLegalDocumentItem {
  documentType: CustomerLegalDocumentType;
  title: string;
  version: string;
  status: 'draft' | 'legal_review' | 'approved' | 'published' | 'superseded' | 'archived';
  contentHash: string;
  publishedAt?: string;
}

export interface FiscalLegalDashboardSnapshot {
  taxProfile: CustomerTaxProfileCardSnapshot;
  fiscalDocuments: CustomerFiscalDocumentItem[];
  legalAcceptances: CustomerLegalAcceptanceItem[];
  legalPack: CustomerLegalDocumentItem[];
}

export interface AdminFiscalLegalQueueItem {
  id: string;
  type: 'tax_profile' | 'fiscal_document' | 'legal_document' | 'refund_credit_note';
  priority: 'normal' | 'high' | 'urgent';
  title: string;
  reason: string;
  status: string;
  ownerRole: 'billing' | 'compliance' | 'operations' | 'super_admin';
  nextActionLabel: string;
  createdAt: string;
}
