import type { EmailEventBlueprint, EmailSensitivePolicy, EmailTemplateBlueprint } from "./email-notifications-design.types";

export const emailSensitivePolicy: EmailSensitivePolicy = {
  allowPdfAttachment: false,
  secureLinkRequired: true,
  tokenHashOnly: true,
  redactRecipientInLogs: true,
  forbiddenVariables: [
    "password",
    "token",
    "apiKeySecret",
    "rawProviderPayload",
    "cardNumber",
    "ibanFull",
    "openaiPrompt",
    "openaiRawResponse",
    "reportRawData"
  ]
};

export const emailTemplateBlueprints: EmailTemplateBlueprint[] = [
  {
    templateKey: "verify_email_v1",
    version: 1,
    category: "account_security",
    subject: "Verifica il tuo indirizzo email",
    preheader: "Completa la configurazione del tuo account ClientiAffidabili.it.",
    allowedVariables: ["name", "verifyUrl", "expiresAt", "supportUrl"],
    defaultCtaLabel: "Verifica email",
    priority: "critical"
  },
  {
    templateKey: "password_reset_v1",
    version: 1,
    category: "account_security",
    subject: "Reimposta la password",
    preheader: "Usa il link sicuro entro la scadenza indicata.",
    allowedVariables: ["name", "resetUrl", "expiresAt", "supportUrl"],
    defaultCtaLabel: "Reimposta password",
    priority: "critical"
  },
  {
    templateKey: "remember_me_enabled_v1",
    version: 1,
    category: "account_security",
    subject: "Accesso ricordato su un dispositivo",
    preheader: "Puoi gestire i dispositivi salvati dalla dashboard.",
    allowedVariables: ["name", "deviceLabel", "manageDevicesUrl", "supportUrl"],
    defaultCtaLabel: "Gestisci dispositivi",
    priority: "high"
  },
  {
    templateKey: "payment_succeeded_v1",
    version: 1,
    category: "orders_payments_refunds",
    subject: "Pagamento ricevuto per il tuo ordine",
    preheader: "Abbiamo ricevuto il pagamento e stiamo preparando la verifica.",
    allowedVariables: ["orderCode", "productName", "amount", "orderUrl"],
    defaultCtaLabel: "Vai all ordine",
    priority: "critical"
  },
  {
    templateKey: "payment_failed_v1",
    version: 1,
    category: "orders_payments_refunds",
    subject: "Pagamento non completato",
    preheader: "Puoi riprovare il pagamento dalla tua area cliente.",
    allowedVariables: ["orderCode", "retryPaymentUrl", "supportUrl"],
    defaultCtaLabel: "Riprova pagamento",
    priority: "critical"
  },
  {
    templateKey: "report_ready_v1",
    version: 1,
    category: "reports_documents_pdf",
    subject: "Il tuo report e pronto",
    preheader: "Puoi consultarlo in modo sicuro dalla tua area cliente.",
    allowedVariables: ["checkCode", "reportUrl", "supportUrl"],
    defaultCtaLabel: "Apri report",
    priority: "critical"
  },
  {
    templateKey: "report_pdf_ready_v1",
    version: 1,
    category: "reports_documents_pdf",
    subject: "PDF disponibile per il tuo report",
    preheader: "Scarica il documento dal link sicuro entro la scadenza.",
    allowedVariables: ["checkCode", "securePdfUrl", "expiresAt", "supportUrl"],
    defaultCtaLabel: "Scarica PDF sicuro",
    requiresSecureLink: true,
    priority: "high"
  }
];

export const emailEventBlueprints: EmailEventBlueprint[] = [
  {
    eventKey: "account.email_verification_requested",
    category: "account_security",
    templateKey: "verify_email_v1",
    priority: "critical",
    retryPolicy: "standard_backoff",
    allowedRelatedEntities: ["user", "account"],
    customerVisible: true
  },
  {
    eventKey: "auth.password_reset_requested",
    category: "account_security",
    templateKey: "password_reset_v1",
    priority: "critical",
    retryPolicy: "standard_backoff",
    allowedRelatedEntities: ["user"],
    customerVisible: true
  },
  {
    eventKey: "auth.remember_me_enabled",
    category: "account_security",
    templateKey: "remember_me_enabled_v1",
    priority: "high",
    retryPolicy: "temporary_errors_only",
    allowedRelatedEntities: ["user", "session"],
    customerVisible: true
  },
  {
    eventKey: "payment.succeeded",
    category: "orders_payments_refunds",
    templateKey: "payment_succeeded_v1",
    priority: "critical",
    retryPolicy: "standard_backoff",
    allowedRelatedEntities: ["order", "payment"],
    customerVisible: true
  },
  {
    eventKey: "payment.failed",
    category: "orders_payments_refunds",
    templateKey: "payment_failed_v1",
    priority: "critical",
    retryPolicy: "standard_backoff",
    allowedRelatedEntities: ["order", "payment"],
    customerVisible: true
  },
  {
    eventKey: "report.ready",
    category: "reports_documents_pdf",
    templateKey: "report_ready_v1",
    priority: "critical",
    retryPolicy: "standard_backoff",
    allowedRelatedEntities: ["report", "check"],
    customerVisible: true
  },
  {
    eventKey: "report.pdf_ready",
    category: "reports_documents_pdf",
    templateKey: "report_pdf_ready_v1",
    priority: "high",
    retryPolicy: "standard_backoff",
    allowedRelatedEntities: ["report", "pdf"],
    customerVisible: true
  }
];
