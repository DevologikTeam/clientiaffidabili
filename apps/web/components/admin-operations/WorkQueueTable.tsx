import { Badge, Button, Card, DataTable } from '@/components/ds';
import type { AdminOpsItem } from '@/lib/admin-operations/admin-operations-runtime';
import { priorityTone, statusTone, typeLabel } from '@/lib/admin-operations/admin-operations-runtime';

export function WorkQueueTable({ items }: { items: ReadonlyArray<AdminOpsItem> }) {
  return (
    <Card>
      <DataTable
        caption="Coda operativa"
        rows={items}
        columns={[
          { key: 'priority', label: 'Priorità', render: (row: any) => <Badge tone={priorityTone(row.priority)}>{row.priority.replace('p', 'P').replace('_', ' ')}</Badge> },
          { key: 'type', label: 'Tipo', render: (row: any) => typeLabel(row.type) },
          { key: 'orderCode', label: 'Ordine', render: (row: any) => row.orderCode },
          { key: 'serviceLabel', label: 'Servizio', render: (row: any) => row.serviceLabel },
          { key: 'reason', label: 'Motivo', render: (row: any) => row.reason },
          { key: 'status', label: 'Stato', render: (row: any) => <Badge tone={statusTone(row.status)}>{row.status}</Badge> },
          { key: 'nextAction', label: 'Prossima azione', render: (row: any) => row.nextAction },
          { key: 'id', label: 'Apri', render: (row: any) => <Button href={`/admin/operations/${row.id}`} variant="outline" size="sm">Apri</Button> },
        ]}
      />
    </Card>
  );
}
