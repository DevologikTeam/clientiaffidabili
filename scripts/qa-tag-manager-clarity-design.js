const fs = require('fs');
const path = require('path');

const root = process.cwd();
const required = [
  'docs/sprints/M16B-P_TAG_MANAGER_CLARITY_DESIGN.md',
  'docs/analytics/38_TAG_MANAGER_CLARITY_EXPERIENCE_BLUEPRINT.md',
  'docs/analytics/39_TAG_SETTINGS_API_UI_BLUEPRINT.md',
  'docs/analytics/40_TAG_LOADER_AND_CONSENT_BLUEPRINT.md',
  'docs/analytics/41_DATA_LAYER_EVENT_REGISTRY_BLUEPRINT.md',
  'docs/analytics/42_ROUTE_GUARDS_CLARITY_MASKING_BLUEPRINT.md',
  'docs/analytics/43_CAMPAIGN_ATTRIBUTION_BLUEPRINT.md',
  'docs/analytics/44_QA_ANTI_PII_TAGGING_BLUEPRINT.md',
  'docs/analytics/45_M16BS_IMPLEMENTATION_HANDOFF.md',
  'apps/api/src/modules/analytics/tag-manager-clarity-design.types.ts',
  'apps/web/lib/analytics/tag-manager-clarity-design.ts'
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('Missing M16B-P files:', missing.join(', '));
  process.exit(1);
}

const joined = required.map((file) => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
const requiredTerms = [
  'GTM',
  'Clarity',
  'Consent Mode',
  'analytics_storage',
  'ad_storage',
  'ad_user_data',
  'ad_personalization',
  'dataLayer',
  'denylist',
  '/admin',
  '/dashboard',
  '/checkout',
  '/reports',
  '/fatture',
  'reason',
  'audit',
  'forbiddenExternalEventKeys',
  'TagManagerProvider',
  'ClarityProvider'
];

const missingTerms = requiredTerms.filter((term) => !joined.includes(term));
if (missingTerms.length) {
  console.error('M16B-P missing required terms:', missingTerms.join(', '));
  process.exit(1);
}

const apiDesign = fs.readFileSync(path.join(root, 'apps/api/src/modules/analytics/tag-manager-clarity-design.types.ts'), 'utf8');
for (const consent of ['analytics_storage', 'ad_storage', 'ad_user_data', 'ad_personalization']) {
  const pattern = new RegExp(`${consent}: 'denied'`);
  if (!pattern.test(apiDesign)) {
    console.error(`Consent default is not denied for ${consent}`);
    process.exit(1);
  }
}

const webDesign = fs.readFileSync(path.join(root, 'apps/web/lib/analytics/tag-manager-clarity-design.ts'), 'utf8');
for (const route of ['/admin', '/dashboard', '/checkout', '/reports', '/fatture', '/api']) {
  if (!webDesign.includes(route)) {
    console.error(`Clarity block route missing: ${route}`);
    process.exit(1);
  }
}

if (/dataLayer\.push\(/.test(joined) && !joined.includes('helper controllato')) {
  console.error('Direct dataLayer.push appears without controlled helper warning');
  process.exit(1);
}

console.log('qa-tag-manager-clarity-design passed');
