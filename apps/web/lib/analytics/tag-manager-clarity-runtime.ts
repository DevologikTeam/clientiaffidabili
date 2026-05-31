export type ConsentValue = 'granted' | 'denied';

export type ExternalTrackingConfig = {
  externalTagsEnabled: boolean;
  gtm: { enabled: boolean; containerId: string | null };
  clarity: { enabled: boolean; projectId: string | null; allowedRoutePrefixes: string[]; blockedRoutePrefixes: string[] };
  consentDefault: Record<'analytics_storage' | 'ad_storage' | 'ad_user_data' | 'ad_personalization', ConsentValue>;
  routeAllowed?: boolean;
};

export type CampaignEventName =
  | 'homepage_view'
  | 'public_cta_click'
  | 'service_catalog_view'
  | 'service_view'
  | 'service_checkout_click'
  | 'pricing_view'
  | 'pricing_plan_click'
  | 'guide_index_view'
  | 'guide_view'
  | 'guide_related_service_click'
  | 'guarantee_view'
  | 'contact_submit_success'
  | 'checkout_started'
  | 'checkout_payment_redirected'
  | 'payment_success_page_view'
  | 'payment_cancel_page_view';

export type CampaignEventPayload = Record<string, string | number | boolean | null | undefined>;

export const externalTrackingAllowedRoutePrefixes = ['/', '/servizi', '/prezzi', '/guide', '/garanzia-operativa', '/contatti'] as const;

export const externalTrackingBlockedRoutePrefixes = ['/admin', '/dashboard', '/checkout', '/reports', '/fatture', '/api', '/invito', '/reset-password', '/legal'] as const;

export const defaultExternalTrackingConfig: ExternalTrackingConfig = {
  externalTagsEnabled: false,
  gtm: { enabled: false, containerId: null },
  clarity: {
    enabled: false,
    projectId: null,
    allowedRoutePrefixes: [...externalTrackingAllowedRoutePrefixes],
    blockedRoutePrefixes: [...externalTrackingBlockedRoutePrefixes],
  },
  consentDefault: {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  },
  routeAllowed: false,
};

export const externalCampaignEventRegistry: Record<CampaignEventName, { externalAllowed: boolean; requiresConsent: boolean }> = {
  homepage_view: { externalAllowed: true, requiresConsent: true },
  public_cta_click: { externalAllowed: true, requiresConsent: true },
  service_catalog_view: { externalAllowed: true, requiresConsent: true },
  service_view: { externalAllowed: true, requiresConsent: true },
  service_checkout_click: { externalAllowed: true, requiresConsent: true },
  pricing_view: { externalAllowed: true, requiresConsent: true },
  pricing_plan_click: { externalAllowed: true, requiresConsent: true },
  guide_index_view: { externalAllowed: true, requiresConsent: true },
  guide_view: { externalAllowed: true, requiresConsent: true },
  guide_related_service_click: { externalAllowed: true, requiresConsent: true },
  guarantee_view: { externalAllowed: true, requiresConsent: true },
  contact_submit_success: { externalAllowed: true, requiresConsent: true },
  checkout_started: { externalAllowed: true, requiresConsent: true },
  checkout_payment_redirected: { externalAllowed: true, requiresConsent: true },
  payment_success_page_view: { externalAllowed: true, requiresConsent: true },
  payment_cancel_page_view: { externalAllowed: true, requiresConsent: true },
};

const forbiddenPayloadKeyPattern = /email|phone|telefono|tax|fiscal|codice|vat|piva|iban|ip|token|api.?key|authorization|password|prompt|completion|raw|payload|report|document|message/i;
const allowedPayloadKeys = new Set(['page_type', 'service_slug', 'guide_slug', 'cta_id', 'plan_code', 'funnel_step', 'value_bucket', 'utm_source', 'utm_medium', 'utm_campaign', 'route_template', 'content_cluster']);

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export function sanitizeCampaignPayload(payload: CampaignEventPayload = {}): Record<string, string | number | boolean | null> {
  const output: Record<string, string | number | boolean | null> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (!allowedPayloadKeys.has(key) || forbiddenPayloadKeyPattern.test(key)) continue;
    if (value === undefined) continue;
    if (typeof value === 'string') output[key] = value.slice(0, 120);
    else if (typeof value === 'number' || typeof value === 'boolean' || value === null) output[key] = value;
  }
  return output;
}

export function isRouteAllowedForExternalTracking(pathname: string, config: ExternalTrackingConfig): boolean {
  const blocked = config.clarity.blockedRoutePrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`) || pathname.startsWith(prefix));
  if (blocked) return false;
  return config.clarity.allowedRoutePrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`) || (prefix === '/' && pathname === '/'));
}

export function pushCampaignEvent(name: CampaignEventName, payload: CampaignEventPayload = {}, config = defaultExternalTrackingConfig): boolean {
  const registryItem = externalCampaignEventRegistry[name];
  if (!registryItem?.externalAllowed || !config.externalTagsEnabled) return false;
  const eventPayload = sanitizeCampaignPayload(payload);
  if (typeof window === 'undefined') return false;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...eventPayload });
  return true;
}

export async function fetchExternalTrackingConfig(pathname: string): Promise<ExternalTrackingConfig> {
  try {
    // Browser requests must stay same-origin. Never call localhost, 127.0.0.1,
    // private IPs or Docker service names from public pages: Chrome can show the
    // Local Network Access permission prompt ("other apps and services on this device").
    const response = await fetch(`/api/analytics/public-config?pathname=${encodeURIComponent(pathname)}`, { cache: 'no-store' });
    if (!response.ok) return defaultExternalTrackingConfig;
    const data = await response.json();
    return { ...defaultExternalTrackingConfig, ...data };
  } catch {
    return defaultExternalTrackingConfig;
  }
}
