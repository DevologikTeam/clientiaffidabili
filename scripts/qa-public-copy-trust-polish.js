#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const failures = [];
const checkedFiles = [
  'apps/web/app/page.tsx',
  'apps/web/app/servizi/page.tsx',
  'apps/web/app/prezzi/page.tsx',
  'apps/web/components/Header.tsx',
  'apps/web/components/Footer.tsx',
  'apps/web/components/launch-website/LaunchHero.tsx',
  'apps/web/components/launch-website/CommercialProofStrip.tsx',
  'apps/web/components/launch-website/UseCaseDecisionGrid.tsx',
  'apps/web/components/launch-website/OperationalGuarantee.tsx',
  'apps/web/components/public-funnel/ComplianceNotice.tsx',
  'apps/web/lib/content.ts',
  'apps/web/lib/launch-website/launch-website-runtime.ts',
];

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function assertFile(file) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`Missing required file: ${file}`);
}

for (const file of checkedFiles) assertFile(file);

const publicMarketingFiles = checkedFiles.filter((file) => !file.includes('/Header.tsx') && !file.includes('/Footer.tsx'));
const bannedPublicTerms = [
  'sito di lancio',
  'readiness commerciale',
  'SEO/GEO content',
  'tracking privacy-safe',
  'sales enablement',
  'entry price',
  'status checkout',
  'stato checkout',
  'output, tempi',
  'margine protetto',
  'marginalità',
  'payload',
  'raw payload',
];

for (const file of publicMarketingFiles) {
  const content = read(file);
  for (const term of bannedPublicTerms) {
    if (content.toLowerCase().includes(term.toLowerCase())) {
      failures.push(`${file} contains internal/developer-facing public copy: "${term}"`);
    }
  }
}

const header = read('apps/web/components/Header.tsx');
if (!header.includes('logo__wordmark')) failures.push('Header must expose a visible text wordmark, not only the image asset.');
if (!header.includes('ClientiAffidabili.it')) failures.push('Header wordmark must show ClientiAffidabili.it.');
if (!header.includes('/android-chrome-192x192.png')) failures.push('Header must use compact logo mark from the provided kit.');

const css = read('apps/web/app/globals.css');
for (const token of ['.logo__wordmark', '.logo .logo__mark', 'Public trust copy & logo polish v0.75.0']) {
  if (!css.includes(token)) failures.push(`globals.css missing logo/trust polish token: ${token}`);
}

for (const asset of [
  'apps/web/public/logo-main.png',
  'apps/web/public/logo-hd.png',
  'apps/web/public/logo-web.jpg',
  'apps/web/public/favicon.ico',
  'apps/web/public/android-chrome-192x192.png',
  'apps/web/public/android-chrome-512x512.png',
]) assertFile(asset);

const content = read('apps/web/lib/content.ts');
for (const bad of ["price: 'da €14,90'", "price: 'da €24,90'", "price: 'da €49,90'"]) {
  if (content.includes(bad)) failures.push(`Pricing bundle still uses ambiguous starting-price copy: ${bad}`);
}
for (const token of ["price: '€14,90'", "price: '€24,90'", "price: '€49,90'"]) {
  if (!content.includes(token)) failures.push(`Pricing bundle missing direct service price: ${token}`);
}

const release = read('docs/releases/0.75.0.md');
if (!release.includes('Public Trust Copy')) failures.push('Release note 0.75.0 must document public trust copy polish.');
const reviewDoc = read('docs/public-copy/01_PUBLIC_COPY_COMPETITOR_AND_SCREENSHOT_REVIEW.md');
for (const token of ['Logo poco leggibile', 'Copy troppo interno', 'Prezzi poco coerenti', 'Lettura competitor']) {
  if (!reviewDoc.includes(token)) failures.push(`Public copy review missing section: ${token}`);
}

const artifact = {
  status: failures.length ? 'failed' : 'passed',
  checkedAt: new Date().toISOString(),
  checkedFiles,
  bannedPublicTerms,
  failures,
};
fs.mkdirSync(path.join(root, 'artifacts/qa'), { recursive: true });
fs.writeFileSync(path.join(root, 'artifacts/qa/public-copy-trust-polish-latest.json'), JSON.stringify(artifact, null, 2));

if (failures.length) {
  console.error('Public copy trust polish QA failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Public copy trust polish QA passed on ${checkedFiles.length} files.`);
