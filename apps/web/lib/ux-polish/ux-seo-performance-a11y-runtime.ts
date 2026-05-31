export type M20SRuntimeArea =
  | 'metadata'
  | 'noindex'
  | 'copy'
  | 'navigation'
  | 'checkout'
  | 'pricing_table'
  | 'accessibility'
  | 'performance'
  | 'privacy_observability';

export type M20SRuntimeStatus = 'implemented' | 'static_gate' | 'requires_environment';

export type M20SRuntimeItem = {
  id: string;
  area: M20SRuntimeArea;
  status: M20SRuntimeStatus;
  implementedIn: string[];
  qa: string;
};

export const m20sRuntimeVersion = '0.71.0';

export const publicSeoRoutes = ['/', '/servizi', '/prezzi', '/guide', '/garanzia-operativa', '/contatti', '/api'] as const;

export const sensitiveNoindexRoutePrefixes = ['/admin', '/dashboard', '/reports', '/checkout', '/invito'] as const;

export const publicCopyForbiddenSignals = [
  'MVP',
  'dashboard demo',
  'CMS editoriale',
  'margine protetto',
  'provider mapping',
  'raw payload',
  'webhook pagamento',
  'endpoint provider',
  'rischio zero',
  'pagamento garantito',
  'solvibilita garantita',
  'risultato certo',
  'infallibile',
] as const;

export const performanceBudget = {
  measuredRoutes: ['/', '/servizi', '/prezzi', '/checkout', '/guide', '/garanzia-operativa', '/api'],
  lcpMobileMs: 2800,
  lcpDesktopMs: 2000,
  cls: 0.1,
  inpMs: 200,
  cssKnownWarnings: 0,
};

export const m20sRuntimeItems: M20SRuntimeItem[] = [
  {
    id: 'public-metadata-helper-runtime',
    area: 'metadata',
    status: 'implemented',
    implementedIn: ['apps/web/lib/seo/metadata.ts', 'apps/web/app/page.tsx', 'apps/web/app/servizi/page.tsx', 'apps/web/app/prezzi/page.tsx', 'apps/web/app/api/page.tsx'],
    qa: 'qa-ux-seo-performance-accessibility-development',
  },
  {
    id: 'sensitive-noindex-layouts-runtime',
    area: 'noindex',
    status: 'implemented',
    implementedIn: ['apps/web/app/admin/layout.tsx', 'apps/web/app/dashboard/layout.tsx', 'apps/web/app/reports/layout.tsx', 'apps/web/app/checkout/layout.tsx', 'apps/web/app/invito/layout.tsx'],
    qa: 'sensitive-route-noindex-static-gate',
  },
  {
    id: 'public-copy-scrub-runtime',
    area: 'copy',
    status: 'implemented',
    implementedIn: ['apps/web/app/page.tsx', 'apps/web/app/prezzi/page.tsx', 'apps/web/app/servizi/page.tsx', 'apps/web/app/api/page.tsx', 'apps/web/components/catalog/ServiceDetailPanel.tsx'],
    qa: 'copy-forbidden-terms-public-static-gate',
  },
  {
    id: 'accessible-mobile-header-runtime',
    area: 'navigation',
    status: 'implemented',
    implementedIn: ['apps/web/components/Header.tsx', 'apps/web/app/globals.css'],
    qa: 'mobile-nav-keyboard-static-gate',
  },
  {
    id: 'checkout-guided-form-runtime',
    area: 'checkout',
    status: 'implemented',
    implementedIn: ['apps/web/app/checkout/page.tsx', 'apps/web/components/billing/BillingProfileForm.tsx', 'apps/web/components/billing/CheckoutLegalConfirmation.tsx'],
    qa: 'checkout-a11y-copy-static-gate',
  },
  {
    id: 'pricing-table-semantics-runtime',
    area: 'pricing_table',
    status: 'implemented',
    implementedIn: ['apps/web/components/catalog/PricingComparison.tsx', 'apps/web/app/globals.css'],
    qa: 'pricing-table-semantics-gate',
  },
  {
    id: 'skip-link-focus-runtime',
    area: 'accessibility',
    status: 'implemented',
    implementedIn: ['apps/web/app/layout.tsx', 'apps/web/app/globals.css'],
    qa: 'skip-link-focus-static-gate',
  },
  {
    id: 'performance-budget-artifact-runtime',
    area: 'performance',
    status: 'static_gate',
    implementedIn: ['artifacts/ux-seo-performance-a11y/m20s-performance-budget.json'],
    qa: 'performance-budget-artifact-gate',
  },
  {
    id: 'tracking-denylist-runtime',
    area: 'privacy_observability',
    status: 'implemented',
    implementedIn: ['apps/web/lib/analytics/tag-manager-clarity-runtime.ts'],
    qa: 'tracking-denylist-static-gate',
  },
];
