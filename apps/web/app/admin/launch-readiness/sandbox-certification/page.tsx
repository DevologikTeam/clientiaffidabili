import { Button, PageHero, TrustNotice } from '@/components/ds';
import {
  CertificationBlockerPanel,
  CertificationEvidenceList,
  CertificationRunTimeline,
  CertificationRunbookCard,
  CertificationScenarioTable,
  CertificationSummaryCards,
  CertificationWaiverModal,
} from '@/components/sandbox-certification';
import { sandboxCertificationRuntimeVersion } from '@/lib/sandbox-certification/sandbox-certification-runtime';

export default function SandboxCertificationAdminPage() {
  return (
    <main className="ca-page" id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="Admin · launch readiness"
        title="Sandbox certification"
        description="Certifica in modo controllato pagamenti, provider Openapi, OpenAI, email, PDF, auth, dashboard, partner API, CMS e smoke tecnici prima della Release Candidate."
        actions={<Button href="/admin/launch-readiness/sandbox-certification/scenarios" variant="secondary">Apri scenari</Button>}
        aside={<TrustNotice title={`Runtime ${sandboxCertificationRuntimeVersion}`} tone="warning">Mock-first: nessuna chiamata provider reale viene eseguita da questa UI statica.</TrustNotice>}
      />
      <section className="container ca-stack">
        <CertificationSummaryCards />
        <section className="ca-grid ca-grid-2">
          <CertificationBlockerPanel />
          <CertificationRunbookCard />
        </section>
        <CertificationScenarioTable />
        <section className="ca-grid ca-grid-2">
          <CertificationRunTimeline />
          <CertificationEvidenceList />
        </section>
        <CertificationWaiverModal />
      </section>
    </main>
  );
}
