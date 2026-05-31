const fs = require('fs');
const path = require('path');

const root = process.cwd();
const requiredFiles = [
  'docs/sprints/M4B-P_PAYMENT_PROVIDERS_SUBSCRIPTIONS_DESIGN.md',
  'docs/billing/30_PAYMENT_PROVIDER_ABSTRACTION_BLUEPRINT.md',
  'docs/billing/31_STRIPE_ONE_OFF_SUBSCRIPTION_BLUEPRINT.md',
  'docs/billing/32_PAYPAL_ORDERS_SUBSCRIPTIONS_BLUEPRINT.md',
  'docs/billing/33_REFUNDS_CANCELLATIONS_DISPUTES_BLUEPRINT.md',
  'docs/billing/34_CREDIT_WALLET_ENTITLEMENT_BLUEPRINT.md',
  'docs/billing/35_PAYMENT_RECONCILIATION_LEDGER_BLUEPRINT.md',
  'docs/billing/36_ADMIN_PAYMENT_OPERATIONS_BLUEPRINT.md',
  'docs/billing/37_CUSTOMER_BILLING_PORTAL_BLUEPRINT.md',
  'docs/billing/38_M4BS_IMPLEMENTATION_HANDOFF.md',
  'apps/api/src/modules/billing/payment-providers-subscriptions.types.ts',
  'apps/api/src/modules/billing/payment-provider.contract.ts',
  'apps/api/src/modules/billing/refund-policy.registry.ts',
  'apps/web/lib/billing/payment-providers-subscriptions-design.ts',
  'docs/qa/M4B-P_QA_REPORT.md',
  'docs/releases/0.27.0.md',
];

const requiredKeywords = [
  'Stripe',
  'PayPal',
  'Refund',
  'Dispute',
  'CreditWallet',
  'Entitlement',
  'idempotency',
  'reason obbligatoria',
  'ledger append-only',
  'no provider call',
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('Missing M4B-P files:', missing);
  process.exit(1);
}

const joined = requiredFiles.map((file) => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
const missingKeywords = requiredKeywords.filter((keyword) => !joined.toLowerCase().includes(keyword.toLowerCase()));
if (missingKeywords.length) {
  console.error('Missing M4B-P keywords:', missingKeywords);
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (Number(packageJson.version.split('.')[1]) < 27) {
  console.error(`Expected package version 0.27.0 or later, got ${packageJson.version}`);
  process.exit(1);
}

console.log('M4B-P payment providers/subscriptions/refunds design QA passed.');
