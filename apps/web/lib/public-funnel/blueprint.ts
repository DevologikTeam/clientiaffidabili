export type PublicScenario = {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  recommendedService: string;
};

export const publicHero = {
  badge: 'Verifiche B2B guidate',
  headline: 'Verifica clienti, aziende e segnali di affidabilità prima di prendere decisioni rischiose.',
  subheadline:
    "ClientiAffidabili.it ti aiuta a scegliere il controllo giusto, conoscere costi e tempi prima dell'acquisto e raccogliere i risultati in report leggibili per il tuo team.",
  primaryCta: 'Avvia una verifica azienda',
  secondaryCta: 'Esplora i servizi'
} as const;

export const trustStripItems = [
  "Prezzi e tempi visibili prima dell'acquisto.",
  'Report con fonti e limiti dichiarati.',
  'Flussi pensati per uso professionale B2B.',
  'API e integrazioni per software e gestionali.'
] as const;

export const publicScenarios: PublicScenario[] = [
  {
    id: 'new-client',
    title: 'Devo valutare un nuovo cliente',
    description:
      'Controlla dati aziendali, segnali negativi e documenti utili prima di concedere credito, spedire merce o avviare una fornitura.',
    cta: 'Vai ai controlli azienda',
    href: '/servizi?scenario=nuovo-cliente',
    recommendedService: 'Check Azienda Start'
  },
  {
    id: 'supplier',
    title: 'Devo verificare un fornitore',
    description:
      'Raccogli informazioni societarie e documentali prima di inserire un partner nel tuo processo operativo.',
    cta: 'Verifica un fornitore',
    href: '/servizi?scenario=fornitore',
    recommendedService: 'Check Fornitore'
  },
  {
    id: 'official-document',
    title: 'Mi serve una visura o un documento',
    description:
      'Scegli il documento, verifica costo e tempi e segui lo stato della richiesta fino al risultato.',
    cta: 'Trova un documento',
    href: '/servizi?scenario=documenti',
    recommendedService: 'Documenti ufficiali'
  },
  {
    id: 'api-integration',
    title: 'Voglio integrare controlli via API',
    description:
      'Progetta un flusso controllato per software, gestionali, CRM o piattaforme B2B.',
    cta: 'Richiedi accesso API',
    href: '/api',
    recommendedService: 'API e volumi'
  }
];

export const publicFaq = [
  {
    question: 'I report garantiscono che un cliente pagherà?',
    answer:
      'No. I report aiutano a raccogliere segnali e informazioni utili, ma non possono garantire pagamenti, solvibilità o assenza di rischio.'
  },
  {
    question: 'Quali dati devo inserire?',
    answer:
      'Dipende dal servizio. I dati richiesti saranno sempre indicati prima del checkout.'
  },
  {
    question: 'Quando ricevo il risultato?',
    answer:
      'Alcuni servizi sono in tempo reale, altri richiedono minuti, ore o giorni lavorativi. Il tempo stimato viene mostrato prima del pagamento.'
  },
  {
    question: 'Posso integrare le verifiche nel mio gestionale?',
    answer:
      'Sì, il progetto prevede un percorso API per software house, gestionali, CRM e piattaforme B2B.'
  }
] as const;

export const forbiddenPublicClaims = [
  'rischio zero',
  'pagamento garantito',
  'cliente affidabile al 100%',
  'scopri tutto su una persona',
  'indagini private',
  'controllo anonimo',
  'accesso illimitato a dati personali'
] as const;
