import { Card, StatusPill } from '@/components/ds';
import type { AdminFiscalLegalQueueItem } from '@clientiaffidabili/shared';
import { fiscalStatusTone } from '@/lib/fiscal-legal/fiscal-legal-runtime';

export function AdminFiscalLegalQueue({ items }: { items: ReadonlyArray<AdminFiscalLegalQueueItem> }) {
  return (
    <Card>
      <span className="tag">Fiscal & legal operations</span>
      <h1 style={{ color: 'var(--color-navy-900)', fontSize: 42, marginBottom: 8 }}>Coda fiscale e legale</h1>
      <p>Azioni amministrative con reason obbligatoria, audit e blocco raw payload.</p>
      <div style={{ overflowX: 'auto' }}>
        <table className="table">
          <thead><tr><th>Priorita</th><th>Elemento</th><th>Stato</th><th>Owner</th><th>Prossima azione</th></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td><StatusPill tone={item.priority === 'urgent' ? 'danger' : item.priority === 'high' ? 'warning' : 'neutral'} label={item.priority} /></td>
                <td><strong>{item.title}</strong><br /><span style={{ color: 'var(--color-slate-600)' }}>{item.reason}</span></td>
                <td><StatusPill tone={fiscalStatusTone(item.status)} label={item.status} /></td>
                <td>{item.ownerRole}</td>
                <td>{item.nextActionLabel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
