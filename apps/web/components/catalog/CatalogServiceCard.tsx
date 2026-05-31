import { Badge, Button, Card, Checklist } from '@/components/ds';
import { isCommerceTestMode } from '@/lib/runtime/commerce-mode';
import { calculateSnapshot, type CatalogService } from '@/lib/catalog/catalog';

export function CatalogServiceCard({ service }: { service: CatalogService }) {
  const snapshot = calculateSnapshot(service);
  const testMode = isCommerceTestMode();
  const primaryLabel = testMode ? 'Vedi percorso in modalità test' : (service.status === 'assisted' ? 'Richiedi assistenza' : 'Avvia verifica');
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
      {testMode ? <p className="ca-test-mode-inline">Ambiente test: puoi vedere il percorso, ma il pagamento resta disattivato.</p> : null}
      <div className="ca-catalog-card__actions">
        <Button href={`/servizi/${service.slug}`} variant="outline" fullWidth>Leggi dettagli</Button>
        <Button href={`/checkout?service=${service.code}`} fullWidth>{primaryLabel}</Button>
      </div>
    </Card>
  );
}
