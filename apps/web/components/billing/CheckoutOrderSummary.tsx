import { Card, KeyValueList } from '@/components/ds';
import { buildCheckoutSummary } from '@/lib/billing/checkout';
import type { CatalogService } from '@/lib/catalog/catalog';

export function CheckoutOrderSummary({ service }: { service: CatalogService }) {
  const summary = buildCheckoutSummary(service);
  return (
    <Card variant="elevated">
      <span className="ca-eyebrow">Riepilogo ordine</span>
      <h2>{summary.productName}</h2>
      <p>{service.description}</p>
      <KeyValueList
        items={[
          { label: 'Tempo stimato', value: summary.delivery },
          { label: 'Prezzo netto', value: summary.net },
          { label: `IVA ${service.vatRate}%`, value: summary.vat },
          { label: 'Totale', value: summary.total },
          { label: 'Modalità', value: summary.status },
        ]}
      />
      <p className="ca-small">{summary.legalNotice}</p>
    </Card>
  );
}
