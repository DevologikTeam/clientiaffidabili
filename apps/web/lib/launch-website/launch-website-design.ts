export type LaunchPageKind = 'home' | 'service' | 'pricing' | 'api' | 'guide' | 'trust' | 'legal';
export type LaunchPageIndexPolicy = 'index' | 'noindex';

export type LaunchWebsiteBlueprintPage = {
  path: string;
  kind: LaunchPageKind;
  priority: 'P0' | 'P1' | 'P2';
  titlePattern: string;
  descriptionGoal: string;
  primaryCta: string;
  secondaryCta?: string;
  indexPolicy: LaunchPageIndexPolicy;
  schemaTypes: string[];
};

export const launchWebsiteBlueprintPages: LaunchWebsiteBlueprintPage[] = [
  {
    path: '/',
    kind: 'home',
    priority: 'P0',
    titlePattern: 'ClientiAffidabili.it — Verifiche e report per decisioni B2B piu consapevoli',
    descriptionGoal: 'Spiegare valore, servizi, garanzia operativa e CTA avvio verifica.',
    primaryCta: 'Avvia una verifica',
    secondaryCta: 'Scopri cosa contiene il report',
    indexPolicy: 'index',
    schemaTypes: ['Organization', 'WebSite'],
  },
  {
    path: '/servizi',
    kind: 'service',
    priority: 'P0',
    titlePattern: 'Servizi di verifica clienti, fornitori e aziende | ClientiAffidabili.it',
    descriptionGoal: 'Aiutare a scegliere il controllo corretto per scenario.',
    primaryCta: 'Scegli il controllo',
    indexPolicy: 'index',
    schemaTypes: ['BreadcrumbList'],
  },
  {
    path: '/prezzi',
    kind: 'pricing',
    priority: 'P0',
    titlePattern: 'Prezzi verifiche e report aziendali | ClientiAffidabili.it',
    descriptionGoal: 'Comunicare prezzi, add-on, crediti e garanzia operativa.',
    primaryCta: 'Vai al checkout',
    indexPolicy: 'index',
    schemaTypes: ['BreadcrumbList'],
  },
  {
    path: '/guide/[slug]',
    kind: 'guide',
    priority: 'P0',
    titlePattern: '{question} | Guida ClientiAffidabili.it',
    descriptionGoal: 'Rispondere a una domanda specifica con struttura answer-first.',
    primaryCta: 'Avvia verifica collegata',
    indexPolicy: 'index',
    schemaTypes: ['Article', 'FAQPage', 'BreadcrumbList'],
  },
  {
    path: '/api',
    kind: 'api',
    priority: 'P1',
    titlePattern: 'API verifiche aziendali per partner e reseller | ClientiAffidabili.it',
    descriptionGoal: 'Acquisire partner sandbox-first e spiegare governance API.',
    primaryCta: 'Richiedi accesso sandbox',
    indexPolicy: 'index',
    schemaTypes: ['BreadcrumbList'],
  },
];

export const blockedLaunchWebsiteClaims = [
  'rischio zero',
  'pagamento garantito',
  'solvibilita garantita',
  'solvibilità garantita',
  'cliente affidabile al 100%',
  'report infallibile',
  'evita ogni insoluto',
  'garantiamo il pagamento',
];

export const launchWebsiteGuaranteePillars = [
  'Prezzo chiaro prima dell’acquisto',
  'Fonti e data della richiesta indicate',
  'Limiti del report spiegati',
  'Supporto in caso di problemi',
  'Rimborsi legati allo stato del servizio',
];

export const allowedLaunchTrackingEvents = [
  'landing_viewed',
  'service_card_clicked',
  'pricing_cta_clicked',
  'guide_cta_clicked',
  'checkout_started',
  'checkout_legal_confirmed',
  'payment_completed',
  'report_viewed',
  'refund_requested',
] as const;
