const fs = require('fs');
const path = require('path');

const root = process.cwd();
const required = [
  'docs/sprints/M16B-A_TAG_MANAGER_CLARITY_ANALYSIS.md',
  'docs/analytics/30_TAG_MANAGER_CLARITY_PRODUCT_STRATEGY_ANALYSIS.md',
  'docs/analytics/31_ADMIN_BACKEND_TAG_SETTINGS_ANALYSIS.md',
  'docs/analytics/32_CONSENT_MODE_PRIVACY_ANALYSIS.md',
  'docs/analytics/33_CAMPAIGN_EVENT_TAGGING_ANALYSIS.md',
  'docs/analytics/34_CLARITY_SESSION_RECORDING_SENSITIVE_AREAS_ANALYSIS.md',
  'docs/analytics/35_DATA_LAYER_AND_ROUTE_TAGGING_ANALYSIS.md',
  'docs/analytics/36_TAG_MANAGER_CLARITY_QA_SECURITY_ANALYSIS.md',
  'docs/analytics/37_M16BP_M16BS_READINESS_CHECKLIST.md',
  'apps/api/src/modules/analytics/tag-manager-clarity.analysis.ts',
  'apps/web/lib/analytics/tag-manager-clarity-analysis.ts'
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('Missing M16B-A files:', missing.join(', '));
  process.exit(1);
}

const joined = required.map((file) => fs.readFileSync(path.join(root, file), 'utf8')).join('\\n');
const mustContain = [
  'Google Tag Manager',
  'Microsoft Clarity',
  'Consent Mode',
  'ad_user_data',
  'ad_personalization',
  'analytics_storage',
  'ad_storage',
  '/admin',
  '/checkout',
  '/dashboard',
  'PII',
  'raw payload',
  'dataLayer',
  'admin/backend',
  'reason obbligatoria'
];

const missingTerms = mustContain.filter((term) => !joined.includes(term));
if (missingTerms.length) {
  console.error('M16B-A missing required terms:', missingTerms.join(', '));
  process.exit(1);
}

const forbiddenInExternalExamples = ['email:', 'iban:', 'apiKey:', 'rawPayload:'];
const bad = forbiddenInExternalExamples.filter((term) => joined.includes(term));
if (bad.length) {
  console.error('Potential unsafe external event example fields found:', bad.join(', '));
  process.exit(1);
}

console.log('qa-tag-manager-clarity-analysis passed');
