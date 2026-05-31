import { EmailDeliveryTable } from '../../../../components/email-notifications';

export default function AdminEmailDeliveriesPage() {
  return (
    <main className="ca-page-shell" id="main-content" tabIndex={-1}>
      <section className="ca-hero ca-hero-compact">
        <p className="ca-eyebrow">Admin · delivery ledger</p>
        <h1>Storico invii email</h1>
        <p>Ogni invio tecnico deve essere tracciabile, ritentabile e collegabile a error ledger o supporto.</p>
      </section>
      <EmailDeliveryTable />
    </main>
  );
}
