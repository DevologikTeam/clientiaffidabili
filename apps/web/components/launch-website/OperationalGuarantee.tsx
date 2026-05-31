import { Card, TrustNotice } from '@/components/ds';
import { launchGuaranteePillars } from '@/lib/launch-website/launch-website-runtime';

export function OperationalGuarantee() {
  return (
    <div className="ca-stack">
      <div className="grid-3">
        {launchGuaranteePillars.map((pillar) => (
          <Card key={pillar.title} className="ca-guarantee-card">
            <h3>{pillar.title}</h3>
            <p>{pillar.description}</p>
          </Card>
        ))}
      </div>
      <TrustNotice title="Limite importante" tone="warning">
        Il report aiuta a decidere con più informazioni, ma non garantisce pagamenti futuri, assenza totale di rischio o sostituzione di consulenze specialistiche.
      </TrustNotice>
    </div>
  );
}
