import type { ProviderNormalizedEvidenceDesign } from '@clientiaffidabili/shared';
import type { ProviderNormalizedResultDesign } from './provider.types';

export const NORMALIZATION_PROFILES = {
  COMPANY_BASIC: 'company-basic-profile',
  COMPANY_RISK: 'company-risk-profile',
  COMPANY_RISK_FINANCIAL: 'company-risk-financial-profile',
  KYB_COMPLIANCE: 'kyb-compliance-profile',
  PAYMENT_DATA: 'payment-data-profile',
  CONTACT_DATA: 'contact-data-profile',
} as const;

export function createEvidence(input: ProviderNormalizedEvidenceDesign): ProviderNormalizedEvidenceDesign {
  return input;
}

export function createUnknownResult(summary: string): ProviderNormalizedResultDesign {
  return {
    riskLevel: 'unknown',
    summary,
    sourceTimestamp: new Date().toISOString(),
    evidences: [],
    warnings: [{ code: 'NORMALIZATION_PENDING', message: 'Risultato provider non ancora normalizzato.' }],
    limitations: ['La verifica deve essere completata da normalizzazione o review operativa.'],
    requiresManualReview: true,
  };
}

export const CUSTOMER_VISIBLE_RESULT_RULES = [
  'Mostrare fonte e data della fonte.',
  'Non mostrare raw provider payload.',
  'Non usare claim assoluti di solvibilità o pagamento.',
  'Mostrare limiti quando dato assente/parziale.',
  'Minimizzare dati personali e pagamento.',
] as const;
