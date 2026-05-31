export type LaunchWebsitePagePriority = 'P0' | 'P1' | 'P2';

export type LaunchWebsitePage = {
  path: string;
  title: string;
  priority: LaunchWebsitePagePriority;
  intent: 'commercial' | 'educational' | 'trust' | 'partner' | 'transactional';
  primaryCta: string;
  seoGeoRole: string;
};

export const launchWebsitePages: LaunchWebsitePage[] = [
  {
    path: '/',
    title: 'Homepage ClientiAffidabili.it',
    priority: 'P0',
    intent: 'commercial',
    primaryCta: 'Avvia una verifica',
    seoGeoRole: 'Brand + product positioning + conversion entry',
  },
  {
    path: '/servizi',
    title: 'Catalogo servizi',
    priority: 'P0',
    intent: 'commercial',
    primaryCta: 'Scegli il controllo',
    seoGeoRole: 'Service discovery and commercial clarity',
  },
  {
    path: '/prezzi',
    title: 'Prezzi trasparenti',
    priority: 'P0',
    intent: 'transactional',
    primaryCta: 'Vai al checkout',
    seoGeoRole: 'Pricing trust and margin-safe purchase intent',
  },
  {
    path: '/guide/verificare-affidabilita-azienda',
    title: 'Come verificare l’affidabilita di una azienda',
    priority: 'P0',
    intent: 'educational',
    primaryCta: 'Verifica azienda',
    seoGeoRole: 'Question-answer GEO entry point',
  },
  {
    path: '/guide/garanzie-limiti-report-affidabilita',
    title: 'Garanzie e limiti del report',
    priority: 'P0',
    intent: 'trust',
    primaryCta: 'Scopri cosa include il report',
    seoGeoRole: 'Trust, compliance, objection handling',
  },
  {
    path: '/api',
    title: 'API partner e reseller',
    priority: 'P1',
    intent: 'partner',
    primaryCta: 'Richiedi accesso sandbox',
    seoGeoRole: 'Developer and reseller acquisition',
  },
];

export const blockedLaunchClaims = [
  'rischio zero',
  'pagamento garantito',
  'solvibilita garantita',
  'cliente affidabile al 100%',
  'report infallibile',
  'evita ogni insoluto',
];

export const approvedGuaranteeCopy = {
  title: 'Garanzia operativa',
  items: [
    'Prezzo visibile prima dell’acquisto.',
    'Fonti e data della richiesta indicate nel report.',
    'Limiti spiegati prima e dopo l’acquisto.',
    'Supporto in caso di problemi.',
    'Rimborsi gestiti secondo lo stato di consumo del servizio.',
  ],
};

export const privacySafeEvents = [
  'service_viewed',
  'pricing_viewed',
  'checkout_started',
  'legal_confirmed',
  'payment_completed',
  'report_viewed',
  'guide_viewed',
  'cta_clicked',
] as const;
