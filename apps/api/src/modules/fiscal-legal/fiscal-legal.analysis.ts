export type CustomerTaxProfileType =
  | 'business_it'
  | 'consumer_it'
  | 'business_eu'
  | 'consumer_eu'
  | 'business_extra_eu'
  | 'consumer_extra_eu'
  | 'public_administration'
  | 'requires_review';

export type FiscalDocumentStatus =
  | 'draft'
  | 'queued'
  | 'issued'
  | 'sent'
  | 'failed'
  | 'cancelled'
  | 'requires_review';

export type FiscalDocumentType =
  | 'invoice'
  | 'receipt'
  | 'credit_note'
  | 'debit_note'
  | 'proforma'
  | 'manual_adjustment';

export type LegalDocumentStatus =
  | 'draft'
  | 'legal_review'
  | 'approved'
  | 'published'
  | 'superseded'
  | 'archived';

export interface FiscalLegalAnalysisDecision {
  code: string;
  title: string;
  decision: string;
  mvpPolicy: string;
  goLiveGate: string;
}

export const fiscalLegalAnalysisDecisions: FiscalLegalAnalysisDecision[] = [
  {
    code: 'payment_fiscal_separation',
    title: 'Payment and fiscal document separation',
    decision: 'Payment ledger, order lifecycle and fiscal document lifecycle must remain separate.',
    mvpPolicy: 'Queue fiscal documents after confirmed payment; do not mark invoices as issued automatically without provider/accountant validation.',
    goLiveGate: 'No duplicated fiscal document for the same payment event.',
  },
  {
    code: 'tax_profile_snapshot',
    title: 'Immutable tax profile snapshot',
    decision: 'Every issued fiscal document must use an immutable snapshot of customer tax data.',
    mvpPolicy: 'Lock tax profiles when used by a fiscal document.',
    goLiveGate: 'Past invoices cannot change when the customer edits billing data.',
  },
  {
    code: 'refund_credit_note',
    title: 'Refund and credit note link',
    decision: 'Refunds must evaluate fiscal consequences before execution or completion.',
    mvpPolicy: 'If an invoice is issued, require admin fiscal review before refund completion.',
    goLiveGate: 'Refund state and fiscal adjustment state must be reconciled.',
  },
  {
    code: 'legal_pack_versioning',
    title: 'Legal pack versioning',
    decision: 'Terms, privacy, refund policy and report disclaimer must be versioned and accepted.',
    mvpPolicy: 'Checkout requires active published versions and acceptance snapshot.',
    goLiveGate: 'No checkout if mandatory legal documents are missing or draft-only.',
  },
];

export const fiscalLegalGoLiveBlockers = [
  'missing_published_terms',
  'missing_privacy_policy',
  'missing_refund_policy',
  'missing_tax_profile_snapshot',
  'unvalidated_invoice_process',
  'refund_without_fiscal_review_when_invoice_issued',
  'legal_document_without_hash_or_version',
  'customer_acceptance_not_recorded',
] as const;
