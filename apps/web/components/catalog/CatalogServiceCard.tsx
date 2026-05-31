import { Badge, Button, Card, Checklist } from '@/components/ds';
import { calculateSnapshot, type CatalogService } from '@/lib/catalog/catalog';

export function CatalogServiceCard({ service }: { service: CatalogService }) {
  const snapshot = calculateSnapshot(service);
  return (
    <Card variant="interactive" className="ca-catalog-card">
      <div className="ca-catalog-card__top">
        <Badge tone={service.recommended ? 'success' : 'info'}>{service.recommended ? 'Consigliato' : service.category}</Badge>
        <span className="tag">{service.delivery}</span>
      </div>
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <div className="ca-catalog-card__price">
        <strong>{snapshot.unitNet}</strong>
        <span>+ IVA se dovuta</span>
      </div>
      <Checklist items={service.reportOutputs.slice(0, 3)} />
      <div className="ca-catalog-card__actions">
        <Button href={`/servizi/${service.slug}`} variant="outline" fullWidth>Leggi dettagli</Button>
        <Button href={`/checkout?service=${service.code}`} fullWidth>{service.status === 'assisted' ? 'Richiedi assistenza' : 'Avvia verifica'}</Button>
      </div>
    </Card>
  );
}
