const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requiredFiles = [
  'apps/api/src/modules/fiscal-legal/fiscal-legal.module.ts',
  'apps/api/src/modules/fiscal-legal/fiscal-legal.service.ts',
  'apps/api/src/modules/fiscal-legal/fiscal-legal.controller.ts',
  'apps/api/src/modules/fiscal-legal/fiscal-legal-admin.controller.ts',
  'apps/api/src/modules/fiscal-legal/entities/customer-tax-profile.entity.ts',
  'apps/api/src/modules/fiscal-legal/entities/fiscal-document.entity.ts',
  'apps/api/src/modules/fiscal-legal/entities/legal-document-version.entity.ts',
  'apps/api/src/modules/fiscal-legal/entities/legal-acceptance.entity.ts',
  'apps/api/src/modules/fiscal-legal/entities/fiscal-legal-audit.entity.ts',
  'apps/web/app/dashboard/profilo-fiscale/page.tsx',
  'apps/web/app/dashboard/legale/page.tsx',
  'apps/web/app/admin/fiscal-legal/page.tsx',
  'apps/web/components/fiscal-legal/TaxProfilePanel.tsx',
  'apps/web/components/fiscal-legal/FiscalDocumentTable.tsx',
  'apps/web/components/fiscal-legal/LegalAcceptancePanel.tsx',
  'apps/web/components/fiscal-legal/AdminFiscalLegalQueue.tsx',
  'apps/web/lib/fiscal-legal/fiscal-legal-runtime.ts',
  'apps/web/app/legal/termini/page.tsx',
  'apps/web/app/legal/privacy/page.tsx',
  'apps/web/app/legal/rimborsi/page.tsx',
  'docs/sprints/M10-S_FISCALITA_FATTURAZIONE_CUSTOMER_LEGAL_DEVELOPMENT.md',
  'docs/fiscal-legal/20_FISCAL_LEGAL_RUNTIME_IMPLEMENTATION_NOTES.md',
  'docs/qa/M10-S_QA_REPORT.md',
  'docs/releases/0.34.0.md',
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('M10-S QA failed. Missing files:', missing);
  process.exit(1);
}

const service = fs.readFileSync(path.join(root, 'apps/api/src/modules/fiscal-legal/fiscal-legal.service.ts'), 'utf8');
const serviceTokens = ['snapshotHash', 'Legal pack incompleto', 'requiresReason', 'FiscalLegalAuditEvent', 'credit_note_required'];
const missingServiceTokens = serviceTokens.filter((token) => !service.includes(token));
if (missingServiceTokens.length) {
  console.error('M10-S QA failed. Missing service tokens:', missingServiceTokens);
  process.exit(1);
}

const customerShell = fs.readFileSync(path.join(root, 'apps/web/components/customer-dashboard/CustomerShell.tsx'), 'utf8');
for (const label of ['Profilo fiscale', 'Legal']) {
  if (!customerShell.includes(label)) {
    console.error(`M10-S QA failed. Missing customer nav label: ${label}`);
    process.exit(1);
  }
}

const appModule = fs.readFileSync(path.join(root, 'apps/api/src/app.module.ts'), 'utf8');
for (const token of ['FiscalLegalModule', 'CustomerTaxProfile', 'FiscalDocument', 'LegalAcceptance']) {
  if (!appModule.includes(token)) {
    console.error(`M10-S QA failed. app.module missing ${token}`);
    process.exit(1);
  }
}

console.log('M10-S fiscal/legal development QA passed.');
