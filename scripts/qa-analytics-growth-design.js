#!/usr/bin/env node
const fs = require('fs');
const required = [
  'docs/sprints/M16-P_ANALYTICS_ATTRIBUTION_GROWTH_INTELLIGENCE_DESIGN.md',
  'docs/analytics/09_ANALYTICS_EVENT_TAXONOMY_BLUEPRINT.md',
  'docs/analytics/10_ATTRIBUTION_MODEL_BLUEPRINT.md',
  'docs/analytics/11_GROWTH_DASHBOARD_KPI_BLUEPRINT.md',
  'docs/analytics/12_CONSENT_AND_PRIVACY_BLUEPRINT.md',
  'docs/analytics/13_SEO_GEO_MEASUREMENT_BLUEPRINT.md',
  'docs/analytics/14_PROVIDER_PAYMENT_OPENAI_ERROR_INSIGHTS_BLUEPRINT.md',
  'docs/analytics/15_ANALYTICS_API_CONTRACTS_BLUEPRINT.md',
  'docs/analytics/16_ANALYTICS_DATA_MODEL_BLUEPRINT.md',
  'docs/analytics/17_ADMIN_ANALYTICS_UI_BLUEPRINT.md',
  'docs/analytics/18_M16S_IMPLEMENTATION_HANDOFF.md',
  'apps/api/src/modules/analytics/analytics-growth-design.types.ts',
  'apps/api/src/modules/analytics/analytics-event-registry.ts',
  'apps/web/lib/analytics/analytics-growth-design.ts',
  'docs/qa/M16-P_QA_REPORT.md',
  'docs/releases/0.58.0.md'
];
const forbidden = ['rawPayload: true', 'email:', 'cardData:', 'apiKey:'];
const missing = required.filter((file) => !fs.existsSync(file));
if (missing.length) {
  console.error('Missing M16-P files:');
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}
const registry = fs.readFileSync('apps/api/src/modules/analytics/analytics-event-registry.ts', 'utf8');
for (const token of ['checkout.started', 'payment.failed', 'provider.request_failed', 'email.failed']) {
  if (!registry.includes(token)) {
    console.error(`Missing analytics event blueprint: ${token}`);
    process.exit(1);
  }
}
const taxonomy = fs.readFileSync('docs/analytics/09_ANALYTICS_EVENT_TAXONOMY_BLUEPRINT.md', 'utf8');
for (const term of ['Payload vietato', 'OpenAI', 'provider', 'email.failed']) {
  if (!taxonomy.includes(term)) {
    console.error(`Analytics taxonomy missing required term: ${term}`);
    process.exit(1);
  }
}
for (const file of required) {
  const content = fs.readFileSync(file, 'utf8');
  for (const token of forbidden) {
    if (content.includes(token)) {
      console.error(`Forbidden analytics payload pattern ${token} found in ${file}`);
      process.exit(1);
    }
  }
}
console.log('M16-P analytics growth design QA passed.');
