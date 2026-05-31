import { Button, PageHero, TrustNotice } from '@/components/ds';
import {
  RcEvidenceBundlePanel,
  RcGateTable,
  RcHardeningSummaryCards,
  RcSignoffPanel,
  RcWaiverGuardPanel,
} from '@/components/rc-hardening';
import { m21sRcHardeningRuntimeVersion } from '@/lib/rc-hardening/rc-hardening-runtime';

export default function RcHardeningAdminPage() {
  return (
    <main className="ca-page" id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="Admin · release candidate"
        title="RC hardening command center"
        description="Verifica gate P0, prove mancanti, waiver feature-off, evidenze e sign-off prima di dichiarare una Release Candidate credibile. La pagina non abilita provider live e non sostituisce i test reali sul target."
        actions={<Button href="/admin/launch-readiness" variant="outline">Torna al launch gate</Button>}
        aside={<TrustNotice title={`Runtime ${m21sRcHardeningRuntimeVersion}`} tone="danger">RC ancora bloccata: servono build, Docker, provider sandbox, Playwright e restore drill reali.</TrustNotice>}
      />
      <section className="container ca-stack">
        <RcHardeningSummaryCards />
        <section className="ca-grid ca-grid--2">
          <RcEvidenceBundlePanel />
          <RcSignoffPanel />
        </section>
        <RcGateTable />
        <RcWaiverGuardPanel />
      </section>
    </main>
  );
}
