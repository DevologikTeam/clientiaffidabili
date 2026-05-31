import { DataTable } from '@/components/ds';
import { settingsAdminRuntime } from '@/lib/settings-admin/settings-admin-runtime';

export function SettingsTable() {
  return (
    <DataTable
      columns={['Namespace', 'Chiave', 'Stato', 'Valore', 'Sensibilita', 'Go-live']}
      rows={settingsAdminRuntime.settings.map((item) => [
        item.namespace,
        item.key,
        item.state,
        item.displayValue,
        item.sensitivity,
        item.goLiveBlocker ? 'Bloccante' : 'Non bloccante',
      ])}
    />
  );
}
