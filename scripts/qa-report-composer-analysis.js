const fs = require('fs');
const path = require('path');
const root = process.cwd();

const requiredFiles = [
  'docs/sprints/M6-A_REPORT_COMPOSER_ANALYSIS.md',
  'docs/report/01_REPORT_PRODUCT_STRATEGY.md',
  'docs/report/02_REPORT_INFORMATION_ARCHITECTURE.md',
  'docs/report/03_SCORING_AND_DECISION_LOGIC_ANALYSIS.md',
  'docs/report/04_EVIDENCE_SOURCE_AND_LIMITS_ANALYSIS.md',
  'docs/report/05_REPORT_COPY_COMPLIANCE_ANALYSIS.md',
  'docs/report/06_REPORT_DATA_MODEL_ANALYSIS.md',
  'docs/report/07_REPORT_ADMIN_REVIEW_ANALYSIS.md',
  'docs/report/08_REPORT_EXPORT_AND_DOWNLOAD_ANALYSIS.md',
  'docs/report/09_M6P_M6S_READINESS_CHECKLIST.md',
  'docs/qa/M6-A_QA_REPORT.md',
  'docs/releases/0.17.0.md',
  'apps/api/src/modules/reports/report-composer.analysis.ts',
  'apps/web/lib/reports/report-composer-analysis.ts',
];

const requiredSnippets = [
  ['docs/report/03_SCORING_AND_DECISION_LOGIC_ANALYSIS.md', 'indice descrittivo di attenzione'],
  ['docs/report/04_EVIDENCE_SOURCE_AND_LIMITS_ANALYSIS.md', 'Raw payload'],
  ['docs/report/05_REPORT_COPY_COMPLIANCE_ANALYSIS.md', 'Frasi vietate'],
  ['docs/report/06_REPORT_DATA_MODEL_ANALYSIS.md', 'Snapshot immutabile'],
  ['docs/report/07_REPORT_ADMIN_REVIEW_ANALYSIS.md', 'Audit obbligatorio'],
  ['apps/api/src/modules/reports/report-composer.analysis.ts', 'paid_order_required'],
  ['apps/api/src/modules/reports/report-composer.analysis.ts', 'raw_payload_hidden'],
  ['apps/web/lib/reports/report-composer-analysis.ts', 'no_absolute_claims'],
];

const forbiddenCustomerClaims = [
  'pagherà sicuramente',
  'rischio zero garantito',
  'cliente sicuro al 100%',
  'garanzia di solvibilità futura',
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));
const badSnippets = requiredSnippets.filter(([file, snippet]) => {
  const full = path.join(root, file);
  return !fs.existsSync(full) || !fs.readFileSync(full, 'utf8').includes(snippet);
});

const reportDocs = requiredFiles.filter((file) => file.startsWith('docs/report/') || file.startsWith('docs/sprints/M6-A'));
const forbiddenHits = [];
for (const file of reportDocs) {
  const content = fs.readFileSync(path.join(root, file), 'utf8').toLowerCase();
  for (const claim of forbiddenCustomerClaims) {
    if (content.includes(claim.toLowerCase())) {
      forbiddenHits.push([file, claim]);
    }
  }
}

if (missing.length || badSnippets.length || forbiddenHits.length) {
  console.error('M6-A QA failed');
  if (missing.length) console.error('Missing files:', missing);
  if (badSnippets.length) console.error('Missing snippets:', badSnippets);
  if (forbiddenHits.length) console.error('Forbidden claim hits:', forbiddenHits);
  process.exit(1);
}

console.log('M6-A report composer analysis QA passed');
