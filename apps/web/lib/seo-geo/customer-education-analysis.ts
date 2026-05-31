export type CustomerEducationIntent =
  | 'problem-aware'
  | 'solution-aware'
  | 'purchase-aware'
  | 'trust-aware';

export type CustomerEducationPriority = 'mvp' | 'next' | 'later';

export interface CustomerEducationPageCandidate {
  slug: string;
  title: string;
  primaryIntent: CustomerEducationIntent;
  audience: string[];
  targetServiceSlug?: string;
  priority: CustomerEducationPriority;
  requiredBlocks: Array<
    | 'answer-first-hero'
    | 'decision-checklist'
    | 'what-you-can-know'
    | 'what-you-cannot-know'
    | 'operational-guarantee'
    | 'service-recommendation'
    | 'faq'
  >;
  blockedClaims: string[];
}

export const customerEducationPageCandidates: CustomerEducationPageCandidate[] = [
  {
    slug: 'verificare-affidabilita-azienda',
    title: "Come verificare l'affidabilita' di un'azienda prima di lavorarci",
    primaryIntent: 'solution-aware',
    audience: ['imprenditore', 'amministrazione', 'ufficio acquisti', 'commerciale'],
    targetServiceSlug: 'check-affidabilita-pro',
    priority: 'mvp',
    requiredBlocks: [
      'answer-first-hero',
      'decision-checklist',
      'what-you-can-know',
      'what-you-cannot-know',
      'operational-guarantee',
      'service-recommendation',
      'faq',
    ],
    blockedClaims: ['rischio zero', 'solvibilita garantita', 'pagamento garantito'],
  },
  {
    slug: 'cliente-non-paga-come-prevenire',
    title: 'Cliente che non paga: cosa controllare prima di concedere credito',
    primaryIntent: 'problem-aware',
    audience: ['imprenditore', 'credit manager', 'amministrazione'],
    targetServiceSlug: 'check-affidabilita-pro',
    priority: 'mvp',
    requiredBlocks: [
      'answer-first-hero',
      'decision-checklist',
      'what-you-cannot-know',
      'operational-guarantee',
      'service-recommendation',
      'faq',
    ],
    blockedClaims: ['evita sicuramente insoluti', 'garanzia contro insoluti'],
  },
  {
    slug: 'garanzie-limiti-report-affidabilita',
    title: 'Garanzie e limiti di un report di affidabilita aziendale',
    primaryIntent: 'trust-aware',
    audience: ['cliente pronto all acquisto', 'ufficio amministrativo', 'legale interno'],
    targetServiceSlug: 'check-affidabilita-pro',
    priority: 'mvp',
    requiredBlocks: [
      'answer-first-hero',
      'what-you-can-know',
      'what-you-cannot-know',
      'operational-guarantee',
      'faq',
    ],
    blockedClaims: ['report infallibile', 'dati sempre aggiornati in tempo reale'],
  },
  {
    slug: 'visura-camerale-vs-report-affidabilita',
    title: 'Visura camerale o report affidabilita: differenze e quando usarli',
    primaryIntent: 'solution-aware',
    audience: ['imprenditore', 'commerciale', 'consulente'],
    targetServiceSlug: 'verifica-azienda-essenziale',
    priority: 'mvp',
    requiredBlocks: [
      'answer-first-hero',
      'decision-checklist',
      'service-recommendation',
      'faq',
    ],
    blockedClaims: ['alternativa ufficiale alla camera di commercio'],
  },
  {
    slug: 'controllo-fornitore-prima-di-acquisto',
    title: 'Controllo fornitore: cosa verificare prima di un ordine importante',
    primaryIntent: 'problem-aware',
    audience: ['ufficio acquisti', 'imprenditore', 'operations'],
    targetServiceSlug: 'check-affidabilita-pro',
    priority: 'mvp',
    requiredBlocks: [
      'answer-first-hero',
      'decision-checklist',
      'what-you-cannot-know',
      'operational-guarantee',
      'service-recommendation',
      'faq',
    ],
    blockedClaims: ['fornitore sicuro al 100%'],
  },
];

export const customerEducationQualityRules = {
  requiredBeforePublish: [
    'target keyword definita',
    'search intent definito',
    'blocco limiti presente',
    'garanzia operativa presente',
    'CTA coerente con il servizio',
    'FAQ non generiche',
    'nessun claim vietato',
    'nessun dato personale',
    'review umana completata',
  ],
  analyticsEventsAllowed: [
    'guide_viewed',
    'guide_cta_clicked',
    'guide_service_recommendation_clicked',
    'guide_faq_opened',
  ],
  analyticsEventsForbidden: [
    'company_name_searched',
    'vat_number_tracked',
    'report_payload_logged',
    'email_tracked',
  ],
};
