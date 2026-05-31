import { seoCmsPages } from '@/lib/seo-geo/seo-cms-runtime';

export const launchSiteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://clientiaffidabili.it';

export type LaunchTrackingEvent =
  | 'launch_home_viewed'
  | 'launch_primary_cta_clicked'
  | 'launch_service_cta_clicked'
  | 'launch_guide_clicked'
  | 'launch_pricing_clicked'
  | 'launch_api_partner_clicked'
  | 'launch_checkout_started';

export type LaunchCommercialPage = {
  path: string;
  label: string;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly';
  description: string;
};

export type LaunchUseCase = {
  id: string;
  eyebrow: string;
  title: string;
  problem: string;
  value: string;
  ctaHref: string;
  ctaLabel: string;
};

export type LaunchGuaranteePillar = {
  title: string;
  description: string;
};

export const launchCommercialPages: LaunchCommercialPage[] = [
  {
    path: '/',
    label: 'Home',
    priority: 1,
    changeFrequency: 'weekly',
    description: 'Pagina pubblica con proposta di valore, casi d’uso, garanzia operativa e accesso a servizi/prezzi.',
  },
  {
    path: '/servizi',
    label: 'Servizi',
    priority: 0.9,
    changeFrequency: 'weekly',
    description: 'Catalogo verifiche con schede servizio, prezzo chiaro e percorso verso l’acquisto.',
  },
  {
    path: '/prezzi',
    label: 'Prezzi',
    priority: 0.85,
    changeFrequency: 'weekly',
    description: 'Prezzi, servizi, limiti principali, IVA e totale indicativo prima dell’acquisto.',
  },
  {
    path: '/api',
    label: 'API partner',
    priority: 0.65,
    changeFrequency: 'monthly',
    description: 'Pagina per partner e integrazioni API con accesso controllato.',
  },
  {
    path: '/guide',
    label: 'Guide',
    priority: 0.8,
    changeFrequency: 'weekly',
    description: 'Indice delle guide pratiche per usare correttamente verifiche e report.',
  },
  {
    path: '/garanzia-operativa',
    label: 'Garanzia operativa',
    priority: 0.75,
    changeFrequency: 'monthly',
    description: 'Pagina di fiducia che spiega garanzie operative, limiti e rimborso.',
  },
];

export const launchUseCases: LaunchUseCase[] = [
  {
    id: 'cliente-prima-del-fido',
    eyebrow: 'Prima del fido',
    title: 'Devi concedere credito o spedire prima del pagamento?',
    problem: 'Il rischio nasce quando vendi, spedisci o concedi credito senza sapere se l’azienda è attiva, coerente e priva di segnali evidenti di attenzione.',
    value: 'Il report riunisce dati aziendali, segnali disponibili, fonti e limiti in una sintesi pensata per decidere cosa fare prima di impegnarti.',
    ctaHref: '/servizi/check-affidabilita-pro',
    ctaLabel: 'Verifica un cliente',
  },
  {
    id: 'fornitore-prima-acquisto',
    eyebrow: 'Nuovo fornitore',
    title: 'Stai per pagare un fornitore che non conosci?',
    problem: 'Un fornitore non verificato può creare ritardi, errori amministrativi o esposizioni non previste su pagamenti e consegne.',
    value: 'La verifica ti aiuta a confermare identità aziendale, soggetti rilevanti e segnali disponibili prima di procedere.',
    ctaHref: '/servizi/verifica-azienda-essenziale',
    ctaLabel: 'Controlla un fornitore',
  },
  {
    id: 'dato-operativo',
    eyebrow: 'Dato operativo',
    title: 'Vuoi ridurre errori su IBAN, email, telefono o dati fiscali?',
    problem: 'Un IBAN, un’email o un numero non verificato può creare errori di pagamento, bounce, ritardi e attività amministrativa inutile.',
    value: 'I controlli rapidi riducono errori prima di salvare o usare dati in amministrazione, CRM e onboarding.',
    ctaHref: '/servizi',
    ctaLabel: 'Vedi controlli rapidi',
  },
];

export const launchGuaranteePillars: LaunchGuaranteePillar[] = [
  {
    title: 'Prezzo chiaro prima del pagamento',
    description: 'Prima del pagamento vedi servizio scelto, prezzo, IVA quando applicabile, dati richiesti e condizioni principali.',
  },
  {
    title: 'Fonti, data e limiti nel report',
    description: 'Il report indica cosa è stato verificato, quando, con quali informazioni disponibili e quali limiti restano.',
  },
  {
    title: 'Supporto e rimborso governati',
    description: 'Se una verifica non può essere completata, lo stato del servizio guida assistenza, retry o rimborso secondo policy.',
  },
];

export const launchFaqs = [
  {
    question: 'ClientiAffidabili.it garantisce che un cliente paghera?',
    answer: 'No. Il servizio aiuta a leggere dati e segnali disponibili, ma non può garantire pagamenti futuri o assenza totale di rischio.',
  },
  {
    question: 'Che cosa significa garanzia operativa?',
    answer: 'Significa sapere prima cosa acquisti, quanto paghi, quali fonti vengono usate, quali limiti restano e come ricevere supporto.',
  },
  {
    question: 'Posso usare il servizio per integrare controlli nel mio gestionale?',
    answer: 'Sì. Le integrazioni sono disponibili per partner e gestionali, con accesso controllato e verifiche preliminari prima dell’uso live.',
  },
];

export const publicPublishedGuides = seoCmsPages
  .filter((page) => page.status === 'published')
  .map((page) => ({
    slug: page.slug,
    title: page.title,
    excerpt: page.excerpt,
    href: page.canonicalPath,
    keyword: page.targetKeyword,
    intent: page.searchIntent,
    updatedAt: page.updatedAt,
  }));

export function absoluteUrl(path: string) {
  return `${launchSiteBaseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildLaunchSitemapEntries() {
  const baseEntries = launchCommercialPages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: new Date('2026-05-30'),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
  const guideEntries = publicPublishedGuides.map((guide) => ({
    url: absoluteUrl(guide.href),
    lastModified: new Date(guide.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.72,
  }));
  return [...baseEntries, ...guideEntries];
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ClientiAffidabili.it',
    url: launchSiteBaseUrl,
    logo: absoluteUrl('/logo-main.png'),
    sameAs: [],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ClientiAffidabili.it',
    url: launchSiteBaseUrl,
    inLanguage: 'it-IT',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${launchSiteBaseUrl}/guide?query={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: launchFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function trackLaunchEvent(event: LaunchTrackingEvent, context: Record<string, string | number | boolean> = {}) {
  // Privacy-safe event: no PII, no company searched, no order/report IDs.
  return {
    event,
    context,
    pii: false,
    persisted: false,
    timestamp: new Date().toISOString(),
  };
}
