export const partnerPortalPermissions = {
  owner: ['partner:read', 'partner:update', 'api_key:create', 'api_key:revoke', 'usage:read', 'billing:read', 'live:request', 'webhook:manage'],
  admin: ['partner:read', 'api_key:create', 'api_key:revoke', 'usage:read', 'live:request', 'webhook:manage'],
  developer: ['partner:read', 'api_key:create', 'usage:read', 'webhook:manage'],
  billing: ['partner:read', 'usage:read', 'billing:read'],
  viewer: ['partner:read', 'usage:read'],
} as const;

export const partnerAdminActionReasonRequired = [
  'approve_live_access',
  'reject_live_access',
  'suspend_live_access',
  'revoke_api_key',
  'change_pricing_tier',
  'adjust_credits',
  'replay_webhook',
  'override_margin_guard',
] as const;
