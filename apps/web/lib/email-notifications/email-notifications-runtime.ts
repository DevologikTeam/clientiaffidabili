export type EmailDeliveryStatus = 'queued' | 'sending' | 'sent' | 'delivered' | 'failed' | 'queued_retry' | 'bounced' | 'complained' | 'suppressed';

export const emailNotificationRuntime = {
  overview: {
    queued: 4,
    failed: 1,
    bounced: 0,
    complained: 0,
    suppressed: 2,
    sentLast24h: 38,
    criticalTemplatesActive: 9
  },
  criticalFlows: [
    'registrazione e verifica email',
    'recupero password e ricordami',
    'ordine, pagamento e rimborso',
    'report pronto e PDF sicuro',
    'fatture, note credito e abbonamenti',
    'ticket supporto e partner API'
  ],
  deliveries: [
    { id: 'eml_1001', templateKey: 'payment_succeeded_v1', recipient: 'ma***@azienda.it', status: 'sent', event: 'payment.succeeded', nextAction: 'Nessuna azione' },
    { id: 'eml_1002', templateKey: 'report_pdf_ready_v1', recipient: 'am***@studio.it', status: 'queued_retry', event: 'report.pdf_ready', nextAction: 'Ritenta invio' },
    { id: 'eml_1003', templateKey: 'password_reset_v1', recipient: 'cl***@mail.it', status: 'delivered', event: 'auth.password_reset_requested', nextAction: 'Monitoraggio' }
  ] as Array<{ id: string; templateKey: string; recipient: string; status: EmailDeliveryStatus; event: string; nextAction: string }>,
  templates: [
    { key: 'verify_email_v1', category: 'Account', subject: 'Verifica il tuo indirizzo email', status: 'active' },
    { key: 'password_reset_v1', category: 'Account', subject: 'Reimposta la password', status: 'active' },
    { key: 'payment_succeeded_v1', category: 'Pagamenti', subject: 'Pagamento ricevuto per il tuo ordine', status: 'active' },
    { key: 'report_pdf_ready_v1', category: 'Report', subject: 'PDF disponibile per il tuo report', status: 'active' }
  ],
  guardrails: [
    'nessun invio diretto non tracciato nei controller',
    'link PDF sicuro prima degli allegati',
    'retry solo su errori temporanei',
    'suppression list per bounce e complaint',
    'error ledger per invii falliti o provider down'
  ]
} as const;
