#!/usr/bin/env node
const fs = require('fs');
const required = [
  'docs/settings-admin/01_PLATFORM_SETTINGS_ROADMAP_INSERT.md',
  'docs/settings-admin/02_BOOTSTRAP_ADMIN_AND_PURCHASE_KILL_SWITCH_BLUEPRINT.md',
  'docs/settings-admin/03_PAYMENT_OPENAPI_OPENAI_SETTINGS_BLUEPRINT.md',
  'docs/settings-admin/04_OPERATIONAL_ERROR_LEDGER_BLUEPRINT.md',
  'docs/settings-admin/05_PURCHASE_IP_AUDIT_PRIVACY_BLUEPRINT.md',
  'docs/settings-admin/06_SETTINGS_ADMIN_API_AND_UI_BLUEPRINT.md',
  'apps/api/src/modules/settings-admin/settings-admin.types.ts',
  'apps/web/lib/settings-admin/settings-admin-design.ts',
];
const missing = required.filter((f) => !fs.existsSync(f));
const roadmap = fs.readFileSync('docs/settings-admin/01_PLATFORM_SETTINGS_ROADMAP_INSERT.md','utf8');
const tokens = ['M15B-A', 'M15B-P', 'M15B-S', 'kill switch', 'OpenAI', 'Openapi'];
const missingTokens = tokens.filter((t) => !roadmap.includes(t));
if (missing.length || missingTokens.length) {
  console.error('Settings admin roadmap QA failed.');
  if (missing.length) console.error('Missing files:', missing);
  if (missingTokens.length) console.error('Missing roadmap tokens:', missingTokens);
  process.exit(1);
}
console.log('Settings admin roadmap QA passed.');
