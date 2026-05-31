export type M20APriority = 'P0' | 'P1' | 'P2';

export type M20APillar =
  | 'ux'
  | 'copy_trust'
  | 'seo_geo'
  | 'performance'
  | 'accessibility'
  | 'privacy_indexing';

export type M20ASurfaceFinding = {
  id: string;
  pathPattern: string;
  audience: 'public' | 'customer' | 'partner' | 'admin' | 'system';
  priority: M20APriority;
  pillars: M20APillar[];
  currentStrengths: string[];
  gaps: string[];
  m20pDesignAction: string;
  m20sVerification: string;
};

export type M20ACopyFinding = {
  id: string;
  location: string;
  currentCopySignal: string;
  problem: string;
  recommendedDirection: string;
  priority: M20APriority;
};

export type M20AQAGate = {
  id: string;
  commandCandidate: string;
  purpose: string;
  evidencePath: string;
  priority: M20APriority;
};

export const m20aStaticRouteAudit = {
  appPageRoutes: 72,
  explicitMetadataRoutes: 6,
  publicP0Routes: ['/', '/servizi', '/servizi/[slug]', '/prezzi', '/checkout', '/guide', '/guide/[slug]', '/garanzia-operativa', '/api'],
  sensitiveRoutePrefixes: ['/admin', '/dashboard', '/reports', '/checkout/success', '/checkout/cancel', '/invito'],
  hasRobotsRoute: true,
  hasSitemapRoute: true,
  trackingDefaultExternalEnabled: false,
} as const;

