import { Badge, Card, DataTable } from '@/components/ds';
import { salesCrmRuntime } from '@/lib/sales-crm/sales-crm-runtime';

export function SupportTicketTable() {
  return (
    <Card>
      <p className="ca-eyebrow">Supporto</p>
      <h2>Ticket e anomalie operative</h2>
      <DataTable
        caption="Ticket supporto"
        rows={salesCrmRuntime.tickets}
        columns={[
          { key: 'subject', label: 'Ticket', render: (row: any) => <strong>{row.subject}</strong> },
          { key: 'topic', label: 'Area', render: (row: any) => <Badge tone="neutral">{row.topic}</Badge> },
          { key: 'priority', label: 'Priorita', render: (row: any) => <Badge tone={row.priority === 'P1' ? 'warning' : 'info'}>{row.priority}</Badge> },
          { key: 'nextAction', label: 'Prossima azione', render: (row: any) => row.nextAction },
        ]}
      />
    </Card>
  );
}
