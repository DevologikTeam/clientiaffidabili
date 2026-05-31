const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const required = [
  'docs/sprints/M8-A_ADMIN_OPERATIONS_ANALYSIS.md',
  'docs/admin-operations/01_ADMIN_OPERATIONS_PRODUCT_STRATEGY.md',
  'docs/admin-operations/02_OPERATIONS_INFORMATION_ARCHITECTURE.md',
  'docs/admin-operations/03_OPERATIONAL_QUEUE_ANALYSIS.md',
  'docs/admin-operations/04_ORDER_BILLING_PROVIDER_REPORT_OPERATIONS.md',
  'docs/admin-operations/05_ADMIN_ROLES_PERMISSIONS_ANALYSIS.md',
  'docs/admin-operations/06_ADMIN_AUDIT_AND_COMPLIANCE_ANALYSIS.md',
  'docs/admin-operations/07_ADMIN_DATA_MODEL_ANALYSIS.md',
  'docs/admin-operations/08_ADMIN_OPERATIONS_SECURITY_RISK_ANALYSIS.md',
  'docs/admin-operations/09_M8P_M8S_READINESS_CHECKLIST.md',
  'apps/api/src/modules/admin-operations/admin-operations.analysis.ts',
  'apps/web/lib/admin-operations/admin-operations-analysis.ts',
  'docs/qa/M8-A_QA_REPORT.md',
  'docs/releases/0.23.0.md',
];

let failed = false;
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) {
    console.error(`Missing required M8-A file: ${file}`);
    failed = true;
  }
}

const combined = required
  .filter((file) => fs.existsSync(path.join(root, file)))
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n')
  .toLowerCase();

for (const term of [
  'queue',
  'audit',
  'rbac',
  'raw payload',
  'provider',
  'pagamento confermato',
  'reason',
  'rimborso',
  'report',
  'supporto',
  'prossima azione',
]) {
  if (!combined.includes(term)) {
    console.error(`Missing admin operations analysis term: ${term}`);
    failed = true;
  }
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (Number(pkg.version.split('.')[1]) < 23) {
  console.error(`Expected package version 0.23.0 or later, found ${pkg.version}`);
  failed = true;
}
if (!pkg.scripts['qa:admin-operations-analysis']) {
  console.error('Missing qa:admin-operations-analysis script');
  failed = true;
}
if (!pkg.scripts['release:check'].includes('qa:admin-operations-analysis')) {
  console.error('release:check does not include qa:admin-operations-analysis');
  failed = true;
}

if (failed) process.exit(1);
console.log('M8-A Admin Operations Analysis QA passed');
