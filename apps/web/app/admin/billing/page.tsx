import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Badge, Card, DataTable, SectionHeader, TrustNotice } from '@/components/ds';
import { billingOperationsSeed } from '@/lib/billing/checkout';

export default function AdminBillingPage() {
  return (
    <>
      <Header />
      <main className="section ca-section-muted" id="main-content" tabIndex={-1}>
        <div className="container ca-stack ca-stack-lg">
          <SectionHeader
            eyebrow="Admin billing"
            title="Coda operativa pagamenti e fatture."
            description="Vista interna per controllare checkout session, webhook, ledger, fatture pending, rimborsi e anomalie senza esporre complessità al cliente finale."
          />
          <div className="ca-grid-3">
            <Card><Badge tone="info">Webhook</Badge><h2>Idempotenti</h2><p>Eventi duplicati non devono creare doppi pagamenti o doppie chiamate provider dati.</p></Card>
            <Card><Badge tone="success">Ledger</Badge><h2>Append-only</h2><p>Ogni passaggio rilevante viene registrato come voce separata.</p></Card>
            <Card><Badge tone="warning">Fatture</Badge><h2>Manual-assisted</h2><p>Nel MVP la fattura resta pending finché non viene gestita dal flusso amministrativo.</p></Card>
          </div>
          <DataTable
            columns={['Ordine', 'Stato', 'Provider', 'Importo', 'Prossima azione']}
            rows={billingOperationsSeed.map((item) => [item.order, item.status, item.provider, item.amount, item.nextAction])}
          />
          <TrustNotice title="Guardrail operativo" tone="warning">
            <p>Non avviare report provider se l’ordine non risulta pagato e riconciliato. Le eccezioni devono passare da audit e revisione interna.</p>
          </TrustNotice>
        </div>
      </main>
      <Footer />
    </>
  );
}
