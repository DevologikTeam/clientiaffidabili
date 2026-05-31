export type UserStatus = 'pending_activation' | 'active' | 'locked' | 'disabled';
export type AccountStatus = 'draft' | 'active' | 'requires_review' | 'suspended' | 'closed';
export type CustomerAccountRole = 'owner' | 'admin' | 'analyst' | 'billing' | 'viewer';
export type MembershipStatus = 'invited' | 'active' | 'disabled' | 'transferred';
export type InvitationStatus = 'pending' | 'accepted' | 'expired' | 'revoked';
export type AuthSessionStatus = 'active' | 'revoked' | 'expired';
export type AuthAuditSeverity = 'info' | 'warning' | 'critical';

export type CustomerPermission =
  | 'checks.create'
  | 'checks.read'
  | 'reports.read'
  | 'reports.download'
  | 'billing.read'
  | 'billing.manage'
  | 'team.read'
  | 'team.invite'
  | 'team.manage_roles'
  | 'account.manage'
  | 'support.create'
  | 'support.read';

export interface AuthenticatedUserContext {
  userId: string;
  email: string;
  activeAccountId?: string;
  role?: CustomerAccountRole;
  permissions: CustomerPermission[];
  sessionId: string;
  stepUpVerifiedAt?: string;
}

export interface StepUpDecision {
  required: boolean;
  method: 'password' | 'mfa' | 'webauthn' | 'admin_block';
  reason: string;
}

export interface AccountInvitationDraft {
  accountId: string;
  email: string;
  role: CustomerAccountRole;
  invitedByUserId: string;
  expiresAt: string;
}


export interface AuthResult {
  userId: string;
  accountId: string;
  role: CustomerAccountRole;
  permissions: CustomerPermission[];
  sessionId: string;
  sessionTokenPreview: string;
  cookieMode: 'httpOnly-secure-sameSite';
}

export interface TeamMemberView {
  membershipId: string;
  userId: string;
  email: string;
  fullName: string;
  role: CustomerAccountRole;
  status: MembershipStatus;
  lastSelectedAt?: string;
}
