import { PageHero } from '@/components/ds';
import { CertificationScenarioTable, CertificationRunbookCard } from '@/components/sandbox-certification';

export default function SandboxCertificationScenariosPage() {
  return (
    <main className="ca-page" id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="Sandbox certification"
        title="Scenario registry"
        description="Elenco operativo degli scenari M19-S, con stato RC, evidenze richieste, owner e prossima azione sicura."
      />
      <section className="container ca-stack">
        <CertificationScenarioTable />
        <CertificationRunbookCard />
      </section>
    </main>
  );
}
