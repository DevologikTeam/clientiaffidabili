const fs = require('fs');
const path = require('path');

const root = process.cwd();
const requiredFiles = [
  'docs/sprints/M3-P_SERVICE_CATALOG_PRICING_DESIGN.md',
  'docs/pricing/09_CATALOG_EXPERIENCE_BLUEPRINT.md',
  'docs/pricing/10_ADMIN_CATALOG_BLUEPRINT.md',
  'docs/pricing/11_PRICE_GUARDS_APPROVAL_BLUEPRINT.md',
  'docs/pricing/12_CHECKOUT_PRICE_SNAPSHOT_BLUEPRINT.md',
  'docs/pricing/13_PUBLIC_SERVICE_CARD_COPY_DECK.md',
  'docs/pricing/14_PRICING_TABLE_AND_BUNDLE_BLUEPRINT.md',
  'apps/web/lib/catalog/catalog-blueprint.ts',
  'docs/qa/M3-P_QA_REPORT.md',
  'docs/releases/0.9.0.md'
];

const forbiddenPublicClaims = [
  'pagherà sicuramente',
  'zero rischi',
  'affidabilità garantita',
  'cliente sicuro',
  'controllo definitivo'
];

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

const failures = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    failures.push(`Missing required file: ${file}`);
  }
}

const packageFiles = ['package.json', 'apps/web/package.json', 'apps/api/package.json', 'packages/shared/package.json'];
function versionAtLeast(version, minimum) {
  const a = version.split('.').map(Number);
  const b = minimum.split('.').map(Number);
  for (let i = 0; i < 3; i += 1) {
    if ((a[i] || 0) > (b[i] || 0)) return true;
    if ((a[i] || 0) < (b[i] || 0)) return false;
  }
  return true;
}
for (const file of packageFiles) {
  const pkg = JSON.parse(read(file));
  if (!versionAtLeast(pkg.version, '0.9.0')) failures.push(`${file} version is ${pkg.version}, expected >= 0.9.0`);
}

if (fs.existsSync(path.join(root, 'docs/pricing/13_PUBLIC_SERVICE_CARD_COPY_DECK.md'))) {
  const copyDeckFull = read('docs/pricing/13_PUBLIC_SERVICE_CARD_COPY_DECK.md').toLowerCase();
  const publicCopyOnly = copyDeckFull.split('## parole vietate')[0];
  for (const claim of forbiddenPublicClaims) {
    if (publicCopyOnly.includes(claim)) failures.push(`Forbidden public claim found in public copy deck body: ${claim}`);
  }
}

const blueprint = fs.existsSync(path.join(root, 'apps/web/lib/catalog/catalog-blueprint.ts'))
  ? read('apps/web/lib/catalog/catalog-blueprint.ts')
  : '';
for (const token of ['catalogBlueprintItems', 'estimatePriceGuardStatus', 'catalogBundleBlueprint', 'COMPANY_PRO', 'KYB_COMPLIANCE']) {
  if (!blueprint.includes(token)) failures.push(`Catalog blueprint missing token: ${token}`);
}

const roadmap = read('docs/ROADMAP_STATUS.md');
if (!roadmap.includes('0.9.0')) failures.push('Roadmap status not updated to 0.9.0');
if (!roadmap.includes('M3-S Service Catalog & Pricing Development')) failures.push('Roadmap missing next sprint M3-S');

const changelog = read('docs/CHANGELOG.md');
if (!changelog.includes('## 0.9.0')) failures.push('Changelog missing 0.9.0 section');

if (failures.length) {
  console.error('M3-P QA failed');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('M3-P service catalog pricing design QA passed');
