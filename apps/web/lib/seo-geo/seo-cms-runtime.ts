import { customerEducationPages, educationPageToBodyHtml } from './customer-education-runtime';

export type SeoPageStatus = 'draft' | 'review' | 'published' | 'archived';
export type SeoSearchIntent = 'informational' | 'commercial' | 'transactional' | 'comparison' | 'support';

export type SeoCmsPage = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  status: SeoPageStatus;
  seoTitle: string;
  seoDescription: string;
  canonicalPath: string;
  targetKeyword: string;
  searchIntent: SeoSearchIntent;
  geoAnswerFocus: string;
  bodyHtml: string;
  version: number;
  updatedAt: string;
  publishedAt?: string;
};

export type SeoCmsGuardrail = {
  code: string;
  label: string;
  passed: boolean;
  severity: 'info' | 'warning' | 'blocker';
};

const intentMap: Record<string, SeoSearchIntent> = {
  problem_aware: 'informational',
  solution_aware: 'commercial',
  purchase_aware: 'transactional',
  comparison: 'comparison',
  trust_aware: 'support',
  informational: 'informational',
};

export const seoCmsPages: SeoCmsPage[] = customerEducationPages.map((page, index) => ({
  id: `seo-page-${String(index + 1).padStart(3, '0')}`,
  slug: page.slug,
  title: page.title,
  excerpt: page.excerpt,
  status: page.status,
  seoTitle: page.seoTitle,
  seoDescription: page.seoDescription,
  canonicalPath: page.canonicalPath,
  targetKeyword: page.targetKeyword,
  searchIntent: intentMap[page.intent] ?? 'informational',
  geoAnswerFocus: page.geoAnswerFocus,
  bodyHtml: educationPageToBodyHtml(page),
  version: 2,
  updatedAt: page.updatedAt,
  publishedAt: page.publishedAt,
}));

const blockedClaims = ['rischio zero', 'solvibilità garantita', 'pagamento garantito', 'cliente sicuro al 100%', 'report infallibile'];

export function getSeoCmsPageBySlug(slug: string) {
  return seoCmsPages.find((page) => page.slug === slug && page.status === 'published');
}

export function getSeoCmsPageById(id: string) {
  return seoCmsPages.find((page) => page.id === id);
}

export function evaluateSeoCmsPage(page: Pick<SeoCmsPage, 'title' | 'seoTitle' | 'seoDescription' | 'excerpt' | 'bodyHtml' | 'targetKeyword' | 'geoAnswerFocus'>): SeoCmsGuardrail[] {
  const text = `${page.title} ${page.seoTitle} ${page.seoDescription} ${page.excerpt} ${page.bodyHtml}`.toLowerCase();
  const blocked = blockedClaims.filter((claim) => text.includes(claim));
  return [
    { code: 'blocked_claims', label: blocked.length ? `Claim vietati: ${blocked.join(', ')}` : 'Nessun claim vietato', passed: blocked.length === 0, severity: 'blocker' },
    { code: 'seo_title', label: 'Meta title entro 70 caratteri', passed: page.seoTitle.length > 0 && page.seoTitle.length <= 70, severity: 'warning' },
    { code: 'seo_description', label: 'Meta description entro 180 caratteri', passed: page.seoDescription.length > 0 && page.seoDescription.length <= 180, severity: 'warning' },
    { code: 'keyword', label: 'Keyword target definita', passed: page.targetKeyword.length > 0, severity: 'warning' },
    { code: 'geo_answer', label: 'Risposta breve per AI/GEO definita', passed: page.geoAnswerFocus.length > 0, severity: 'warning' },
    { code: 'limits', label: 'Limiti o garanzia operativa presenti', passed: text.includes('limiti') || text.includes('garanzia operativa'), severity: 'warning' },
  ];
}

export const newSeoPageTemplate: SeoCmsPage = {
  id: 'new',
  slug: 'nuova-guida-seo-geo',
  title: 'Nuova guida SEO/GEO',
  excerpt: 'Spiega in modo semplice valore, limiti e prossima azione sicura per il cliente.',
  status: 'draft',
  seoTitle: 'Nuova guida | ClientiAffidabili.it',
  seoDescription: 'Guida informativa per capire come usare ClientiAffidabili.it in modo consapevole.',
  canonicalPath: '/guide/nuova-guida-seo-geo',
  targetKeyword: 'nuova guida affidabilità',
  searchIntent: 'informational',
  geoAnswerFocus: 'Risposta sintetica pensata per persone e motori generativi.',
  bodyHtml: '<h2>Problema</h2><p>Descrivi il problema reale del cliente.</p><h2>Cosa puoi verificare</h2><p>Spiega quali informazioni aiutano la decisione.</p><h2>Garanzia operativa e limiti</h2><p>Chiarisci cosa il servizio chiarisce e cosa non può promettere.</p>',
  version: 1,
  updatedAt: '2026-05-30T00:00:00.000Z',
};
