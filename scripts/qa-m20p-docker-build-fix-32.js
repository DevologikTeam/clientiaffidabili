#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const failures = [];
const read = (file) => fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';

const dataTableFile = 'apps/web/components/ds/DataTable.tsx';
const dataTable = read(dataTableFile);
if (!dataTable) failures.push(`Missing ${dataTableFile}`);
for (const token of [
  'LegacyDataTableColumn',
  'caption?: string',
  'Array<DataTableColumn<Row> | LegacyDataTableColumn>',
  'renderLegacyCell',
  'Array.isArray(row)',
  'normalizedColumns',
]) {
  if (!dataTable.includes(token)) failures.push(`DataTable fix missing token: ${token}`);
}

const billingPage = read('apps/web/app/admin/billing/page.tsx');
if (!billingPage.includes("columns={['Ordine', 'Stato', 'Provider', 'Importo', 'Prossima azione']}")) {
  failures.push('Expected admin billing legacy DataTable scenario to remain covered by compatibility bridge.');
}
if (!billingPage.includes('billingOperationsSeed.map')) failures.push('Admin billing page no longer exercises billingOperationsSeed rows.');

const globals = read('apps/web/app/globals.css');
if (globals.includes('align-items:end')) failures.push('Autoprefixer warning source still present: align-items:end.');
if (!globals.includes('align-items:flex-end')) failures.push('Expected flex-end replacement in globals.css.');

const packageJson = JSON.parse(read('package.json') || '{}');
const scripts = packageJson.scripts || {};
if (!scripts['qa:m20p-docker-build-fix-32']) failures.push('Missing package script qa:m20p-docker-build-fix-32.');

const designDoc = read('docs/ux-seo-performance-a11y/13_BUILD_FIX_32_DATATABLE_AND_CSS.md');
for (const token of ['Type error', 'DataTable', 'align-items:flex-end', 'qa-m20p-docker-build-fix-32']) {
  if (!designDoc.includes(token)) failures.push(`Build fix #32 doc missing token: ${token}`);
}

if (failures.length) {
  console.error('M20-P Docker build fix #32 QA failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('M20-P Docker build fix #32 QA passed.');
