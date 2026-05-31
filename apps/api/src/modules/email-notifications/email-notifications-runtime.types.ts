export type EmailProviderKey = 'mock' | 'resend' | 'smtp' | 'ses';

export type EmailTemplateStatus = 'draft' | 'review' | 'active' | 'paused' | 'archived';
export type EmailDeliveryStatus =
  | 'queued'
  | 'sending'
  | 'sent'
  | 'delivered'
  | 'failed'
  | 'queued_retry'
  | 'bounced'
  | 'complained'
  | 'suppressed';

export type EmailEventStatus = 'queued' | 'processing' | 'completed' | 'failed' | 'suppressed';
export type EmailPriority = 'low' | 'normal' | 'high' | 'critical';
export type EmailCategory =
  | 'account_security'
  | 'team'
  | 'orders_payments_refunds'
  | 'reports_documents_pdf'
  | 'fiscal_documents'
  | 'subscriptions_credits'
  | 'support_contacts'
  | 'partner_api'
  | 'admin_internal';

export type EmailSuppressionReason = 'bounce' | 'complaint' | 'manual' | 'unsubscribe' | 'security_hold';
export type EmailSecureLinkPurpose = 'report_pdf' | 'invoice_pdf' | 'credit_note_pdf' | 'password_reset' | 'email_verification';

export type EmailEventPayload = Record<string, string | number | boolean | null | undefined>;

export type QueueEmailInput = {
  eventKey: string;
  recipientEmail: string;
  recipientName?: string;
  variables: EmailEventPayload;
  relatedEntities?: Record<string, string | undefined>;
  requestedBy?: string;
  idempotencyKey?: string;
};

export type EmailProviderSendInput = {
  to: string;
  subject: string;
  html: string;
  text: string;
  providerMessageKey: string;
  tags: Record<string, string>;
};

export type EmailProviderSendResult = {
  provider: EmailProviderKey;
  providerMessageId: string;
  status: 'sent' | 'queued' | 'failed';
  safeMessage?: string;
};

export type EmailAdminOverview = {
  queued: number;
  failed: number;
  bounced: number;
  complained: number;
  suppressed: number;
  sentLast24h: number;
  criticalTemplatesActive: number;
};
