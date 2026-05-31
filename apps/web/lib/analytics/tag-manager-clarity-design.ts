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

export type CampaignEventPayload = {
  page_type?: 'homepage' | 'service' | 'guide' | 'pricing' | 'contact' | 'checkout' | 'success' | 'cancel';
  service_slug?: string;
  guide_slug?: string;
  cta_id?: string;
  plan_code?: string;
  funnel_step?: string;
  value_bucket?: 'low' | 'medium' | 'high';
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

export const campaignEventRegistry: Record<CampaignEventName, { externalAllowed: boolean; requiresConsent: boolean }> = {
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
  payment_cancel_page_view: { externalAllowed: true, requiresConsent: true }
};

export const forbiddenExternalEventKeys = [
  'email',
  'phone',
  'taxCode',
  'vatNumber',
  'iban',
  'ip',
  'token',
  'apiKey',
  'authorization',
  'password',
  'prompt',
  'completion',
  'rawPayload',
  'reportContent',
  'documentBody',
  'messageBody'
] as const;

export const clarityRoutePolicyDesign = {
  allowPrefixes: ['/', '/servizi', '/prezzi', '/guide', '/garanzia-operativa'],
  blockPrefixes: ['/admin', '/dashboard', '/checkout', '/reports', '/fatture', '/api', '/invito', '/reset-password', '/legal']
};

export function isClarityRouteAllowed(pathname: string): boolean {
  const blocked = clarityRoutePolicyDesign.blockPrefixes.some((prefix) => pathname.startsWith(prefix));
  if (blocked) return false;
  return clarityRoutePolicyDesign.allowPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}
