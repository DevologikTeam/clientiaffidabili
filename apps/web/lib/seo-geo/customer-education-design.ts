export type EducationSearchIntent =
  | 'problem_aware'
  | 'solution_aware'
  | 'purchase_aware'
  | 'trust_aware';

export type EducationTemplateType =
  | 'educational_guide'
  | 'comparison_guide'
  | 'operational_checklist'
  | 'guarantee_limits'
  | 'glossary_definition';

export type EducationCluster =
  | 'affidabilita_azienda'
  | 'prevenzione_insoluti'
  | 'fornitori'
  | 'dati_contatto_pagamento'
  | 'garanzie_limiti'
  | 'credit_scoring'
  | 'kyb_aml';

export interface EducationPageBlueprint {
  slug: string;
  title: string;
  h1: string;
  template: EducationTemplateType;
  cluster: EducationCluster;
  intent: EducationSearchIntent;
  audience: string;
  answerSummary: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  recommendedServiceSlug?: string;
  requiredBlocks: string[];
  relatedSlugs: string[];
  faqSeeds: Array<{ question: string; answer: string; includeInSchema: boolean }>;
}

export const forbiddenEducationClaims = [
  'rischio zero',
  'pagamento garantito',
  'solvibilita garantita',
  'solvibilità garantita',
  'cliente sicuro al 100%',
  'fornitore sicuro al 100%',
  'garantisce che paghera',
  'garantisce che pagherà'
];

export const recommendedEducationClaims = [
  'aiuta a decidere con più consapevolezza',
  'mostra fonti, data e limiti',
  'evidenzia segnali di attenzione',
  'riduce decisioni prese al buio',
  'non sostituisce una valutazione legale o finanziaria'
];

