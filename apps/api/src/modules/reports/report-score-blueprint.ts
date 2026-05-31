import { AttentionLevel } from './report-composer.types';

export interface ScoreBandDefinition {
  level: AttentionLevel;
  customerLabel: string;
  customerMeaning: string;
  allowedRecommendationTone: string;
  requiresEvidence: boolean;
}

export const REPORT_SCORE_BANDS: ScoreBandDefinition[] = [
  {
    level: 'low_attention',
    customerLabel: 'Attenzione bassa',
    customerMeaning: 'Nel perimetro verificato non emergono segnali bloccanti.',
    allowedRecommendationTone: 'procedi con controlli ordinari',
    requiresEvidence: true,
  },
  {
    level: 'medium_attention',
    customerLabel: 'Attenzione media',
    customerMeaning: 'Sono presenti elementi da valutare prima di aumentare esposizione o credito.',
    allowedRecommendationTone: 'richiedi integrazioni o limita esposizione iniziale',
    requiresEvidence: true,
  },
  {
    level: 'high_attention',
    customerLabel: 'Attenzione alta',
    customerMeaning: 'Sono presenti segnali rilevanti o dati critici incompleti.',
    allowedRecommendationTone: 'valuta pagamento anticipato, revisione interna o condizioni più prudenti',
    requiresEvidence: true,
  },
  {
    level: 'manual_review',
    customerLabel: 'Verifica in revisione',
    customerMeaning: 'I dati richiedono controllo operativo prima della pubblicazione.',
    allowedRecommendationTone: 'attendi conferma o contatta assistenza',
    requiresEvidence: false,
  },
  {
    level: 'not_enough_data',
    customerLabel: 'Dati non sufficienti',
    customerMeaning: 'Le fonti disponibili non consentono una sintesi completa.',
    allowedRecommendationTone: 'completa i dati o richiedi verifica assistita',
    requiresEvidence: false,
  },
];

export const FORBIDDEN_REPORT_CLAIMS = [
  'pagherà sicuramente',
  'rischio zero',
  'cliente sicuro al 100%',
  'solvibilità garantita',
  'approvato definitivamente',
];
