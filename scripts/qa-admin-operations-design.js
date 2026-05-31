const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const required = [
  'docs/sprints/M8-P_ADMIN_OPERATIONS_DESIGN.md',
  'docs/admin-operations/10_ADMIN_OPERATIONS_EXPERIENCE_BLUEPRINT.md',
  'docs/admin-operations/11_WORK_QUEUE_AND_FILTERS_BLUEPRINT.md',
  'docs/admin-operations/12_WORK_ITEM_DETAIL_AND_ACTIONS_BLUEPRINT.md',
  'docs/admin-operations/13_ADMIN_RBAC_AND_ACTION_MATRIX_BLUEPRINT.md',
  'docs/admin-operations/14_AUDIT_TIMELINE_AND_REASON_MODAL_BLUEPRINT.md',
  'docs/admin-operations/15_ADMIN_API_CONTRACTS_BLUEPRINT.md',
  'docs/admin-operations/16_ADMIN_UI_COMPONENTS_BLUEPRINT.md',
  'docs/admin-operations/17_M8S_IMPLEMENTATION_HANDOFF.md',
  'apps/api/src/modules/admin-operations/admin-operations.types.ts',
  'apps/api/src/modules/admin-operations/admin-operations-contracts.ts',
  'apps/web/lib/admin-operations/admin-operations-design.ts',
  'docs/qa/M8-P_QA_REPORT.md',
  'docs/releases/0.24.0.md',
];

let failed = false;
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) {
    console.error(`Missing required M8-P file: ${file}`);
    failed = true;
  }
}

const combined = required
  .filter((file) => fs.existsSync(path.join(root, file)))
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n')
  .toLowerCase();

for (const term of [
  'queue-first',
  'work item',
  'reason modal',
  'rbac',
  'audit',
  'raw payload',
  'provider',
  'pagamento confermato',
  'rimborso',
  'report',
  'supporto',
  'prossima azione',
  'api contract',
  'handoff',
]) {
  if (!combined.includes(term)) {
    console.error(`Missing admin operations design term: ${term}`);
    failed = true;
  }
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (Number(pkg.version.split('.')[1]) < 24) {
  console.error(`Expected package version 0.24.0 or later, found ${pkg.version}`);
  failed = true;
}
if (!pkg.scripts['qa:admin-operations-design']) {
  console.error('Missing qa:admin-operations-design script');
  failed = true;
}
if (!pkg.scripts['release:check'].includes('qa:admin-operations-design')) {
  console.error('release:check does not include qa:admin-operations-design');
  failed = true;
}

if (failed) process.exit(1);
console.log('M8-P Admin Operations Design QA passed');
