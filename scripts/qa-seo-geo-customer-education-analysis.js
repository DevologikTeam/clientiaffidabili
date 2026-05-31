const fs = require('fs');
const path = require('path');

const root = process.cwd();
const required = [
  'docs/sprints/M14B-A_SEO_GEO_CUSTOMER_EDUCATION_PAGES_ANALYSIS.md',
  'docs/seo-geo/08_CUSTOMER_EDUCATION_CONTENT_STRATEGY_ANALYSIS.md',
  'docs/seo-geo/09_SEARCH_INTENT_AND_TOPIC_CLUSTER_ANALYSIS.md',
  'docs/seo-geo/10_CUSTOMER_EDUCATION_PAGE_ARCHITECTURE_ANALYSIS.md',
  'docs/seo-geo/11_GUARANTEE_VALUE_AND_LIMITS_COPY_ANALYSIS.md',
  'docs/seo-geo/12_CMS_EDITORIAL_GOVERNANCE_ANALYSIS.md',
  'docs/seo-geo/13_SEO_GEO_MEASUREMENT_AND_ITERATION_ANALYSIS.md',
  'docs/seo-geo/14_M14BP_M14BS_READINESS_CHECKLIST.md',
  'apps/web/lib/seo-geo/customer-education-analysis.ts',
  'apps/api/src/modules/seo-cms/customer-education.analysis.ts',
  'docs/qa/M14B-A_QA_REPORT.md',
  'docs/releases/0.48.0.md',
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('Missing M14B-A files:', missing.join('\n'));
  process.exit(1);
}

const strategy = fs.readFileSync(path.join(root, 'docs/seo-geo/08_CUSTOMER_EDUCATION_CONTENT_STRATEGY_ANALYSIS.md'), 'utf8');
const guarantee = fs.readFileSync(path.join(root, 'docs/seo-geo/11_GUARANTEE_VALUE_AND_LIMITS_COPY_ANALYSIS.md'), 'utf8');
const registry = fs.readFileSync(path.join(root, 'apps/web/lib/seo-geo/customer-education-analysis.ts'), 'utf8');

const requiredPhrases = [
  'problem-aware',
  'solution-aware',
  'purchase-aware',
  'trust-aware',
  'rischio zero',
  'pagamento garantito',
  'operational-guarantee',
  'guide_viewed',
];

const combined = strategy + '\n' + guarantee + '\n' + registry;
const missingPhrases = requiredPhrases.filter((phrase) => !combined.includes(phrase));
if (missingPhrases.length) {
  console.error('Missing required M14B-A concepts:', missingPhrases.join(', '));
  process.exit(1);
}

console.log('M14B-A SEO/GEO customer education analysis QA passed.');
