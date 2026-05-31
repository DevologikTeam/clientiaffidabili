import { Badge, Button, Card, TrustNotice } from '@/components/ds';
import type { AdminOpsAction } from '@/lib/admin-operations/admin-operations-runtime';

export function AdminActionPanel({ actions, blockedActions }: { actions: ReadonlyArray<AdminOpsAction>; blockedActions: ReadonlyArray<{ code: string; label: string; blockedReason: string }> }) {
  return (
    <Card>
      <p className="ca-eyebrow">Azioni sicure</p>
      <h3>Pannello azioni</h3>
      <div className="ca-stack" style={{ marginTop: 18 }}>
        {actions.map((action) => (
          <div key={action.code} style={{ border: '1px solid var(--ca-slate-200)', borderRadius: 16, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <strong>{action.label}</strong>
              <Badge tone={action.risk === 'safe' ? 'success' : 'warning'}>{action.risk === 'safe' ? 'sicura' : 'reason obbligatoria'}</Badge>
            </div>
            <p>{action.safeExplanation}</p>
            <Button variant={action.requiresReason ? 'outline' : 'primary'} size="sm">{action.requiresReason ? 'Apri reason modal' : 'Esegui azione'}</Button>
          </div>
        ))}
        {blockedActions.length ? (
          <TrustNotice tone="warning" title="Azioni bloccate">
            {blockedActions.map((action) => `${action.label}: ${action.blockedReason}`).join(' ')}
          </TrustNotice>
        ) : null}
      </div>
    </Card>
  );
}
