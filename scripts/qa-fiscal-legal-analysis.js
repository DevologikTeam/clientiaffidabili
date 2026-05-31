const fs = require('fs');
const path = require('path');

const root = process.cwd();
const required = [
  'docs/sprints/M10-A_FISCALITA_FATTURAZIONE_CUSTOMER_LEGAL_ANALYSIS.md',
  'docs/fiscal-legal/01_FISCAL_PRODUCT_STRATEGY.md',
  'docs/fiscal-legal/02_CUSTOMER_TAX_PROFILE_ANALYSIS.md',
  'docs/fiscal-legal/03_INVOICE_CREDIT_NOTE_REFUND_ANALYSIS.md',
  'docs/fiscal-legal/04_SUBSCRIPTIONS_CREDITS_TAX_ANALYSIS.md',
  'docs/fiscal-legal/05_CUSTOMER_LEGAL_PACK_ANALYSIS.md',
  'docs/fiscal-legal/06_CONSENT_ACCEPTANCE_VERSIONING_ANALYSIS.md',
  'docs/fiscal-legal/07_ADMIN_FISCAL_LEGAL_OPERATIONS_ANALYSIS.md',
  'docs/fiscal-legal/08_DATA_MODEL_AND_INTEGRATION_ANALYSIS.md',
  'docs/fiscal-legal/09_M10P_M10S_READINESS_CHECKLIST.md',
  'docs/research/M10A_FISCAL_LEGAL_SOURCE_NOTES.md',
  'apps/api/src/modules/fiscal-legal/fiscal-legal.analysis.ts',
  'apps/web/lib/fiscal-legal/fiscal-legal-analysis.ts',
];

for (const rel of required) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    console.error(`Missing required M10-A file: ${rel}`);
    process.exit(1);
  }
  const text = fs.readFileSync(full, 'utf8');
  if (text.trim().length < 300) {
    console.error(`M10-A file too small or empty: ${rel}`);
    process.exit(1);
  }
}

const sprint = fs.readFileSync(path.join(root, required[0]), 'utf8');
const requiredTerms = [
  'fatturazione',
  'rimborsi',
  'note credito',
  'privacy',
  'versionati',
  'commercialista',
];
for (const term of requiredTerms) {
  if (!sprint.toLowerCase().includes(term)) {
    console.error(`M10-A sprint document missing term: ${term}`);
    process.exit(1);
  }
}

const legalPack = fs.readFileSync(path.join(root, 'docs/fiscal-legal/05_CUSTOMER_LEGAL_PACK_ANALYSIS.md'), 'utf8');
for (const phrase of ['Termini', 'Privacy', 'Cookie', 'Refund', 'Acceptable Use', 'Disclaimer']) {
  if (!legalPack.includes(phrase)) {
    console.error(`Legal pack missing section: ${phrase}`);
    process.exit(1);
  }
}

console.log('qa-fiscal-legal-analysis: passed');
