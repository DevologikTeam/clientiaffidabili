const fs = require('fs');
const path = require('path');
const root = process.cwd();

const requiredFiles = [
  'docs/sprints/M6-P_REPORT_COMPOSER_DESIGN.md',
  'docs/report/10_REPORT_TEMPLATE_BLUEPRINT.md',
  'docs/report/11_SCORE_BANDS_AND_DECISION_COPY_BLUEPRINT.md',
  'docs/report/12_EVIDENCE_COMPONENT_BLUEPRINT.md',
  'docs/report/13_REPORT_REVIEW_WORKFLOW_BLUEPRINT.md',
  'docs/report/14_REPORT_API_CONTRACTS.md',
  'docs/report/15_REPORT_UI_COMPONENTS_BLUEPRINT.md',
  'docs/report/16_REPORT_EXPORT_PDF_BLUEPRINT.md',
  'docs/report/17_REPORT_VERSIONING_AUDIT_BLUEPRINT.md',
  'docs/report/18_M6S_IMPLEMENTATION_HANDOFF.md',
  'docs/qa/M6-P_QA_REPORT.md',
  'docs/releases/0.18.0.md',
  'apps/api/src/modules/reports/report-composer.types.ts',
  'apps/api/src/modules/reports/report-template.registry.ts',
  'apps/api/src/modules/reports/report-score-blueprint.ts',
  'apps/web/lib/reports/report-composer-design.ts',
];

const requiredSnippets = [
  ['docs/report/10_REPORT_TEMPLATE_BLUEPRINT.md', 'Snapshot immutabile'],
  ['docs/report/11_SCORE_BANDS_AND_DECISION_COPY_BLUEPRINT.md', 'indice descrittivo di attenzione'],
  ['docs/report/12_EVIDENCE_COMPONENT_BLUEPRINT.md', 'rawPayloadRef'],
  ['docs/report/13_REPORT_REVIEW_WORKFLOW_BLUEPRINT.md', 'Audit obbligatorio'],
  ['docs/report/14_REPORT_API_CONTRACTS.md', 'GET /reports/:id'],
  ['docs/report/15_REPORT_UI_COMPONENTS_BLUEPRINT.md', 'EvidenceCard'],
  ['docs/report/16_REPORT_EXPORT_PDF_BLUEPRINT.md', 'PDF generato solo da report `ready`'],
  ['docs/report/17_REPORT_VERSIONING_AUDIT_BLUEPRINT.md', 'snapshotHash'],
  ['docs/report/18_M6S_IMPLEMENTATION_HANDOFF.md', 'No esporre raw payload provider al cliente'],
  ['apps/api/src/modules/reports/report-template.registry.ts', 'company_reliability_pro_v1'],
  ['apps/api/src/modules/reports/report-score-blueprint.ts', 'FORBIDDEN_REPORT_CLAIMS'],
  ['apps/web/lib/reports/report-composer-design.ts', 'no_raw_payload_in_customer_ui'],
];

const forbiddenCustomerClaims = [
  'questa azienda pagherà sicuramente in futuro',
  'rischio zero garantito per il cliente',
  'cliente sicuro al 100% da approvare',
  'solvibilità futura garantita dal report',
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));
const badSnippets = requiredSnippets.filter(([file, snippet]) => {
  const full = path.join(root, file);
  return !fs.existsSync(full) || !fs.readFileSync(full, 'utf8').includes(snippet);
});

const docFilesToInspect = requiredFiles.filter((file) => file.startsWith('docs/report/') || file.startsWith('docs/sprints/M6-P'));
const forbiddenHits = [];
for (const file of docFilesToInspect) {
  const content = fs.readFileSync(path.join(root, file), 'utf8').toLowerCase();
  for (const claim of forbiddenCustomerClaims) {
    if (content.includes(claim.toLowerCase())) forbiddenHits.push([file, claim]);
  }
}

if (missing.length || badSnippets.length || forbiddenHits.length) {
  console.error('M6-P QA failed');
  if (missing.length) console.error('Missing files:', missing);
  if (badSnippets.length) console.error('Missing snippets:', badSnippets);
  if (forbiddenHits.length) console.error('Forbidden claim hits:', forbiddenHits);
  process.exit(1);
}

console.log('M6-P report composer design QA passed');
