const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requiredFiles = [
  'apps/web/components/public-funnel/ScenarioCard.tsx',
  'apps/web/components/public-funnel/TrustStrip.tsx',
  'apps/web/components/public-funnel/ReportPreview.tsx',
  'apps/web/components/public-funnel/HowItWorks.tsx',
  'apps/web/components/public-funnel/ComplianceNotice.tsx',
  'apps/web/components/public-funnel/PublicFAQ.tsx',
  'apps/web/components/public-funnel/CheckoutEntryCard.tsx',
  'apps/web/components/public-funnel/index.ts',
  'apps/web/app/page.tsx',
  'apps/web/app/servizi/page.tsx',
  'apps/web/app/servizi/[slug]/page.tsx',
  'apps/web/app/prezzi/page.tsx',
  'apps/web/app/api/page.tsx',
  'apps/web/app/checkout/page.tsx',
  'apps/web/lib/content.ts'
];

const requiredSnippets = [
  ['apps/web/app/page.tsx', 'ScenarioCard'],
  ['apps/web/app/page.tsx', 'PublicFAQ'],
  ['apps/web/app/servizi/page.tsx', 'Scenario selector'],
  ['apps/web/app/prezzi/page.tsx', 'Listino singoli servizi'],
  ['apps/web/app/api/page.tsx', 'Adapter Openapi server-side'],
  ['apps/web/app/checkout/page.tsx', 'searchParams.service'],
  ['apps/web/lib/content.ts', 'pricingBundles'],
  ['apps/web/app/globals.css', 'Public Funnel Implementation v0.7.0']
];

const forbiddenClaims = [
  'pagamento garantito',
  'solvibilità garantita',
  'rischio zero',
  'assenza totale di rischio garantita',
  'controlla chiunque'
];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

const missing = requiredFiles.filter((relativePath) => !fs.existsSync(path.join(root, relativePath)));
if (missing.length) {
  console.error('Missing required public funnel files:', missing.join(', '));
  process.exit(1);
}

for (const [relativePath, snippet] of requiredSnippets) {
  const body = read(relativePath);
  if (!body.includes(snippet)) {
    console.error(`Missing snippet "${snippet}" in ${relativePath}`);
    process.exit(1);
  }
}

const publicFiles = [
  'apps/web/app/page.tsx',
  'apps/web/app/servizi/page.tsx',
  'apps/web/app/servizi/[slug]/page.tsx',
  'apps/web/app/prezzi/page.tsx',
  'apps/web/app/api/page.tsx',
  'apps/web/app/checkout/page.tsx',
  'apps/web/lib/content.ts'
];

for (const relativePath of publicFiles) {
  const body = read(relativePath).toLowerCase();
  for (const claim of forbiddenClaims) {
    if (body.includes(claim)) {
      console.error(`Forbidden claim "${claim}" found in ${relativePath}`);
      process.exit(1);
    }
  }
}

const serviceDetail = read('apps/web/app/servizi/[slug]/page.tsx');
if (!serviceDetail.includes('generateStaticParams') || !serviceDetail.includes('notFound')) {
  console.error('Service detail route must include static params and notFound guard.');
  process.exit(1);
}

const checkout = read('apps/web/app/checkout/page.tsx');
if (!checkout.includes('getServiceByCode') || !checkout.includes('Confermo di usare il servizio')) {
  console.error('Checkout must resolve selected service and include lawful-use confirmation.');
  process.exit(1);
}

console.log('Public funnel development QA passed.');
