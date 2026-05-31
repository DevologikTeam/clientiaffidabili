#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const required = [
  'docs/sprints/M19-A_SANDBOX_CERTIFICATION_ANALYSIS.md',
  'docs/sandbox-certification/01_SANDBOX_CERTIFICATION_PRODUCT_STRATEGY.md',
  'docs/sandbox-certification/02_STRIPE_SANDBOX_CERTIFICATION_ANALYSIS.md',
  'docs/sandbox-certification/03_PAYPAL_SANDBOX_CERTIFICATION_ANALYSIS.md',
  'docs/sandbox-certification/04_OPENAPI_PROVIDER_SANDBOX_CERTIFICATION_ANALYSIS.md',
  'docs/sandbox-certification/05_OPENAI_COPILOT_SANDBOX_CERTIFICATION_ANALYSIS.md',
  'docs/sandbox-certification/06_EMAIL_PDF_NOTIFICATION_SANDBOX_CERTIFICATION_ANALYSIS.md',
  'docs/sandbox-certification/07_SANDBOX_TEST_DATA_FIXTURE_ANALYSIS.md',
  'docs/sandbox-certification/08_ERROR_LEDGER_REFUND_ROLLBACK_CERTIFICATION.md',
  'docs/sandbox-certification/09_M19P_M19S_READINESS_CHECKLIST.md',
  'docs/research/M19A_SANDBOX_CERTIFICATION_SOURCE_NOTES.md',
  'apps/api/src/modules/sandbox-certification/sandbox-certification.analysis.ts',
  'apps/web/lib/sandbox-certification/sandbox-certification-analysis.ts',
];

const requiredPhrases = [
  'Stripe',
  'PayPal',
  'Openapi',
  'OpenAI',
  'Email',
  'PDF',
  'Operational Error Ledger',
  'rimborso',
  'idempotente',
  'feature flag',
  'Release Candidate',
];

const missing = required.filter((file) => !fs.existsSync(path.join(process.cwd(), file)));
if (missing.length) {
  console.error('Missing sandbox certification analysis files:');
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}

const corpus = required.map((file) => fs.readFileSync(path.join(process.cwd(), file), 'utf8')).join('\n');
const missingPhrases = requiredPhrases.filter((phrase) => !corpus.includes(phrase));
if (missingPhrases.length) {
  console.error('Missing required sandbox certification phrases:');
  for (const phrase of missingPhrases) console.error(`- ${phrase}`);
  process.exit(1);
}

const tsFile = fs.readFileSync(path.join(process.cwd(), 'apps/api/src/modules/sandbox-certification/sandbox-certification.analysis.ts'), 'utf8');
for (const forbidden of ['sk_live_', 'pk_live_', 'OPENAI_API_KEY=', 'real card', 'dati reali obbligatori']) {
  if (tsFile.includes(forbidden)) {
    console.error(`Forbidden sandbox certification content found: ${forbidden}`);
    process.exit(1);
  }
}

console.log('Sandbox certification analysis QA passed.');
