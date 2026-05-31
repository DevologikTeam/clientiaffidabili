import { Card, ProgressBar, StatCard } from '@/components/ds';
import { demoWallet } from '@/lib/billing/payment-providers-subscriptions-runtime';

export function CreditWalletPanel() {
  const total = demoWallet.availableCredits + demoWallet.reservedCredits;
  return (
    <Card>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Crediti disponibili" value={demoWallet.availableCredits} description="Utilizzabili per nuove verifiche." />
        <StatCard label="Crediti prenotati" value={demoWallet.reservedCredits} description="Bloccati per verifiche in corso." />
        <StatCard label="Totale controllato" value={total} description="Nessun uso illimitato o non tracciato." />
      </div>
      <div className="mt-6">
        <ProgressBar value={demoWallet.availableCredits} max={Math.max(total, 1)} label="Capienza wallet" />
        <p className="mt-3 text-sm text-slate-600">{demoWallet.nextSafeAction}</p>
      </div>
    </Card>
  );
}
