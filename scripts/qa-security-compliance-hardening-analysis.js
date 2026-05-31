const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const required = [
  'docs/sprints/M9-A_SECURITY_COMPLIANCE_PRODUCTION_HARDENING_ANALYSIS.md',
  'docs/security/01_SECURITY_PRODUCT_STRATEGY.md',
  'docs/security/02_THREAT_MODEL_AND_ATTACK_SURFACE_ANALYSIS.md',
  'docs/security/03_RBAC_AUTH_SESSION_SECRETS_ANALYSIS.md',
  'docs/security/04_PRIVACY_GDPR_DATA_PROTECTION_ANALYSIS.md',
  'docs/security/05_API_PROVIDER_PAYMENT_SECURITY_ANALYSIS.md',
  'docs/security/06_INFRA_DEPLOY_COOLIFY_HARDENING_ANALYSIS.md',
  'docs/security/07_BACKUP_RESTORE_INCIDENT_RESPONSE_ANALYSIS.md',
  'docs/security/08_OBSERVABILITY_AUDIT_LOGGING_ANALYSIS.md',
  'docs/security/09_SECURITY_QA_PRODUCTION_GATE_ANALYSIS.md',
  'docs/security/10_M9P_M9S_READINESS_CHECKLIST.md',
  'docs/research/M9A_SECURITY_COMPLIANCE_SOURCE_NOTES.md',
  'apps/api/src/modules/security/security-hardening.analysis.ts',
  'apps/web/lib/security/security-hardening-analysis.ts',
  'docs/qa/M9-A_QA_REPORT.md',
  'docs/releases/0.29.0.md',
];
const failures = [];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`Missing M9-A file: ${file}`);
}
const combined = required
  .filter((file) => fs.existsSync(path.join(root, file)))
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n')
  .toLowerCase();
for (const term of [
  'rbac',
  'object-level authorization',
  'bola',
  'gdpr',
  'nis2',
  'owasp',
  'secrets',
  'webhook',
  'idempotency',
  'backup',
  'restore',
  'incident',
  'data breach',
  'log redaction',
  'audit',
  'production gate',
  'coolify',
  'provider cost',
]) {
  if (!combined.includes(term)) failures.push(`Missing M9-A term: ${term}`);
}
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const [major, minor, patch] = pkg.version.split('.').map(Number);
if (major !== 0 || minor < 29) failures.push(`Expected package version 0.29.0 or later, found ${pkg.version}`);
if (!pkg.scripts['qa:security-compliance-hardening-analysis']) failures.push('Missing qa:security-compliance-hardening-analysis script');
if (!pkg.scripts['release:check'].includes('qa:security-compliance-hardening-analysis')) failures.push('release:check missing security compliance hardening analysis QA');
if (failures.length) {
  console.error('QA M9-A failed');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('QA M9-A Security, Compliance & Production Hardening Analysis passed');
