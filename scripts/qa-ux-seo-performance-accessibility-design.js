#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'docs/sprints/M20-P_UX_SEO_PERFORMANCE_ACCESSIBILITY_POLISH_DESIGN.md',
  'docs/ux-seo-performance-a11y/07_PUBLIC_COPY_AND_TRUST_BLUEPRINT.md',
  'docs/ux-seo-performance-a11y/08_METADATA_NOINDEX_AND_ROUTING_BLUEPRINT.md',
  'docs/ux-seo-performance-a11y/09_MOBILE_NAVIGATION_AND_ACCESSIBILITY_BLUEPRINT.md',
  'docs/ux-seo-performance-a11y/10_CHECKOUT_PRICING_TABLE_BLUEPRINT.md',
  'docs/ux-seo-performance-a11y/11_PERFORMANCE_AND_OBSERVABILITY_BLUEPRINT.md',
  'docs/ux-seo-performance-a11y/12_M20S_IMPLEMENTATION_HANDOFF.md',
  'docs/ux-seo-performance-a11y/13_BUILD_FIX_32_DATATABLE_AND_CSS.md',
  'apps/web/lib/ux-polish/ux-seo-performance-a11y-design.ts',
  'scripts/qa-m20p-docker-build-fix-32.js',
  'docs/releases/0.70.0.md',
];

const requiredContent = [
  ['package.json', '0.70.0'],
  ['package.json', 'qa:ux-seo-performance-accessibility-design'],
  ['package.json', 'qa:m20p-docker-build-fix-32'],
  ['PROJECT_MANIFEST.md', 'Versione corrente: 0.70.0'],
  ['PROJECT_MANIFEST.md', 'M20-P UX, SEO, Performance & Accessibility Polish Design'],
  ['docs/ROADMAP_STATUS.md', 'v0.70.0 — M20-P UX, SEO, Performance & Accessibility Polish Design'],
  ['docs/sprints/M20-P_UX_SEO_PERFORMANCE_ACCESSIBILITY_POLISH_DESIGN.md', 'Fix #32 incluso'],
  ['docs/ux-seo-performance-a11y/08_METADATA_NOINDEX_AND_ROUTING_BLUEPRINT.md', 'buildSensitiveMetadata'],
  ['docs/ux-seo-performance-a11y/09_MOBILE_NAVIGATION_AND_ACCESSIBILITY_BLUEPRINT.md', 'aria-expanded'],
  ['docs/ux-seo-performance-a11y/10_CHECKOUT_PRICING_TABLE_BLUEPRINT.md', 'DataTable compatibility decision'],
  ['docs/ux-seo-performance-a11y/11_PERFORMANCE_AND_OBSERVABILITY_BLUEPRINT.md', 'LCP'],
  ['docs/ux-seo-performance-a11y/12_M20S_IMPLEMENTATION_HANDOFF.md', 'Task P0'],
  ['apps/web/lib/ux-polish/ux-seo-performance-a11y-design.ts', 'm20pDesignItems'],
  ['apps/web/lib/ux-polish/ux-seo-performance-a11y-design.ts', 'datatable-legacy-bridge-build-fix-32'],
];

const failures = [];
for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(process.cwd(), file))) failures.push(`Missing required file: ${file}`);
}
for (const [file, needle] of requiredContent) {
  const full = path.join(process.cwd(), file);
  if (!fs.existsSync(full) || !fs.readFileSync(full, 'utf8').includes(needle)) failures.push(`Missing content '${needle}' in ${file}`);
}

const registryPath = path.join(process.cwd(), 'apps/web/lib/ux-polish/ux-seo-performance-a11y-design.ts');
const registry = fs.existsSync(registryPath) ? fs.readFileSync(registryPath, 'utf8') : '';
const designIds = Array.from(registry.matchAll(/id: '([^']+)'/g)).map((match) => match[1]);
if (new Set(designIds).size < 18) failures.push(`Expected at least 18 unique M20-P IDs, found ${new Set(designIds).size}.`);
for (const area of ['public_copy', 'metadata_noindex', 'mobile_navigation', 'checkout_pricing', 'datatable_accessibility', 'performance_budget', 'privacy_observability', 'build_fix']) {
  if (!registry.includes(area)) failures.push(`Missing M20-P design area: ${area}`);
}
for (const requiredId of [
  'copy-public-commercial-scrub',
  'metadata-public-p0-policy',
  'noindex-sensitive-route-policy',
  'mobile-header-accessible-drawer',
  'checkout-guided-form-copy',
  'datatable-legacy-bridge-build-fix-32',
  'autoprefixer-flex-end-fix-32',
]) {
  if (!designIds.includes(requiredId)) failures.push(`Missing M20-P design id: ${requiredId}`);
}

const combinedNewDocs = requiredFiles
  .filter((file) => file.endsWith('.md') && fs.existsSync(path.join(process.cwd(), file)))
  .map((file) => fs.readFileSync(path.join(process.cwd(), file), 'utf8'))
  .join('\n')
  .toLowerCase();
const requiredTerms = ['noindex', 'canonical', 'metadata', 'mobile', 'checkout', 'datatable', 'lighthouse', 'axe', 'wcag', 'aria-expanded', 'flex-end', 'docker'];
for (const term of requiredTerms) {
  if (!combinedNewDocs.includes(term)) failures.push(`M20-P deliverables missing required term: ${term}`);
}
const forbiddenClaims = ['rischio zero', 'pagamento garantito', 'solvibilità garantita', 'solvibilita garantita', 'sicuro al 100%', 'infallibile'];
for (const claim of forbiddenClaims) {
  const occurrences = (combinedNewDocs.match(new RegExp(claim, 'g')) || []).length;
  // Allow the claim guardrail list to mention forbidden phrases, but not repeated marketing usage.
  if (occurrences > 2) failures.push(`Forbidden claim appears too often in M20-P docs: ${claim}`);
}

if (failures.length) {
  console.error('M20-P UX/SEO/performance/accessibility design QA failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('M20-P UX/SEO/performance/accessibility design QA passed.');
