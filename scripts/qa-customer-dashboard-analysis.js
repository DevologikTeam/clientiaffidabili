const fs = require('fs');
const path = require('path');

const root = process.cwd();
const required = [
  'docs/sprints/M7-A_CUSTOMER_DASHBOARD_ANALYSIS.md',
  'docs/customer-dashboard/01_CUSTOMER_DASHBOARD_PRODUCT_STRATEGY.md',
  'docs/customer-dashboard/02_INFORMATION_ARCHITECTURE_ANALYSIS.md',
  'docs/customer-dashboard/03_POST_PURCHASE_LIFECYCLE_ANALYSIS.md',
  'docs/customer-dashboard/04_REPORT_ACCESS_DOWNLOAD_ANALYSIS.md',
  'docs/customer-dashboard/05_NOTIFICATIONS_TASKS_SUPPORT_ANALYSIS.md',
  'docs/customer-dashboard/06_PRIVACY_SECURITY_RBAC_ANALYSIS.md',
  'docs/customer-dashboard/07_CUSTOMER_DATA_MODEL_ANALYSIS.md',
  'docs/customer-dashboard/08_M7P_M7S_READINESS_CHECKLIST.md',
  'apps/web/lib/customer-dashboard/customer-dashboard-analysis.ts',
  'apps/api/src/modules/customer-dashboard/customer-dashboard.analysis.ts',
  'docs/qa/M7-A_QA_REPORT.md',
  'docs/releases/0.20.0.md',
];

const requiredKeywords = [
  'dashboard',
  'report',
  'ordini',
  'fatture',
  'supporto',
  'RBAC',
  'audit',
  'workspace',
  'M7-P',
  'M7-S',
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

const forbiddenCustomerCopy = [
  'raw payload visibile al cliente',
  'webhook da mostrare al cliente',
  'errore tecnico non spiegato',
  'rischio zero',
  'cliente sicuro al 100%',
  'solvibilità garantita',
];

const customerRuntimeFiles = [
  'apps/web/lib/customer-dashboard/customer-dashboard-analysis.ts',
  'apps/api/src/modules/customer-dashboard/customer-dashboard.analysis.ts',
];
const runtimeCopy = customerRuntimeFiles
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n')
  .toLowerCase();
for (const bad of forbiddenCustomerCopy) {
  if (runtimeCopy.includes(bad)) failures.push(`Forbidden customer runtime copy found: ${bad}`);
}

if (failures.length) {
  console.error('QA M7-A failed');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('QA M7-A passed');
