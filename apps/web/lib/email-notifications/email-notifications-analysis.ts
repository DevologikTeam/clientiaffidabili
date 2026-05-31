export const emailNotificationsAnalysisView = {
  sprint: 'M18-A',
  title: 'Email & Customer Notifications Analysis',
  summary: 'Analisi del sistema di email tecniche cliente, admin monitor, deliverability, PDF delivery e ledger invii.',
  dashboardCards: [
    { label: 'Categorie email', value: '7', description: 'Account, pagamenti, report, fiscale, supporto, partner, admin.' },
    { label: 'Eventi critici', value: '9+', description: 'Reset password, pagamento, documento pronto, PDF e fatture.' },
    { label: 'Gate deliverability', value: 'SPF/DKIM/DMARC', description: 'Requisiti dominio prima del go-live.' },
    { label: 'PDF delivery', value: 'Link sicuro first', description: 'Allegato solo se policy e rischio lo consentono.' }
  ],
  guardrails: [
    'Nessun invio email diretto fuori dal ledger.',
    'Token solo hashati e a scadenza.',
    'Nessun raw payload provider o segreto nei log.',
    'Retry idempotente e suppression list.',
    'Error ledger collegato a fallimenti email critici.'
  ],
  next: 'M18-P progettera template, provider adapter, API, data model e UI admin.'
} as const;
