export const emailNotificationsAnalysis = {
  sprint: 'M18-A',
  version: '0.63.0',
  strategy: 'event_driven_transactional_email_system',
  defaultProviderMode: 'mock_first_adapter_ready',
  requiredAuthentication: ['SPF', 'DKIM', 'DMARC', 'TLS'],
  categories: [
    'account_security',
    'orders_payments_refunds',
    'reports_documents_pdf',
    'fiscal_documents',
    'support_contacts',
    'partner_api',
    'admin_internal'
  ],
  criticalEvents: [
    'account.email_verification_requested',
    'auth.password_reset_requested',
    'auth.password_changed',
    'payment.succeeded',
    'payment.failed',
    'report.ready',
    'pdf.ready',
    'invoice.available',
    'refund.approved'
  ],
  guardrails: {
    noDirectControllerSend: true,
    eventLedgerRequired: true,
    providerWebhookRequired: true,
    tokenHashOnly: true,
    securePdfLinkPreferred: true,
    pdfAttachmentFeatureFlagged: true,
    noRawPayloadInEmail: true,
    noSecretsInLogs: true,
    suppressionRequired: true,
    operationalErrorLedgerIntegration: true
  },
  deliveryStatuses: ['queued', 'sent', 'delivered', 'bounced', 'complained', 'failed', 'suppressed'],
  adminOperations: ['retry', 'regenerate_secure_link', 'suppress', 'unsuppress', 'template_review'],
  nextSprint: 'M18-P Email & Customer Notifications Design'
} as const;

export type EmailNotificationAnalysisCategory = typeof emailNotificationsAnalysis.categories[number];
export type EmailNotificationCriticalEvent = typeof emailNotificationsAnalysis.criticalEvents[number];
