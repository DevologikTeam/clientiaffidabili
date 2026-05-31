const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requiredFiles = [
  'apps/api/src/modules/billing/entities/billing-profile.entity.ts',
  'apps/api/src/modules/billing/entities/checkout-session.entity.ts',
  'apps/api/src/modules/billing/entities/payment.entity.ts',
  'apps/api/src/modules/billing/entities/payment-ledger-entry.entity.ts',
  'apps/api/src/modules/billing/entities/payment-webhook-event.entity.ts',
  'apps/api/src/modules/billing/entities/invoice.entity.ts',
  'apps/api/src/modules/billing/payment-provider.adapter.ts',
  'apps/api/src/modules/billing/billing.service.ts',
  'apps/api/src/modules/billing/billing.controller.ts',
  'apps/web/lib/billing/checkout.ts',
  'apps/web/components/billing/CheckoutLegalConfirmation.tsx',
  'apps/web/components/billing/CheckoutOrderSummary.tsx',
  'apps/web/components/billing/BillingProfileForm.tsx',
  'apps/web/components/billing/PaymentStatusPanel.tsx',
  'apps/web/app/checkout/page.tsx',
  'apps/web/app/checkout/success/page.tsx',
  'apps/web/app/checkout/cancel/page.tsx',
  'apps/web/app/admin/billing/page.tsx',
  'docs/sprints/M4-S_CHECKOUT_BILLING_DEVELOPMENT.md',
  'docs/billing/17_CHECKOUT_BILLING_IMPLEMENTATION_NOTES.md',
  'docs/billing/18_PAYMENT_ENTITIES_IMPLEMENTATION.md',
  'docs/billing/19_WEBHOOK_RUNTIME_IMPLEMENTATION.md',
  'docs/billing/20_CHECKOUT_UI_IMPLEMENTATION.md',
  'docs/qa/M4-S_QA_REPORT.md',
  'docs/releases/0.13.0.md',
];

const requiredSnippets = [
  ['apps/api/src/modules/billing/payment-provider.adapter.ts', 'createStripeCheckoutSession'],
  ['apps/api/src/modules/billing/payment-provider.adapter.ts', 'createMockCheckoutSession'],
  ['apps/api/src/modules/billing/billing.service.ts', 'processPaymentEvent'],
  ['apps/api/src/modules/billing/billing.service.ts', 'appendLedger'],
  ['apps/api/src/modules/billing/billing.service.ts', 'ensurePendingInvoice'],
  ['apps/api/src/modules/billing/billing.service.ts', 'signatureValid'],
  ['apps/api/src/modules/billing/entities/payment-webhook-event.entity.ts', "@Index(['provider', 'eventId'], { unique: true })"],
  ['apps/api/src/modules/orders/orders.service.ts', 'attachCheckoutSession'],
  ['apps/api/src/app.module.ts', 'PaymentLedgerEntry'],
  ['apps/web/app/checkout/page.tsx', 'CheckoutLegalConfirmation'],
  ['apps/web/app/checkout/success/page.tsx', 'PaymentStatusPanel'],
  ['apps/web/app/admin/billing/page.tsx', 'ledger'],
  ['packages/shared/src/index.ts', 'CheckoutSessionResult'],
  ['package.json', 'qa:checkout-billing-development'],
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

const combined = requiredFiles.filter((file) => fs.existsSync(path.join(root, file))).map((file) => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
for (const guard of ['nessun dato carta', 'provider dati', 'idempot', 'ledger', 'invoice pending', 'uso lecito']) {
  if (!combined.toLowerCase().includes(guard)) {
    console.error(`Missing guardrail term: ${guard}`);
    failed = true;
  }
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (!['0.13.0', '0.14.0', '0.15.0', '0.16.0', '0.17.0', '0.18.0', '0.19.0', '0.20.0', '0.21.0', '0.22.0', '0.23.0', '0.24.0', '0.25.0', '0.35.0', '0.26.0', '0.27.0', '0.28.0', '0.29.0', '0.30.0', '0.31.0', '0.32.0', '0.33.0', '0.34.0', '0.35.0', '0.24.0', '0.25.0', '0.35.0', '0.26.0', '0.27.0', '0.28.0', '0.29.0', '0.30.0', '0.31.0', '0.25.0', '0.35.0', '0.26.0', '0.27.0', '0.28.0', '0.29.0', '0.30.0', '0.31.0', '0.32.0', '0.33.0', '0.34.0', '0.35.0', '0.36.0', '0.41.0', '0.42.0', '0.47.0'].includes(pkg.version)) {
  console.error(`Root package version is ${pkg.version}, expected 0.13.0, 0.14.0, 0.15.0, 0.16.0 0.17.0, 0.18.0 0.19.0 0.20.0 0.21.0 0.22.0 0.23.0 0.24.0 0.25.0 or 0.42.0 / 0.47.0`);
  failed = true;
}

if (failed) process.exit(1);
console.log('qa-checkout-billing-development: passed');