export const educationPageBlueprints: EducationPageBlueprint[] = [
  {
    slug: 'verificare-affidabilita-azienda',
    title: "Verificare l'affidabilità di un'azienda",
    h1: "Come verificare l'affidabilità di un'azienda prima di iniziare una collaborazione",
    template: 'educational_guide',
    cluster: 'affidabilita_azienda',
    intent: 'solution_aware',
    audience: 'PMI, amministrazione, commerciale, titolari',
    answerSummary: "Per verificare l'affidabilità di un'azienda conviene controllare dati anagrafici, stato attività, eventuali segnali negativi, informazioni economiche disponibili e coerenza dei contatti. Un report non garantisce che un cliente pagherà sempre, ma aiuta a decidere con più consapevolezza indicando fonti, data e limiti.",
    primaryCta: { label: 'Avvia una verifica azienda', href: '/servizi/check-affidabilita-pro' },
    secondaryCta: { label: 'Leggi garanzie e limiti', href: '/guide/garanzie-limiti-report-affidabilita' },
    recommendedServiceSlug: 'check-affidabilita-pro',
    requiredBlocks: ['hero', 'geoAnswer', 'operationalChecklist', 'guaranteeLimits', 'faq', 'relatedGuides'],
    relatedSlugs: ['visura-camerale-vs-report-affidabilita', 'credit-scoring-azienda-significato', 'garanzie-limiti-report-affidabilita'],
    faqSeeds: [
      { question: 'Un report garantisce che il cliente pagherà?', answer: 'No. Il report aiuta a leggere dati e segnali disponibili, ma non può garantire il comportamento futuro di un cliente.', includeInSchema: true },
      { question: 'Quando conviene fare la verifica?', answer: 'Prima di concedere credito, accettare ordini importanti, avviare collaborazioni o inviare acconti.', includeInSchema: true }
    ]
  },
  {
    slug: 'cliente-non-paga-come-prevenire',
    title: 'Cliente non paga: come prevenire insoluti',
    h1: 'Cliente nuovo o pagamento a 30 giorni: cosa controllare prima di rischiare un insoluto',
    template: 'operational_checklist',
    cluster: 'prevenzione_insoluti',
    intent: 'problem_aware',
    audience: 'PMI e amministrazione crediti',
    answerSummary: 'Non esiste un controllo che elimini del tutto il rischio di insoluto. Prima di concedere pagamento dilazionato puoi verificare identità aziendale, segnali negativi, scoring disponibile e coerenza dei dati di contatto. Il report serve a evidenziare segnali di attenzione e documentare la decisione.',
    primaryCta: { label: 'Controlla un nuovo cliente', href: '/servizi/check-affidabilita-pro' },
    secondaryCta: { label: 'Confronta i report', href: '/prezzi' },
    recommendedServiceSlug: 'check-affidabilita-pro',
    requiredBlocks: ['hero', 'geoAnswer', 'operationalChecklist', 'decisionTable', 'guaranteeLimits', 'faq'],
    relatedSlugs: ['verificare-affidabilita-azienda', 'credit-scoring-azienda-significato', 'garanzie-limiti-report-affidabilita'],
    faqSeeds: [
      { question: 'Posso eliminare il rischio di insoluto?', answer: 'No. Puoi ridurlo con controlli preventivi, condizioni contrattuali adeguate e decisioni documentate.', includeInSchema: true },
      { question: 'Quando chiedere pagamento anticipato?', answer: 'Quando emergono segnali di attenzione, dati incompleti o importi rilevanti rispetto al rapporto commerciale.', includeInSchema: true }
    ]
  },
  {
    slug: 'visura-camerale-vs-report-affidabilita',
    title: 'Visura camerale vs report affidabilità',
    h1: "Visura camerale o report affidabilità: quale scegliere per valutare un'azienda?",
    template: 'comparison_guide',
    cluster: 'affidabilita_azienda',
    intent: 'solution_aware',
    audience: 'PMI, studi professionali, amministrazione',
    answerSummary: "La visura camerale mostra informazioni ufficiali sull'impresa. Un report di affidabilità organizza più segnali utili alla decisione, come dati aziendali, evidenze, eventuali negatività e indicatori di attenzione. La scelta dipende dallo scopo: identificare l'impresa o valutare un rischio operativo.",
    primaryCta: { label: 'Scegli il controllo più adatto', href: '/servizi' },
    secondaryCta: { label: 'Vedi prezzi', href: '/prezzi' },
    recommendedServiceSlug: 'verifica-azienda-essenziale',
    requiredBlocks: ['hero', 'geoAnswer', 'comparisonMatrix', 'recommendedService', 'guaranteeLimits', 'faq'],
    relatedSlugs: ['verificare-affidabilita-azienda', 'garanzie-limiti-report-affidabilita'],
    faqSeeds: [
      { question: 'La visura basta per decidere se fidarsi?', answer: 'Dipende dallo scopo. È utile per identificare l’impresa, ma spesso non basta per valutare segnali di attenzione operativi.', includeInSchema: true }
    ]
  },
  {
    slug: 'garanzie-limiti-report-affidabilita',
    title: 'Garanzie e limiti del report affidabilità',
    h1: 'Cosa garantisce davvero un report di affidabilità aziendale?',
    template: 'guarantee_limits',
    cluster: 'garanzie_limiti',
    intent: 'trust_aware',
    audience: 'Tutti i clienti potenziali',
    answerSummary: "Un report di affidabilità non garantisce che un'azienda pagherà, consegnerà o resterà solvibile. Garantisce invece un processo operativo chiaro: prezzo prima dell'acquisto, fonti indicate, data della verifica, limiti esplicitati e supporto se la verifica non può essere completata secondo le condizioni del servizio.",
    primaryCta: { label: 'Leggi la garanzia operativa', href: '/garanzia-operativa' },
    secondaryCta: { label: 'Avvia una verifica', href: '/servizi' },
    requiredBlocks: ['hero', 'geoAnswer', 'guaranteeLimits', 'refundPolicySummary', 'faq', 'relatedGuides'],
    relatedSlugs: ['verificare-affidabilita-azienda', 'visura-camerale-vs-report-affidabilita'],
    faqSeeds: [
      { question: 'Il report garantisce il pagamento?', answer: 'No. Nessun report può garantire il comportamento futuro di un cliente o fornitore.', includeInSchema: true },
      { question: 'Cosa succede se il report non è producibile?', answer: 'Il caso viene gestito secondo stato ordine, fonti disponibili, supporto e policy rimborso.', includeInSchema: true }
    ]
  }
];

export const educationCmsRequiredFields = [
  'title',
  'slug',
  'seoTitle',
  'seoDescription',
  'primaryKeyword',
  'searchIntent',
  'geoAnswerFocus',
  'answerSummary',
  'operationalGuaranteeBlock',
  'limitationsBlock',
  'recommendedServiceSlug',
  'relatedPageSlugs',
  'reviewStatus'
];
