export type AdminWorkItemType =
  | 'payment_pending'
  | 'paid_not_requested'
  | 'provider_failed'
  | 'provider_manual_review'
  | 'report_ready_for_review'
  | 'report_blocked'
  | 'invoice_pending'
  | 'refund_requested'
  | 'support_open'
  | 'incident_anomaly';

export type AdminWorkItemPriority = 'p0_critical' | 'p1_high' | 'p2_medium' | 'p3_low';

export const ADMIN_OPERATIONS_ANALYSIS_VERSION = 'M8-A-0.23.0';

export const ADMIN_OPERATIONS_QUEUES: Array<{
  type: AdminWorkItemType;
  owner: string;
  priority: AdminWorkItemPriority;
  purpose: string;
  blockedActions: string[];
}> = [
  {
    type: 'payment_pending',
    owner: 'billing_agent',
    priority: 'p2_medium',
    purpose: 'Monitorare pagamenti iniziati ma non confermati.',
    blockedActions: ['provider_call', 'report_generation'],
  },
  {
    type: 'paid_not_requested',
    owner: 'operations_agent',
    priority: 'p1_high',
    purpose: 'Evitare che un ordine pagato resti senza richiesta provider.',
    blockedActions: ['refund_without_review'],
  },
  {
    type: 'provider_failed',
    owner: 'operations_agent',
    priority: 'p1_high',
    purpose: 'Gestire errori provider su ordine pagato con retry sicuro o manual review.',
    blockedActions: ['unsafe_retry', 'raw_payload_exposure'],
  },
  {
    type: 'provider_manual_review',
    owner: 'compliance_reviewer',
    priority: 'p1_high',
    purpose: 'Verificare richieste provider con rischio compliance o dati ambigui.',
    blockedActions: ['auto_publish_report'],
  },
  {
    type: 'report_ready_for_review',
    owner: 'analyst',
    priority: 'p2_medium',
    purpose: 'Revisionare report generato prima della pubblicazione.',
    blockedActions: ['publish_without_authorization_check'],
  },
  {
    type: 'report_blocked',
    owner: 'compliance_reviewer',
    priority: 'p1_high',
    purpose: 'Sbloccare o confermare blocco report con motivazione.',
    blockedActions: ['customer_visibility_without_review'],
  },
  {
    type: 'invoice_pending',
    owner: 'billing_agent',
    priority: 'p2_medium',
    purpose: 'Completare gestione fiscale manual-assisted.',
    blockedActions: ['delete_ledger_entry'],
  },
  {
    type: 'refund_requested',
    owner: 'super_admin',
    priority: 'p1_high',
    purpose: 'Valutare rimborso, provider cost e stato report.',
    blockedActions: ['automatic_refund_after_provider_completion'],
  },
  {
    type: 'support_open',
    owner: 'support_agent',
    priority: 'p2_medium',
    purpose: 'Rispondere a ticket collegati a ordine, report o fattura.',
    blockedActions: ['share_sensitive_internal_data'],
  },
  {
    type: 'incident_anomaly',
    owner: 'super_admin',
    priority: 'p0_critical',
    purpose: 'Gestire anomalie privacy, pagamento, provider o autorizzazione.',
    blockedActions: ['ignore_without_audit'],
  },
];

export const ADMIN_OPERATIONS_GUARDRAILS = [
  'Nessuna provider call prima del pagamento confermato.',
  'Nessun raw payload provider nelle liste admin.',
  'Azioni economiche e compliance con reason obbligatoria.',
  'Snapshot prezzo e report immutabili dopo pubblicazione.',
  'Audit append-only per azioni critiche.',
  'RBAC backend oltre alla UI.',
];