export const m20aSurfaceFindings: M20ASurfaceFinding[] = [
  {
    id: 'public-home-launch-funnel',
    pathPattern: '/',
    audience: 'public',
    priority: 'P0',
    pillars: ['ux', 'copy_trust', 'seo_geo', 'performance', 'accessibility'],
    currentStrengths: [
      'Home has explicit metadata and launch website JSON-LD.',
      'Hero explains decision-support instead of selling a raw provider call.',
      'Trust, guarantee and guide sections are already connected.',
    ],
    gaps: [
      'Public home still links to internal CMS editorial area.',
      'Mobile navigation hides links without an accessible menu fallback.',
      'Need skip link and consistent focus handling for all interactive controls.',
    ],
    m20pDesignAction: 'Design public landing polish with one primary CTA, no internal admin link and accessible mobile header.',
    m20sVerification: 'Static QA for forbidden public admin links, Playwright mobile nav smoke and axe smoke on homepage.',
  },
  {
    id: 'service-catalog-route',
    pathPattern: '/servizi and /servizi/[slug]',
    audience: 'public',
    priority: 'P0',
    pillars: ['ux', 'copy_trust', 'seo_geo', 'accessibility'],
    currentStrengths: [
      'Catalog cards are generated from published service registry.',
      'Cards expose price, delivery and report outputs.',
      'Assisted services have a different CTA.',
    ],
    gaps: [
      'Catalog page lacks explicit metadata and canonical policy.',
      'Some labels still sound like internal scenario or implementation language.',
      'Cards need stronger accessible descriptions for CTA context.',
    ],
    m20pDesignAction: 'Create catalog metadata, copy and card accessibility blueprint.',
    m20sVerification: 'Metadata assertion for catalog routes and keyboard smoke on card CTAs.',
  },
  {
    id: 'pricing-route',
    pathPattern: '/prezzi',
    audience: 'public',
    priority: 'P0',
    pillars: ['ux', 'copy_trust', 'seo_geo', 'accessibility'],
    currentStrengths: [
      'Pricing derives totals from catalog snapshot logic.',
      'Bundles and single service list are visible before checkout.',
    ],
    gaps: [
      'Hero exposes internal product-phase language.',
      'Pricing table uses div role table and needs stronger semantics.',
      'Page lacks explicit metadata, canonical, OG and breadcrumb policy.',
    ],
    m20pDesignAction: 'Redesign pricing copy and accessible comparison pattern.',
    m20sVerification: 'Static copy scrub, metadata QA and axe/table semantics smoke.',
  },
  {
    id: 'checkout-route',
    pathPattern: '/checkout',
    audience: 'public',
    priority: 'P0',
    pillars: ['ux', 'copy_trust', 'accessibility', 'privacy_indexing'],
    currentStrengths: [
      'Checkout shows order summary, legal confirmations and payment state panel.',
      'Copy states that card data is not stored.',
      'Assisted services are visually separated.',
    ],
    gaps: [
      'One input collects different subject identifiers and may confuse users.',
      'Technical wording about providers/webhooks should become customer language.',
      'Needs noindex strategy, fieldsets, error summary and service-specific help.',
    ],
    m20pDesignAction: 'Design guided checkout form states with legal confirmations and noindex metadata.',
    m20sVerification: 'Playwright checkout smoke, noindex assertion, keyboard form traversal and error summary smoke.',
  },
  {
    id: 'guide-education-routes',
    pathPattern: '/guide and /guide/[slug]',
    audience: 'public',
    priority: 'P1',
    pillars: ['ux', 'seo_geo', 'copy_trust', 'accessibility'],
    currentStrengths: [
      'Guide routes already have metadata and JSON-LD.',
      'Only published guide registry entries are rendered and included in sitemap.',
    ],
    gaps: [
      'Need consistent last reviewed/date modified policy.',
      'Need breadcrumb visual pattern and accessible FAQ behavior verification.',
      'Need internal link rules to services without aggressive CTA overload.',
    ],
    m20pDesignAction: 'Design guide trust metadata, breadcrumb and review date policy.',
    m20sVerification: 'Sitemap published-only QA, schema visibility QA and guide axe smoke.',
  },
  {
    id: 'guarantee-and-legal-trust',
    pathPattern: '/garanzia-operativa and /legal/*',
    audience: 'public',
    priority: 'P1',
    pillars: ['copy_trust', 'seo_geo', 'privacy_indexing'],
    currentStrengths: [
      'Guarantee page already has explicit metadata and JSON-LD.',
      'Legal pages exist for privacy, terms, refunds, report limits and acceptable use.',
    ],
    gaps: [
      'Legal pages lack route-specific metadata.',
      'Guarantee/limits summary should be linked from checkout and service detail.',
      'Trust copy should stay visible without overpromising.',
    ],
    m20pDesignAction: 'Create legal/trust metadata and cross-link blueprint.',
    m20sVerification: 'Metadata QA for legal/trust routes and link integrity smoke.',
  },
  {
    id: 'customer-dashboard-routes',
    pathPattern: '/dashboard/*',
    audience: 'customer',
    priority: 'P0',
    pillars: ['ux', 'accessibility', 'privacy_indexing'],
    currentStrengths: [
      'Customer dashboard has status hero, next actions, reports, invoices and support routes.',
      'Team/account/fiscal profile routes already exist.',
    ],
    gaps: [
      'Public navigation uses demo wording that can confuse a real customer area.',
      'Dashboard routes need page-level noindex metadata.',
      'Empty/error states should be unified with state, reason, impact and next action.',
    ],
    m20pDesignAction: 'Design dashboard route boundary and state language blueprint.',
    m20sVerification: 'Noindex assertion, dashboard empty-state static QA and keyboard smoke.',
  },
  {
    id: 'report-detail-route',
    pathPattern: '/reports/[id]',
    audience: 'customer',
    priority: 'P0',
    pillars: ['privacy_indexing', 'accessibility', 'ux'],
    currentStrengths: [
      'Report detail is separated from public pages and dashboard list.',
      'Report components include evidence, actions and limit blocks.',
    ],
    gaps: [
      'Needs explicit noindex metadata and no external tracking guarantee.',
      'Needs keyboard/screen reader smoke for report sections and download actions.',
      'Needs sensitive data display review before RC.',
    ],
    m20pDesignAction: 'Design sensitive report route policy and accessible report actions.',
    m20sVerification: 'Noindex/static tracking denylist QA and report accessibility smoke.',
  },
  {
    id: 'partner-api-journey',
    pathPattern: '/api and /dashboard/partner/*',
    audience: 'partner',
    priority: 'P1',
    pillars: ['ux', 'seo_geo', 'privacy_indexing', 'accessibility'],
    currentStrengths: [
      'Partner dashboard separates API keys, docs, go-live, usage and webhooks.',
      'Sandbox-first direction is consistent with launch guardrails.',
    ],
    gaps: [
      'Public API page needs clearer metadata and conversion path.',
      'Authenticated partner pages need noindex metadata and no tracking.',
      'Developer docs should not leak sandbox/live keys or raw payloads.',
    ],
    m20pDesignAction: 'Design public API vs partner console IA and metadata policy.',
    m20sVerification: 'Noindex QA for partner console and static secret/copy scan.',
  },
  {
    id: 'admin-launch-readiness',
    pathPattern: '/admin/launch-readiness/*',
    audience: 'admin',
    priority: 'P1',
    pillars: ['ux', 'accessibility', 'privacy_indexing'],
    currentStrengths: [
      'Launch readiness and sandbox certification expose evidence, blockers and waiver flow.',
      'M19-S created a mock-first runtime and admin UI.',
    ],
    gaps: [
      'Admin routes need page-level noindex metadata.',
      'Tables/evidence timelines need keyboard and screen reader smoke.',
      'Admin IA should prioritize RC blockers over documentation density.',
    ],
    m20pDesignAction: 'Design admin readiness hierarchy and noindex route group policy.',
    m20sVerification: 'Admin noindex assertion and sandbox certification keyboard smoke.',
  },
  {
    id: 'global-layout-and-tracking',
    pathPattern: 'apps/web/app/layout.tsx',
    audience: 'system',
    priority: 'P1',
    pillars: ['performance', 'privacy_indexing', 'accessibility'],
    currentStrengths: [
      'Root layout has lang=it and metadataBase.',
      'External tracking defaults to disabled and route denylist exists.',
    ],
    gaps: [
      'No skip link in root layout.',
      'ExternalTrackingProvider is mounted globally and should be measured/guarded by route.',
      'Sensitive route metadata should not rely on robots alone.',
    ],
    m20pDesignAction: 'Design root layout, skip link and tracking boundary policy.',
    m20sVerification: 'Axe smoke for skip link and static QA for tracking denylist/noindex.',
  },
  {
    id: 'design-system-and-css',
    pathPattern: 'apps/web/components/ds and apps/web/app/globals.css',
    audience: 'system',
    priority: 'P1',
    pillars: ['accessibility', 'performance', 'ux'],
    currentStrengths: [
      'Design system components define focus handling on ca-button and form fields.',
      'Semantic colors and card/table/status patterns are available.',
    ],
    gaps: [
      'Legacy .btn focus state is weaker than ca-button.',
      'CSS contains legacy and current design system rules together.',
      'Motion should honor prefers-reduced-motion.',
    ],
    m20pDesignAction: 'Design CSS/focus/reduced-motion cleanup plan without breaking existing pages.',
    m20sVerification: 'Static CSS QA for focus-visible and reduced-motion plus visual smoke.',
  },
];

