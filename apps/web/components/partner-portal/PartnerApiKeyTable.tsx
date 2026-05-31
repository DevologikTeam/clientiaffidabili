import { Badge, Button, Card } from '@/components/ds';
import { partnerPortalRuntime } from '@/lib/partner-portal/partner-portal-runtime';

export function PartnerApiKeyTable() {
  return (
    <Card>
      <div className="section-head">
        <div><p className="ca-eyebrow">API key</p><h2>Chiavi sandbox/live</h2></div>
        <Button size="sm">Genera chiave sandbox</Button>
      </div>
      <table className="table">
        <thead><tr><th>Label</th><th>Prefix</th><th>Ambiente</th><th>Scope</th><th>Stato</th></tr></thead>
        <tbody>{partnerPortalRuntime.apiKeys.map((key) => (
          <tr key={key.id}>
            <td><strong>{key.label}</strong></td>
            <td><code>{key.prefix}</code></td>
            <td>{key.environment}</td>
            <td>{key.scopes.join(', ')}</td>
            <td><Badge tone="success">{key.status}</Badge></td>
          </tr>
        ))}</tbody>
      </table>
    </Card>
  );
}
