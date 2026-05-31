export type M20PDesignPriority = 'P0' | 'P1' | 'P2';

export type M20PDesignArea =
  | 'public_copy'
  | 'metadata_noindex'
  | 'mobile_navigation'
  | 'checkout_pricing'
  | 'datatable_accessibility'
  | 'performance_budget'
  | 'privacy_observability'
  | 'build_fix';

export type M20PDesignItem = {
  id: string;
  area: M20PDesignArea;
  priority: M20PDesignPriority;
  sourceFinding: string;
  blueprint: string;
  m20sImplementation: string;
  qaGate: string;
};

export type M20PCopyRule = {
  id: string;
  routeGroup: 'public' | 'checkout' | 'customer' | 'partner' | 'admin';
  forbiddenSignal: string;
  approvedDirection: string;
  priority: M20PDesignPriority;
};

export type M20PMetadataPolicy = {
  id: string;
  routePattern: string;
  visibility: 'indexable' | 'sensitive_noindex' | 'published_only';
  sitemap: 'include' | 'exclude' | 'published_only';
  requiredMetadata: string[];
};

export type M20PQAGate = {
  id: string;
  command: string;
  purpose: string;
  blocksReleaseCandidate: boolean;
};

export const m20pDesignVersion = '0.70.0';

export const m20pDesignItems: M20PDesignItem[] = [
  {
    id: 'copy-public-commercial-scrub',
    area: 'public_copy',
    priority: 'P0',
    sourceFinding: 'M20-A copy_trust P0 findings on public routes',
    blueprint: 'Replace sprint, MVP, demo, provider and blueprint language with customer-facing decision-support copy.',
    m20sImplementation: 'Apply copy matrix to home, servizi, prezzi, checkout, guide, garanzia and api pages.',
    qaGate: 'copy-forbidden-terms-public-static-gate',
  },
  {
    id: 'metadata-public-p0-policy',
    area: 'metadata_noindex',
    priority: 'P0',
    sourceFinding: 'Only six routes expose explicit metadata.',
    blueprint: 'Introduce public metadata helpers for title, description, canonical and OG across public P0 routes.',
    m20sImplementation: 'Add metadata to servizi, prezzi, checkout boundary, contatti, api and legal/trust pages.',
    qaGate: 'metadata-public-p0-static-gate',
  },
  {
    id: 'noindex-sensitive-route-policy',
    area: 'metadata_noindex',
    priority: 'P0',
    sourceFinding: 'Sensitive routes rely mainly on robots.',
    blueprint: 'Add page-level noindex for admin, dashboard, reports, checkout status and invite routes.',
    m20sImplementation: 'Create buildSensitiveMetadata helper and apply to route groups.',
    qaGate: 'sensitive-route-noindex-static-gate',
  },
  {
    id: 'mobile-header-accessible-drawer',
    area: 'mobile_navigation',
    priority: 'P0',
    sourceFinding: 'Navigation links are hidden under 900px without a complete alternative.',
    blueprint: 'Design one accessible menu button with aria-expanded, aria-controls, Escape close and complete link list.',
    m20sImplementation: 'Refactor Header into server/client split only if needed and add keyboard smoke.',
    qaGate: 'mobile-nav-keyboard-smoke',
  },
  {
    id: 'checkout-guided-form-copy',
    area: 'checkout_pricing',
    priority: 'P0',
    sourceFinding: 'Checkout input is generic and technical wording leaks through.',
    blueprint: 'Service-specific field help, legal confirmations, error summary and next-action states.',
    m20sImplementation: 'Add fieldsets, aria-describedby, customer-readable errors and noindex metadata.',
    qaGate: 'checkout-a11y-copy-smoke',
  },
  {
    id: 'pricing-table-accessible-pattern',
    area: 'datatable_accessibility',
    priority: 'P0',
    sourceFinding: 'Pricing/list patterns need stronger table semantics and responsive behavior.',
    blueprint: 'Use real table semantics or card alternatives with equivalent labels and visible comparison context.',
    m20sImplementation: 'Refactor pricing/list sections and verify with static and axe smoke.',
    qaGate: 'pricing-table-semantics-gate',
  },
  {
    id: 'datatable-legacy-bridge-build-fix-32',
    area: 'build_fix',
    priority: 'P0',
    sourceFinding: 'Docker build failed on /admin/billing because string columns were not assignable to DataTableColumn<Row>.',
    blueprint: 'Support both typed DataTableColumn<Row>[] and legacy string[] columns while migration continues.',
    m20sImplementation: 'Keep compatibility bridge, then migrate legacy tables progressively after build is green.',
    qaGate: 'qa-m20p-docker-build-fix-32',
  },
  {
    id: 'autoprefixer-flex-end-fix-32',
    area: 'build_fix',
    priority: 'P0',
    sourceFinding: 'Autoprefixer warning on align-items:end in globals.css.',
    blueprint: 'Use flex-end to avoid mixed support warning.',
    m20sImplementation: 'Keep CSS token and scan for future end alignment values in flex contexts.',
    qaGate: 'qa-m20p-docker-build-fix-32',
  },
  {
    id: 'performance-budget-public-p0',
    area: 'performance_budget',
    priority: 'P1',
    sourceFinding: 'No Lighthouse budget tracked in repo.',
    blueprint: 'Create LCP, CLS, INP and JS budget for public P0 route set.',
    m20sImplementation: 'Add measurement script or documented artifact path for local/staging runs.',
    qaGate: 'performance-budget-artifact-gate',
  },
  {
    id: 'privacy-safe-observability-denylist',
    area: 'privacy_observability',
    priority: 'P1',
    sourceFinding: 'Tracking route policy needs stronger verification.',
    blueprint: 'Deny external tracking on admin, dashboard, reports, checkout status and invite routes.',
    m20sImplementation: 'Centralize route denylist and add static gate against PII event payload keys.',
    qaGate: 'tracking-denylist-static-gate',
  },
];

