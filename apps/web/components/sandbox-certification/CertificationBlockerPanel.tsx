import { Alert, Card, Checklist } from '../ds';
import { sandboxCertificationSummary, sandboxScenarioRows } from '../../lib/sandbox-certification/sandbox-certification-runtime';

export function CertificationBlockerPanel() {
  const blockers = sandboxScenarioRows.filter((scenario) => scenario.status === 'blocked' || scenario.status === 'failed');
  return (
    <Card variant={blockers.length ? 'danger' : 'default'}>
      <p className="ca-eyebrow">Blocker panel</p>
      <h2>Decisione RC</h2>
      <Alert title={blockers.length ? 'RC bloccata' : 'Nessun blocker aperto'} tone={blockers.length ? 'danger' : 'success'}>
        <p>{sandboxCertificationSummary.nextAction}</p>
      </Alert>
      <Checklist items={[
        'Ogni scenario fallito o bloccato deve avere Operational Error Ledger.',
        'Ogni waiver richiede reason, feature flag disabilitato e audit append-only.',
        'Nessuna chiamata provider reale viene eseguita dal mock runner M19-S.',
        'Docker/Coolify, Playwright e provider sandbox reali restano gate manuali prima della RC.',
      ]} />
    </Card>
  );
}
