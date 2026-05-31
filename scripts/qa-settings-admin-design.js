const fs = require('fs');
const path = require('path');

const root = process.cwd();
const required = [
  'docs/sprints/M15B-P_PLATFORM_SETTINGS_BOOTSTRAP_ADMIN_OPERATIONAL_ERROR_LEDGER_DESIGN.md',
  'docs/settings-admin/16_SETTINGS_ADMIN_EXPERIENCE_BLUEPRINT.md',
  'docs/settings-admin/17_BOOTSTRAP_ADMIN_WORKFLOW_BLUEPRINT.md',
  'docs/settings-admin/18_PURCHASE_KILL_SWITCH_RUNTIME_BLUEPRINT.md',
  'docs/settings-admin/19_PROVIDER_SETTINGS_SECRETS_BLUEPRINT.md',
  'docs/settings-admin/20_OPENAI_SETTINGS_COST_GUARDRAILS_BLUEPRINT.md',
  'docs/settings-admin/21_OPERATIONAL_ERROR_LEDGER_DATA_MODEL_BLUEPRINT.md',
  'docs/settings-admin/22_BUYER_IP_AUDIT_BLUEPRINT.md',
  'docs/settings-admin/23_SETTINGS_ADMIN_API_CONTRACTS_BLUEPRINT.md',
  'docs/settings-admin/24_SETTINGS_ADMIN_UI_COMPONENTS_BLUEPRINT.md',
  'docs/settings-admin/25_ERROR_LEDGER_REFUND_FIX_WORKFLOW_BLUEPRINT.md',
  'docs/settings-admin/26_SETTINGS_ADMIN_DATA_MODEL_BLUEPRINT.md',
  'docs/settings-admin/27_M15BS_IMPLEMENTATION_HANDOFF.md',
  'apps/api/src/modules/settings-admin/settings-admin-design.types.ts',
  'apps/api/src/modules/settings-admin/settings-admin-contracts.ts',
  'apps/web/lib/settings-admin/settings-admin-design-blueprint.ts',
  'docs/qa/M15B-P_QA_REPORT.md',
  'docs/releases/0.55.0.md',
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('Missing required M15B-P files:', missing.join('\n'));
  process.exit(1);
}

const combined = required
  .filter((file) => file.endsWith('.md') || file.endsWith('.ts'))
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n');

const requiredTerms = [
  'bootstrap',
  'kill switch',
  'Stripe',
  'PayPal',
  'Openapi',
  'OpenAI',
  'OperationalError',
  'buyerIpHash',
  'reason',
  'audit',
  'secret',
  'rimborso',
];

const missingTerms = requiredTerms.filter((term) => !combined.toLowerCase().includes(term.toLowerCase()));
if (missingTerms.length) {
  console.error('M15B-P blueprint missing terms:', missingTerms.join(', '));
  process.exit(1);
}

console.log('qa-settings-admin-design: passed');