export const m20pCopyRules: M20PCopyRule[] = [
  {
    id: 'copy-no-mvp-public',
    routeGroup: 'public',
    forbiddenSignal: 'MVP',
    approvedDirection: 'Use servizio in lancio, piattaforma or percorso operativo only where useful.',
    priority: 'P0',
  },
  {
    id: 'copy-no-provider-checkout',
    routeGroup: 'checkout',
    forbiddenSignal: 'provider/webhook/payload',
    approvedDirection: 'Use verifica, pagamento, generazione report and stato ordine.',
    priority: 'P0',
  },
  {
    id: 'copy-no-demo-dashboard-public',
    routeGroup: 'public',
    forbiddenSignal: 'dashboard demo',
    approvedDirection: 'Use area cliente or accesso riservato only when the destination is real.',
    priority: 'P0',
  },
  {
    id: 'copy-no-absolute-claims',
    routeGroup: 'public',
    forbiddenSignal: 'rischio zero / pagamento garantito / risultato certo',
    approvedDirection: 'Use prudent decision-support language with visible limits.',
    priority: 'P0',
  },
];

export const m20pMetadataPolicies: M20PMetadataPolicy[] = [
  {
    id: 'metadata-home-indexable',
    routePattern: '/',
    visibility: 'indexable',
    sitemap: 'include',
    requiredMetadata: ['title', 'description', 'canonical', 'openGraph', 'robots:index'],
  },
  {
    id: 'metadata-services-indexable',
    routePattern: '/servizi/**',
    visibility: 'indexable',
    sitemap: 'include',
    requiredMetadata: ['title', 'description', 'canonical', 'openGraph', 'service schema'],
  },
  {
    id: 'metadata-guides-published-only',
    routePattern: '/guide/**',
    visibility: 'published_only',
    sitemap: 'published_only',
    requiredMetadata: ['title', 'description', 'canonical', 'article schema', 'reviewed date'],
  },
  {
    id: 'metadata-checkout-noindex',
    routePattern: '/checkout/**',
    visibility: 'sensitive_noindex',
    sitemap: 'exclude',
    requiredMetadata: ['robots:noindex', 'robots:nofollow'],
  },
  {
    id: 'metadata-dashboard-noindex',
    routePattern: '/dashboard/**',
    visibility: 'sensitive_noindex',
    sitemap: 'exclude',
    requiredMetadata: ['robots:noindex', 'no external tracking'],
  },
  {
    id: 'metadata-admin-noindex',
    routePattern: '/admin/**',
    visibility: 'sensitive_noindex',
    sitemap: 'exclude',
    requiredMetadata: ['robots:noindex', 'internal-only copy'],
  },
  {
    id: 'metadata-reports-noindex',
    routePattern: '/reports/**',
    visibility: 'sensitive_noindex',
    sitemap: 'exclude',
    requiredMetadata: ['robots:noindex', 'no external tracking'],
  },
];

export const m20pQAGates: M20PQAGate[] = [
  {
    id: 'qa-ux-seo-performance-accessibility-design',
    command: 'node scripts/qa-ux-seo-performance-accessibility-design.js',
    purpose: 'Verify M20-P blueprint, registry, version and forbidden claim guardrails.',
    blocksReleaseCandidate: true,
  },
  {
    id: 'qa-m20p-docker-build-fix-32',
    command: 'node scripts/qa-m20p-docker-build-fix-32.js',
    purpose: 'Verify DataTable compatibility bridge and Autoprefixer flex-end fix from Docker build log #32.',
    blocksReleaseCandidate: true,
  },
  {
    id: 'qa-source-syntax-smoke',
    command: 'node scripts/qa-source-syntax-smoke.js',
    purpose: 'Smoke parse source files for broken quotes, brackets and template literals.',
    blocksReleaseCandidate: true,
  },
  {
    id: 'security-secret-scan',
    command: 'node scripts/security-secret-scan.js',
    purpose: 'Prevent accidental live keys or private keys in repository.',
    blocksReleaseCandidate: true,
  },
];
