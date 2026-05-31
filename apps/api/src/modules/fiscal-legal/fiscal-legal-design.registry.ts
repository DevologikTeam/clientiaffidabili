import { FiscalDocumentLifecycleStatus, LegalDocumentType, RefundFiscalDecisionStatus } from './fiscal-legal.types';

export const mandatoryCheckoutLegalDocuments: LegalDocumentType[] = [
  'terms_of_service',
  'privacy_policy',
  'refund_policy',
  'acceptable_use_policy',
  'report_disclaimer',
];

export const fiscalDocumentCustomerLabels: Record<FiscalDocumentLifecycleStatus, string> = {
  draft: 'Documento in preparazione',
  queued: 'Documento in preparazione',
  requires_review: 'Verifica amministrativa in corso',
  ready_to_issue: 'Documento pronto per emissione',
  issued: 'Documento disponibile',
  delivered: 'Documento consegnato',
  credit_note_required: 'Rettifica amministrativa in preparazione',
  adjusted: 'Documento rettificato',
  failed: 'Serve una correzione dei dati',
  cancelled: 'Documento annullato',
};

export const refundFiscalDecisionLabels: Record<RefundFiscalDecisionStatus, string> = {
  not_required: 'Nessuna rettifica fiscale richiesta',
  credit_note_required: 'Nota credito richiesta',
  credit_note_queued: 'Nota credito in preparazione',
  credit_note_issued: 'Nota credito emessa',
  manual_review: 'Verifica amministrativa richiesta',
  blocked: 'Rimborso bloccato in attesa di decisione',
};

export const fiscalLegalSensitiveActions = [
  'mark_fiscal_document_issued',
  'attach_fiscal_document',
  'approve_refund_with_credit_note',
  'reject_refund',
  'publish_legal_document',
  'archive_legal_document',
  'force_legal_reacceptance',
] as const;

export function requiresReason(action: string): boolean {
  return fiscalLegalSensitiveActions.includes(action as typeof fiscalLegalSensitiveActions[number]);
}

export function canCheckoutProceed(publishedDocumentTypes: LegalDocumentType[]): boolean {
  return mandatoryCheckoutLegalDocuments.every((doc) => publishedDocumentTypes.includes(doc));
}
