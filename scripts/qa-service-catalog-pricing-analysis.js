const fs = require('fs');
const path = require('path');

const root = process.cwd();
const requiredFiles = [
  'docs/sprints/M3-A_SERVICE_CATALOG_PRICING_ANALYSIS.md',
  'docs/pricing/01_PROVIDER_PRICE_MAP_ANALYSIS.md',
  'docs/pricing/02_SERVICE_SELECTION_MVP.md',
  'docs/pricing/03_RESALE_PRICING_MARGIN_MODEL.md',
  'docs/pricing/04_BUNDLE_AND_PACKAGING_ANALYSIS.md',
  'docs/pricing/05_COMPETITOR_PRICING_POSITIONING.md',
  'docs/pricing/06_PRICE_GUARDS_ADMIN_GOVERNANCE.md',
  'docs/pricing/07_CATALOG_DATA_MODEL_ANALYSIS.md',
  'docs/pricing/08_PUBLIC_PRIVATE_CATALOG_COPY_BOUNDARIES.md',
  'docs/research/M3A_COMPETITOR_AND_SOURCE_NOTES.md',
  'docs/qa/M3-A_QA_REPORT.md',
  'docs/releases/0.8.0.md',
  'apps/web/lib/catalog/pricing-analysis.ts'
];

const requiredTerms = [
  'COMPANY_ESSENTIAL',
  'COMPANY_PRO',
  'KYB_COMPLIANCE',
  'minimumAllowedPriceNet',
  'providerCostEffective',
  'margine',
  'guardrail',
  'checkout'
];

const failures = [];
for (const file of requiredFiles) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    failures.push(`Missing file: ${file}`);
    continue;
  }
  const content = fs.readFileSync(full, 'utf8');
  if (content.trim().length < 300) failures.push(`File too short: ${file}`);
}

const corpus = requiredFiles
  .filter((file) => fs.existsSync(path.join(root, file)))
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n');

for (const term of requiredTerms) {
  if (!corpus.includes(term)) failures.push(`Missing required term: ${term}`);
}

if (failures.length > 0) {
  console.error('M3-A catalog/pricing QA failed');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('M3-A catalog/pricing QA passed');
