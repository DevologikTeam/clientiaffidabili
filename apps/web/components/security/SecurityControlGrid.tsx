import { Badge, Card } from '@/components/ds';
import type { SecurityRuntimeControl } from '@/lib/security/security-hardening-runtime';

export function SecurityControlGrid({ controls }: { controls: ReadonlyArray<SecurityRuntimeControl> }) {
  return (
    <div className="ca-grid ca-grid--3">
      {controls.map((control) => (
        <Card key={control.code}>
          <div className="ca-stack ca-stack--sm">
            <div className="ca-row ca-row--between">
              <Badge tone="brand">{control.code}</Badge>
              <Badge tone={control.severity === 'p0' ? 'danger' : 'warning'}>{control.severity}</Badge>
            </div>
            <h3>{control.title}</h3>
            <p>Owner: {control.owner}. Stato: {control.status}. {control.blocksProduction ? 'Blocca la produzione finché non è verificato.' : 'Non bloccante.'}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
