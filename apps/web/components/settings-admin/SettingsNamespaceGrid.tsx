import { Card } from '@/components/ds';
import { settingsAdminRuntime } from '@/lib/settings-admin/settings-admin-runtime';

export function SettingsNamespaceGrid() {
  return (
    <section className="ca-grid ca-grid-2">
      {settingsAdminRuntime.namespaces.map((item) => (
        <Card key={item.namespace}>
          <p className="ca-eyebrow">{item.namespace}</p>
          <h3>{item.label}</h3>
          <p>{item.description}</p>
          <p><strong>Stato:</strong> {item.state} · <strong>Issue:</strong> {item.issueCount}</p>
          <p className="ca-muted">Prossima azione: {item.primaryAction}</p>
        </Card>
      ))}
    </section>
  );
}
