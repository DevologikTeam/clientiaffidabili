export type ReportStatus = 'queued' | 'composing' | 'review_required' | 'ready' | 'failed' | 'voided';

export type AttentionLevel =
  | 'low_attention'
  | 'medium_attention'
  | 'high_attention'
  | 'manual_review'
  | 'not_enough_data';

export type EvidenceSeverity = 'positive' | 'info' | 'attention' | 'critical' | 'unavailable';

export type EvidenceType = 'registry' | 'credit' | 'negative_event' | 'compliance' | 'identity' | 'technical';

export interface ReportSubjectSnapshot {
  name: string;
  vatNumber?: string;
  taxCode?: string;
  country?: string;
  legalAddress?: string;
}

export interface ReportEvidenceSnapshot {
  id: string;
  type: EvidenceType;
  label: string;
  severity: EvidenceSeverity;
  sourceName: string;
  sourceTimestamp?: string;
  observedAt: string;
  summary: string;
  details?: string;
  limits: string[];
  rawPayloadRef?: string; // internal only; never exposed to customer DTO
}

export interface ReportSectionSnapshot {
  code: string;
  title: string;
  summary: string;
  completeness: 'complete' | 'partial' | 'unavailable';
  evidenceIds: string[];
  limits: string[];
}

export interface ReportSnapshot {
  id: string;
  orderId: string;
  checkId?: string;
  status: ReportStatus;
  templateCode: string;
  templateVersion: string;
  composerVersion: string;
  scoreModelVersion: string;
  subject: ReportSubjectSnapshot;
  attentionLevel: AttentionLevel;
  executiveSummary: string;
  recommendedActions: string[];
  sections: ReportSectionSnapshot[];
  evidence: ReportEvidenceSnapshot[];
  sources: string[];
  globalLimits: string[];
  generatedAt?: string;
  publishedAt?: string;
  snapshotHash?: string;
}

export interface ComposeReportInput {
  orderId: string;
  checkId: string;
  providerRequestIds: string[];
  templateCode: string;
  forceReview?: boolean;
}

export interface ComposeReportResult {
  reportId: string;
  status: ReportStatus;
  reviewRequired: boolean;
  warnings: string[];
}
