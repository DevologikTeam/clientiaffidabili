#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const read = (file) => fs.existsSync(path.join(root, file)) ? fs.readFileSync(path.join(root, file), 'utf8') : '';
const exists = (file) => fs.existsSync(path.join(root, file));
const failures = [];

const requiredFiles = [
  'docs/sprints/M20-S_UX_SEO_PERFORMANCE_ACCESSIBILITY_POLISH_DEVELOPMENT.md',
  'docs/ux-seo-performance-a11y/14_M20S_RUNTIME_IMPLEMENTATION.md',
  'apps/web/lib/seo/metadata.ts',
  'apps/web/lib/ux-polish/ux-seo-performance-a11y-runtime.ts',
  'apps/web/app/admin/layout.tsx',
  'apps/web/app/dashboard/layout.tsx',
  'apps/web/app/reports/layout.tsx',
  'apps/web/app/checkout/layout.tsx',
  'apps/web/app/invito/layout.tsx',
  'artifacts/ux-seo-performance-a11y/m20s-performance-budget.json',
  'docs/releases/0.71.0.md',
  'docs/roadmap/NEXT_5_SPRINTS_AFTER_0_71_0.md',
];

for (const file of requiredFiles) {
  if (!exists(file)) failures.push(`Missing required file: ${file}`);
}

const packageJson = JSON.parse(read('package.json') || '{}');
const minimumReleaseVersion = '0.71.0';
function versionParts(version) {
  return String(version || '0.0.0').split('.').map((part) => Number.parseInt(part, 10) || 0);
}
function isAtLeast(version, minimum) {
  const current = versionParts(version);
  const min = versionParts(minimum);
  for (let index = 0; index < Math.max(current.length, min.length); index += 1) {
    const left = current[index] || 0;
    const right = min[index] || 0;
    if (left > right) return true;
    if (left < right) return false;
  }
  return true;
}
if (!isAtLeast(packageJson.version, minimumReleaseVersion)) failures.push(`Expected package.json version >= ${minimumReleaseVersion}, found ${packageJson.version}`);
for (const pkg of ['apps/web/package.json', 'apps/api/package.json']) {
  const data = JSON.parse(read(pkg) || '{}');
  if (!isAtLeast(data.version, minimumReleaseVersion)) failures.push(`Expected ${pkg} version >= ${minimumReleaseVersion}, found ${data.version}`);
}
if (!packageJson.scripts?.['qa:ux-seo-performance-accessibility-development']) failures.push('Missing package script qa:ux-seo-performance-accessibility-development.');
const manifestVersion = read('PROJECT_MANIFEST.md').match(/Versione corrente: ([0-9.]+)/)?.[1];
if (!isAtLeast(manifestVersion, minimumReleaseVersion)) failures.push(`PROJECT_MANIFEST current version must be >= ${minimumReleaseVersion}, found ${manifestVersion || 'missing'}.`);
if (!read('CHANGELOG.md').includes('0.71.0 — M20-S')) failures.push('CHANGELOG missing 0.71.0 M20-S entry.');
if (!read('docs/ROADMAP_STATUS.md').includes('Stato aggiornato v0.71.0')) failures.push('ROADMAP_STATUS missing v0.71.0 status.');

const metadata = read('apps/web/lib/seo/metadata.ts');
for (const token of ['buildPublicMetadata', 'buildSensitiveMetadata', 'buildServiceMetadata', 'buildGuideMetadata', 'robots: { index: true, follow: true }', 'index: false', 'follow: false']) {
  if (!metadata.includes(token)) failures.push(`Metadata helper missing token: ${token}`);
}

for (const file of ['apps/web/app/admin/layout.tsx', 'apps/web/app/dashboard/layout.tsx', 'apps/web/app/reports/layout.tsx', 'apps/web/app/checkout/layout.tsx', 'apps/web/app/invito/layout.tsx']) {
  const source = read(file);
  if (!source.includes('buildSensitiveMetadata')) failures.push(`${file} does not use buildSensitiveMetadata.`);
}

