export const tagManagerClarityAdminRoadmap = {
  moduleCode: 'M16B',
  name: 'Tag Manager, Clarity & Campaign Event Tracking',
  settingsFamilies: ['tag_manager', 'clarity', 'campaign_events', 'consent_mode'],
  requiresReasonForChanges: true,
  auditCategory: 'tracking_settings',
  publicSettingsEndpoint: '/settings/public/tracking',
  adminSettingsPath: '/admin/settings/tracking',
  defaultEnabled: false,
} as const;
