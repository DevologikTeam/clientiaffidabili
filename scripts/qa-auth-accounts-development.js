const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const requiredFiles = [
  'apps/api/src/modules/auth/auth.module.ts',
  'apps/api/src/modules/auth/auth-accounts.controller.ts',
  'apps/api/src/modules/auth/auth-accounts.service.ts',
  'apps/api/src/modules/auth/auth-password.service.ts',
  'apps/api/src/modules/auth/auth-token.service.ts',
  'apps/api/src/modules/auth/entities/account.entity.ts',
  'apps/api/src/modules/auth/entities/account-membership.entity.ts',
  'apps/api/src/modules/auth/entities/account-invitation.entity.ts',
  'apps/api/src/modules/auth/entities/auth-session.entity.ts',
  'apps/api/src/modules/auth/entities/password-reset-token.entity.ts',
  'apps/api/src/modules/auth/entities/email-verification-token.entity.ts',
  'apps/api/src/modules/auth/entities/auth-audit-event.entity.ts',
  'apps/web/app/login/page.tsx',
  'apps/web/app/registrati/page.tsx',
  'apps/web/app/invito/[token]/page.tsx',
  'apps/web/app/dashboard/account/page.tsx',
  'apps/web/app/dashboard/team/page.tsx',
  'apps/web/components/auth/AuthShell.tsx',
  'apps/web/components/auth/LoginFormPreview.tsx',
  'apps/web/components/auth/RegisterCompanyFormPreview.tsx',
  'apps/web/components/auth/TeamMembersTable.tsx',
  'apps/web/components/auth/InvitationPanel.tsx',
  'apps/web/components/auth/PermissionMatrix.tsx',
  'apps/web/components/auth/SessionSecurityPanel.tsx',
  'apps/web/lib/auth/auth-accounts-runtime.ts',
  'docs/sprints/M11-S_AUTHENTICATION_ACCOUNTS_TEAM_MANAGEMENT_DEVELOPMENT.md',
  'docs/auth/21_AUTH_RUNTIME_IMPLEMENTATION_NOTES.md',
  'docs/auth/22_AUTH_ENTITIES_IMPLEMENTATION.md',
  'docs/auth/23_AUTH_API_IMPLEMENTATION.md',
  'docs/auth/24_AUTH_UI_IMPLEMENTATION.md',
  'docs/auth/25_TEAM_MANAGEMENT_IMPLEMENTATION.md',
  'docs/auth/26_AUTH_SECURITY_QA_GUARDRAILS.md',
  'docs/qa/M11-S_QA_REPORT.md',
  'docs/releases/0.37.0.md',
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('M11-S QA failed. Missing files:', missing);
  process.exit(1);
}

const appModule = fs.readFileSync(path.join(root, 'apps/api/src/app.module.ts'), 'utf8');
for (const token of ['AuthModule', 'AccountMembership', 'AuthSession', 'PasswordResetToken', 'AuthAuditEvent']) {
  if (!appModule.includes(token)) {
    console.error(`M11-S QA failed. AppModule missing ${token}`);
    process.exit(1);
  }
}

const service = fs.readFileSync(path.join(root, 'apps/api/src/modules/auth/auth-accounts.service.ts'), 'utf8');
for (const token of ['HttpOnly', 'tokenHash', 'reason', 'least one owner', 'password_reset_completed', 'member_role_changed']) {
  if (!service.includes(token)) {
    console.error(`M11-S QA failed. service missing ${token}`);
    process.exit(1);
  }
}

const shell = fs.readFileSync(path.join(root, 'apps/web/components/customer-dashboard/CustomerShell.tsx'), 'utf8');
for (const label of ['Account', 'Team']) {
  if (!shell.includes(label)) {
    console.error(`M11-S QA failed. CustomerShell missing ${label}`);
    process.exit(1);
  }
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
{ const [major, minor] = pkg.version.split('.').map(Number); if (major !== 0 || minor < 37) {
  console.error(`M11-S QA failed. Expected package version 0.37.0 or later, got ${pkg.version}`);
  process.exit(1);
} }
if (!pkg.scripts['qa:auth-accounts-development']) {
  console.error('M11-S QA failed. Missing qa:auth-accounts-development script');
  process.exit(1);
}

console.log('M11-S auth/accounts/team development QA passed.');
