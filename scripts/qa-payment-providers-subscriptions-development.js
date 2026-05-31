const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const required = [
  'apps/api/src/modules/billing/entities/billing-subscription.entity.ts',
  'apps/api/src/modules/billing/entities/credit-wallet.entity.ts',
  'apps/api/src/modules/billing/entities/credit-ledger-entry.entity.ts',
  'apps/api/src/modules/billing/entities/refund-request.entity.ts',
  'apps/api/src/modules/billing/entities/payment-dispute.entity.ts',
  'apps/api/src/modules/billing/providers/stripe-payment-provider.adapter.ts',
  'apps/api/src/modules/billing/providers/paypal-payment-provider.adapter.ts',
  'apps/api/src/modules/billing/payment-provider-orchestrator.service.ts',
  'apps/api/src/modules/billing/credit-wallet.service.ts',
  'apps/api/src/modules/billing/subscription.service.ts',
  'apps/api/src/modules/billing/refund.service.ts',
  'apps/api/src/modules/billing/payment-reconciliation.service.ts',
  'apps/web/lib/billing/payment-providers-subscriptions-runtime.ts',
  'apps/web/components/billing/PaymentProviderSelector.tsx',
  'apps/web/components/billing/SubscriptionPlanCard.tsx',
  'apps/web/components/billing/CreditWalletPanel.tsx',
  'apps/web/components/billing/RefundPolicyPanel.tsx',
  'apps/web/components/billing/BillingPortalShell.tsx',
  'apps/web/components/billing/BillingLedgerTable.tsx',
  'apps/web/app/dashboard/abbonamento/page.tsx',
  'apps/web/app/admin/billing/subscriptions/page.tsx',
  'apps/web/app/admin/billing/refunds/page.tsx',
  'docs/sprints/M4B-S_PAYMENT_PROVIDERS_SUBSCRIPTIONS_DEVELOPMENT.md',
  'docs/billing/39_PAYMENT_PROVIDER_RUNTIME_IMPLEMENTATION.md',
  'docs/billing/40_SUBSCRIPTION_CREDIT_WALLET_IMPLEMENTATION.md',
  'docs/billing/41_REFUND_RUNTIME_IMPLEMENTATION.md',
  'docs/billing/42_DISPUTE_RECONCILIATION_IMPLEMENTATION.md',
  'docs/billing/43_BILLING_PORTAL_UI_IMPLEMENTATION.md',
  'docs/billing/44_PAYMENT_SECURITY_GUARDRAILS_IMPLEMENTATION.md',
  'docs/billing/45_M4BS_QA_AND_RELEASE_NOTES.md',
  'docs/billing/46_NEXT_PAYMENT_HARDENING_BACKLOG.md',
  'docs/qa/M4B-S_QA_REPORT.md',
  'docs/releases/0.28.0.md',
];
const failures = [];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`Missing M4B-S file: ${file}`);
}
const combined = required.filter((file) => fs.existsSync(path.join(root, file))).map((file) => fs.readFileSync(path.join(root, file), 'utf8')).join('\n').toLowerCase();
for (const term of ['stripe', 'paypal', 'subscription', 'credit wallet', 'refund', 'dispute', 'ledger append-only', 'reason obbligatoria', 'idempotency', 'no provider call', 'feature-flagged']) {
  if (!combined.includes(term)) failures.push(`Missing M4B-S term: ${term}`);
}
const billingModule = fs.readFileSync(path.join(root, 'apps/api/src/modules/billing/billing.module.ts'), 'utf8');
for (const term of ['BillingSubscription', 'CreditWallet', 'CreditLedgerEntry', 'RefundRequest', 'PaymentDispute', 'SubscriptionService', 'RefundService', 'PaymentReconciliationService']) {
  if (!billingModule.includes(term)) failures.push(`BillingModule missing ${term}`);
}
const appModule = fs.readFileSync(path.join(root, 'apps/api/src/app.module.ts'), 'utf8');
for (const term of ['BillingSubscription', 'CreditWallet', 'CreditLedgerEntry', 'RefundRequest', 'PaymentDispute']) {
  if (!appModule.includes(term)) failures.push(`AppModule missing ${term}`);
}
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (Number(pkg.version.split('.')[1]) < 28) failures.push(`Expected package version 0.28.0 or later, found ${pkg.version}`);
if (!pkg.scripts['qa:payment-providers-subscriptions-development']) failures.push('Missing qa:payment-providers-subscriptions-development script');
if (!pkg.scripts['release:check'].includes('qa:payment-providers-subscriptions-development')) failures.push('release:check missing payment providers subscriptions development QA');
if (failures.length) {
  console.error('QA M4B-S failed');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('QA M4B-S Payment Providers & Subscriptions Development passed');
