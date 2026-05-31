import { Badge, Card } from '@/components/ds';
import { partnerPortalRuntime } from '@/lib/partner-portal/partner-portal-runtime';

export function PartnerUsageLedger() {
  return (
    <Card>
      <p className="ca-eyebrow">Usage ledger</p>
      <h2>Consumi e movimenti</h2>
      <table className="table">
        <thead><tr><th>Data</th><th>Servizio</th><th>Ambiente</th><th>Importo</th><th>Stato</th></tr></thead>
        <tbody>{partnerPortalRuntime.usage.map((entry) => (
          <tr key={entry.id}>
            <td>{entry.date}</td><td>{entry.service}</td><td>{entry.environment}</td><td><strong>{entry.amount}</strong></td><td><Badge tone="info">{entry.status}</Badge></td>
          </tr>
        ))}</tbody>
      </table>
    </Card>
  );
}
