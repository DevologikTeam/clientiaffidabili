const fs = require('fs');
const path = require('path');

const root = process.cwd();
const required = [
  'docs/sprints/M14-P_LAUNCH_WEBSITE_SEO_GEO_COMMERCIAL_READINESS_DESIGN.md',
  'docs/launch-website/11_LAUNCH_WEBSITE_EXPERIENCE_BLUEPRINT.md',
  'docs/launch-website/12_SEO_GEO_PAGE_TEMPLATE_BLUEPRINT.md',
  'docs/launch-website/13_COPY_VALUE_GUARANTEE_BLUEPRINT.md',
  'docs/launch-website/14_METADATA_SCHEMA_SITEMAP_BLUEPRINT.md',
  'docs/launch-website/15_CONVERSION_TRACKING_PRIVACY_BLUEPRINT.md',
  'docs/launch-website/16_CMS_EDITORIAL_GOVERNANCE_BLUEPRINT.md',
  'docs/launch-website/17_COMMERCIAL_READINESS_BLUEPRINT.md',
  'docs/launch-website/18_LAUNCH_WEBSITE_UI_COMPONENTS_BLUEPRINT.md',
  'docs/launch-website/19_M14S_IMPLEMENTATION_HANDOFF.md',
  'apps/web/lib/launch-website/launch-website-design.ts',
  'apps/api/src/modules/launch-website/launch-website-design.types.ts',
  'docs/releases/0.46.0.md',
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('Missing required files:', missing.join('\n'));
  process.exit(1);
}

const design = fs.readFileSync(path.join(root, 'apps/web/lib/launch-website/launch-website-design.ts'), 'utf8');
const docs = required.filter((f) => f.endsWith('.md')).map((f) => fs.readFileSync(path.join(root, f), 'utf8')).join('\n');

const requiredTerms = [
  'SEO/GEO',
  'garanzia operativa',
  'sitemap',
  'JSON-LD',
  'privacy-safe',
  'claim',
  'CMS',
  'published',
  'noindex',
  'M14-S',
];
for (const term of requiredTerms) {
  if (!docs.includes(term)) {
    console.error(`Missing required design term: ${term}`);
    process.exit(1);
  }
}

const blockedClaims = ['rischio zero', 'pagamento garantito', 'solvibilita garantita'];
for (const claim of blockedClaims) {
  if (!design.includes(claim)) {
    console.error(`Blocked claim not registered: ${claim}`);
    process.exit(1);
  }
}

if (!design.includes('allowedLaunchTrackingEvents')) {
  console.error('Missing privacy-safe tracking registry');
  process.exit(1);
}

console.log('qa-launch-website-commercial-readiness-design: passed');
