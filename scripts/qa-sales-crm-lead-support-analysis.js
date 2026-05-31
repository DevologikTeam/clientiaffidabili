const fs = require('fs');
const path = require('path');

const root = process.cwd();
const required = [
  'docs/sprints/M15-A_SALES_CRM_LEAD_MANAGEMENT_SUPPORT_OPERATIONS_ANALYSIS.md',
  'docs/sales-crm/01_SALES_CRM_PRODUCT_STRATEGY.md',
  'docs/sales-crm/02_LEAD_CAPTURE_TOUCHPOINT_ANALYSIS.md',
  'docs/sales-crm/03_LEAD_PIPELINE_AND_QUALIFICATION_ANALYSIS.md',
  'docs/sales-crm/04_SUPPORT_OPERATIONS_ANALYSIS.md',
  'docs/sales-crm/05_CRM_DATA_MODEL_ANALYSIS.md',
  'docs/sales-crm/06_PRIVACY_CONSENT_ANTI_ABUSE_ANALYSIS.md',
  'docs/sales-crm/07_CRM_ADMIN_OPERATIONS_ANALYSIS.md',
  'docs/sales-crm/08_SALES_CRM_INTEGRATION_AND_AUTOMATION_ANALYSIS.md',
  'docs/sales-crm/09_M15P_M15S_READINESS_CHECKLIST.md',
  'apps/web/lib/sales-crm/sales-crm-analysis.ts',
  'apps/api/src/modules/sales-crm/sales-crm.analysis.ts',
  'docs/qa/M15-A_QA_REPORT.md',
  'docs/releases/0.51.0.md',
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('Missing M15-A files:', missing.join('\\n'));
  process.exit(1);
}

const forbiddenClaims = [
  'pagamento garantito',
  'rischio zero',
  'solvibilità garantita',
  'cliente sicuro al 100%',
];

const scanFiles = required.filter((file) => file.endsWith('.md') || file.endsWith('.ts'));
for (const file of scanFiles) {
  const content = fs.readFileSync(path.join(root, file), 'utf8').toLowerCase();
  for (const claim of forbiddenClaims) {
    if (content.includes(claim)) {
      console.error(`Forbidden claim "${claim}" found in ${file}`);
      process.exit(1);
    }
  }
}

const strategy = fs.readFileSync(path.join(root, 'docs/sales-crm/01_SALES_CRM_PRODUCT_STRATEGY.md'), 'utf8');
for (const token of ['lead', 'support', 'opportunità', 'ticket', 'prossima azione']) {
  if (!strategy.toLowerCase().includes(token.toLowerCase())) {
    console.error(`CRM strategy missing token: ${token}`);
    process.exit(1);
  }
}

const privacy = fs.readFileSync(path.join(root, 'docs/sales-crm/06_PRIVACY_CONSENT_ANTI_ABUSE_ANALYSIS.md'), 'utf8');
for (const token of ['Minimizzazione', 'consenso', 'anti-abuse', 'raw payload']) {
  if (!privacy.toLowerCase().includes(token.toLowerCase())) {
    console.error(`Privacy/anti-abuse analysis missing token: ${token}`);
    process.exit(1);
  }
}

console.log('M15-A Sales CRM / Lead / Support analysis QA passed.');