const publicPages = [
  'apps/web/app/page.tsx',
  'apps/web/app/servizi/page.tsx',
  'apps/web/app/prezzi/page.tsx',
  'apps/web/app/api/page.tsx',
  'apps/web/app/garanzia-operativa/page.tsx',
  'apps/web/app/guide/page.tsx',
  'apps/web/app/contatti/page.tsx',
];
for (const file of publicPages) {
  const source = read(file);
  if (!source.includes('buildPublicMetadata')) failures.push(`${file} missing buildPublicMetadata.`);
  if (!source.includes('path:')) failures.push(`${file} metadata missing path.`);
}

const servicePage = read('apps/web/app/servizi/[slug]/page.tsx');
if (!servicePage.includes('generateMetadata') || !servicePage.includes('buildServiceMetadata')) failures.push('Service detail page missing dynamic service metadata.');
const guidePage = read('apps/web/app/guide/[slug]/page.tsx');
if (!guidePage.includes('generateMetadata') || !guidePage.includes('buildGuideMetadata')) failures.push('Guide detail page missing guide metadata helper.');

const header = read('apps/web/components/Header.tsx');
for (const token of ['use client', 'aria-expanded', 'aria-controls="mobile-public-navigation"', 'Escape', 'focusable', 'role="dialog"', '/login', '/garanzia-operativa', '/contatti']) {
  if (!header.includes(token)) failures.push(`Header missing accessible mobile token: ${token}`);
}
if (header.includes('Dashboard demo') || header.includes('href="/admin')) failures.push('Header exposes demo/admin link publicly.');

const layout = read('apps/web/app/layout.tsx');
if (!layout.includes('skip-link') || !layout.includes('Salta al contenuto')) failures.push('Root layout missing skip link.');
const globals = read('apps/web/app/globals.css');
for (const token of ['.skip-link', ':focus-visible', '.mobile-menu-button', '.mobile-nav-panel', '.ca-error-summary', '.ca-price-table-wrap']) {
  if (!globals.includes(token)) failures.push(`globals.css missing M20-S style token: ${token}`);
}
if (globals.includes('align-items:end')) failures.push('globals.css still contains align-items:end.');

const pageFiles = [];
function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === 'page.tsx') pageFiles.push(path.relative(root, full));
  }
}
walk(path.join(root, 'apps/web/app'));
const missingMainTarget = pageFiles.filter((file) => read(file).includes('<main') && !read(file).includes('id="main-content"'));
if (missingMainTarget.length) failures.push(`Pages with main missing id=main-content: ${missingMainTarget.slice(0, 8).join(', ')}`);

const checkout = read('apps/web/app/checkout/page.tsx');
const checkoutCombined = checkout + '\n' + read('apps/web/components/billing/CheckoutLegalConfirmation.tsx') + '\n' + read('apps/web/components/billing/BillingProfileForm.tsx');
for (const token of ['<fieldset', 'aria-describedby', 'ca-error-summary', 'verificationSubject', 'Conferme prima del pagamento', 'Procedi al pagamento protetto']) {
  if (!checkoutCombined.includes(token)) failures.push(`Checkout missing token: ${token}`);
}
for (const forbidden of ['webhook', 'payload', 'provider mapping', '?mode=mock']) {
  if (checkoutCombined.toLowerCase().includes(forbidden)) failures.push(`Checkout still contains forbidden technical copy: ${forbidden}`);
}

const field = read('apps/web/components/ds/Field.tsx');
for (const token of ['helpText', 'aria-describedby', 'fieldIdFromLabel', 'ca-field__help']) {
  if (!field.includes(token)) failures.push(`Field component missing compatibility/a11y token: ${token}`);
}

const pricing = read('apps/web/components/catalog/PricingComparison.tsx');
for (const token of ['<table', '<caption>', 'scope="col"', 'data-label="Servizio"', 'Listino servizi ClientiAffidabili.it']) {
  if (!pricing.includes(token)) failures.push(`PricingComparison missing semantic table token: ${token}`);
}
if (pricing.includes('role="table"')) failures.push('PricingComparison still uses role=table div pattern.');

