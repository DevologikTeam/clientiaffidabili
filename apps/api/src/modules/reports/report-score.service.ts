import { Injectable } from '@nestjs/common';
import type { AttentionLevel, ReportEvidenceSnapshot } from './report-composer.types';
import { FORBIDDEN_REPORT_CLAIMS, REPORT_SCORE_BANDS } from './report-score-blueprint';

export interface ReportScoreResult {
  score: number | null;
  attentionLevel: AttentionLevel;
  attentionLabel: string;
  executiveSummary: string;
  recommendedActions: string[];
  reviewRequired: boolean;
  warnings: string[];
}

@Injectable()
export class ReportScoreService {
  calculate(evidence: ReportEvidenceSnapshot[], forceReview = false): ReportScoreResult {
    const critical = evidence.filter((item) => item.severity === 'critical').length;
    const attention = evidence.filter((item) => item.severity === 'attention').length;
    const unavailable = evidence.filter((item) => item.severity === 'unavailable').length;
    const positives = evidence.filter((item) => item.severity === 'positive').length;
    const complianceSensitive = evidence.some((item) => item.type === 'compliance' && item.severity !== 'positive');

    if (forceReview || complianceSensitive) {
      return this.build('manual_review', null, 'Il report richiede revisione operativa prima della pubblicazione.', [
        'Attendi la verifica interna prima di usare il report in trattative commerciali.',
      ], true, ['manual_review_required']);
    }

    if (evidence.length === 0 || unavailable >= Math.max(2, evidence.length)) {
      return this.build('not_enough_data', null, 'Le fonti disponibili non sono sufficienti per una sintesi affidabile.', [
        'Completa i dati del soggetto o richiedi una verifica assistita.',
      ], true, ['not_enough_data']);
    }

    if (critical > 0) {
      return this.build('high_attention', Math.max(15, 45 - critical * 10 - attention * 5), 'Sono presenti segnali rilevanti da valutare prima di concedere credito o esposizione.', [
        'Valuta pagamento anticipato, limiti di fornitura o revisione interna.',
        'Richiedi documentazione aggiornata prima di procedere.',
      ], false, []);
    }

    if (attention > 0 || unavailable > 0) {
      return this.build('medium_attention', Math.min(74, 62 + positives * 3 - attention * 8 - unavailable * 5), 'Sono presenti elementi da verificare prima di aumentare esposizione o condizioni di pagamento.', [
        'Procedi con condizioni prudenti e richiedi conferme documentali.',
        'Valuta monitoraggio periodico se il rapporto commerciale e ricorrente.',
      ], false, []);
    }

    return this.build('low_attention', Math.min(92, 78 + positives * 4), 'Nel perimetro verificato non emergono segnali bloccanti.', [
      'Procedi con controlli ordinari e conserva il report come supporto decisionale.',
      'Per rapporti ricorrenti valuta un monitoraggio periodico.',
    ], false, []);
  }

  assertSafeCopy(text: string): string[] {
    const lower = text.toLowerCase();
    return FORBIDDEN_REPORT_CLAIMS.filter((claim) => lower.includes(claim.toLowerCase()));
  }

  private build(
    attentionLevel: AttentionLevel,
    score: number | null,
    executiveSummary: string,
    recommendedActions: string[],
    reviewRequired: boolean,
    warnings: string[],
  ): ReportScoreResult {
    const band = REPORT_SCORE_BANDS.find((item) => item.level === attentionLevel);
    const forbidden = this.assertSafeCopy([executiveSummary, ...recommendedActions].join(' '));
    return {
      score,
      attentionLevel,
      attentionLabel: band?.customerLabel ?? 'Dati da verificare',
      executiveSummary,
      recommendedActions,
      reviewRequired: reviewRequired || forbidden.length > 0,
      warnings: [...warnings, ...forbidden.map((claim) => `forbidden_claim:${claim}`)],
    };
  }
}
