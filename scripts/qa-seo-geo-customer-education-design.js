const fs = require('fs');
const path = require('path');

const root = process.cwd();
const requiredFiles = [
  'docs/sprints/M14B-P_SEO_GEO_CUSTOMER_EDUCATION_PAGES_DESIGN.md',
  'docs/seo-geo/15_CUSTOMER_EDUCATION_PAGE_TEMPLATE_BLUEPRINT.md',
  'docs/seo-geo/16_MVP_PAGE_COPY_DECK.md',
  'docs/seo-geo/17_FAQ_SCHEMA_INTERNAL_LINKING_BLUEPRINT.md',
  'docs/seo-geo/18_CMS_EDITORIAL_FIELD_MODEL_BLUEPRINT.md',
  'docs/seo-geo/19_EDITORIAL_QA_AND_CLAIM_GUARDRAILS_BLUEPRINT.md',
  'docs/seo-geo/20_CUSTOMER_EDUCATION_UI_COMPONENTS_BLUEPRINT.md',
  'docs/seo-geo/21_M14BS_IMPLEMENTATION_HANDOFF.md',
  'apps/web/lib/seo-geo/customer-education-design.ts',
  'apps/api/src/modules/seo-cms/customer-education.design.types.ts',
  'docs/releases/0.49.0.md'
];

const mustContain = [
  ['docs/sprints/M14B-P_SEO_GEO_CUSTOMER_EDUCATION_PAGES_DESIGN.md', 'garanzia operativa'],
  ['docs/seo-geo/15_CUSTOMER_EDUCATION_PAGE_TEMPLATE_BLUEPRINT.md', 'GeoAnswerBox'],
  ['docs/seo-geo/16_MVP_PAGE_COPY_DECK.md', 'cliente-non-paga-come-prevenire'],
  ['docs/seo-geo/17_FAQ_SCHEMA_INTERNAL_LINKING_BLUEPRINT.md', 'FAQPage'],
  ['docs/seo-geo/18_CMS_EDITORIAL_FIELD_MODEL_BLUEPRINT.md', 'publishChecklist'],
  ['docs/seo-geo/19_EDITORIAL_QA_AND_CLAIM_GUARDRAILS_BLUEPRINT.md', 'Claim vietati'],
  ['docs/seo-geo/20_CUSTOMER_EDUCATION_UI_COMPONENTS_BLUEPRINT.md', 'EducationHero'],
  ['docs/seo-geo/21_M14BS_IMPLEMENTATION_HANDOFF.md', 'M14B-S'],
  ['apps/web/lib/seo-geo/customer-education-design.ts', 'educationPageBlueprints'],
  ['apps/api/src/modules/seo-cms/customer-education.design.types.ts', 'SeoEducationPublishChecklist']
];

let failed = false;
for (const file of requiredFiles) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    console.error(`Missing required file: ${file}`);
    failed = true;
  }
}

for (const [file, token] of mustContain) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) continue;
  const text = fs.readFileSync(full, 'utf8');
  if (!text.includes(token)) {
    console.error(`File ${file} does not contain token: ${token}`);
    failed = true;
  }
}

const design = fs.readFileSync(path.join(root, 'apps/web/lib/seo-geo/customer-education-design.ts'), 'utf8');
const blueprintCount = (design.match(/slug:/g) || []).length;
if (blueprintCount < 4) {
  console.error(`Expected at least 4 education page blueprint seeds, found ${blueprintCount}`);
  failed = true;
}

const handoff = fs.readFileSync(path.join(root, 'docs/seo-geo/21_M14BS_IMPLEMENTATION_HANDOFF.md'), 'utf8');
for (const required of ['backend', 'frontend pubblico', 'frontend admin', 'QA']) {
  if (!handoff.toLowerCase().includes(required.toLowerCase())) {
    console.error(`Handoff missing section keyword: ${required}`);
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}
console.log('qa-seo-geo-customer-education-design: passed');
