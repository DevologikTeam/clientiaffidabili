import { Badge, Card, DataTable, StatusPill } from '../ds';
import { sandboxScenarioRows, type SandboxScenarioRow } from '../../lib/sandbox-certification/sandbox-certification-runtime';

function toneFor(status: SandboxScenarioRow['status']) {
  if (status === 'passed') return 'success' as const;
  if (status === 'failed' || status === 'blocked') return 'danger' as const;
  if (status === 'waived') return 'warning' as const;
  if (status === 'running') return 'info' as const;
  return 'neutral' as const;
}

export function CertificationScenarioTable() {
  return (
    <Card>
      <p className="ca-eyebrow">Scenario registry</p>
      <h2>Scenari sandbox certificabili</h2>
      <p>La tabella espone solo payload redatti e prossime azioni operative. Le chiamate provider reali restano disattivate finche non vengono eseguite in sandbox.</p>
      <DataTable<SandboxScenarioRow>
        caption="Scenari di certificazione sandbox"
        rows={sandboxScenarioRows}
        columns={[
          { key: 'scenario', label: 'Scenario', render: (row: any) => <div><strong>{row.title}</strong><br /><small>{row.id}</small></div> },
          { key: 'area', label: 'Area', render: (row: any) => <Badge tone="brand">{row.area}</Badge> },
          { key: 'status', label: 'Stato', render: (row: any) => <StatusPill tone={toneFor(row.status)} label={row.status} /> },
          { key: 'blocker', label: 'RC', render: (row: any) => row.blockerForRc ? <Badge tone="danger">Blocker</Badge> : <Badge tone="neutral">Disabilitabile</Badge> },
          { key: 'next', label: 'Prossima azione', render: (row: any) => row.nextAction },
        ]}
      />
    </Card>
  );
}
