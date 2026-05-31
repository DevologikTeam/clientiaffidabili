import { EmailTemplatePreview } from '../../../../components/email-notifications';

export default function AdminEmailTemplatesPage() {
  return (
    <main className="ca-page-shell" id="main-content" tabIndex={-1}>
      <section className="ca-hero ca-hero-compact">
        <p className="ca-eyebrow">Admin · template registry</p>
        <h1>Template email tecniche</h1>
        <p>Template versionati per account, pagamenti, report, PDF, fatture, abbonamenti, supporto e API partner.</p>
      </section>
      <EmailTemplatePreview />
    </main>
  );
}
