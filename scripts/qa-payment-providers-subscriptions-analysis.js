const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const required = [
  'docs/sprints/M4B-A_PAYMENT_PROVIDERS_SUBSCRIPTIONS_ANALYSIS.md',
  'docs/billing/22_PAYMENT_PROVIDER_STRATEGY_ANALYSIS.md',
  'docs/billing/23_STRIPE_CHECKOUT_BILLING_ANALYSIS.md',
  'docs/billing/24_PAYPAL_ORDERS_SUBSCRIPTIONS_ANALYSIS.md',
  'docs/billing/25_SUBSCRIPTION_CREDIT_ENTITLEMENT_MODEL_ANALYSIS.md',
  'docs/billing/26_PAYMENT_COST_MARGIN_AND_PRICING_IMPACT.md',
  'docs/billing/27_PAYMENT_WEBHOOK_RECONCILIATION_ANALYSIS.md',
  'docs/billing/28_BILLING_PROVIDER_ADMIN_OPERATIONS_ANALYSIS.md',
  'docs/billing/29_M4BP_M4BS_READINESS_CHECKLIST.md',
  'docs/research/M4B_A_PAYMENT_SOURCE_NOTES.md',
  'apps/api/src/modules/billing/payment-providers-subscriptions.analysis.ts',
  'apps/web/lib/billing/payment-providers-subscriptions-analysis.ts',
  'docs/qa/M4B-A_QA_REPORT.md',
  'docs/releases/0.26.0.md',
];

const failures = [];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`Missing required M4B-A file: ${file}`);
}

const combined = required
  .filter((file) => fs.existsSync(path.join(root, file)))
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n')
  .toLowerCase();

for (const term of [
  'stripe',
  'paypal',
  'subscription',
  'credit',
  'entitlement',
  'webhook',
  'idempotent',
  'margin',
  'no unlimited',
  'provider data call',
  'source of truth',
  'reconciliation',
  'reason',
  'audit',
]) {
  if (!combined.includes(term)) failures.push(`Missing M4B-A analysis term: ${term}`);
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (Number(pkg.version.split('.')[1]) < 26) failures.push(`Expected package version 0.26.0 or later, found ${pkg.version}`);
if (!pkg.scripts['qa:payment-providers-subscriptions-analysis']) failures.push('Missing qa:payment-providers-subscriptions-analysis script');
if (!pkg.scripts['release:check'].includes('qa:payment-providers-subscriptions-analysis')) failures.push('release:check does not include payment provider subscription QA');

if (failures.length) {
  console.error('QA M4B-A failed');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('QA M4B-A Payment Providers & Subscriptions Analysis passed');
