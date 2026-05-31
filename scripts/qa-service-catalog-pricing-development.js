const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requiredFiles = [
  'apps/web/lib/catalog/catalog.ts',
  'apps/web/components/catalog/CatalogServiceCard.tsx',
  'apps/web/components/catalog/PriceSnapshotBox.tsx',
  'apps/web/components/catalog/PricingComparison.tsx',
  'apps/web/components/catalog/ServiceDetailPanel.tsx',
  'apps/web/app/admin/catalog/page.tsx',
  'apps/api/src/modules/products/catalog.seed.ts',
  'apps/api/src/modules/products/price-guard.service.ts',
  'docs/sprints/M3-S_SERVICE_CATALOG_PRICING_DEVELOPMENT.md',
  'docs/pricing/15_CATALOG_IMPLEMENTATION_NOTES.md',
  'docs/pricing/16_PRICE_SNAPSHOT_IMPLEMENTATION.md',
  'docs/qa/M3-S_QA_REPORT.md',
  'docs/releases/0.10.0.md'
];

const requiredSnippets = [
  ['apps/web/app/servizi/page.tsx', 'CatalogServiceCard'],
  ['apps/web/app/prezzi/page.tsx', 'PricingComparison'],
  ['apps/web/app/checkout/page.tsx', 'snapshot'],
  ['apps/api/src/modules/orders/order.entity.ts', 'priceSnapshot'],
  ['apps/api/src/modules/orders/orders.service.ts', 'PriceGuard'],
  ['packages/shared/src/index.ts', 'PriceSnapshot'],
  ['package.json', 'qa:service-catalog-pricing-development']
];

let failed = false;
for (const file of requiredFiles) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    console.error(`Missing required file: ${file}`);
    failed = true;
  }
}

for (const [file, snippet] of requiredSnippets) {
  const full = path.join(root, file);
  const text = fs.existsSync(full) ? fs.readFileSync(full, 'utf8') : '';
  if (!text.includes(snippet)) {
    console.error(`Missing snippet "${snippet}" in ${file}`);
    failed = true;
  }
}

const publicCard = fs.readFileSync(path.join(root, 'apps/web/components/catalog/CatalogServiceCard.tsx'), 'utf8');
if (publicCard.includes('providerInternalCostBand') || publicCard.includes('providerEndpoints')) {
  console.error('Public catalog card leaks internal provider information.');
  failed = true;
}

if (failed) process.exit(1);
console.log('qa-service-catalog-pricing-development: passed');
