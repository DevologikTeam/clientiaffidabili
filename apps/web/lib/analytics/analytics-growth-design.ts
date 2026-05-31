export type GrowthDashboardSection =
  | 'executive_kpis'
  | 'conversion_funnel'
  | 'seo_geo_performance'
  | 'revenue_margin'
  | 'error_insights'
  | 'consent_coverage';

export interface GrowthKpiBlueprint {
  key: string;
  label: string;
  decisionUse: string;
  forbiddenData: string[];
}

export const growthKpiBlueprints: GrowthKpiBlueprint[] = [
  {
    key: 'lead_conversion_rate',
    label: 'Conversione lead',
    decisionUse: 'Capire se contenuti e CTA generano contatti qualificati.',
    forbiddenData: ['email', 'phone', 'messageBody'],
  },
  {
    key: 'checkout_completion_rate',
    label: 'Completamento checkout',
    decisionUse: 'Individuare blocchi di pagamento, fiducia o billing profile.',
    forbiddenData: ['cardData', 'recipientEmail'],
  },
  {
    key: 'seo_geo_assisted_revenue',
    label: 'Ricavi assistiti da guide',
    decisionUse: 'Capire quali guide aiutano davvero la vendita.',
    forbiddenData: ['visitorProfile', 'subjectIdentifier'],
  },
  {
    key: 'operational_error_impact',
    label: 'Impatto errori operativi',
    decisionUse: 'Prioritizzare fix, rimborsi e interventi supporto.',
    forbiddenData: ['rawPayload', 'stackTrace', 'apiKey'],
  },
];

export const analyticsAdminRoutes = [
  '/admin/analytics',
  '/admin/analytics/funnel',
  '/admin/analytics/seo-geo',
  '/admin/analytics/errori',
  '/admin/analytics/ricavi',
];

export const analyticsDesignGuardrails = [
  'Gli analytics non devono contenere PII.',
  'Gli eventi economici devono essere server-side.',
  'Gli errori dettagliati restano nell Operational Error Ledger.',
  'Il consenso governa strumenti esterni come GA4 o Matomo.',
  'Search Console e GA4 sono integrazioni future, non blocker MVP.',
];
