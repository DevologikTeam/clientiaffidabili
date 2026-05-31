const fs = require('fs');
const path = require('path');

const root = process.cwd();
const requiredFiles = [
  'docs/analytics/26_TAG_MANAGER_CLARITY_ROADMAP_INSERT.md',
  'docs/analytics/27_TAG_MANAGER_CLARITY_SETTINGS_BLUEPRINT.md',
  'docs/analytics/28_CAMPAIGN_EVENT_TAGGING_TAXONOMY.md',
  'docs/analytics/29_TAG_MANAGER_CLARITY_ROADMAP_QA.md',
  'apps/web/lib/analytics/tag-manager-clarity-roadmap.ts',
  'apps/api/src/modules/analytics/tag-manager-clarity-roadmap.ts',
];

const requiredTerms = [
  'Tag Manager',
  'Clarity',
  'consent',
  'dataLayer',
  'PII',
  '/admin',
  '/checkout',
  'qa-source-syntax-smoke',
  'GTM-',
  'ca_checkout_started',
  'ca_payment_completed',
];

const forbiddenPatterns = [
  /email\s*:\s*true/i,
  /send.*rawPayload/i,
  /clarity.*admin.*enabled by default/i,
];

let errors = [];
for (const file of requiredFiles) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) errors.push(`Missing required file: ${file}`);
}

const combined = requiredFiles
  .filter((file) => fs.existsSync(path.join(root, file)))
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n');

for (const term of requiredTerms) {
  if (!combined.includes(term)) errors.push(`Missing required term: ${term}`);
}

for (const pattern of forbiddenPatterns) {
  if (pattern.test(combined)) errors.push(`Forbidden unsafe tracking pattern found: ${pattern}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('qa-tag-manager-clarity-roadmap passed');
