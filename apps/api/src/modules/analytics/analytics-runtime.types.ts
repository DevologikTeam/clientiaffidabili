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
export type AnalyticsEventStatus = 'accepted' | 'rejected' | 'redacted';
export type AttributionConversionType = 'lead' | 'checkout' | 'payment' | 'subscription' | 'partner_live_request' | 'support_ticket';

export interface AnalyticsSafeEventPayload {
  [key: string]: string | number | boolean | null | undefined | string[] | number[];
}

export interface AnalyticsDashboardSummary {
  period: string;
  executiveKpis: Array<{ key: string; label: string; value: string; trend: string; interpretation: string }>;
  funnel: Array<{ step: string; visitors: number; conversionRate: number; blocker?: string }>;
  seoGeo: Array<{ cluster: string; visits: number; ctaRate: number; assistedRevenueCents: number }>;
  errorInsights: Array<{ area: string; count: number; impactedOrders: number; recommendedAction: string }>;
  guardrails: string[];
}
