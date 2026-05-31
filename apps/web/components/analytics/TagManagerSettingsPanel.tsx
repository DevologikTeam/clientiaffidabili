import { ExternalTrackingConfig } from '@/lib/analytics/tag-manager-clarity-runtime';
import { Card } from '@/components/ds';

export function TagManagerSettingsPanel({ defaultConfig }: { defaultConfig: ExternalTrackingConfig }) {
  const settings = [
    { key: 'analytics.externalTags.enabled', value: String(defaultConfig.externalTagsEnabled), note: 'Kill switch globale tracking esterno' },
    { key: 'analytics.gtm.enabled', value: String(defaultConfig.gtm.enabled), note: 'Abilita GTM se il container ID e valido' },
    { key: 'analytics.gtm.containerId', value: 'GTM-XXXXXXX', note: 'Da salvare come setting restricted admin' },
    { key: 'analytics.clarity.enabled', value: String(defaultConfig.clarity.enabled), note: 'Abilita Clarity solo su route pubbliche consentite' },
    { key: 'analytics.clarity.projectId', value: 'project-id', note: 'Da salvare come setting restricted admin' },
  ];
  return (
    <Card>
      <p className="ca-eyebrow">Runtime configuration</p>
      <h2>Settings backend previsti</h2>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Setting</th><th>Default</th><th>Uso</th></tr></thead>
          <tbody>
            {settings.map((item) => (
              <tr key={item.key}><td><code>{item.key}</code></td><td>{item.value}</td><td>{item.note}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted">Le modifiche reali passano da API settings admin con reason obbligatoria e audit. Questa pagina espone la policy e il comportamento atteso.</p>
    </Card>
  );
}
