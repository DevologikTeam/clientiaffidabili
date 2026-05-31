const fs = require('fs');
const path = require('path');

const root = process.cwd();
const requiredFiles = [
  'docs/sprints/M15B-A_PLATFORM_SETTINGS_BOOTSTRAP_ADMIN_OPERATIONAL_ERROR_LEDGER_ANALYSIS.md',
  'docs/settings-admin/07_PLATFORM_SETTINGS_PRODUCT_STRATEGY_ANALYSIS.md',
  'docs/settings-admin/08_BOOTSTRAP_ADMIN_ANALYSIS.md',
  'docs/settings-admin/09_PURCHASE_KILL_SWITCH_ANALYSIS.md',
  'docs/settings-admin/10_PROVIDER_SETTINGS_GOVERNANCE_ANALYSIS.md',
  'docs/settings-admin/11_OPENAI_SETTINGS_USAGE_GUARDRAILS_ANALYSIS.md',
  'docs/settings-admin/12_OPERATIONAL_ERROR_LEDGER_ANALYSIS.md',
  'docs/settings-admin/13_BUYER_IP_AUDIT_PRIVACY_ANALYSIS.md',
  'docs/settings-admin/14_SETTINGS_DATA_MODEL_ANALYSIS.md',
  'docs/settings-admin/15_M15BP_M15BS_READINESS_CHECKLIST.md',
  'apps/api/src/modules/settings-admin/settings-admin.analysis.ts',
  'apps/web/lib/settings-admin/settings-admin-analysis.ts',
];

const requiredTerms = [
  'bootstrap admin',
  'kill switch',
  'OpenAI',
  'Openapi',
  'OperationalErrorEvent',
  'buyerIpHash',
  'reason',
  'audit',
  'secret',
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('Missing required M15B-A files:', missing);
  process.exit(1);
}

const corpus = requiredFiles
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n');

const missingTerms = requiredTerms.filter((term) => !corpus.includes(term));
if (missingTerms.length) {
  console.error('Missing required M15B-A terms:', missingTerms);
  process.exit(1);
}

const forbiddenPatterns = [
  /sk-[A-Za-z0-9_\-]{20,}/,
  /OPENAI_API_KEY\s*=\s*sk-/,
  /STRIPE_SECRET_KEY\s*=\s*sk_/,
];

for (const pattern of forbiddenPatterns) {
  if (pattern.test(corpus)) {
    console.error('Potential secret-like value found in M15B-A docs.');
    process.exit(1);
  }
}

console.log('qa-settings-admin-analysis: passed');
