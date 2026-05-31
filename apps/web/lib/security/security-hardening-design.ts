export const securityHardeningDesign = {
  version: '0.30.0',
  sprint: 'M9-P Security, Compliance & Production Hardening Design',
  positioning: "La sicurezza e' parte del prodotto: protegge report, pagamenti, provider e fiducia commerciale.",
  adminSections: [
    'Production gate',
    'RBAC/object authorization',
    'Webhook security',
    'Secrets and deploy',
    'Backup/restore',
    'Incident response',
    'Audit and observability',
  ],
  p0Controls: [
    'auth-rbac-object-level-authorization',
    'signed-idempotent-webhooks',
    'backend-only-secrets',
    'provider-call-after-payment-or-credit',
    'no-raw-provider-payload-in-ui-or-logs',
    'backup-restore-drill',
    'incident-data-breach-runbook',
  ],
  customerCopy: {
    dataProtection: 'I dati vengono usati solo per erogare la verifica richiesta e proteggere il tuo account.',
    reportLimits: 'Il report supporta una decisione, ma non garantisce pagamenti futuri o assenza di rischio.',
    payments: 'I dati carta sono gestiti dal provider di pagamento: non vengono salvati nei nostri sistemi.',
  },
  productionGateSummary: {
    pass: 'Pronto per staging/produzione controllata',
    blocked: 'Produzione bloccata: mancano controlli P0',
    review: 'Richiede verifica tecnica o legale prima del rilascio',
  },
} as const;
