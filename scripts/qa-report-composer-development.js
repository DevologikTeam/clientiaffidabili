const fs = require('fs');
const path = require('path');

const root = process.cwd();
const required = [
  'apps/api/src/modules/reports/report-composer.service.ts',
  'apps/api/src/modules/reports/report-score.service.ts',
  'apps/api/src/modules/reports/reports.controller.ts',
  'apps/web/components/reports/ReportHero.tsx',
  'apps/web/components/reports/EvidenceCard.tsx',
  'apps/web/components/reports/ReportSection.tsx',
  'apps/web/app/admin/reports/page.tsx',
  'apps/web/lib/reports/report-runtime.ts',
  'docs/sprints/M6-S_REPORT_COMPOSER_DEVELOPMENT.md',
  'docs/billing/21_STRIPE_PAYPAL_SUBSCRIPTIONS_EVALUATION.md',
  'apps/api/src/modules/billing/payment-methods.blueprint.ts',
  'docs/releases/0.19.0.md',
];

const forbiddenClaims = [
  'rischio zero',
  'cliente sicuro al 100%',
  'pagherà sicuramente',
  'solvibilità garantita',
  'approvato definitivamente',
];

const failures = [];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`Missing ${file}`);
}

for (const file of [
  'apps/api/src/modules/reports/report-composer.service.ts',
  'apps/web/lib/reports/report-runtime.ts',
  'apps/web/app/reports/[id]/page.tsx',
]) {
  const content = fs.readFileSync(path.join(root, file), 'utf8').toLowerCase();
  for (const claim of forbiddenClaims) {
    if (content.includes(claim)) failures.push(`Forbidden claim found in ${file}: ${claim}`);
  }
}

const billingDoc = fs.readFileSync(path.join(root, 'docs/billing/21_STRIPE_PAYPAL_SUBSCRIPTIONS_EVALUATION.md'), 'utf8');
for (const keyword of ['Stripe', 'PayPal', 'abbonamenti', 'webhook', 'idempotenti']) {
  if (!billingDoc.includes(keyword)) failures.push(`Payment addendum missing keyword ${keyword}`);
}

if (failures.length) {
  console.error('QA M6-S failed');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('QA M6-S passed');