export const m20aCopyFindings: M20ACopyFinding[] = [
  {
    id: 'header-dashboard-demo-label',
    location: 'Header public navigation',
    currentCopySignal: 'Dashboard demo',
    problem: 'Confuses public demo, real customer access and authenticated dashboard.',
    recommendedDirection: 'Use Accedi or Area cliente; keep demo access isolated and explicit.',
    priority: 'P0',
  },
  {
    id: 'pricing-internal-phase-label',
    location: '/prezzi hero',
    currentCopySignal: 'Prezzi MVP',
    problem: 'Makes the public product look unfinished.',
    recommendedDirection: 'Use customer-facing pricing title focused on clarity and total before purchase.',
    priority: 'P0',
  },
  {
    id: 'pricing-margin-language',
    location: '/prezzi hero',
    currentCopySignal: 'margine protetto',
    problem: 'Exposes internal commercial governance instead of user value.',
    recommendedDirection: 'Explain what is included, VAT visibility and when the verification starts.',
    priority: 'P0',
  },
  {
    id: 'home-admin-cms-link',
    location: 'Home guide section',
    currentCopySignal: 'CMS editoriale',
    problem: 'Public home should not link to internal admin tools.',
    recommendedDirection: 'Remove from public page or show only in authenticated/admin context.',
    priority: 'P0',
  },
  {
    id: 'checkout-provider-wording',
    location: '/checkout alert',
    currentCopySignal: 'provider dati / webhook pagamento',
    problem: 'Technical words increase friction during purchase.',
    recommendedDirection: 'Use customer wording: the verification starts only after payment confirmation.',
    priority: 'P0',
  },
];

export const m20aPerformanceBudgetTargets = [
  { route: '/', lcp: '<=2.5s', inp: '<=200ms', cls: '<=0.1', priority: 'P0' as const },
  { route: '/servizi', lcp: '<=2.5s', inp: '<=200ms', cls: '<=0.1', priority: 'P0' as const },
  { route: '/prezzi', lcp: '<=2.5s', inp: '<=200ms', cls: '<=0.1', priority: 'P0' as const },
  { route: '/checkout', lcp: '<=2.5s', inp: '<=200ms', cls: '<=0.1', priority: 'P0' as const },
];

export const m20aQAGates: M20AQAGate[] = [
  {
    id: 'metadata-noindex-static-gate',
    commandCandidate: 'node scripts/qa-ux-polish-metadata-noindex.js',
    purpose: 'Verify public metadata and sensitive noindex policy.',
    evidencePath: 'artifacts/ux-polish/metadata-noindex-report.json',
    priority: 'P0',
  },
  {
    id: 'copy-scrub-static-gate',
    commandCandidate: 'node scripts/qa-ux-polish-copy-scrub.js',
    purpose: 'Block internal product/development wording from public pages.',
    evidencePath: 'artifacts/ux-polish/copy-scrub-report.json',
    priority: 'P0',
  },
  {
    id: 'accessibility-route-smoke',
    commandCandidate: 'pnpm e2e:a11y:smoke',
    purpose: 'Run axe/keyboard smoke on public P0 routes.',
    evidencePath: 'artifacts/ux-polish/accessibility-smoke.json',
    priority: 'P0',
  },
  {
    id: 'performance-budget-smoke',
    commandCandidate: 'pnpm qa:ux-polish-performance-budget',
    purpose: 'Collect Lighthouse or equivalent budget evidence for public P0 routes.',
    evidencePath: 'artifacts/ux-polish/performance-budget.json',
    priority: 'P1',
  },
];

export function getM20AP0Findings() {
  return m20aSurfaceFindings.filter((finding) => finding.priority === 'P0');
}

export function getM20AFindingsByPillar(pillar: M20APillar) {
  return m20aSurfaceFindings.filter((finding) => finding.pillars.includes(pillar));
}
