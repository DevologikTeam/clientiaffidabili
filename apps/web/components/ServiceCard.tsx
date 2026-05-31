import { PriceCard } from '@/components/ds';
import type { ServiceProduct } from '@/lib/content';

type ServiceCardProps = {
  product: ServiceProduct;
};

export function ServiceCard({ product }: ServiceCardProps) {
  return (
    <PriceCard
      title={product.name}
      category={product.category}
      description={product.description}
      price={product.price}
      delivery={product.delivery}
      includes={[`Pensato per ${product.useCase}`, 'Riepilogo chiaro prima del pagamento', 'Report consultabile nello storico']}
      ctaLabel="Avvia questa verifica"
      href={`/checkout?service=${product.code}`}
    />
  );
}
