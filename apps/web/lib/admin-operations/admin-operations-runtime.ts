export type AdminOpsPriority = 'p0_critical' | 'p1_high' | 'p2_medium' | 'p3_low';
export type AdminOpsStatus = 'open' | 'in_progress' | 'waiting' | 'blocked' | 'resolved';
export type AdminOpsType = 'payment_pending' | 'paid_not_requested' | 'provider_failed' | 'provider_manual_review' | 'report_ready_for_review' | 'report_blocked' | 'invoice_pending' | 'refund_requested' | 'support_open' | 'incident_anomaly';

export type AdminOpsItem = {
  id: string;
  type: AdminOpsType;
  priority: AdminOpsPriority;
  status: AdminOpsStatus;
  orderCode: string;
  serviceLabel: string;
  reason: string;
  impact: string;
  nextAction: string;
  ownerRole: string;
  assignedToLabel?: string;
  dueAt?: string;
  canOpen: boolean;
};

export type AdminOpsSnapshot = {
  kind: 'order' | 'payment' | 'provider' | 'report' | 'invoice' | 'support';
  title: string;
  status: string;
  summary: string;
  safeHref?: string;
};

export type AdminOpsAction = {
  code: string;
  label: string;
  risk: 'safe' | 'reason_required' | 'blocked';
  requiresReason: boolean;
  requiresIdempotency: boolean;
  safeExplanation: string;
};

export type AdminOpsAudit = {
  id: string;
  createdAt: string;
  actorLabel: string;
  actorRole: string;
  action: string;
  severity: 'info' | 'warning' | 'high' | 'critical';
  reason?: string;
  safeDescription: string;
};

export const adminOpsSummary = {
  criticalCount: 0,
  blockedRevenueCount: 2,
  reviewCount: 1,
  billingCount: 1,
  openSupportCount: 1,
  slaBreachedCount: 0,
  updatedAt: '2026-05-30T10:00:00.000Z',
};

export const adminOpsItems: AdminOpsItem[] = [
  {
    id: 'op_demo_provider_failed',
    type: 'provider_failed',
    priority: 'p1_high',
    status: 'open',
    orderCode: 'CA-2026-0008',
    serviceLabel: 'Check Affidabilità Pro',
    reason: 'Provider non disponibile dopo pagamento confermato.',
    impact: 'Il cliente non riceve il report nei tempi promessi e il costo non deve essere duplicato.',
    nextAction: 'Valuta retry sicuro con idempotency key o escalation manuale.',
    ownerRole: 'operations_agent',
    assignedToLabel: 'Operations',
    dueAt: '2026-05-30T12:00:00.000Z',
    canOpen: true,
  },
  {
    id: 'op_demo_report_review',
    type: 'report_ready_for_review',
    priority: 'p2_medium',
    status: 'in_progress',
    orderCode: 'CA-2026-0009',
    serviceLabel: 'KYB Compliance',
    reason: 'Report con evidenze compliance-sensitive da validare.',
    impact: 'Pubblicazione bloccata finché il revisore non conferma fonti, limiti e copy.',
    nextAction: 'Revisiona evidenze e pubblica solo con reason obbligatoria.',
    ownerRole: 'compliance_reviewer',
    assignedToLabel: 'Compliance',
    dueAt: '2026-05-30T16:00:00.000Z',
    canOpen: true,
  },
  {
    id: 'op_demo_refund',
    type: 'refund_requested',
    priority: 'p1_high',
    status: 'waiting',
    orderCode: 'CA-2026-0010',
    serviceLabel: 'Verifica IBAN',
    reason: 'Cliente richiede rimborso prima della chiamata provider.',
    impact: 'Possibile rimborso completo se il provider non ha generato costi.',
    nextAction: 'Controlla ledger costi e prepara approvazione billing.',
    ownerRole: 'billing_agent',
    assignedToLabel: 'Billing',
    dueAt: '2026-05-30T14:00:00.000Z',
    canOpen: true,
  },
  {
    id: 'op_demo_support',
    type: 'support_open',
    priority: 'p3_low',
    status: 'open',
    orderCode: 'CA-2026-0011',
    serviceLabel: 'Verifica azienda essenziale',
    reason: 'Richiesta cliente su lettura report.',
    impact: 'Serve risposta chiara senza consulenza legale o promesse assolute.',
    nextAction: 'Rispondi collegando report, limiti e prossima azione sicura.',
    ownerRole: 'support_agent',
    assignedToLabel: 'Supporto',
    canOpen: true,
  },
];

