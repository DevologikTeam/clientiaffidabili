import type { AdminFiscalLegalQueueItem, FiscalLegalDashboardSnapshot } from '@clientiaffidabili/shared';

export function formatEuro(cents: number): string {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(cents / 100);
}

export const fiscalLegalDashboard: FiscalLegalDashboardSnapshot = {
  taxProfile: {
    id: 'tax_demo_001',
    profileType: 'business_it',
    legalName: 'Cliente Affidabile Demo S.r.l.',
    vatNumber: 'IT00000000000',
    taxCode: '00000000000',
    pec: 'amministrazione@examplepec.it',
    sdiCode: '0000000',
    email: 'amministrazione@example.com',
    address: 'Via Esempio 1, 00100 Roma (RM), IT',
    status: 'complete',
    statusLabel: 'Profilo fiscale completo',
    nextActionLabel: 'Aggiorna solo se i dati sono cambiati',
    requiresFiscalReview: false,
  },
  fiscalDocuments: [
    { id: 'doc_001', orderId: 'ord_2401', label: 'Fattura FA-2026-0001', documentType: 'invoice', status: 'issued', statusLabel: 'Emessa', totalAmountCents: 3038, currency: 'EUR', issuedAt: '2026-05-30T09:00:00.000Z', downloadUrl: '#', nextActionLabel: 'Scarica documento' },
    { id: 'doc_002', orderId: 'ord_2402', label: 'Documento in preparazione', documentType: 'invoice', status: 'queued', statusLabel: 'In preparazione', totalAmountCents: 6088, currency: 'EUR', nextActionLabel: 'Nessuna azione richiesta' },
  ],
  legalAcceptances: [
    { id: 'acc_001', label: 'Termini di servizio + uso lecito + limiti report', version: '2026.05.30', acceptedAt: '2026-05-30T08:48:00.000Z', source: 'checkout' },
    { id: 'acc_002', label: 'Privacy e refund policy', version: '2026.05.30', acceptedAt: '2026-05-30T08:48:00.000Z', source: 'checkout' },
  ],
  legalPack: [
    { documentType: 'terms_of_service', title: 'Termini di servizio', version: '2026.05.30', status: 'published', contentHash: 'sha256:terms-demo', publishedAt: '2026-05-30T08:00:00.000Z' },
    { documentType: 'privacy_policy', title: 'Informativa privacy', version: '2026.05.30', status: 'published', contentHash: 'sha256:privacy-demo', publishedAt: '2026-05-30T08:00:00.000Z' },
    { documentType: 'refund_policy', title: 'Politica rimborsi', version: '2026.05.30', status: 'published', contentHash: 'sha256:refund-demo', publishedAt: '2026-05-30T08:00:00.000Z' },
    { documentType: 'acceptable_use_policy', title: 'Uso consentito', version: '2026.05.30', status: 'published', contentHash: 'sha256:aup-demo', publishedAt: '2026-05-30T08:00:00.000Z' },
    { documentType: 'report_disclaimer', title: 'Limiti dei report', version: '2026.05.30', status: 'published', contentHash: 'sha256:report-demo', publishedAt: '2026-05-30T08:00:00.000Z' },
  ],
};

export const adminFiscalLegalQueue: AdminFiscalLegalQueueItem[] = [
  { id: 'flq_001', type: 'fiscal_document', priority: 'high', title: 'Fattura da verificare prima emissione', reason: 'Profilo fiscale aggiornato dopo pagamento', status: 'requires_review', ownerRole: 'billing', nextActionLabel: 'Verifica snapshot e prepara documento', createdAt: '2026-05-30T09:20:00.000Z' },
  { id: 'flq_002', type: 'refund_credit_note', priority: 'urgent', title: 'Rimborso con nota credito richiesta', reason: 'Pagamento rimborsabile, fattura gia emessa', status: 'credit_note_required', ownerRole: 'billing', nextActionLabel: 'Genera nota credito o blocca con motivazione', createdAt: '2026-05-30T09:35:00.000Z' },
  { id: 'flq_003', type: 'legal_document', priority: 'normal', title: 'Legal pack da rivedere', reason: 'Nuova versione termini pronta ma non pubblicata', status: 'legal_review', ownerRole: 'compliance', nextActionLabel: 'Revisiona e pubblica versione', createdAt: '2026-05-30T10:00:00.000Z' },
];

export function fiscalStatusTone(status: string): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
  if (['issued', 'delivered', 'complete', 'published'].includes(status)) return 'success';
  if (['requires_review', 'credit_note_required'].includes(status)) return 'warning';
  if (['failed', 'cancelled'].includes(status)) return 'danger';
  if (['queued', 'ready_to_issue', 'legal_review'].includes(status)) return 'info';
  return 'neutral';
}
