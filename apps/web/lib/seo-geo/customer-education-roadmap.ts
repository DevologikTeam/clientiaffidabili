export type SeoGeoGuideStatus = 'planned' | 'analysis' | 'design' | 'development' | 'published';

export type SeoGeoGuide = {
  slug: string;
  title: string;
  intent: 'informational' | 'commercial' | 'comparison' | 'trust' | 'compliance';
  primaryAudience: string;
  targetServiceSlug?: string;
  status: SeoGeoGuideStatus;
  mustInclude: string[];
  blockedClaims: string[];
};

export const seoGeoCustomerEducationGuides: SeoGeoGuide[] = [
  {
    slug: 'verificare-affidabilita-azienda',
    title: "Come verificare l'affidabilita' di un'azienda prima di lavorarci",
    intent: 'commercial',
    primaryAudience: 'PMI, amministrazione, commerciale B2B',
    targetServiceSlug: 'company-reliability-pro',
    status: 'planned',
    mustInclude: ['fonti', 'limiti', 'prezzo prima dell acquisto', 'nessuna garanzia sul pagamento futuro'],
    blockedClaims: ['rischio zero', 'cliente sicuro', 'garantisce pagamento'],
  },
  {
    slug: 'cliente-non-paga-come-prevenire',
    title: 'Cliente che non paga: come ridurre il rischio prima di concedere credito',
    intent: 'informational',
    primaryAudience: 'imprenditori, credit manager, amministrazione',
    targetServiceSlug: 'company-reliability-pro',
    status: 'planned',
    mustInclude: ['prevenzione', 'limiti report', 'azioni prima del contratto'],
    blockedClaims: ['elimina insoluti', 'garanzia pagamento'],
  },
  {
    slug: 'visura-camerale-vs-report-affidabilita',
    title: "Visura camerale o report affidabilita': cosa cambia e quando usarli",
    intent: 'comparison',
    primaryAudience: 'PMI, consulenti, ufficio acquisti',
    targetServiceSlug: 'company-reliability-essential',
    status: 'planned',
    mustInclude: ['tabella confronto', 'documento ufficiale vs supporto decisionale', 'fonti'],
    blockedClaims: ['sostituisce consulenza legale', 'certezza assoluta'],
  },
  {
    slug: 'garanzie-limiti-report-affidabilita',
    title: "Garanzie e limiti di un report di affidabilita' aziendale",
    intent: 'trust',
    primaryAudience: 'buyer prudenti, legali, amministrazione',
    targetServiceSlug: 'company-reliability-pro',
    status: 'planned',
    mustInclude: ['garanzie operative', 'limiti', 'rimborso', 'supporto'],
    blockedClaims: ['rischio zero', 'paghera sicuramente'],
  },
];

export const seoGeoRoadmapInsertion = {
  version: '0.42.1',
  module: 'M14B — Customer Education SEO/GEO Pages',
  recommendedPlacement: 'after M14-S or merged into M14 commercial readiness',
  sprints: [
    'M14B-A SEO/GEO Customer Education Pages Analysis',
    'M14B-P SEO/GEO Customer Education Pages Design',
    'M14B-S SEO/GEO Customer Education Pages Development',
  ],
};
