import { Card, KeyValueList, TrustNotice } from '@/components/ds';
import { calculateSnapshot, type CatalogService } from '@/lib/catalog/catalog';

export function PriceSnapshotBox({ service }: { service: CatalogService }) {
  const snapshot = calculateSnapshot(service);
  return (
    <Card variant="elevated" className="ca-price-snapshot">
      <span className="ca-eyebrow">Snapshot prezzo</span>
      <h2>{service.name}</h2>
      <KeyValueList
        items={[
          { label: 'Prezzo netto', value: snapshot.unitNet },
          { label: `IVA ${service.vatRate}%`, value: snapshot.vat },
          { label: 'Totale indicativo', value: snapshot.total },
          { label: 'Stato catalogo', value: service.status === 'assisted' ? 'verifica assistita' : 'checkout diretto' },
        ]}
      />
      <TrustNotice title="Riepilogo confermato al checkout" tone="info">
        <p>Prima del pagamento vedrai servizio, IVA, totale e condizioni principali. Eventuali imposte o diritti vengono mostrati separatamente.</p>
      </TrustNotice>
    </Card>
  );
}
