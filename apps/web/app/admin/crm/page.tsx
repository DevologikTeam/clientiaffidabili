import { Button, PageHero } from '@/components/ds';
import { AdminCrmSummary, CrmGuardrailsCard } from '@/components/sales-crm/AdminCrmSummary';
import { ContactInboxTable } from '@/components/sales-crm/ContactInboxTable';
import { LeadPipelineTable } from '@/components/sales-crm/LeadPipelineTable';
import { SupportTicketTable } from '@/components/sales-crm/SupportTicketTable';

export default function AdminCrmPage() {
  return (
    <main className="ca-page" id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="Admin CRM"
        title="Lead, contatti e supporto in una console operativa"
        description="Gestisci richieste commerciali, messaggi salvati, ticket e anomalie senza perdere richieste in caso di errore email."
        actions={<Button href="/admin/crm/inbox">Apri inbox contatti</Button>}
      />
      <AdminCrmSummary />
      <ContactInboxTable />
      <LeadPipelineTable />
      <SupportTicketTable />
      <CrmGuardrailsCard />
    </main>
  );
}
