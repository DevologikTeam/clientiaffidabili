import { DataTable } from '@/components/ds';
import { settingsAdminRuntime } from '@/lib/settings-admin/settings-admin-runtime';

export function OperationalErrorLedgerTable() {
  return (
    <DataTable
      columns={['Categoria', 'Severita', 'Stato', 'Messaggio', 'Oggetto', 'Azione']}
      rows={settingsAdminRuntime.errors.map((item) => [
        item.category,
        item.severity,
        item.status,
        item.safeMessage,
        item.linkedObject,
        item.nextAction,
      ])}
    />
  );
}
