const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const required = [
  'apps/api/src/modules/admin-operations/admin-operations.module.ts',
  'apps/api/src/modules/admin-operations/admin-operations.controller.ts',
  'apps/api/src/modules/admin-operations/admin-operations.service.ts',
  'apps/api/src/modules/admin-operations/dto/execute-admin-action.dto.ts',
  'apps/api/src/modules/admin-operations/entities/admin-work-item.entity.ts',
  'apps/api/src/modules/admin-operations/entities/admin-action-audit.entity.ts',
  'apps/web/lib/admin-operations/admin-operations-runtime.ts',
  'apps/web/components/admin-operations/AdminOperationsShell.tsx',
  'apps/web/components/admin-operations/OperationsPriorityStrip.tsx',
  'apps/web/components/admin-operations/WorkQueueTable.tsx',
  'apps/web/components/admin-operations/AdminActionPanel.tsx',
  'apps/web/components/admin-operations/ReasonModalPreview.tsx',
  'apps/web/components/admin-operations/AuditTimeline.tsx',
  'apps/web/app/admin/operations/page.tsx',
  'apps/web/app/admin/operations/[id]/page.tsx',
  'docs/sprints/M8-S_ADMIN_OPERATIONS_DEVELOPMENT.md',
  'docs/admin-operations/18_ADMIN_OPERATIONS_IMPLEMENTATION_NOTES.md',
  'docs/admin-operations/19_ADMIN_OPERATIONS_API_IMPLEMENTATION.md',
  'docs/admin-operations/20_ADMIN_OPERATIONS_UI_IMPLEMENTATION.md',
  'docs/admin-operations/21_ADMIN_RBAC_AUDIT_IMPLEMENTATION.md',
  'docs/admin-operations/22_ADMIN_OPERATIONS_QA_GUARDRAILS.md',
  'docs/qa/M8-S_QA_REPORT.md',
  'docs/releases/0.25.0.md',
];

const failures = [];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`Missing required M8-S file: ${file}`);
}

const combined = required
  .filter((file) => fs.existsSync(path.join(root, file)))
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n')
  .toLowerCase();

for (const term of [
  'queue-first',
  'work item',
  'reason',
  'idempotency',
  'audit',
  'raw payload',
  'rbac',
  'provider',
  'pagamento confermato',
  'rimborso',
  'report',
  'supporto',
  'prossima azione',
]) {
  if (!combined.includes(term)) failures.push(`Missing admin operations development term: ${term}`);
}

const appModule = fs.readFileSync(path.join(root, 'apps/api/src/app.module.ts'), 'utf8');
if (!appModule.includes('AdminOperationsModule')) failures.push('AppModule does not import AdminOperationsModule');
if (!appModule.includes('AdminWorkItem') || !appModule.includes('AdminActionAudit')) failures.push('AppModule does not register admin operation entities');

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (Number(pkg.version.split('.')[1]) < 25) failures.push(`Expected package version 0.25.0 or later, found ${pkg.version}`);
if (!pkg.scripts['qa:admin-operations-development']) failures.push('Missing qa:admin-operations-development script');
if (!pkg.scripts['release:check'].includes('qa:admin-operations-development')) failures.push('release:check does not include qa:admin-operations-development');

if (failures.length) {
  console.error('QA M8-S failed');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('QA M8-S Admin Operations Development passed');
