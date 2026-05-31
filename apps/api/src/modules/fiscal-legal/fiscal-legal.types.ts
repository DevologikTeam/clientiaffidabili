export type TaxProfileType =
  | 'business_it'
  | 'consumer_it'
  | 'business_eu'
  | 'consumer_eu'
  | 'business_extra_eu'
  | 'consumer_extra_eu'
  | 'public_administration'
  | 'requires_review';

export type FiscalDocumentType =
  | 'invoice'
  | 'receipt'
  | 'credit_note'
  | 'debit_note'
  | 'proforma'
  | 'manual_adjustment';

export type FiscalDocumentLifecycleStatus =
  | 'draft'
  | 'queued'
  | 'requires_review'
  | 'ready_to_issue'
  | 'issued'
  | 'delivered'
  | 'credit_note_required'
  | 'adjusted'
  | 'failed'
  | 'cancelled';

export type LegalDocumentType =
  | 'terms_of_service'
  | 'privacy_policy'
  | 'cookie_policy'
  | 'refund_policy'
  | 'acceptable_use_policy'
  | 'report_disclaimer'
  | 'api_terms';

export type LegalDocumentLifecycleStatus =
  | 'draft'
  | 'legal_review'
  | 'approved'
  | 'published'
  | 'superseded'
  | 'archived';

export type RefundFiscalDecisionStatus =
  | 'not_required'
  | 'credit_note_required'
  | 'credit_note_queued'
  | 'credit_note_issued'
  | 'manual_review'
  | 'blocked';

export interface TaxProfileSnapshot {
  profileType: TaxProfileType;
  legalName: string;
  vatNumber?: string;
  taxCode?: string;
  pec?: string;
  sdiCode?: string;
  email: string;
  country: string;
  addressLine1: string;
  postalCode: string;
  city: string;
  province?: string;
  requiresFiscalReview: boolean;
  snapshotCreatedAt: string;
}

export interface LegalAcceptanceSnapshot {
  acceptedAt: string;
  ipHash?: string;
  userAgentHash?: string;
  documents: Array<{
    type: LegalDocumentType;
    version: string;
    contentHash: string;
  }>;
  explicitPurposes: Array<'lawful_use' | 'report_limits' | 'refund_policy' | 'privacy_acknowledgement' | 'marketing_opt_in'>;
}
