import { Badge } from './Badge';
import { Button } from './Button';
import { Card } from './Card';
import { Checklist } from './Checklist';

type PriceCardProps = {
  title: string;
  category: string;
  description: string;
  price: string;
  delivery: string;
  includes: ReadonlyArray<string>;
  ctaLabel: string;
  href: string;
  className?: string;
};

export function PriceCard({ title, category, description, price, delivery, includes, ctaLabel, href, className }: PriceCardProps) {
  const classes = ['ca-price-card', className ?? ''].filter(Boolean).join(' ');
  return (
    <Card variant="interactive" className={classes}>
      <div className="ca-price-card__head">
        <Badge tone="brand">{category}</Badge>
        <Badge tone="info">{delivery}</Badge>
      </div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="ca-price-card__price">
        {price} <small>+ IVA se dovuta</small>
      </div>
      <Checklist items={includes} />
      <Button href={href} fullWidth>
        {ctaLabel}
      </Button>
    </Card>
  );
}
