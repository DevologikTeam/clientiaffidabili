import Link from 'next/link';
import { Card, StatusPill } from '@/components/ds';
import type { CustomerDashboardCheckItem } from '@clientiaffidabili/shared';
import { formatEuro, statusTone } from '@/lib/customer-dashboard/customer-dashboard-runtime';

export function CheckList({ checks }: { checks: ReadonlyArray<CustomerDashboardCheckItem> }) {
  return (
    <Card>
      <div className="section-head" style={{ alignItems: 'center', marginBottom: 10 }}>
        <div>
          <span className="tag">Storico verifiche</span>
          <h2 style={{ fontSize: 30 }}>Verifiche recenti</h2>
        </div>
        <Link className="btn btn-outline" href="/dashboard/verifiche">Vedi tutte</Link>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="table">
          <thead><tr><th>Soggetto</th><th>Servizio</th><th>Stato</th><th>Importo</th><th>Azione</th></tr></thead>
          <tbody>
            {checks.map((check) => (
              <tr key={check.id}>
                <td><strong>{check.subjectName}</strong><br /><span style={{ color: 'var(--color-slate-600)' }}>{check.subjectIdentifier}</span></td>
                <td>{check.serviceName}</td>
                <td><StatusPill tone={statusTone(check.status)} label={check.statusLabel} /></td>
                <td>{formatEuro(check.amountGrossCents)}</td>
                <td><Link className="btn btn-outline" href={`/dashboard/verifiche/${check.id}`}>Apri dettaglio</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
