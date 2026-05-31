#!/usr/bin/env node
const fs = require('fs');
const { execFileSync } = require('child_process');

const required = [
  'docs/sprints/M9-S_SECURITY_COMPLIANCE_PRODUCTION_HARDENING_DEVELOPMENT.md',
  'docs/security/21_SECURITY_RUNTIME_IMPLEMENTATION_NOTES.md',
  'docs/security/22_RBAC_OBJECT_AUTH_IMPLEMENTATION.md',
  'docs/security/23_WEBHOOK_SECURITY_IMPLEMENTATION.md',
  'docs/security/24_SECRETS_COOLIFY_PRODUCTION_GATE_IMPLEMENTATION.md',
  'docs/security/25_BACKUP_RESTORE_INCIDENT_RUNBOOK.md',
  'docs/security/26_OBSERVABILITY_REDACTION_AUDIT_IMPLEMENTATION.md',
  'docs/security/27_PRODUCTION_READINESS_QA_GATE.md',
  'apps/api/src/modules/security/security.module.ts',
  'apps/api/src/modules/security/security.controller.ts',
  'apps/api/src/modules/security/services/object-authorization.service.ts',
  'apps/api/src/modules/security/services/webhook-security.service.ts',
  'apps/api/src/modules/security/services/redaction.service.ts',
  'apps/api/src/modules/security/services/production-readiness.service.ts',
  'apps/web/app/admin/security/page.tsx',
  'apps/web/components/security/SecurityGateTable.tsx',
  'apps/web/lib/security/security-hardening-runtime.ts',
  'scripts/security-secret-scan.js',
  'scripts/security-production-gate.js',
  'docs/qa/M9-S_QA_REPORT.md',
  'docs/releases/0.31.0.md',
];
for (const file of required) {
  if (!fs.existsSync(file)) throw new Error(`Missing required M9-S file: ${file}`);
}

const securityController = fs.readFileSync('apps/api/src/modules/security/security.controller.ts', 'utf8');
for (const needle of ['production-gate', 'redaction-preview', 'webhook/signature-preview', 'object-access-preview']) {
  if (!securityController.includes(needle)) throw new Error(`Security controller missing ${needle}`);
}

const objectAuth = fs.readFileSync('apps/api/src/modules/security/services/object-authorization.service.ts', 'utf8');
for (const needle of ['assertAccess', 'ForbiddenException', 'policy.customerRoles', 'actor.accountId !== resourceAccountId']) {
  if (!objectAuth.includes(needle)) throw new Error(`Object authorization service missing ${needle}`);
}

const webhook = fs.readFileSync('apps/api/src/modules/security/services/webhook-security.service.ts', 'utf8');
for (const needle of ['createHmac', 'timingSafeEqual', 'idempotencyKey', 'toleranceSeconds']) {
  if (!webhook.includes(needle)) throw new Error(`Webhook security service missing ${needle}`);
}

execFileSync(process.execPath, ['scripts/security-secret-scan.js'], { stdio: 'inherit' });
execFileSync(process.execPath, ['scripts/security-production-gate.js'], { stdio: 'inherit' });
console.log('qa-security-compliance-hardening-development: passed');
