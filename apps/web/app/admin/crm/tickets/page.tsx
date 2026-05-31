import { PageHero } from '@/components/ds';
import { SupportTicketTable } from '@/components/sales-crm/SupportTicketTable';

export default function AdminCrmTicketsPage() {
  return (
    <main className="ca-page" id="main-content" tabIndex={-1}>
      <PageHero eyebrow="Support operations" title="Ticket e anomalie" description="Gestisci richieste cliente, problemi email, pagamenti, rimborsi, provider e partner/API." />
      <SupportTicketTable />
    </main>
  );
}
