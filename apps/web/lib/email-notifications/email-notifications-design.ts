export const emailNotificationsDesign = {
  sprint: "M18-P",
  version: "0.64.0",
  architecture: "event_driven_email_delivery_ledger",
  adminRoutes: ["/admin/email", "/admin/email/deliveries", "/admin/email/templates", "/admin/email/suppression"],
  customerRoutes: ["/dashboard", "/dashboard/verifiche", "/dashboard/fatture", "/dashboard/supporto", "/dashboard/account"],
  securePdfPolicy: {
    defaultDelivery: "secure_link",
    attachmentFeatureFlag: "email.pdf.attachmentsEnabled",
    downloadAuditRequired: true,
    tokenHashOnly: true,
    defaultTtlHours: 72
  },
  requiredCategories: [
    "account_security",
    "team",
    "orders_payments_refunds",
    "reports_documents_pdf",
    "fiscal_documents",
    "subscriptions_credits",
    "support_contacts",
    "partner_api"
  ],
  customerEmailEvents: [
    "account.email_verification_requested",
    "auth.password_reset_requested",
    "auth.password_changed",
    "auth.remember_me_enabled",
    "team.invite_sent",
    "order.created",
    "payment.succeeded",
    "payment.failed",
    "refund.approved",
    "report.ready",
    "report.pdf_ready",
    "invoice.available",
    "support.ticket_created"
  ],
  forbiddenPayloadKeys: [
    "password",
    "token",
    "apiKeySecret",
    "rawProviderPayload",
    "cardNumber",
    "ibanFull",
    "openaiPrompt",
    "openaiRawResponse",
    "reportRawData"
  ],
  nextSprint: "M18-S Email & Customer Notifications Development"
} as const;

export type EmailNotificationsDesign = typeof emailNotificationsDesign;
