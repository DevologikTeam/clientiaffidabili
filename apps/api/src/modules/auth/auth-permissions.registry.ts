import type { CustomerAccountRole, CustomerPermission } from './auth-accounts.types';

export const CUSTOMER_ROLE_PERMISSIONS: Record<CustomerAccountRole, CustomerPermission[]> = {
  owner: [
    'checks.create',
    'checks.read',
    'reports.read',
    'reports.download',
    'billing.read',
    'billing.manage',
    'team.read',
    'team.invite',
    'team.manage_roles',
    'account.manage',
    'support.create',
    'support.read',
  ],
  admin: [
    'checks.create',
    'checks.read',
    'reports.read',
    'reports.download',
    'team.read',
    'team.invite',
    'team.manage_roles',
    'support.create',
    'support.read',
  ],
  analyst: ['checks.create', 'checks.read', 'reports.read', 'reports.download', 'support.create', 'support.read'],
  billing: ['billing.read', 'billing.manage', 'support.create', 'support.read'],
  viewer: ['checks.read', 'reports.read', 'support.create'],
};

export const SENSITIVE_ACCOUNT_ACTIONS = [
  'change_password',
  'change_email',
  'invite_member',
  'change_member_role',
  'transfer_ownership',
  'create_api_key',
  'cancel_subscription',
  'request_refund',
  'download_mass_reports',
] as const;

export function roleHasPermission(role: CustomerAccountRole, permission: CustomerPermission): boolean {
  return CUSTOMER_ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function actionRequiresStepUp(action: string): boolean {
  return (SENSITIVE_ACCOUNT_ACTIONS as readonly string[]).includes(action);
}

export function canChangeRole(actorRole: CustomerAccountRole, targetRole: CustomerAccountRole): boolean {
  if (actorRole === 'owner') return true;
  if (actorRole === 'admin') return targetRole !== 'owner';
  return false;
}
