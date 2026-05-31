import { EmailDeliveryTable, EmailGuardrailPanel, EmailOperationsSummary, EmailTemplatePreview } from '../../../components/email-notifications';

export default function AdminEmailNotificationsPage() {
  return (
    <main className="ca-page-shell" id="main-content" tabIndex={-1}>
      <section className="ca-hero ca-hero-compact">
        <p className="ca-eyebrow">Admin · email monitor</p>
        <h1>Email tecniche e notifiche cliente</h1>
        <p>Monitora registrazioni, recupero password, pagamenti, report pronti, PDF sicuri, fatture, rimborsi, supporto e partner API.</p>
      </section>
      <EmailOperationsSummary />
      <section className="ca-grid ca-grid-2">
        <EmailDeliveryTable />
        <EmailTemplatePreview />
      </section>
      <EmailGuardrailPanel />
    </main>
  );
}
