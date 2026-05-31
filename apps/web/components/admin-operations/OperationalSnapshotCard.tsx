import { Badge, Button, Card } from '@/components/ds';
import type { AdminOpsSnapshot } from '@/lib/admin-operations/admin-operations-runtime';

export function OperationalSnapshotCard({ snapshot }: { snapshot: AdminOpsSnapshot }) {
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start' }}>
        <div>
          <p className="ca-eyebrow">{snapshot.kind}</p>
          <h3>{snapshot.title}</h3>
        </div>
        <Badge tone="info">{snapshot.status}</Badge>
      </div>
      <p>{snapshot.summary}</p>
      {snapshot.safeHref ? <Button href={snapshot.safeHref} variant="ghost" size="sm">Apri vista collegata</Button> : null}
    </Card>
  );
}
