#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'docs/sprints/M20-A_UX_SEO_PERFORMANCE_ACCESSIBILITY_POLISH_ANALYSIS.md',
  'docs/ux-seo-performance-a11y/01_SURFACE_INVENTORY_AND_JOURNEY_ANALYSIS.md',
  'docs/ux-seo-performance-a11y/02_UX_COPY_AND_TRUST_GAP_MATRIX.md',
  'docs/ux-seo-performance-a11y/03_SEO_GEO_TECHNICAL_AUDIT.md',
  'docs/ux-seo-performance-a11y/04_PERFORMANCE_BUDGET_AND_NEXTJS_AUDIT.md',
  'docs/ux-seo-performance-a11y/05_ACCESSIBILITY_WCAG_AA_AUDIT.md',
  'docs/ux-seo-performance-a11y/06_M20P_POLISH_DESIGN_HANDOFF.md',
  'apps/web/lib/ux-polish/ux-seo-performance-a11y-analysis.ts',
  'docs/releases/0.69.0.md',
];

const requiredContent = [
  ['package.json', '0.69.0'],
  ['package.json', 'qa:ux-seo-performance-accessibility-analysis'],
  ['package.json', 'release:ux-seo-performance-accessibility-analysis-check'],
  ['PROJECT_MANIFEST.md', 'Versione corrente: 0.69.0'],
  ['PROJECT_MANIFEST.md', 'M20-A UX, SEO, Performance & Accessibility Polish Analysis'],
  ['docs/ROADMAP_STATUS.md', 'v0.69.0 — M20-A UX, SEO, Performance & Accessibility Polish Analysis'],
  ['docs/sprints/M20-A_UX_SEO_PERFORMANCE_ACCESSIBILITY_POLISH_ANALYSIS.md', '72 page route'],
  ['docs/sprints/M20-A_UX_SEO_PERFORMANCE_ACCESSIBILITY_POLISH_ANALYSIS.md', 'Solo **6 route**'],
  ['docs/sprints/M20-A_UX_SEO_PERFORMANCE_ACCESSIBILITY_POLISH_ANALYSIS.md', 'Gap P0'],
  ['docs/ux-seo-performance-a11y/03_SEO_GEO_TECHNICAL_AUDIT.md', 'buildSensitiveMetadata'],
  ['docs/ux-seo-performance-a11y/04_PERFORMANCE_BUDGET_AND_NEXTJS_AUDIT.md', 'LCP mobile'],
  ['docs/ux-seo-performance-a11y/05_ACCESSIBILITY_WCAG_AA_AUDIT.md', 'Skip link'],
  ['docs/ux-seo-performance-a11y/06_M20P_POLISH_DESIGN_HANDOFF.md', 'Handoff M20-S'],
  ['apps/web/lib/ux-polish/ux-seo-performance-a11y-analysis.ts', 'm20aStaticRouteAudit'],
  ['apps/web/lib/ux-polish/ux-seo-performance-a11y-analysis.ts', 'metadata-noindex-static-gate'],
];

const failures = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(process.cwd(), file))) failures.push(`Missing required file: ${file}`);
}

for (const [file, needle] of requiredContent) {
  const full = path.join(process.cwd(), file);
  if (!fs.existsSync(full) || !fs.readFileSync(full, 'utf8').includes(needle)) failures.push(`Missing content '${needle}' in ${file}`);
}

const appPageRoutes = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === 'page.tsx') appPageRoutes.push(full);
  }
}
walk(path.join(process.cwd(), 'apps/web/app'));
if (appPageRoutes.length < 70) failures.push(`Expected at least 70 app page routes, found ${appPageRoutes.length}.`);

const routesWithMetadata = appPageRoutes.filter((file) => {
  const content = fs.readFileSync(file, 'utf8');
  return content.includes('export const metadata') || content.includes('generateMetadata');
});
if (routesWithMetadata.length < 6) failures.push(`Expected at least 6 routes with explicit metadata, found ${routesWithMetadata.length}.`);

const analysisTs = fs.existsSync('apps/web/lib/ux-polish/ux-seo-performance-a11y-analysis.ts')
  ? fs.readFileSync('apps/web/lib/ux-polish/ux-seo-performance-a11y-analysis.ts', 'utf8')
  : '';
const findingIds = Array.from(analysisTs.matchAll(/id: '([^']+)'/g)).map((match) => match[1]);
if (new Set(findingIds).size < 15) failures.push('M20-A analysis registry must include at least 15 unique IDs across findings/copy/gates.');
for (const requiredId of [
  'public-home-launch-funnel',
  'service-catalog-route',
  'pricing-route',
  'checkout-route',
  'customer-dashboard-routes',
  'report-detail-route',
  'global-layout-and-tracking',
]) {
  if (!findingIds.includes(requiredId)) failures.push(`Missing M20-A finding id: ${requiredId}`);
}

for (const pillar of ['seo_geo', 'performance', 'accessibility', 'privacy_indexing', 'copy_trust']) {
  if (!analysisTs.includes(pillar)) failures.push(`Missing pillar in analysis registry: ${pillar}`);
}

const combinedNewDocs = requiredFiles
  .filter((file) => fs.existsSync(file))
  .map((file) => fs.readFileSync(file, 'utf8'))
  .join('\n')
  .toLowerCase();
const forbiddenClaims = ['rischio zero', 'solvibilita garantita', 'solvibilità garantita', 'pagamento garantito', 'sicuro al 100%', 'infallibile'];
for (const claim of forbiddenClaims) {
  if (combinedNewDocs.includes(claim)) failures.push(`Forbidden absolute claim found in M20-A deliverables: ${claim}`);
}

const requiredP0Words = ['noindex', 'metadata', 'checkout', 'mobile', 'wcag', 'lighthouse', 'axe', 'sitemap', 'robots'];
for (const word of requiredP0Words) {
  if (!combinedNewDocs.includes(word)) failures.push(`M20-A deliverables missing keyword: ${word}`);
}

if (failures.length) {
  console.error('M20-A UX/SEO/performance/accessibility analysis QA failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`M20-A UX/SEO/performance/accessibility analysis QA passed (${appPageRoutes.length} routes, ${routesWithMetadata.length} metadata routes).`);
