import { PageHero, SectionHeader } from '@/components/ds';
import { BillingLedgerTable, RefundPolicyPanel } from '@/components/billing';

export default function AdminBillingRefundsPage() {
  return (
    <main className="space-y-8" id="main-content" tabIndex={-1}>
      <PageHero eyebrow="Admin billing" title="Rimborsi, dispute e riconciliazione" description="Gestisci rimborsi full/parziali, cancellazioni, dispute e chargeback con reason obbligatoria e ledger append-only." />
      <SectionHeader title="Policy operativa" description="Le regole proteggono margine, costi provider e rischio di doppio rimborso." />
      <RefundPolicyPanel />
      <BillingLedgerTable />
    </main>
  );
}
