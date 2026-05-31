const fs = require('fs');
const path = require('path');

const root = process.cwd();
const required = [
  'docs/sprints/M7-P_CUSTOMER_DASHBOARD_DESIGN.md',
  'docs/customer-dashboard/09_CUSTOMER_DASHBOARD_EXPERIENCE_BLUEPRINT.md',
  'docs/customer-dashboard/10_CHECKS_HISTORY_AND_DETAIL_BLUEPRINT.md',
  'docs/customer-dashboard/11_REPORT_ACCESS_AND_DOWNLOAD_BLUEPRINT.md',
  'docs/customer-dashboard/12_BILLING_AND_SUBSCRIPTION_ACCOUNT_BLUEPRINT.md',
  'docs/customer-dashboard/13_NOTIFICATIONS_TASKS_SUPPORT_BLUEPRINT.md',
  'docs/customer-dashboard/14_CUSTOMER_DASHBOARD_UI_COMPONENTS_BLUEPRINT.md',
  'docs/customer-dashboard/15_CUSTOMER_DASHBOARD_API_CONTRACTS.md',
  'docs/customer-dashboard/16_M7S_IMPLEMENTATION_HANDOFF.md',
  'apps/web/lib/customer-dashboard/customer-dashboard-design.ts',
  'apps/api/src/modules/customer-dashboard/customer-dashboard.types.ts',
  'docs/qa/M7-P_QA_REPORT.md',
  'docs/releases/0.21.0.md',
];

const requiredKeywords = [
  'dashboard',
  'verifiche',
  'report',
  'fatture',
  'supporto',
  'notifiche',
  'RBAC',
  'audit',
  'M7-S',
  'Stripe',
  'PayPal',
  'subscription',
];

const failures = [];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`Missing ${file}`);
}

const combined = required
  .filter((file) => fs.existsSync(path.join(root, file)))
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n');

for (const keyword of requiredKeywords) {
  if (!combined.includes(keyword)) failures.push(`Missing keyword ${keyword}`);
}

const forbiddenRuntimePhrases = [
  'rischio zero',
  'cliente sicuro al 100%',
  'solvibilità garantita',
  'raw payload visibile',
  'webhook da mostrare',
  'debug cliente',
];

const runtimeFiles = [
  'apps/web/lib/customer-dashboard/customer-dashboard-design.ts',
  'apps/api/src/modules/customer-dashboard/customer-dashboard.types.ts',
];
const runtimeCopy = runtimeFiles
  .filter((file) => fs.existsSync(path.join(root, file)))
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8').toLowerCase())
  .join('\n');

for (const phrase of forbiddenRuntimePhrases) {
  if (runtimeCopy.includes(phrase)) failures.push(`Forbidden runtime phrase found: ${phrase}`);
}

if (!combined.includes('Report accessibile solo se `published`') && !combined.includes('report pubblicato')) {
  failures.push('Missing published report access guardrail');
}

if (failures.length) {
  console.error('QA M7-P failed');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('QA M7-P passed');
