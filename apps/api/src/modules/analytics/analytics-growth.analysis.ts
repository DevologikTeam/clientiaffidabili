export type AnalyticsEventSensitivity = 'public_low' | 'business_medium' | 'security_high' | 'restricted';

export type AnalyticsEventOrigin = 'client' | 'server' | 'admin' | 'webhook' | 'partner_api';

export interface AnalyticsEventAnalysisDefinition {
  name: string;
  category: 'public_funnel' | 'checkout_billing' | 'provider_openai' | 'report_dashboard' | 'crm_support' | 'seo_geo';
  origin: AnalyticsEventOrigin[];
  sensitivity: AnalyticsEventSensitivity;
  allowedPayload: string[];
  forbiddenPayload: string[];
  retentionHint: string;
}

export const analyticsEventAnalysisDefinitions: AnalyticsEventAnalysisDefinition[] = [
  {
    name: 'guide_page_view',
    category: 'seo_geo',
    origin: ['client', 'server'],
    sensitivity: 'public_low',
    allowedPayload: ['routeTemplate', 'slug', 'contentCluster', 'consentState', 'sourceMedium'],
    forbiddenPayload: ['email', 'phone', 'message', 'subjectName', 'rawQuery'],
    retentionHint: '14-26 months aggregated',
  },
  {
    name: 'checkout_started',
    category: 'checkout_billing',
    origin: ['server'],
    sensitivity: 'business_medium',
    allowedPayload: ['orderId', 'productCode', 'priceSnapshotId', 'attributionSnapshotId'],
    forbiddenPayload: ['cardData', 'email', 'fiscalProfileRaw', 'providerPayload'],
    retentionHint: 'business audit policy',
  },
  {
    name: 'provider_request_failed',
    category: 'provider_openai',
    origin: ['server'],
    sensitivity: 'security_high',
    allowedPayload: ['providerCode', 'productCode', 'normalizedErrorCode', 'retryable', 'errorLedgerId'],
    forbiddenPayload: ['rawPayload', 'apiKey', 'subjectIdentifier', 'stackTrace'],
    retentionHint: 'operational error policy',
  },
  {
    name: 'lead_created',
    category: 'crm_support',
    origin: ['server'],
    sensitivity: 'business_medium',
    allowedPayload: ['leadSource', 'contentCluster', 'serviceInterest', 'consentVersion'],
    forbiddenPayload: ['email', 'phone', 'messageBody', 'ipAddress'],
    retentionHint: 'CRM policy',
  },
];

export const analyticsGrowthAnalysis = {
  sprint: 'M16-A',
  version: '0.57.0',
  decision: 'internal-first analytics with optional consent-aware GA4 or Matomo',
  guardrails: [
    'no PII in analytics events',
    'no raw provider, Openapi or OpenAI payloads',
    'no card, IBAN, API key or token values',
    'operational errors stay in error ledger with aggregated growth insights',
    'analytics tools must be governed by admin settings and consent state',
  ],
  eventDefinitions: analyticsEventAnalysisDefinitions,
};
