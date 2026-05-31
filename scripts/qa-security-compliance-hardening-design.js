const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const required = [
  'docs/sprints/M9-P_SECURITY_COMPLIANCE_PRODUCTION_HARDENING_DESIGN.md',
  'docs/security/11_SECURITY_CONTROL_BLUEPRINT.md',
  'docs/security/12_RBAC_OBJECT_AUTH_BLUEPRINT.md',
  'docs/security/13_PRIVACY_DATA_RETENTION_BLUEPRINT.md',
  'docs/security/14_SECRETS_AND_COOLIFY_HARDENING_BLUEPRINT.md',
  'docs/security/15_WEBHOOK_PROVIDER_PAYMENT_SECURITY_BLUEPRINT.md',
  'docs/security/16_BACKUP_RESTORE_DR_BLUEPRINT.md',
  'docs/security/17_INCIDENT_RESPONSE_DATA_BREACH_RUNBOOK_BLUEPRINT.md',
  'docs/security/18_OBSERVABILITY_AUDIT_BLUEPRINT.md',
  'docs/security/19_SECURITY_QA_PRODUCTION_GATE_BLUEPRINT.md',
  'docs/security/20_M9S_IMPLEMENTATION_HANDOFF.md',
  'docs/research/M9P_SECURITY_COMPLIANCE_SOURCE_NOTES.md',
  'apps/api/src/modules/security/security-hardening.types.ts',
  'apps/api/src/modules/security/security-control.registry.ts',
  'apps/web/lib/security/security-hardening-design.ts',
  'docs/qa/M9-P_QA_REPORT.md',
  'docs/releases/0.30.0.md',
];
const failures = [];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`Missing M9-P file: ${file}`);
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
  'coolify',
  'webhook',
  'idempotency',
  'stripe',
  'paypal',
  'refund',
  'dispute',
  'provider call',
  'backup',
  'restore',
  'incident',
  'data breach',
  'log redaction',
  'audit',
  'production gate',
  'raw provider payload',
  'secret scan',
]) {
  if (!combined.includes(term)) failures.push(`Missing M9-P term: ${term}`);
}
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
{ const [major, minor] = pkg.version.split('.').map(Number); if (major !== 0 || minor < 30) failures.push(`Expected package version 0.30.0 or later, found ${pkg.version}`); }
if (!pkg.scripts['qa:security-compliance-hardening-design']) failures.push('Missing qa:security-compliance-hardening-design script');
if (!pkg.scripts['release:check'].includes('qa:security-compliance-hardening-design')) failures.push('release:check missing security compliance hardening design QA');
if (failures.length) {
  console.error('QA M9-P failed');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('QA M9-P Security, Compliance & Production Hardening Design passed');
