const fs = require('fs');
const path = require('path');

const root = process.cwd();
const requiredFiles = [
  'docs/sprints/M4-A_CHECKOUT_BILLING_ANALYSIS.md',
  'docs/billing/01_PROVIDER_SELECTION_ANALYSIS.md',
  'docs/billing/02_CHECKOUT_FLOW_AND_ORDER_STATES.md',
  'docs/billing/03_BILLING_TAX_AND_INVOICING_ANALYSIS.md',
  'docs/billing/04_PAYMENT_LEDGER_REFUND_DISPUTE_ANALYSIS.md',
  'docs/billing/05_WEBHOOK_IDEMPOTENCY_SECURITY_ANALYSIS.md',
  'docs/billing/06_PROVIDER_COST_MARGIN_IMPACT.md',
  'docs/billing/07_RISK_COMPLIANCE_KYB_CHECKOUT_GUARDS.md',
  'docs/billing/08_OPERATIONS_SUPPORT_ANALYSIS.md',
  'docs/research/M4A_CHECKOUT_SOURCE_NOTES.md',
  'apps/web/lib/billing/checkout-analysis.ts',
  'docs/qa/M4-A_QA_REPORT.md',
  'docs/releases/0.11.0.md'
];

const requiredSnippets = [
  ['docs/sprints/M4-A_CHECKOUT_BILLING_ANALYSIS.md', 'Stripe Checkout hosted first'],
  ['docs/billing/01_PROVIDER_SELECTION_ANALYSIS.md', 'PaymentProviderAdapter'],
  ['docs/billing/02_CHECKOUT_FLOW_AND_ORDER_STATES.md', 'payment_succeeded'],
  ['docs/billing/03_BILLING_TAX_AND_INVOICING_ANALYSIS.md', 'Billing Profile'],
  ['docs/billing/04_PAYMENT_LEDGER_REFUND_DISPUTE_ANALYSIS.md', 'LedgerEntryType'],
  ['docs/billing/05_WEBHOOK_IDEMPOTENCY_SECURITY_ANALYSIS.md', 'providerEventId'],
  ['docs/billing/06_PROVIDER_COST_MARGIN_IMPACT.md', 'margine_effettivo'],
  ['docs/billing/07_RISK_COMPLIANCE_KYB_CHECKOUT_GUARDS.md', 'uso lecito'],
  ['apps/web/lib/billing/checkout-analysis.ts', 'checkoutProviderDecisions'],
  ['apps/web/lib/billing/checkout-analysis.ts', 'estimateEffectiveMarginCents'],
  ['package.json', 'qa:checkout-billing-analysis'],
  ['docs/ROADMAP_STATUS.md', 'M4-P Checkout & Billing Design'],
  ['docs/CHANGELOG.md', '## 0.11.0']
];

let failed = false;
function read(rel) {
  const full = path.join(root, rel);
  return fs.existsSync(full) ? fs.readFileSync(full, 'utf8') : '';
}

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    console.error(`Missing required file: ${file}`);
    failed = true;
  }
}

for (const [file, snippet] of requiredSnippets) {
  if (!read(file).includes(snippet)) {
    console.error(`Missing snippet "${snippet}" in ${file}`);
    failed = true;
  }
}

for (const file of ['package.json', 'apps/web/package.json', 'apps/api/package.json', 'packages/shared/package.json']) {
  const pkg = JSON.parse(read(file));
  if (!['0.11.0', '0.12.0', '0.13.0', '0.14.0', '0.15.0', '0.16.0', '0.17.0', '0.18.0', '0.19.0', '0.20.0', '0.21.0', '0.22.0', '0.23.0', '0.24.0', '0.25.0', '0.35.0', '0.26.0', '0.27.0', '0.28.0', '0.29.0', '0.30.0', '0.31.0', '0.32.0', '0.33.0', '0.34.0', '0.35.0', '0.24.0', '0.25.0', '0.35.0', '0.26.0', '0.27.0', '0.28.0', '0.29.0', '0.30.0', '0.31.0', '0.25.0', '0.35.0', '0.26.0', '0.27.0', '0.28.0', '0.29.0', '0.30.0', '0.31.0', '0.32.0', '0.33.0', '0.34.0', '0.35.0', '0.36.0', '0.41.0', '0.42.0', '0.47.0'].includes(pkg.version)) {
    console.error(`${file} version is ${pkg.version}, expected 0.11.0, 0.12.0, 0.13.0, 0.14.0, 0.15.0, 0.16.0 0.17.0, 0.18.0 0.19.0 0.20.0 0.21.0 0.22.0 0.23.0 0.24.0 0.25.0 or 0.42.0 / 0.47.0`);
    failed = true;
  }
}

const security = read('docs/billing/05_WEBHOOK_IDEMPOTENCY_SECURITY_ANALYSIS.md').toLowerCase();
if (security.includes('cvc') && security.includes('salvare') && !security.includes('non salvare')) {
  console.error('Security doc may allow storing sensitive card data.');
  failed = true;
}

if (failed) process.exit(1);
console.log('qa-checkout-billing-analysis: passed');
