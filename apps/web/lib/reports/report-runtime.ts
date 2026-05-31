export type ReportAttentionLevel = 'low_attention' | 'medium_attention' | 'high_attention' | 'manual_review' | 'not_enough_data';
export type ReportEvidenceSeverity = 'positive' | 'info' | 'attention' | 'critical' | 'unavailable';

export interface ReportEvidenceViewModel {
  id: string;
  type: string;
  label: string;
  severity: ReportEvidenceSeverity;
  sourceName: string;
  sourceTimestamp?: string;
  observedAt: string;
  summary: string;
  details?: string;
  limits: string[];
}

export interface ReportSectionViewModel {
  code: string;
  title: string;
  summary: string;
  completeness: 'complete' | 'partial' | 'unavailable';
  evidenceIds: string[];
  limits: string[];
}

export interface CustomerReportViewModel {
  id: string;
  orderId: string;
  status: 'queued' | 'composing' | 'review_required' | 'ready' | 'failed' | 'voided';
  title: string;
  subject: { name: string; vatNumber?: string; taxCode?: string; country?: string; legalAddress?: string };
  score: number | null;
  attentionLevel: ReportAttentionLevel;
  attentionLabel: string;
  executiveSummary: string;
  recommendedActions: string[];
  sections: ReportSectionViewModel[];
  evidence: ReportEvidenceViewModel[];
  sources: string[];
  globalLimits: string[];
  generatedAt?: string;
  publishedAt?: string;
  snapshotHash?: string;
}

export const demoCustomerReport: CustomerReportViewModel = {
  id: 'demo-report',
  orderId: 'demo-order',
  status: 'ready',
  title: 'Check Affidabilità Pro',
  subject: { name: 'ACME Italia S.p.A.', vatNumber: 'IT00000000000', country: 'IT', legalAddress: 'Milano, Italia' },
  score: 82,
  attentionLevel: 'low_attention',
  attentionLabel: 'Attenzione bassa',
  executiveSummary: 'Nel perimetro verificato non emergono segnali bloccanti. Il report resta un supporto decisionale e non una garanzia sui comportamenti futuri.',
  recommendedActions: ['Procedi con controlli ordinari.', 'Valuta monitoraggio periodico per rapporti ricorrenti.'],
  sections: [
    { code: 'executive_summary', title: 'Sintesi operativa', summary: 'Profilo coerente nel perimetro verificato.', completeness: 'complete', evidenceIds: ['e1'], limits: ['Il report fotografa le informazioni disponibili al momento della richiesta.'] },
    { code: 'company_identity', title: 'Identità azienda', summary: 'Dati principali coerenti con il soggetto richiesto.', completeness: 'complete', evidenceIds: ['e1'], limits: ['La disponibilità dipende dalle fonti consultate.'] },
    { code: 'sources_limits', title: 'Fonti e limiti', summary: 'Mostriamo solo dati normalizzati; i payload grezzi restano interni.', completeness: 'complete', evidenceIds: [], limits: ['Il report non sostituisce consulenza legale, fiscale o creditizia.'] },
  ],
  evidence: [
    { id: 'e1', type: 'registry', label: 'Anagrafica aziendale', severity: 'positive', sourceName: 'Provider configurato lato server', observedAt: '2026-05-29T12:00:00.000Z', summary: 'Dati normalizzati disponibili e coerenti.', limits: ['Dato dimostrativo per UI, non usare in produzione.'] },
  ],
  sources: ['Provider configurato lato server'],
  globalLimits: ['Il report non garantisce comportamenti futuri.', 'Le decisioni commerciali restano responsabilità dell’utente.'],
  generatedAt: '2026-05-29T12:00:00.000Z',
  publishedAt: '2026-05-29T12:02:00.000Z',
  snapshotHash: 'demo-snapshot-hash',
};

export function attentionTone(level: ReportAttentionLevel): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
  if (level === 'low_attention') return 'success';
  if (level === 'medium_attention') return 'warning';
  if (level === 'high_attention') return 'danger';
  if (level === 'manual_review') return 'warning';
  return 'info';
}

export function evidenceTone(severity: ReportEvidenceSeverity): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
  if (severity === 'positive') return 'success';
  if (severity === 'attention') return 'warning';
  if (severity === 'critical') return 'danger';
  if (severity === 'unavailable') return 'warning';
  return 'info';
}
