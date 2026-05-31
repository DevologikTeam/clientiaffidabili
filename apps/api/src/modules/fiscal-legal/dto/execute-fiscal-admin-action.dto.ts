export class ExecuteFiscalAdminActionDto {
  action!: 'mark_ready_to_issue' | 'mark_issued' | 'queue_credit_note' | 'publish_legal_document' | 'force_reacceptance' | 'block_refund';
  entityType!: 'fiscal_document' | 'legal_document' | 'refund' | 'tax_profile';
  entityId!: string;
  reason!: string;
  actorUserId?: string;
  metadata?: Record<string, unknown>;
}
