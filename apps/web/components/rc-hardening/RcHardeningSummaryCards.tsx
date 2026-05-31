import { StatCard } from '../ds';
import { getM21sRcRuntimeSummary } from '../../lib/rc-hardening/rc-hardening-runtime';

export function RcHardeningSummaryCards() {
  const summary = getM21sRcRuntimeSummary();
  return (
    <section className="ca-grid ca-grid--4" aria-label="Riepilogo RC hardening">
      <StatCard label="Gate totali" value={String(summary.total)} description={`${summary.blocking} bloccanti per RC`} status={`v${summary.release}`} tone="info" />
      <StatCard label="P0 aperti" value={String(summary.openBlocking)} description="La RC resta bloccata finche questi gate non hanno evidenza reale" status="Blocco RC" tone="danger" />
      <StatCard label="Pronti da eseguire" value={String(summary.readyToRun)} description="Runner e controlli disponibili, serve esecuzione target" status="Target" tone="warning" />
      <StatCard label="Waiver" value={String(summary.waived)} description="Solo con feature spenta, audit e nota release" status="Feature-off" tone="neutral" />
    </section>
  );
}
