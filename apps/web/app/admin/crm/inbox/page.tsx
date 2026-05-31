import { PageHero } from '@/components/ds';
import { ContactInboxTable } from '@/components/sales-crm/ContactInboxTable';

export default function AdminCrmInboxPage() {
  return (
    <main className="ca-page" id="main-content" tabIndex={-1}>
      <PageHero eyebrow="CRM inbox" title="Messaggi contatto salvati" description="Ogni richiesta viene persistita prima del tentativo email. Da qui puoi qualificarla come lead o ticket." />
      <ContactInboxTable />
    </main>
  );
}
