export const adminOperationsExperienceBlueprint = {
  title: 'Centro operativo',
  purpose: 'Governare ordini, pagamenti, provider, report, fatture e supporto in una sola cabina di regia.',
  primaryQuestion: 'Cosa richiede attenzione ora?',
  requiredFields: ['status', 'reason', 'impact', 'nextAction', 'ownerRole', 'blockedActions'],
  defaultRoute: '/admin/operations',
} as const;

export const adminOperationsPriorityCards = [
  {
    key: 'critical',
    label: 'Critici',
    description: 'Incidenti, doppio addebito, esposizione dati o report non autorizzati.',
    action: 'Apri incidente',
  },
  {
    key: 'blocked',
    label: 'Da sbloccare',
    description: 'Ordini pagati che non avanzano verso provider o report.',
    action: 'Lavora primo blocco',
  },
  {
    key: 'review',
    label: 'Da revisionare',
    description: 'Report e richieste compliance in attesa di controllo.',
    action: 'Apri review',
  },
  {
    key: 'billing',
    label: 'Amministrazione',
    description: 'Fatture, rimborsi, dispute e riconciliazioni.',
    action: 'Apri billing',
  },
] as const;

export const adminWorkQueueColumns = [
  'priority',
  'type',
  'order',
  'service',
  'reason',
  'impact',
  'owner',
  'nextAction',
  'sla',
  'status',
] as const;

export const adminActionCopy = {
  payment_pending: 'Verifica pagamento',
  paid_not_requested: 'Avvia richiesta provider',
  provider_failed: 'Valuta retry sicuro',
  provider_manual_review: 'Revisiona richiesta',
  report_ready_for_review: 'Revisiona report',
  report_blocked: 'Risolvi blocco report',
  invoice_pending: 'Prepara fattura',
  refund_requested: 'Valuta rimborso',
  support_open: 'Rispondi al cliente',
  incident_anomaly: 'Apri incidente',
} as const;

export const adminReasonModalBlueprint = {
  requiredFor: ['provider retry', 'report publish', 'report block', 'refund', 'override', 'critical close'],
  fields: ['reason', 'reasonCategory', 'confirmGuardrail', 'auditPreview'],
  invalidExamples: ['ok', 'test', 'fix'],
  submitLabels: {
    publish_report: 'Pubblica report al cliente',
    block_report: 'Blocca report',
    safe_provider_retry: 'Ripeti richiesta provider sicura',
    approve_refund: 'Approva rimborso manuale',
  },
} as const;

export const adminOperationsComponentBlueprint = [
  'AdminCommandHeader',
  'OperationsPriorityStrip',
  'WorkQueueTable',
  'WorkItemDrawer',
  'OperationalSnapshotCard',
  'AdminActionPanel',
  'ReasonModal',
  'AuditTimeline',
  'PermissionBadge',
] as const;

export const adminOperationsDesignGuardrails = [
  'Nessun raw payload nelle liste admin.',
  'Azioni critiche con reason obbligatoria.',
  'RBAC backend obbligatorio.',
  'Audit append-only.',
  'Provider call solo dopo pagamento confermato.',
  'Azioni non implementate disabilitate con motivo operativo.',
] as const;
