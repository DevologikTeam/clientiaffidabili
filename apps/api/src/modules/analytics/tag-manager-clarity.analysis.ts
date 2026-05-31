export type ExternalTrackingProvider = 'google_tag_manager' | 'microsoft_clarity';

export type ConsentModeValue = 'granted' | 'denied';

export interface TagManagerClaritySettingAnalysis {
  key: string;
  provider: ExternalTrackingProvider | 'platform';
  defaultValue: string | boolean;
  requiresAudit: boolean;
  description: string;
}

export const tagManagerClaritySettingsAnalysis: TagManagerClaritySettingAnalysis[] = [
  {
    key: 'analytics.externalTags.enabled',
    provider: 'platform',
    defaultValue: false,
    requiresAudit: true,
    description: 'Master switch backend/admin per ogni tag esterno.'
  },
  {
    key: 'analytics.gtm.containerId',
    provider: 'google_tag_manager',
    defaultValue: '',
    requiresAudit: true,
    description: 'Container ID GTM configurabile da admin, mai hardcoded.'
  },
  {
    key: 'analytics.clarity.projectId',
    provider: 'microsoft_clarity',
    defaultValue: '',
    requiresAudit: true,
    description: 'Project ID Clarity configurabile da admin, con route allowlist.'
  }
];

export const consentModeV2DefaultAnalysis: Record<string, ConsentModeValue> = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
};

export const externalTrackingForbiddenFieldsAnalysis = [
  'email',
  'phone',
  'taxCode',
  'vatNumber',
  'iban',
  'ip',
  'token',
  'apiKey',
  'prompt',
  'rawPayload',
  'reportContent',
  'documentBody'
] as const;

export const clarityAlwaysBlockedRoutesAnalysis = [
  '/admin',
  '/dashboard',
  '/checkout',
  '/reports',
  '/fatture',
  '/api',
  '/invito',
  '/reset-password'
] as const;
