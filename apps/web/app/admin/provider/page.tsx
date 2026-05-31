import { Alert } from '@/components/ds/Alert';
import { DataTable } from '@/components/ds/DataTable';
import { PageHero } from '@/components/ds/PageHero';
import { StatCard } from '@/components/ds/StatCard';
import { formatProviderCost, providerRuntimeDemoQueue } from '@/lib/provider/provider-runtime';

export default function AdminProviderPage() {
  const reviewItems = providerRuntimeDemoQueue.filter((item) => item.status === 'requires_review');
  const totalReserved = providerRuntimeDemoQueue.reduce((sum, item) => sum + item.costCents, 0);

  return (
    <main className="space-y-8 p-6" id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="Operations interne"
        title="Provider queue"
        description="Controlla richieste Openapi/mock, costi riservati, review operative e callback. I payload grezzi restano nel vault backend e non sono esposti al cliente."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Richieste demo" value={String(providerRuntimeDemoQueue.length)} description="Ultime richieste provider" />
        <StatCard label="In review" value={String(reviewItems.length)} description="Da verificare prima della consegna" />
        <StatCard label="Costo riservato" value={formatProviderCost(totalReserved)} description="Ledger provider stimato" />
      </div>

      <Alert
        tone="warning"
        title="Produzione bloccata fino a verifica credenziali"
        description="ENABLE_PROVIDER_CALLS deve restare false finche endpoint, costi effettivi, idempotenza e documentazione partner non sono certificati."
      />

      <DataTable
        columns={["Prodotto", "Provider", "Stato", "Costo", "Tentativi", "Prossima azione"]}
        rows={providerRuntimeDemoQueue.map((item) => [
          item.productCode,
          item.providerName,
          item.status,
          formatProviderCost(item.costCents),
          String(item.attempts),
          item.nextAction,
        ])}
      />
    </main>
  );
}
