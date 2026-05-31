export type ReportAttentionLevel = 'low' | 'medium' | 'high' | 'unknown' | 'review_required';
export type ReportStatus = 'queued' | 'composing' | 'review_required' | 'ready' | 'failed' | 'archived';
export type ReportEvidenceSensitivity = 'public_business' | 'business_confidential' | 'personal_data' | 'payment_data' | 'compliance_sensitive';
export type ReportDisplayPolicy = 'show' | 'summarize' | 'hide_customer' | 'admin_only';

export interface ReportEvidenceAnalysis {
  code: string;
  label: string;
  sourceType: 'registry' | 'provider_score' | 'document' | 'compliance' | 'technical_validation' | 'internal';
  requiredTimestamp: boolean;
  sensitivity: ReportEvidenceSensitivity;
  displayPolicy: ReportDisplayPolicy;
  customerLimitation: string;
}

export interface ReportSectionAnalysis {
  code: string;
  title: string;
  purpose: string;
  requiredForMvp: boolean;
  evidenceCodes: string[];
  blocksPublishIfMissing: boolean;
}

export interface ReportComposerGuardrailAnalysis {
  code: string;
  decision: 'block' | 'warn' | 'review';
  reason: string;
  owner: 'system' | 'admin' | 'support';
}

export const reportSectionsMvpAnalysis: ReportSectionAnalysis[] = [
  {
    code: 'executive_summary',
    title: 'Sintesi operativa',
    purpose: 'Mostrare livello di attenzione, motivo principale e prossima azione.',
    requiredForMvp: true,
    evidenceCodes: ['subject_identity', 'attention_level', 'next_action'],
    blocksPublishIfMissing: true,
  },
  {
    code: 'key_signals',
    title: 'Segnali principali',
    purpose: 'Separare segnali favorevoli, da verificare e critici.',
    requiredForMvp: true,
    evidenceCodes: ['business_status', 'negative_events', 'credit_indicator'],
    blocksPublishIfMissing: false,
  },
  {
    code: 'company_identity',
    title: 'Dati identificativi',
    purpose: 'Confermare chi è stato verificato e con quali dati.',
    requiredForMvp: true,
    evidenceCodes: ['business_name', 'vat_number', 'legal_address', 'legal_form'],
    blocksPublishIfMissing: true,
  },
  {
    code: 'sources_and_limits',
    title: 'Fonti e limiti',
    purpose: 'Rendere il report trasparente e difendibile.',
    requiredForMvp: true,
    evidenceCodes: ['source_name', 'source_timestamp', 'retrieved_at', 'limitations'],
    blocksPublishIfMissing: true,
  },
  {
    code: 'recommended_actions',
    title: 'Azioni consigliate',
    purpose: 'Guidare il cliente verso una decisione prudente.',
    requiredForMvp: true,
    evidenceCodes: ['next_action', 'upsell_if_relevant'],
    blocksPublishIfMissing: false,
  },
];

export const evidenceAnalysisCatalog: ReportEvidenceAnalysis[] = [
  {
    code: 'subject_identity',
    label: 'Identificazione soggetto',
    sourceType: 'registry',
    requiredTimestamp: true,
    sensitivity: 'public_business',
    displayPolicy: 'show',
    customerLimitation: 'La verifica fotografa il soggetto identificato alla data della richiesta.',
  },
  {
    code: 'credit_indicator',
    label: 'Indicatore credito/attenzione',
    sourceType: 'provider_score',
    requiredTimestamp: true,
    sensitivity: 'business_confidential',
    displayPolicy: 'summarize',
    customerLimitation: 'Indicatore descrittivo basato sulle fonti disponibili; non è garanzia di pagamento futuro.',
  },
  {
    code: 'compliance_signal',
    label: 'Segnale compliance',
    sourceType: 'compliance',
    requiredTimestamp: true,
    sensitivity: 'compliance_sensitive',
    displayPolicy: 'summarize',
    customerLimitation: 'Informazione da usare solo per finalità lecite e coerenti con il servizio acquistato.',
  },
];

export const reportComposerGuardrailsAnalysis: ReportComposerGuardrailAnalysis[] = [
  {
    code: 'paid_order_required',
    decision: 'block',
    reason: 'Il report non puo essere generato prima del pagamento confermato.',
    owner: 'system',
  },
  {
    code: 'raw_payload_hidden',
    decision: 'block',
    reason: 'Il payload provider grezzo resta nel vault e non viene esposto al cliente.',
    owner: 'system',
  },
  {
    code: 'source_timestamp_required',
    decision: 'block',
    reason: 'Le evidenze pubbliche devono avere fonte e timestamp minimi.',
    owner: 'system',
  },
  {
    code: 'absolute_claim_detected',
    decision: 'review',
    reason: 'Claim assoluti di solvibilita o pagamento devono bloccare la pubblicazione automatica.',
    owner: 'admin',
  },
  {
    code: 'compliance_sensitive_result',
    decision: 'review',
    reason: 'I risultati compliance-sensitive richiedono sintesi prudente e verifica interna.',
    owner: 'admin',
  },
];

export const bannedReportClaims = [
  'paghera sicuramente',
  'rischio zero',
  'cliente sicuro',
  'affidabile al 100%',
  'garanzia di solvibilita',
  'approvato automaticamente',
];
