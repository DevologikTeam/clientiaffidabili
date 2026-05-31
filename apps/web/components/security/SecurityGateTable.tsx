import { Badge, Card } from '@/components/ds';
import type { ProductionGateRuntimeCheck } from '@/lib/security/security-hardening-runtime';

const toneByStatus = {
  pass: 'success',
  warning: 'warning',
  fail: 'danger',
} as const;

export function SecurityGateTable({ checks }: { checks: ReadonlyArray<ProductionGateRuntimeCheck> }) {
  return (
    <Card>
      <div className="ca-table-wrap">
        <table className="ca-table">
          <thead>
            <tr>
              <th>Gate</th>
              <th>Stato</th>
              <th>Evidenza richiesta</th>
              <th>Blocca produzione</th>
            </tr>
          </thead>
          <tbody>
            {checks.map((check) => (
              <tr key={check.code}>
                <td><strong>{check.title}</strong><br /><span>{check.code}</span></td>
                <td><Badge tone={toneByStatus[check.status]}>{check.status}</Badge></td>
                <td>{check.evidence}</td>
                <td>{check.blocksProduction ? 'Sì' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
