import { StatCard } from '../ds';
import { sandboxCertificationSummary } from '../../lib/sandbox-certification/sandbox-certification-runtime';

export function CertificationSummaryCards() {
  const summary = sandboxCertificationSummary;
  return (
    <section className="ca-grid ca-grid-4" aria-label="Riepilogo certificazione sandbox">
      <StatCard label="Scenari totali" value={String(summary.totalScenarios)} description={`${summary.blockerScenarios} bloccanti per RC`} status="Suite M19-S" tone="info" />
      <StatCard label="Passati" value={String(summary.passed)} description="Evidenze mock-first pronte per sostituzione sandbox reale" status="OK" tone="success" />
      <StatCard label="Bloccati" value={String(summary.blocked)} description="Richiedono prova manuale o fix prima della RC" status="Blocco RC" tone="danger" />
      <StatCard label="Waiver" value={String(summary.waived)} description="Consentiti solo con feature disabilitata e audit" status="Controllato" tone="warning" />
    </section>
  );
}
