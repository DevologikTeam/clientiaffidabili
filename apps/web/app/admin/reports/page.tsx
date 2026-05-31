import { Header } from '@/components/Header';
import { Badge, Card, DataTable, PageHero } from '@/components/ds';

const queue = [
  { id: 'rep_demo_review', orderId: 'ord_demo_01', status: 'review_required', attention: 'Verifica in revisione', nextAction: 'Revisiona evidenze e limiti prima della pubblicazione.' },
  { id: 'rep_demo_ready', orderId: 'ord_demo_02', status: 'ready', attention: 'Attenzione bassa', nextAction: 'Controlla eventuale richiesta download/audit.' },
];

export default function AdminReportsPage() {
  return (
    <>
      <Header />
      <PageHero
        eyebrow="Operazioni interne"
        title="Report composer"
        description="Controlla report pronti, report in revisione e pubblicazione assistita senza esporre payload grezzi al cliente."
      />
      <main className="section" id="main-content" tabIndex={-1}>
        <div className="container">
          <Card>
            <DataTable
              caption="Coda report"
              rows={queue}
              columns={[
                { key: 'id', label: 'Report', render: (row: any) => row.id },
                { key: 'orderId', label: 'Ordine', render: (row: any) => row.orderId },
                { key: 'status', label: 'Stato', render: (row: any) => <Badge tone={row.status === 'ready' ? 'success' : 'warning'}>{row.status}</Badge> },
                { key: 'attention', label: 'Indice', render: (row: any) => row.attention },
                { key: 'nextAction', label: 'Prossima azione', render: (row: any) => row.nextAction },
              ]}
            />
          </Card>
        </div>
      </main>
    </>
  );
}
