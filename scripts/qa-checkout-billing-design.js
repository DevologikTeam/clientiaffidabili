const fs = require('fs');
const path = require('path');

const root = process.cwd();
const requiredFiles = [
  'docs/sprints/M4-P_CHECKOUT_BILLING_DESIGN.md',
  'docs/billing/09_CHECKOUT_EXPERIENCE_BLUEPRINT.md',
  'docs/billing/10_PAYMENT_DATA_MODEL_BLUEPRINT.md',
  'docs/billing/11_CHECKOUT_API_CONTRACTS.md',
  'docs/billing/12_WEBHOOK_AND_IDEMPOTENCY_BLUEPRINT.md',
  'docs/billing/13_BILLING_PROFILE_INVOICE_BLUEPRINT.md',
  'docs/billing/14_ADMIN_BILLING_OPERATIONS_BLUEPRINT.md',
  'docs/billing/15_TRANSACTIONAL_EMAIL_COPY.md',
  'docs/billing/16_CHECKOUT_UI_COPY_AND_COMPONENTS.md',
  'apps/web/lib/billing/checkout-design.ts',
  'docs/qa/M4-P_QA_REPORT.md',
  'docs/releases/0.12.0.md',
];

const requiredTerms = [
  'webhook',
  'idempot',
  'BillingProfile',
  'PaymentLedgerEntry',
  'Invoice',
  'uso lecito',
  'nessun dato carta',
  'provider dati',
  'snapshot',
  'rimborso',
];

const failures = [];
for (const file of requiredFiles) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    failures.push(`Missing file: ${file}`);
  }
}

const combined = requiredFiles
  .filter((file) => fs.existsSync(path.join(root, file)))
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n');

for (const term of requiredTerms) {
  if (!combined.toLowerCase().includes(term.toLowerCase())) {
    failures.push(`Missing required design term: ${term}`);
  }
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (!['0.12.0', '0.13.0', '0.14.0', '0.15.0', '0.16.0', '0.17.0', '0.18.0', '0.19.0', '0.20.0', '0.21.0', '0.22.0', '0.23.0', '0.24.0', '0.25.0', '0.35.0', '0.26.0', '0.27.0', '0.28.0', '0.29.0', '0.30.0', '0.31.0', '0.32.0', '0.33.0', '0.34.0', '0.35.0', '0.24.0', '0.25.0', '0.35.0', '0.26.0', '0.27.0', '0.28.0', '0.29.0', '0.30.0', '0.31.0', '0.25.0', '0.35.0', '0.26.0', '0.27.0', '0.28.0', '0.29.0', '0.30.0', '0.31.0', '0.32.0', '0.33.0', '0.34.0', '0.35.0', '0.36.0', '0.41.0', '0.42.0', '0.47.0'].includes(pkg.version)) failures.push(`Root package version is ${pkg.version}, expected 0.12.0, 0.13.0, 0.14.0, 0.15.0, 0.16.0 0.17.0, 0.18.0 0.19.0 0.20.0 0.21.0 0.22.0 0.23.0 0.24.0 0.25.0 or 0.42.0 / 0.47.0`);
if (!pkg.scripts['qa:checkout-billing-design']) failures.push('Missing qa:checkout-billing-design script');

const blueprint = fs.readFileSync(path.join(root, 'apps/web/lib/billing/checkout-design.ts'), 'utf8');
for (const api of ['/orders', '/billing/checkout-session', '/billing/webhooks/:provider', '/admin/billing/queue']) {
  if (!blueprint.includes(api)) failures.push(`Blueprint missing API ${api}`);
}

if (blueprint.includes('zero rischi') || blueprint.includes('garantisce incassi certi')) {
  failures.push('Forbidden absolute-risk copy detected');
}

if (failures.length) {
  console.error('M4-P checkout billing design QA failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('M4-P checkout billing design QA passed');
