export const fiscalLegalCustomerMessages = {
  taxProfileIntro:
    'Completa i dati fiscali per ricevere correttamente i documenti relativi ai tuoi acquisti.',
  fiscalDocumentQueued:
    'Il documento fiscale e in preparazione. Ti avviseremo quando sara disponibile.',
  refundReview:
    'La richiesta di rimborso e in verifica per controllare pagamento, servizio erogato e documento fiscale.',
  legalAcceptance:
    'Prima dell’acquisto devi confermare termini, privacy, policy rimborsi e uso lecito del servizio.',
  reportDisclaimer:
    'Il report e un supporto informativo basato sulle fonti disponibili e non garantisce risultati futuri.',
} as const;

export const fiscalLegalPublicDocuments = [
  'terms_of_service',
  'privacy_policy',
  'cookie_policy',
  'refund_policy',
  'acceptable_use_policy',
  'report_disclaimer',
  'api_terms',
] as const;

export const fiscalLegalDashboardSections = [
  {
    path: '/dashboard/profilo-fiscale',
    title: 'Profilo fiscale',
    purpose: 'Gestire dati di fatturazione e indirizzo fiscale.',
  },
  {
    path: '/dashboard/documenti-fiscali',
    title: 'Documenti fiscali',
    purpose: 'Consultare fatture, ricevute e note credito disponibili.',
  },
  {
    path: '/dashboard/consensi',
    title: 'Consensi e condizioni',
    purpose: 'Vedere le versioni accettate dei documenti legali.',
  },
] as const;

export const fiscalLegalAdminQueues = [
  'fiscal_documents_queue',
  'refund_fiscal_review_queue',
  'legal_documents_queue',
  'privacy_requests_queue',
] as const;
