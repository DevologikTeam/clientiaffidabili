export type EmailCategory =
  | "account_security"
  | "team"
  | "orders_payments_refunds"
  | "reports_documents_pdf"
  | "fiscal_documents"
  | "subscriptions_credits"
  | "support_contacts"
  | "partner_api"
  | "admin_internal";

export type EmailPriority = "low" | "normal" | "high" | "critical";

export type EmailDeliveryStatus =
  | "queued"
  | "sending"
  | "sent"
  | "delivered"
  | "failed"
  | "queued_retry"
  | "bounced"
  | "complained"
  | "suppressed";

export type EmailSensitivePolicy = {
  allowPdfAttachment: boolean;
  secureLinkRequired: boolean;
  tokenHashOnly: boolean;
  redactRecipientInLogs: boolean;
  forbiddenVariables: string[];
};

export type EmailTemplateBlueprint = {
  templateKey: string;
  version: number;
  category: EmailCategory;
  subject: string;
  preheader: string;
  allowedVariables: string[];
  defaultCtaLabel?: string;
  requiresSecureLink?: boolean;
  priority: EmailPriority;
};

export type EmailEventBlueprint = {
  eventKey: string;
  category: EmailCategory;
  templateKey: string;
  priority: EmailPriority;
  retryPolicy: "none" | "temporary_errors_only" | "standard_backoff";
  allowedRelatedEntities: string[];
  customerVisible: boolean;
};

export type EmailAdminAction =
  | "retry_delivery"
  | "regenerate_secure_link"
  | "suppress_recipient"
  | "unsuppress_recipient"
  | "disable_template"
  | "mark_resolved";
