export const fiscalLegalRoutes = {
  customer: [
    { path: '/dashboard/profilo-fiscale', title: 'Profilo fiscale', cta: 'Aggiorna dati di fatturazione' },
    { path: '/dashboard/documenti-fiscali', title: 'Documenti fiscali', cta: 'Vedi documenti' },
    { path: '/dashboard/consensi', title: 'Consensi e condizioni', cta: 'Vedi versioni accettate' },
    { path: '/dashboard/rimborsi', title: 'Rimborsi', cta: 'Controlla richieste' },
  ],
  publicLegal: [
    { path: '/legal/termini', title: 'Termini di servizio', mandatoryAtCheckout: true },
    { path: '/legal/privacy', title: 'Privacy policy', mandatoryAtCheckout: true },
    { path: '/legal/cookie', title: 'Cookie policy', mandatoryAtCheckout: false },
    { path: '/legal/rimborsi', title: 'Policy rimborsi', mandatoryAtCheckout: true },
    { path: '/legal/uso-accettabile', title: 'Uso accettabile', mandatoryAtCheckout: true },
    { path: '/legal/disclaimer-report', title: 'Limiti dei report', mandatoryAtCheckout: true },
  ],
  admin: [
    { path: '/admin/fiscal-legal', title: 'Fiscal & Legal Operations' },
    { path: '/admin/fiscal-legal/documents', title: 'Documenti fiscali' },
    { path: '/admin/fiscal-legal/refunds', title: 'Rimborsi e note credito' },
    { path: '/admin/fiscal-legal/legal-pack', title: 'Legal pack' },
  ],
} as const;

export const fiscalLegalCustomerCopy = {
  taxProfileHero: 'Gestisci i dati usati per preparare i documenti collegati ai tuoi acquisti.',
  taxProfileSnapshotNotice: 'Le modifiche valgono per i prossimi documenti, non per quelli gia emessi.',
  documentsHero: 'Qui trovi fatture, ricevute e rettifiche disponibili o in preparazione.',
  acceptancesHero: 'Consulta le condizioni accettate e le relative versioni.',
  refundHero: 'Segui lo stato delle richieste di rimborso e delle verifiche amministrative collegate.',
  lawfulUseConfirmation: 'Confermo di usare il servizio per finalita lecite e di aver compreso i limiti informativi del report.',
} as const;

export const blockedClaims = [
  'garantiamo solvibilita',
  'rischio zero',
  'pagamento sicuro al 100%',
  'cliente affidabile al 100%',
  'dati sempre completi',
] as const;

export const fiscalLegalQueueCards = [
  { key: 'documents_to_prepare', title: 'Documenti da preparare', owner: 'billing' },
  { key: 'tax_profiles_to_review', title: 'Dati fiscali da verificare', owner: 'billing' },
  { key: 'credit_notes_to_review', title: 'Note credito da valutare', owner: 'billing' },
  { key: 'legal_pack_review', title: 'Legal pack da revisionare', owner: 'compliance' },
  { key: 'privacy_requests', title: 'Richieste privacy', owner: 'compliance' },
] as const;
