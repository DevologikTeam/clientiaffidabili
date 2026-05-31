export const authAccountsDesign = {
  sprint: 'M11-P',
  version: '0.36.0',
  architecture: 'Account + AccountMembership + User identity separation',
  sessionStrategy: 'opaque session token in HttpOnly Secure SameSite cookie',
  passwordStorage: 'Argon2id or bcrypt with calibrated cost; never plaintext or reversible encryption',
  tokenStorage: 'reset, invitation, verification and session tokens stored only as hashes',
  customerRoles: ['owner', 'admin', 'analyst', 'billing', 'viewer'],
  productionBlockers: [
    'real password hashing must be wired and tested',
    'rate limiting must be implemented for login/reset/invites',
    'email delivery must be configured',
    'admin MFA must be enabled before go-live',
    'cross-account E2E authorization tests must pass',
  ],
  m11sDeliverables: [
    'auth module entities and services',
    'login/register/reset/invitation APIs',
    'account/team APIs',
    'auth frontend pages',
    'team management UI',
    'auth QA regression script',
  ],
} as const;
