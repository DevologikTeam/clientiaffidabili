export type AnalyticsEventCategory =
  | 'public_funnel'
  | 'seo_geo'
  | 'checkout_billing'
  | 'provider_openai'
  | 'report_dashboard'
  | 'crm_support'
  | 'email_notifications'
  | 'partner_api'
  | 'admin_operations';

export type AnalyticsEventOrigin = 'client' | 'server' | 'admin' | 'webhook' | 'partner_api';

export type AnalyticsConsentState = 'necessary_only' | 'analytics_granted' | 'marketing_granted' | 'unknown';

export interface AnalyticsEventBlueprint {
  name: string;
  category: AnalyticsEventCategory;
  origin: AnalyticsEventOrigin[];
  allowedPayload: string[];
  forbiddenPayload: string[];
  serverAuthoritative: boolean;
  retentionPolicy: string;
}

export interface AttributionSnapshotBlueprint {
  conversionType: 'lead' | 'checkout' | 'payment' | 'subscription' | 'partner_live_request';
  firstTouchFields: string[];
  lastTouchFields: string[];
  contentAssistFields: string[];
  forbiddenFields: string[];
}

export interface GrowthDashboardBlueprint {
  route: string;
  sections: string[];
  forbiddenUiData: string[];
}
