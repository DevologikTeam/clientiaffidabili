import { Badge, Card, DataTable } from '@/components/ds';
import { salesCrmRuntime } from '@/lib/sales-crm/sales-crm-runtime';

export function LeadPipelineTable() {
  return (
    <Card>
      <p className="ca-eyebrow">Pipeline</p>
      <h2>Lead e prossime azioni</h2>
      <DataTable
        caption="Lead commerciali"
        rows={salesCrmRuntime.leads}
        columns={[
          { key: 'name', label: 'Lead', render: (row: any) => <strong>{row.name}</strong> },
          { key: 'status', label: 'Stato', render: (row: any) => <Badge tone="info">{row.status}</Badge> },
          { key: 'temperature', label: 'Priorita', render: (row: any) => <Badge tone={row.temperature === 'hot' ? 'warning' : 'neutral'}>{row.temperature}</Badge> },
          { key: 'nextAction', label: 'Prossima azione', render: (row: any) => row.nextAction },
        ]}
      />
    </Card>
  );
}
