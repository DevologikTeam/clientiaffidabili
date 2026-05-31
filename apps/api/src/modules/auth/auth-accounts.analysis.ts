export type CustomerAccountRole = 'owner' | 'admin' | 'analyst' | 'billing' | 'viewer';
export type AccountStatus = 'draft' | 'active' | 'requires_review' | 'suspended' | 'closed';
export type MembershipStatus = 'invited' | 'active' | 'disabled' | 'transferred';

export const authAccountsAnalysis = {
  sprint: 'M11-A',
  version: '0.35.0',
  decision: 'Use account + membership model instead of single organizationId on user.',
  minimumEntities: [
    'User',
    'Account',
    'AccountMembership',
    'AccountInvitation',
    'AuthSession',
    'PasswordResetToken',
    'EmailVerificationToken',
    'AuthAuditEvent',
  ],
  customerRoles: ['owner', 'admin', 'analyst', 'billing', 'viewer'] as CustomerAccountRole[],
  adminBoundary: 'Admin roles must stay separate from customer account roles.',
  securityGuardrails: [
    'object-level authorization for every report/order/invoice/subscription',
    'httpOnly secure sameSite session cookies',
    'no user enumeration in login or password reset',
    'hashed one-time tokens for reset/invitation/email verification',
    'reauthentication for sensitive account actions',
    'MFA required for admin before production go-live',
    'audit every role, invitation, reset and session event',
  ],
  productionBlockers: [
    'password hashing not validated',
    'rate limits not implemented',
    'MFA admin not implemented',
    'cross-account authorization tests missing',
    'session revoke tests missing',
  ],
} as const;

export function requiresStepUp(action: string): boolean {
  return [
    'change_password',
    'change_email',
    'invite_member',
    'change_member_role',
    'transfer_ownership',
    'create_api_key',
    'refund_payment',
    'download_mass_reports',
  ].includes(action);
}
