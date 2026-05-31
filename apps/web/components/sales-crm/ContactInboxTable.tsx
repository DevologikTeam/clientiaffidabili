import { Badge, Card, DataTable } from '@/components/ds';
import { salesCrmRuntime } from '@/lib/sales-crm/sales-crm-runtime';

export function ContactInboxTable() {
  return (
    <Card>
      <p className="ca-eyebrow">Inbox contatti</p>
      <h2>Messaggi salvati in admin</h2>
      <DataTable
        caption="Messaggi contatto"
        rows={salesCrmRuntime.inbox}
        columns={[
          { key: 'name', label: 'Contatto', render: (row: any) => <strong>{row.name}</strong> },
          { key: 'company', label: 'Azienda', render: (row: any) => row.companyName ?? '—' },
          { key: 'source', label: 'Origine', render: (row: any) => <code>{row.sourcePath}</code> },
          { key: 'status', label: 'Stato', render: (row: any) => <Badge tone={row.status === 'new' ? 'warning' : 'info'}>{row.status}</Badge> },
          { key: 'email', label: 'Email', render: (row: any) => <Badge tone={row.emailDeliveryStatus === 'failed' ? 'danger' : 'neutral'}>{row.emailDeliveryStatus}</Badge> },
        ]}
      />
    </Card>
  );
}