export const adminOpsActions: AdminOpsAction[] = [
  { code: 'assign_item', label: 'Assegna item', risk: 'safe', requiresReason: false, requiresIdempotency: false, safeExplanation: 'Assegna il lavoro a un operatore autorizzato.' },
  { code: 'safe_provider_retry', label: 'Valuta retry sicuro', risk: 'reason_required', requiresReason: true, requiresIdempotency: true, safeExplanation: 'Ripete una richiesta provider solo se classificata come idempotente o senza doppio costo.' },
  { code: 'publish_report', label: 'Pubblica report', risk: 'reason_required', requiresReason: true, requiresIdempotency: true, safeExplanation: 'Rende visibile il report al cliente dopo review.' },
  { code: 'request_refund', label: 'Proponi rimborso', risk: 'reason_required', requiresReason: true, requiresIdempotency: true, safeExplanation: 'Apre una richiesta di rimborso da approvare.' },
  { code: 'approve_refund', label: 'Approva rimborso', risk: 'reason_required', requiresReason: true, requiresIdempotency: true, safeExplanation: 'Approva un rimborso dopo verifica costi provider e stato report.' },
];

export const adminOpsAudit: AdminOpsAudit[] = [
  {
    id: 'audit_demo_created',
    createdAt: '2026-05-30T09:10:00.000Z',
    actorLabel: 'Sistema',
    actorRole: 'super_admin',
    action: 'work_item_created',
    severity: 'info',
    safeDescription: 'Item creato da evento operativo con dati sensibili redatti.',
  },
  {
    id: 'audit_demo_assignment',
    createdAt: '2026-05-30T09:25:00.000Z',
    actorLabel: 'Operations',
    actorRole: 'operations_agent',
    action: 'assign_item',
    severity: 'info',
    reason: 'Assegnazione per controllo SLA.',
    safeDescription: 'Assegnazione registrata senza esporre raw payload provider.',
  },
];

export function priorityTone(priority: AdminOpsPriority) {
  if (priority === 'p0_critical') return 'danger' as const;
  if (priority === 'p1_high') return 'warning' as const;
  if (priority === 'p2_medium') return 'info' as const;
  return 'neutral' as const;
}

export function statusTone(status: AdminOpsStatus) {
  if (status === 'resolved') return 'success' as const;
  if (status === 'blocked') return 'danger' as const;
  if (status === 'waiting') return 'warning' as const;
  if (status === 'in_progress') return 'info' as const;
  return 'neutral' as const;
}

export function typeLabel(type: AdminOpsType) {
  const labels: Record<AdminOpsType, string> = {
    payment_pending: 'Pagamento in attesa',
    paid_not_requested: 'Pagato non richiesto',
    provider_failed: 'Errore provider',
    provider_manual_review: 'Review provider',
    report_ready_for_review: 'Report da revisionare',
    report_blocked: 'Report bloccato',
    invoice_pending: 'Fattura in attesa',
    refund_requested: 'Rimborso richiesto',
    support_open: 'Supporto aperto',
    incident_anomaly: 'Anomalia incidente',
  };
  return labels[type];
}

export function getAdminOpsDetail(id: string) {
  const item = adminOpsItems.find((entry) => entry.id === id) ?? adminOpsItems[0];
  const snapshots: AdminOpsSnapshot[] = [
    { kind: 'order', title: 'Ordine', status: item.orderCode, summary: 'Pagamento confermato prima di ogni chiamata provider.', safeHref: '/admin/billing' },
    { kind: 'provider', title: 'Provider', status: item.type === 'provider_failed' ? 'failed' : 'ok', summary: 'Payload grezzo non esposto nella console operativa.', safeHref: '/admin/provider' },
    { kind: 'report', title: 'Report', status: item.type === 'report_ready_for_review' ? 'review_required' : 'not_ready', summary: 'Pubblicazione solo con reason e audit.', safeHref: '/admin/reports' },
  ];
  const allowedActions = adminOpsActions.filter((action) => {
    if (action.code === 'safe_provider_retry') return item.type === 'provider_failed';
    if (action.code === 'publish_report') return item.type === 'report_ready_for_review';
    if (['request_refund', 'approve_refund'].includes(action.code)) return item.type === 'refund_requested';
    return action.code === 'assign_item';
  });
  return {
    item,
    snapshots,
    allowedActions,
    blockedActions: [
      { code: 'view_raw_payload', label: 'Vedi payload grezzo', blockedReason: 'Non disponibile nella console operativa. Serve vault separato con richiesta motivata.' },
      { code: 'force_override', label: 'Override manuale', blockedReason: 'Riservato a super admin e mai disponibile senza audit rafforzato.' },
    ],
    auditTimeline: adminOpsAudit,
  };
}
