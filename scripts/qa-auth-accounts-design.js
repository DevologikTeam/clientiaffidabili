const fs = require('fs');
const required = [
  'docs/sprints/M11-P_AUTHENTICATION_ACCOUNTS_TEAM_MANAGEMENT_DESIGN.md',
  'docs/auth/11_AUTH_EXPERIENCE_BLUEPRINT.md',
  'docs/auth/12_ACCOUNT_TEAM_DATA_MODEL_BLUEPRINT.md',
  'docs/auth/13_SESSION_PASSWORD_SECURITY_BLUEPRINT.md',
  'docs/auth/14_INVITATIONS_ROLES_PERMISSIONS_BLUEPRINT.md',
  'docs/auth/15_AUTH_API_CONTRACTS_BLUEPRINT.md',
  'docs/auth/16_AUTH_UI_COMPONENTS_BLUEPRINT.md',
  'docs/auth/17_MFA_AND_STEP_UP_BLUEPRINT.md',
  'docs/auth/18_AUTH_RBAC_OBJECT_AUTH_BLUEPRINT.md',
  'docs/auth/19_AUTH_AUDIT_MONITORING_BLUEPRINT.md',
  'docs/auth/20_M11S_IMPLEMENTATION_HANDOFF.md',
  'apps/api/src/modules/auth/auth-accounts.types.ts',
  'apps/api/src/modules/auth/auth-permissions.registry.ts',
  'apps/api/src/modules/auth/auth-design.registry.ts',
  'apps/web/lib/auth/auth-accounts-design.ts',
  'docs/qa/M11-P_QA_REPORT.md',
  'docs/releases/0.36.0.md',
];

const requiredTerms = [
  'HttpOnly',
  'Secure',
  'SameSite',
  'AccountMembership',
  'owner',
  'admin',
  'analyst',
  'billing',
  'viewer',
  'object-level authorization',
  'step-up',
  'tokenHash',
  'audit',
  'M11-S',
];

const missing = required.filter((file) => !fs.existsSync(file));
if (missing.length) {
  console.error('Missing M11-P files:', missing);
  process.exit(1);
}

const corpus = required.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
const missingTerms = requiredTerms.filter((term) => !corpus.includes(term));
if (missingTerms.length) {
  console.error('Missing M11-P required terms:', missingTerms);
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
{ const [major, minor] = pkg.version.split('.').map(Number); if (major !== 0 || minor < 36) {
  console.error(`Expected package version 0.36.0 or later, got ${pkg.version}`);
  process.exit(1);
} }
if (!pkg.scripts || !pkg.scripts['qa:auth-accounts-design']) {
  console.error('Missing package script qa:auth-accounts-design');
  process.exit(1);
}

console.log('M11-P auth/accounts design QA passed');
