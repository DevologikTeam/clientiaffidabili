export type ConsentStateValue = 'granted' | 'denied';

export interface PublicExternalTrackingConfig {
  externalTagsEnabled: boolean;
  gtm: {
    enabled: boolean;
    containerId: string | null;
  };
  clarity: {
    enabled: boolean;
    projectId: string | null;
    allowedRoutePrefixes: string[];
    blockedRoutePrefixes: string[];
  };
  consentDefault: Record<'analytics_storage' | 'ad_storage' | 'ad_user_data' | 'ad_personalization', ConsentStateValue>;
}

export const defaultPublicExternalTrackingConfig: PublicExternalTrackingConfig = {
  externalTagsEnabled: false,
  gtm: {
    enabled: false,
    containerId: null
  },
  clarity: {
    enabled: false,
    projectId: null,
    allowedRoutePrefixes: ['/', '/servizi', '/prezzi', '/guide', '/garanzia-operativa'],
    blockedRoutePrefixes: ['/admin', '/dashboard', '/checkout', '/reports', '/fatture', '/api', '/invito', '/reset-password', '/legal']
  },
  consentDefault: {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  }
};

export const tagSettingsValidationPatterns = {
  gtmContainerId: '^GTM-[A-Z0-9]+$',
  clarityProjectId: '^[a-zA-Z0-9_-]{6,64}$'
};
