import { Card, StatCard } from '@/components/ds';

export function OperationsPriorityStrip({ summary }: { summary: { criticalCount: number; blockedRevenueCount: number; reviewCount: number; billingCount: number; openSupportCount: number; slaBreachedCount: number } }) {
  return (
    <div className="ca-grid ca-grid--3">
      <StatCard label="Critici" value={String(summary.criticalCount)} description="Incidenti, dati sensibili o blocchi P0." tone={summary.criticalCount > 0 ? 'danger' : 'success'} />
      <StatCard label="Da sbloccare" value={String(summary.blockedRevenueCount)} description="Ordini pagati che non avanzano." tone="warning" />
      <StatCard label="Review" value={String(summary.reviewCount)} description="Report/provider in revisione interna." tone="info" />
      <StatCard label="Billing" value={String(summary.billingCount)} description="Fatture, rimborsi o riconciliazioni." tone="neutral" />
      <StatCard label="Supporto" value={String(summary.openSupportCount)} description="Richieste cliente aperte." tone="neutral" />
      <Card><strong>SLA superati</strong><p style={{ margin: '8px 0 0' }}>{summary.slaBreachedCount === 0 ? 'Nessun superamento SLA rilevato.' : `${summary.slaBreachedCount} item richiedono escalation.`}</p></Card>
    </div>
  );
}
