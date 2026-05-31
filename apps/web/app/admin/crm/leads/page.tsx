import { PageHero } from '@/components/ds';
import { LeadPipelineTable } from '@/components/sales-crm/LeadPipelineTable';

export default function AdminCrmLeadsPage() {
  return (
    <main className="ca-page" id="main-content" tabIndex={-1}>
      <PageHero eyebrow="CRM lead" title="Pipeline commerciale" description="Qualifica richieste, demo, opportunita e prossime azioni commerciali." />
      <LeadPipelineTable />
    </main>
  );
}
