export type AnalyticsRuntimeEventName =
  | 'public.page_view'
  | 'seo_geo.guide_viewed'
  | 'seo_geo.guide_cta_clicked'
  | 'checkout.started'
  | 'checkout.completed'
  | 'payment.failed'
  | 'provider.request_failed'
  | 'openai.request_failed'
  | 'email.failed'
  | 'crm.lead_created';

export type ConsentState = 'necessary_only' | 'analytics_granted' | 'marketing_granted' | 'unknown';

export interface AnalyticsRuntimeEvent {
  name: AnalyticsRuntimeEventName;
  category: string;
  consentState: ConsentState;
  routeTemplate?: string;
  contentCluster?: string;
  payload: Record<string, string | number | boolean | null | undefined>;
}

export interface GrowthDashboardMetric {
  key: string;
  label: string;
  value: string;
  trend: string;
  interpretation: string;
}

export interface GrowthFunnelStep {
  step: string;
  value: number;
  rate: string;
  risk: string;
}

export interface SeoGeoRow {
  cluster: string;
  pages: number;
  visits: string;
  ctaRate: string;
  assistedRevenue: string;
  nextAction: string;
}

export interface ErrorInsightRow {
  area: string;
  events: number;
  impact: string;
  recommendedAction: string;
}

export const analyticsRuntimeGuardrails = [
  'Nessuna PII negli eventi analytics.',
  'Nessun raw payload provider, OpenAI o webhook.',
  'Gli errori dettagliati restano nell Operational Error Ledger.',
  'Gli eventi economici sono server-side.',
  'GA4/Matomo/Search Console sono integrazioni opzionali e consent-aware.',
];

export const growthDashboardMetrics: GrowthDashboardMetric[] = [
  { key: 'qualified_leads', label: 'Lead qualificati', value: '—', trend: 'baseline da attivare', interpretation: 'Misura se guide, servizi e contatti generano domanda commerciale reale.' },
  { key: 'checkout_completion', label: 'Checkout completati', value: '—', trend: 'baseline da attivare', interpretation: 'Evidenzia attriti su prezzo, profilo fiscale, pagamento o fiducia.' },
  { key: 'net_margin', label: 'Margine netto', value: '—', trend: 'calcolo da ordini e costi provider', interpretation: 'Controlla sostenibilita economica dopo fee pagamento, provider e rimborsi.' },
  { key: 'operational_error_impact', label: 'Impatto errori', value: '—', trend: 'da error ledger', interpretation: 'Prioritizza fix e azioni di supporto prima che diventino rimborsi.' },
];

export const conversionFunnel: GrowthFunnelStep[] = [
  { step: 'Visite pubbliche e guide', value: 0, rate: '—', risk: 'Serve tracking page_view e guide_viewed.' },
  { step: 'CTA verso servizio/checkout', value: 0, rate: '—', risk: 'Serve distinguere intenti informativi e commerciali.' },
  { step: 'Checkout avviato', value: 0, rate: '—', risk: 'Evento server-side obbligatorio.' },
  { step: 'Pagamento confermato', value: 0, rate: '—', risk: 'Riconciliare con webhook payment.' },
  { step: 'Report consultato', value: 0, rate: '—', risk: 'Misurare solo accesso autorizzato, non contenuto sensibile.' },
];

export const seoGeoRows: SeoGeoRow[] = [
  { cluster: 'Verificare affidabilita azienda', pages: 1, visits: '—', ctaRate: '—', assistedRevenue: '—', nextAction: 'Collegare Search Console e CTA servizi.' },
  { cluster: 'Cliente non paga', pages: 1, visits: '—', ctaRate: '—', assistedRevenue: '—', nextAction: 'Misurare contatti e checkout assistiti.' },
  { cluster: 'Garanzie e limiti report', pages: 1, visits: '—', ctaRate: '—', assistedRevenue: '—', nextAction: 'Misurare riduzione ticket pre-acquisto.' },
];

export const errorInsightRows: ErrorInsightRow[] = [
  { area: 'Pagamenti', events: 0, impact: 'Rimborsi, retry, checkout bloccati', recommendedAction: 'Aggregare payment.failed e refund events senza dati carta.' },
  { area: 'Openapi/provider', events: 0, impact: 'Report in attesa o review manuale', recommendedAction: 'Collegare provider.request_failed a ledger e admin operations.' },
  { area: 'OpenAI', events: 0, impact: 'Copilot non disponibile o budget superato', recommendedAction: 'Misurare solo use case, costo e stato, mai prompt/completion.' },
  { area: 'Email', events: 0, impact: 'Documenti e reset password non recapitati', recommendedAction: 'Aggregare bounce/fail e mostrare retry support.' },
];

export function sanitizeAnalyticsPayload(payload: Record<string, unknown>): Record<string, string | number | boolean | null> {
  const forbidden = ['email', 'phone', 'iban', 'card', 'token', 'secret', 'apiKey', 'rawPayload', 'prompt', 'completion', 'ipAddress', 'message'];
  const output: Record<string, string | number | boolean | null> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (forbidden.some((item) => key.toLowerCase().includes(item.toLowerCase()))) {
      continue;
    }
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value === null) {
      output[key] = value;
    }
  }
  return output;
}

export function buildAnalyticsEvent(event: AnalyticsRuntimeEvent): AnalyticsRuntimeEvent {
  return {
    ...event,
    payload: sanitizeAnalyticsPayload(event.payload),
  };
}
