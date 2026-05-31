export type GrowthKpiGroup = 'traffic' | 'conversion' | 'revenue' | 'seo_geo' | 'operations';

export interface GrowthKpiAnalysisItem {
  key: string;
  label: string;
  group: GrowthKpiGroup;
  description: string;
  forbiddenBreakdowns: string[];
}

export const growthKpiAnalysisItems: GrowthKpiAnalysisItem[] = [
  {
    key: 'guide_to_cta_rate',
    label: 'Guide to CTA rate',
    group: 'seo_geo',
    description: 'Misura quante visite alle guide generano click verso servizi, prezzi, contatti o checkout.',
    forbiddenBreakdowns: ['email', 'phone', 'company name', 'message content'],
  },
  {
    key: 'checkout_completion_rate',
    label: 'Checkout completion rate',
    group: 'conversion',
    description: 'Misura il rapporto tra checkout avviati e pagamenti confermati.',
    forbiddenBreakdowns: ['card brand per user', 'billing profile raw', 'IP address'],
  },
  {
    key: 'margin_by_service',
    label: 'Margine per servizio',
    group: 'revenue',
    description: 'Confronta ricavo netto, costo provider stimato/reale, fee pagamento e refund impact.',
    forbiddenBreakdowns: ['raw provider payload', 'customer fiscal data'],
  },
  {
    key: 'operational_error_impact',
    label: 'Impatto errori operativi',
    group: 'operations',
    description: 'Aggrega errori da ledger per capire impatto su ordini, rimborsi e supporto.',
    forbiddenBreakdowns: ['stack trace', 'provider response body', 'OpenAI prompt'],
  },
];

export const analyticsGrowthAnalysis = {
  sprint: 'M16-A',
  version: '0.57.0',
  dashboardPrinciple: 'measure business outcomes without exposing sensitive business or personal data',
  recommendedWidgets: [
    'Executive snapshot',
    'SEO/GEO performance',
    'Funnel conversion',
    'Revenue and margin',
    'Operational impact',
  ],
  kpis: growthKpiAnalysisItems,
};