const serviceDetail = read('apps/web/components/catalog/ServiceDetailPanel.tsx');
if (serviceDetail.includes('providerInternalCostBand') || serviceDetail.includes('Nota interna margine')) failures.push('Service detail still exposes internal margin/provider note.');
const priceSnapshot = read('apps/web/components/catalog/PriceSnapshotBox.tsx');
if (priceSnapshot.includes('guardrail margine') || priceSnapshot.includes('backend')) failures.push('Price snapshot still exposes internal backend/margin copy.');

const robots = read('apps/web/app/robots.ts');
for (const token of ['/admin/', '/dashboard/', '/reports/', '/checkout/', '/invito/']) {
  if (!robots.includes(token)) failures.push(`robots.ts missing sensitive disallow: ${token}`);
}
const sitemap = read('apps/web/app/sitemap.ts') + read('apps/web/lib/launch-website/launch-website-runtime.ts');
for (const sensitive of ['/admin', '/dashboard', '/reports', '/checkout', '/invito']) {
  if (sitemap.includes(`path: '${sensitive}`) || sitemap.includes(`href: '${sensitive}`)) failures.push(`Sitemap source appears to include sensitive route: ${sensitive}`);
}

const tracking = read('apps/web/lib/analytics/tag-manager-clarity-runtime.ts');
for (const token of ['externalTrackingBlockedRoutePrefixes', "'/admin'", "'/dashboard'", "'/checkout'", "'/reports'", "'/invito'", 'forbiddenPayloadKeyPattern']) {
  if (!tracking.includes(token)) failures.push(`Tracking runtime missing denylist/privacy token: ${token}`);
}

const runtime = read('apps/web/lib/ux-polish/ux-seo-performance-a11y-runtime.ts');
for (const token of ['m20sRuntimeVersion', '0.71.0', 'publicSeoRoutes', 'sensitiveNoindexRoutePrefixes', 'performanceBudget', 'm20sRuntimeItems']) {
  if (!runtime.includes(token)) failures.push(`M20-S runtime registry missing token: ${token}`);
}

const perf = read('artifacts/ux-seo-performance-a11y/m20s-performance-budget.json');
for (const token of ['"version": "0.71.0"', '"lcpMobileMs": 2800', '"cssKnownWarnings": 0']) {
  if (!perf.includes(token)) failures.push(`Performance budget artifact missing token: ${token}`);
}

const publicCopyFiles = [
  'apps/web/app/page.tsx',
  'apps/web/app/prezzi/page.tsx',
  'apps/web/app/servizi/page.tsx',
  'apps/web/app/servizi/[slug]/page.tsx',
  'apps/web/app/checkout/page.tsx',
  'apps/web/app/checkout/success/page.tsx',
  'apps/web/app/checkout/cancel/page.tsx',
  'apps/web/app/api/page.tsx',
  'apps/web/app/garanzia-operativa/page.tsx',
  'apps/web/app/guide/page.tsx',
  'apps/web/components/catalog/CatalogServiceCard.tsx',
  'apps/web/components/catalog/ServiceDetailPanel.tsx',
  'apps/web/components/catalog/PriceSnapshotBox.tsx',
  'apps/web/components/catalog/PricingComparison.tsx',
  'apps/web/components/billing/PaymentStatusPanel.tsx',
  'apps/web/components/billing/CheckoutOrderSummary.tsx',
  'apps/web/components/launch-website/LaunchHero.tsx',
  'apps/web/components/launch-website/CommercialProofStrip.tsx',
];
const forbiddenPatterns = [
  /MVP/g,
  /dashboard demo/gi,
  /CMS editoriale/gi,
  /margine protetto/gi,
  /provider mapping/gi,
  /raw payload/gi,
  /endpoint provider/gi,
  /webhook pagamento/gi,
  /\?mode=mock/g,
  /rischio zero/gi,
  /pagamento garantito/gi,
  /risultato certo/gi,
  /infallibile/gi,
];
for (const file of publicCopyFiles) {
  const source = read(file);
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(source)) failures.push(`${file} contains forbidden public copy pattern: ${pattern}`);
    pattern.lastIndex = 0;
  }
}

if (failures.length) {
  console.error('M20-S UX/SEO/performance/accessibility development QA failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('M20-S UX/SEO/performance/accessibility development QA passed.');
