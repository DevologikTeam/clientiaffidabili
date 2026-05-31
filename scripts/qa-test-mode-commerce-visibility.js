#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const root = process.cwd();
const failures = [];
function filePath(file) { return path.join(root, file); }
function read(file) { return fs.readFileSync(filePath(file), 'utf8'); }
function assertFile(file) { if (!fs.existsSync(filePath(file))) failures.push(`Missing required file: ${file}`); }
function assertIncludes(file, token, label = token) {
  const content = read(file);
  if (!content.includes(token)) failures.push(`${file} missing ${label}`);
}

const files = [
  'apps/web/lib/runtime/commerce-mode.ts',
  'apps/web/components/commerce/TestModeNotice.tsx',
  'apps/web/components/commerce/index.ts',
  'apps/web/app/page.tsx',
  'apps/web/app/servizi/page.tsx',
  'apps/web/app/servizi/[slug]/page.tsx',
  'apps/web/app/prezzi/page.tsx',
  'apps/web/app/checkout/page.tsx',
  'apps/web/components/catalog/CatalogServiceCard.tsx',
  'apps/web/app/globals.css',
  'docs/releases/0.75.4.md',
  'docs/releases/0.75.5.md',
];
files.forEach(assertFile);

for (const token of [
  "process.env.ENABLE_CHECKOUT === 'true'",
  'isCommerceTestMode',
  'getCheckoutCtaLabel',
]) assertIncludes('apps/web/lib/runtime/commerce-mode.ts', token);

for (const token of [
  'Modalità test attiva',
  'Acquisto disattivato in ambiente di test',
  'Checkout in modalità test',
  'nessun pagamento e nessuna verifica reale',
  'if (!isCommerceTestMode()) return null',
]) assertIncludes('apps/web/components/commerce/TestModeNotice.tsx', token);

for (const file of ['apps/web/app/page.tsx', 'apps/web/app/servizi/page.tsx', 'apps/web/app/prezzi/page.tsx', 'apps/web/app/checkout/page.tsx']) {
  assertIncludes(file, '<TestModeNotice', 'visible test mode notice');
}
for (const token of [
  'Pagamento disabilitato in modalità test',
  'Richiedi supporto per una prova',
  'testMode ? (',
]) assertIncludes('apps/web/app/checkout/page.tsx', token);

for (const token of [
  'Vedi percorso in modalità test',
  'Ambiente test: puoi vedere il percorso',
]) assertIncludes('apps/web/components/catalog/CatalogServiceCard.tsx', token);

for (const token of [
  'ca-test-mode-notice',
  'ca-test-mode-inline',
  'ca-checkout-test-actions',
]) assertIncludes('apps/web/app/globals.css', token);

const pkg = read('package.json');
if (!/\"version\": \"0\.75\.(4|5|[6-9]|[1-9][0-9]+)\"/.test(pkg)) failures.push('package.json missing compatible version >= 0.75.4');
for (const token of ['qa:test-mode-commerce-visibility', 'node scripts/qa-test-mode-commerce-visibility.js']) {
  if (!pkg.includes(token)) failures.push(`package.json missing ${token}`);
}

const artifact = {
  status: failures.length ? 'failed' : 'passed',
  checkedAt: new Date().toISOString(),
  checkedFiles: files,
  failures,
};
fs.mkdirSync(filePath('artifacts/qa'), { recursive: true });
fs.writeFileSync(filePath('artifacts/qa/test-mode-commerce-visibility-latest.json'), JSON.stringify(artifact, null, 2));
if (failures.length) {
  console.error('Test mode commerce visibility QA failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log(`Test mode commerce visibility QA passed on ${files.length} files.`);
