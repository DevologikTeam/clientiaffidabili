export type CampaignTrackingEventName =
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
  | 'contact_view'
  | 'contact_submit_success'
  | 'checkout_started'
  | 'checkout_legal_confirmed'
  | 'checkout_payment_redirected'
  | 'payment_success_page_view'
  | 'payment_cancel_page_view';

export interface CampaignTrackingEventAnalysis {
  name: CampaignTrackingEventName;
  routeScope: string;
  allowedExternal: boolean;
  requiresConsent: boolean;
  note: string;
}

export const campaignTrackingEventsAnalysis: CampaignTrackingEventAnalysis[] = [
  { name: 'homepage_view', routeScope: '/', allowedExternal: true, requiresConsent: true, note: 'Misura interesse top funnel.' },
  { name: 'public_cta_click', routeScope: 'public', allowedExternal: true, requiresConsent: true, note: 'Misura CTA senza dati utente.' },
  { name: 'service_view', routeScope: '/servizi/[slug]', allowedExternal: true, requiresConsent: true, note: 'Usa solo service_slug pubblico.' },
  { name: 'guide_view', routeScope: '/guide/[slug]', allowedExternal: true, requiresConsent: true, note: 'Usa solo guide_slug pubblico.' },
  { name: 'checkout_started', routeScope: '/checkout', allowedExternal: true, requiresConsent: true, note: 'Nessun subject, email, P.IVA o importo sensibile.' },
  { name: 'payment_success_page_view', routeScope: '/checkout/success', allowedExternal: true, requiresConsent: true, note: 'Solo esito aggregato, nessun ID ordine reale.' },
  { name: 'contact_submit_success', routeScope: '/contatti', allowedExternal: true, requiresConsent: true, note: 'Nessun contenuto messaggio o contatto personale.' }
];

export const clarityRoutePolicyAnalysis = {
  defaultEnabled: false,
  publicAllowlist: ['/', '/servizi', '/prezzi', '/guide', '/garanzia-operativa'],
  alwaysBlocked: ['/admin', '/dashboard', '/checkout', '/reports', '/fatture', '/api', '/invito', '/reset-password']
};
