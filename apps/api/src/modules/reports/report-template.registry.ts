import { AttentionLevel } from './report-composer.types';

export interface ReportTemplateSectionDefinition {
  code: string;
  title: string;
  required: boolean;
  pdfReady: boolean;
}

export interface ReportTemplateDefinition {
  code: string;
  version: string;
  productCodes: string[];
  title: string;
  sections: ReportTemplateSectionDefinition[];
  requiredSources: string[];
  globalLimits: string[];
  allowedAttentionLevels: AttentionLevel[];
  requiresReviewFor: string[];
}

export const REPORT_TEMPLATE_REGISTRY: ReportTemplateDefinition[] = [
  {
    code: 'company_reliability_pro_v1',
    version: '1.0.0',
    productCodes: ['COMPANY_PRO', 'COMPANY_PRO_BALANCE'],
    title: 'Check Affidabilità Pro',
    sections: [
      { code: 'executive_summary', title: 'Sintesi operativa', required: true, pdfReady: true },
      { code: 'main_signals', title: 'Segnali principali', required: true, pdfReady: true },
      { code: 'company_identity', title: 'Identità azienda', required: true, pdfReady: true },
      { code: 'economic_profile', title: 'Informazioni economiche e commerciali', required: false, pdfReady: true },
      { code: 'compliance_kyb', title: 'Compliance e KYB', required: false, pdfReady: true },
      { code: 'sources_limits', title: 'Fonti e limiti', required: true, pdfReady: true },
      { code: 'next_actions', title: 'Prossime azioni consigliate', required: true, pdfReady: true },
    ],
    requiredSources: ['provider_normalized_result', 'order_price_snapshot'],
    globalLimits: [
      'Il report fotografa le informazioni disponibili al momento della richiesta.',
      'Il report non garantisce comportamenti futuri né solvibilità futura.',
      'Le decisioni commerciali restano responsabilità dell\'utente.',
    ],
    allowedAttentionLevels: ['low_attention', 'medium_attention', 'high_attention', 'manual_review', 'not_enough_data'],
    requiresReviewFor: ['compliance_sensitive', 'score_evidence_conflict', 'provider_partial_response'],
  },
  {
    code: 'iban_verification_v1',
    version: '1.0.0',
    productCodes: ['IBAN_VERIFY'],
    title: 'Verifica IBAN',
    sections: [
      { code: 'technical_result', title: 'Esito tecnico', required: true, pdfReady: true },
      { code: 'sources_limits', title: 'Fonti e limiti', required: true, pdfReady: true },
      { code: 'next_actions', title: 'Prossime azioni consigliate', required: true, pdfReady: true },
    ],
    requiredSources: ['provider_normalized_result'],
    globalLimits: ['La verifica tecnica non conferma titolarità economica o disponibilità fondi.'],
    allowedAttentionLevels: ['low_attention', 'medium_attention', 'not_enough_data', 'manual_review'],
    requiresReviewFor: ['provider_partial_response'],
  },
];

export function findReportTemplate(templateCode: string): ReportTemplateDefinition | undefined {
  return REPORT_TEMPLATE_REGISTRY.find((template) => template.code === templateCode);
}
