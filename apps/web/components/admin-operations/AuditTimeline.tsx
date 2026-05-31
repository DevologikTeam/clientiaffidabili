import { Badge, Card } from '@/components/ds';
import type { AdminOpsAudit } from '@/lib/admin-operations/admin-operations-runtime';

export function AuditTimeline({ items }: { items: ReadonlyArray<AdminOpsAudit> }) {
  return (
    <Card>
      <p className="ca-eyebrow">Audit</p>
      <h3>Timeline redatta</h3>
      <div className="ca-stack" style={{ marginTop: 18 }}>
        {items.map((item) => (
          <div key={item.id} style={{ borderLeft: '3px solid var(--ca-trust-blue-600)', paddingLeft: 14 }}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <strong>{item.action}</strong>
              <Badge tone={item.severity === 'critical' || item.severity === 'high' ? 'danger' : item.severity === 'warning' ? 'warning' : 'neutral'}>{item.severity}</Badge>
            </div>
            <p style={{ margin: '6px 0' }}>{item.safeDescription}</p>
            <small>{item.actorLabel} · {new Date(item.createdAt).toLocaleString('it-IT')}</small>
          </div>
        ))}
      </div>
    </Card>
  );
}
