#!/usr/bin/env node
const fs = require('fs');

const requiredFiles = [
  'apps/api/src/modules/security/security.module.ts',
  'apps/api/src/modules/security/security.controller.ts',
  'apps/api/src/modules/security/services/object-authorization.service.ts',
  'apps/api/src/modules/security/services/webhook-security.service.ts',
  'apps/api/src/modules/security/services/redaction.service.ts',
  'apps/api/src/modules/security/services/production-readiness.service.ts',
  'apps/api/src/modules/security/guards/rbac.guard.ts',
  'apps/api/src/modules/security/guards/object-authorization.guard.ts',
  'docs/security/25_BACKUP_RESTORE_INCIDENT_RUNBOOK.md',
  'docs/security/27_PRODUCTION_READINESS_QA_GATE.md',
  'scripts/security-secret-scan.js',
];

const missing = requiredFiles.filter((file) => !fs.existsSync(file));
if (missing.length) {
  console.error('Production gate failed. Missing files:');
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}

const appModule = fs.readFileSync('apps/api/src/app.module.ts', 'utf8');
if (!appModule.includes('SecurityModule')) {
  console.error('Production gate failed: SecurityModule not imported in app.module.ts');
  process.exit(1);
}

const env = fs.readFileSync('.env.example', 'utf8');
for (const flag of ['REAL_BUILD_VERIFIED=false', 'OBJECT_AUTH_VERIFIED=false', 'WEBHOOK_SECURITY_VERIFIED=false', 'SECRET_SCAN_VERIFIED=false', 'RESTORE_DRILL_VERIFIED=false']) {
  if (!env.includes(flag)) {
    console.error(`Production gate failed: missing env flag ${flag}`);
    process.exit(1);
  }
}
console.log('security-production-gate: passed');
