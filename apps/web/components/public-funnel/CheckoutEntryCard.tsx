import { Button, Card, Checklist } from '@/components/ds';
import type { ServiceProduct } from '@/lib/content';
import { checkoutHrefFor } from '@/lib/content';

type CheckoutEntryCardProps = {
  service: ServiceProduct;
  compact?: boolean;
};

export function CheckoutEntryCard({ service, compact = false }: CheckoutEntryCardProps) {
  return (
    <Card variant="elevated" className="ca-checkout-entry">
      <span className="ca-eyebrow">Checkout guidato</span>
      <h3>{compact ? service.name : `Avvia ${service.name}`}</h3>
      <p>{service.description}</p>
      <div className="ca-checkout-entry__price">
        <strong>{service.price}</strong>
        <span>+ IVA se dovuta</span>
      </div>
      <Checklist items={['Riepilogo prima del pagamento', 'Conferma uso lecito', 'Report consultabile nello storico']} />
      <Button href={checkoutHrefFor(service.code)} fullWidth>
        Vai al checkout
      </Button>
    </Card>
  );
}
