import { Card, Checklist, SectionHeader, TrustNotice } from '@/components/ds';
import { type CatalogService } from '@/lib/catalog/catalog';

export function ServiceDetailPanel({ service }: { service: CatalogService }) {
  return (
    <div className="ca-detail-grid">
      <div className="ca-stack">
        <Card>
          <SectionHeader title="Quando usarlo" description={service.nextAction} />
          <Checklist items={service.bestFor} />
        </Card>
        <Card>
          <SectionHeader title="Dati richiesti" description="Il flusso chiede solo dati necessari e finalità professionale lecita." />
          <Checklist items={service.requiredInputs} />
        </Card>
      </div>
      <div className="ca-stack">
        <Card>
          <SectionHeader title="Cosa ricevi" description="Output pensato per decidere, non per mostrare dati grezzi senza contesto." />
          <Checklist items={service.reportOutputs} />
        </Card>
        <Card>
          <SectionHeader title="Limiti e protezioni" />
          <Checklist items={service.limits} />
          <TrustNotice title="Uso prudente" tone="warning">
            <p>Nessun report garantisce pagamento, assenza di rischio o certificazione definitiva. Le decisioni restano responsabilità del cliente.</p>
          </TrustNotice>
        </Card>
      </div>
    </div>
  );
}
