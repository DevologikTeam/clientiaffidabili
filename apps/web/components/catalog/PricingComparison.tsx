import { Button } from '@/components/ds';
import { calculateSnapshot, type CatalogService } from '@/lib/catalog/catalog';

export function PricingComparison({ services }: { services: ReadonlyArray<CatalogService> }) {
  return (
    <div className="ca-price-table-wrap">
      <table className="ca-price-table">
        <caption>Listino servizi ClientiAffidabili.it con tempi, prezzi e azioni disponibili</caption>
        <thead>
          <tr>
            <th scope="col">Servizio</th>
            <th scope="col">Categoria</th>
            <th scope="col">Tempo indicativo</th>
            <th scope="col">Netto</th>
            <th scope="col">Totale indicativo</th>
            <th scope="col">Azione</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => {
            const snapshot = calculateSnapshot(service);
            return (
              <tr key={service.code}>
                <td data-label="Servizio"><strong>{service.name}</strong></td>
                <td data-label="Categoria">{service.category}</td>
                <td data-label="Tempo indicativo">{service.delivery}</td>
                <td data-label="Netto"><strong>{snapshot.unitNet}</strong></td>
                <td data-label="Totale indicativo"><strong>{snapshot.total}</strong></td>
                <td data-label="Azione"><Button href={`/servizi/${service.slug}`} variant="ghost" size="sm">Leggi dettagli</Button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
