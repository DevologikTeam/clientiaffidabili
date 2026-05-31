const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requiredFiles = [
  'apps/web/components/ds/Alert.tsx',
  'apps/web/components/ds/Badge.tsx',
  'apps/web/components/ds/Button.tsx',
  'apps/web/components/ds/Card.tsx',
  'apps/web/components/ds/DataTable.tsx',
  'apps/web/components/ds/EmptyState.tsx',
  'apps/web/components/ds/Field.tsx',
  'apps/web/components/ds/KeyValueList.tsx',
  'apps/web/components/ds/PageHero.tsx',
  'apps/web/components/ds/ProgressBar.tsx',
  'apps/web/components/ds/StatCard.tsx',
  'apps/web/components/ds/Stepper.tsx',
  'apps/web/components/ds/index.ts',
  'apps/web/app/design-system/page.tsx',
  'apps/web/app/globals.css',
  'docs/sprints/M1-S_DESIGN_SYSTEM_IMPLEMENTATION.md'
];

const requiredCssTokens = [
  '--ca-trust-navy-900',
  '--ca-trust-blue-600',
  '--ca-focus-ring',
  '.ca-button--primary',
  '.ca-alert',
  '.ca-stepper',
  '.ca-data-table',
  '.ca-empty-state',
  '.ca-hero-surface'
];

const requiredExports = [
  'Alert', 'Button', 'DataTable', 'EmptyState', 'Field', 'KeyValueList', 'PageHero', 'ProgressBar', 'StatCard', 'Stepper'
];

let failures = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`Missing file: ${file}`);
}

const css = fs.readFileSync(path.join(root, 'apps/web/app/globals.css'), 'utf8');
for (const token of requiredCssTokens) {
  if (!css.includes(token)) failures.push(`Missing CSS token/class: ${token}`);
}

const exportsFile = fs.readFileSync(path.join(root, 'apps/web/components/ds/index.ts'), 'utf8');
for (const exportName of requiredExports) {
  if (!exportsFile.includes(`./${exportName}`)) failures.push(`Missing DS export: ${exportName}`);
}

const dsPage = fs.readFileSync(path.join(root, 'apps/web/app/design-system/page.tsx'), 'utf8');
for (const componentName of requiredExports) {
  if (!dsPage.includes(componentName)) failures.push(`Design system page does not showcase: ${componentName}`);
}

if (failures.length) {
  console.error('Design system QA failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Design system QA passed. Components, tokens, exports and internal showcase are present.');
