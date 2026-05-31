const fs = require('fs');
const path = require('path');

const root = process.cwd();
const requiredFiles = [
  'docs/sprints/M16-A_ANALYTICS_ATTRIBUTION_GROWTH_INTELLIGENCE_ANALYSIS.md',
  'docs/analytics/01_ANALYTICS_PRODUCT_STRATEGY.md',
  'docs/analytics/02_EVENT_TAXONOMY_ANALYSIS.md',
  'docs/analytics/03_ATTRIBUTION_AND_FUNNEL_ANALYSIS.md',
  'docs/analytics/04_SEO_GEO_MEASUREMENT_ANALYSIS.md',
  'docs/analytics/05_CONSENT_PRIVACY_DATA_GOVERNANCE_ANALYSIS.md',
  'docs/analytics/06_GROWTH_DASHBOARD_AND_KPI_ANALYSIS.md',
  'docs/analytics/07_PROVIDER_PAYMENT_OPENAI_ERROR_INSIGHTS_ANALYSIS.md',
  'docs/analytics/08_M16P_M16S_READINESS_CHECKLIST.md',
  'docs/research/M16A_ANALYTICS_GROWTH_SOURCE_NOTES.md',
  'apps/api/src/modules/analytics/analytics-growth.analysis.ts',
  'apps/web/lib/analytics/analytics-growth-analysis.ts',
];

const forbiddenInAnalytics = [
  'raw payload exposed',
  'track email in analytics',
  'track phone in analytics',
  'track card data',
  'track api key',
];

let failed = false;
for (const file of requiredFiles) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    console.error(`Missing required file: ${file}`);
    failed = true;
    continue;
  }
  const text = fs.readFileSync(full, 'utf8');
  for (const forbidden of forbiddenInAnalytics) {
    if (text.toLowerCase().includes(forbidden)) {
      console.error(`Forbidden analytics wording found in ${file}: ${forbidden}`);
      failed = true;
    }
  }
}

const taxonomy = fs.readFileSync(path.join(root, 'docs/analytics/02_EVENT_TAXONOMY_ANALYSIS.md'), 'utf8');
const requiredTerms = [
  'public_page_view',
  'checkout_started',
  'payment_confirmed',
  'provider_request_failed',
  'openai_operation_failed',
  'lead_created',
  'Payload vietato',
];
for (const term of requiredTerms) {
  if (!taxonomy.includes(term)) {
    console.error(`Event taxonomy missing term: ${term}`);
    failed = true;
  }
}

const privacy = fs.readFileSync(path.join(root, 'docs/analytics/05_CONSENT_PRIVACY_DATA_GOVERNANCE_ANALYSIS.md'), 'utf8');
for (const term of ['email', 'raw payload', 'OpenAI', 'IP acquisto', 'retention']) {
  if (!privacy.includes(term)) {
    console.error(`Privacy governance missing required topic: ${term}`);
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}
console.log('qa-analytics-growth-analysis: passed');
