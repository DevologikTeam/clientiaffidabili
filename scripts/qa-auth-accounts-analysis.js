#!/usr/bin/env node
const fs = require('fs');
const required = [
  'docs/sprints/M11-A_AUTHENTICATION_ACCOUNTS_TEAM_MANAGEMENT_ANALYSIS.md',
  'docs/auth/01_AUTH_PRODUCT_STRATEGY.md',
  'docs/auth/02_ACCOUNT_ORGANIZATION_MODEL_ANALYSIS.md',
  'docs/auth/03_LOGIN_REGISTRATION_SESSION_ANALYSIS.md',
  'docs/auth/04_TEAM_ROLES_INVITATIONS_ANALYSIS.md',
  'docs/auth/05_MFA_PASSWORD_RECOVERY_SECURITY_ANALYSIS.md',
  'docs/auth/06_AUTH_RBAC_OBJECT_AUTH_INTEGRATION_ANALYSIS.md',
  'docs/auth/07_CUSTOMER_ADMIN_ACCESS_BOUNDARIES_ANALYSIS.md',
  'docs/auth/08_AUTH_AUDIT_MONITORING_RISK_ANALYSIS.md',
  'docs/auth/09_AUTH_DATA_MODEL_ANALYSIS.md',
  'docs/auth/10_M11P_M11S_READINESS_CHECKLIST.md',
  'docs/research/M11A_AUTH_SECURITY_SOURCE_NOTES.md',
  'apps/api/src/modules/auth/auth-accounts.analysis.ts',
  'apps/web/lib/auth/auth-accounts-analysis.ts',
  'docs/qa/M11-A_QA_REPORT.md',
  'docs/releases/0.35.0.md',
];
for (const file of required) {
  if (!fs.existsSync(file)) throw new Error(`Missing M11-A file: ${file}`);
}
const sprint = fs.readFileSync('docs/sprints/M11-A_AUTHENTICATION_ACCOUNTS_TEAM_MANAGEMENT_ANALYSIS.md', 'utf8');
for (const token of ['AccountMembership', 'MFA', 'object-level authorization', 'sessione HTTP-only', 'audit']) {
  if (!sprint.includes(token)) throw new Error(`M11-A sprint doc missing ${token}`);
}
const account = fs.readFileSync('docs/auth/02_ACCOUNT_ORGANIZATION_MODEL_ANALYSIS.md', 'utf8');
for (const token of ['Account', 'AccountMembership', 'AccountInvitation', 'AuthSession', 'AuthAuditEvent']) {
  if (!account.includes(token)) throw new Error(`M11-A account model missing ${token}`);
}
const security = fs.readFileSync('docs/auth/05_MFA_PASSWORD_RECOVERY_SECURITY_ANALYSIS.md', 'utf8');
for (const token of ['TOTP', 'WebAuthn', 'Token monouso', '15 consigliati', 'rotazione solo in caso']) {
  if (!security.includes(token)) throw new Error(`M11-A security analysis missing ${token}`);
}
const api = fs.readFileSync('apps/api/src/modules/auth/auth-accounts.analysis.ts', 'utf8');
for (const token of ['requiresStepUp', 'MFA required for admin', 'object-level authorization', 'AccountMembership']) {
  if (!api.includes(token)) throw new Error(`M11-A API analysis missing ${token}`);
}
console.log('qa-auth-accounts-analysis: passed');
