import { PageHero } from '@/components/ds';
import { CertificationBlockerPanel, CertificationEvidenceList, CertificationRunTimeline } from '@/components/sandbox-certification';

type PageProps = {
  params: { runId: string };
};

export default function SandboxCertificationRunDetailPage({ params }: PageProps) {
  return (
    <main className="ca-page" id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="Sandbox certification · run"
        title={`Run ${params.runId}`}
        description="Dettaglio operativo della run: timeline, evidenze redatte, blocker e collegamento previsto con Operational Error Ledger."
      />
      <section className="container ca-grid ca-grid-2">
        <CertificationRunTimeline />
        <CertificationBlockerPanel />
      </section>
      <section className="container ca-stack">
        <CertificationEvidenceList />
      </section>
    </main>
  );
}
