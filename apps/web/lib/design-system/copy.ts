export const approvedCtas = {
  verifyCompany: "Verifica un'azienda",
  startCheck: 'Avvia questa verifica',
  confirmCheckout: 'Conferma e paga in sicurezza',
  openReport: 'Apri report',
  downloadReport: 'Scarica report PDF',
  activateMonitoring: 'Attiva monitoraggio',
  fixData: 'Correggi dati inseriti'
} as const;

export const legalMicrocopy = {
  checkoutPurpose:
    'Confermo di richiedere questa verifica per una finalità lecita e collegata a un rapporto professionale, commerciale o amministrativo.',
  reportDisclaimer:
    'Il report è generato sulla base delle fonti disponibili al momento della richiesta. Non costituisce garanzia assoluta né sostituisce una valutazione professionale o legale.',
  privacyShort:
    'Usiamo i dati inseriti solo per erogare la verifica richiesta, gestire ordine, report, fatturazione e obblighi di sicurezza.'
} as const;

export const forbiddenCustomerUiTerms = [
  'endpoint',
  'payload',
  'tenant',
  'adapter',
  'mock',
  'fake',
  'provider raw',
  'scoring garantito',
  'affidabilità garantita'
] as const;
