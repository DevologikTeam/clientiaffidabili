# Catalog Implementation Notes — M3-S

## Frontend

Il catalogo pubblico è stato spostato in `apps/web/lib/catalog/catalog.ts` per evitare duplicazione fra pagina servizi, pagina dettaglio, prezzi e checkout.

Componenti aggiunti:

- `CatalogServiceCard`
- `PriceSnapshotBox`
- `PricingComparison`
- `ServiceDetailPanel`

## Backend

Il modulo `ProductsModule` ora contiene:

- seed dei servizi MVP;
- `Product` esteso con slug, scenario, stato, rischio, input/output/limiti;
- costi provider stimati e riserve interne;
- `PriceGuardService`;
- endpoint pubblici e admin preview;
- generazione di `PriceSnapshot`.

Endpoint previsti:

```http
GET /products
GET /products/slug/:slug
GET /products/:code
GET /products/:code/price-snapshot?quantity=1
GET /products/admin/catalog
```

## Guardrail implementati

- Blocco ordine se `PriceGuardService` restituisce `blocked`.
- Nessun costo provider nel catalogo pubblico.
- KYB resta in stato `assisted`.
- Snapshot ordine con prezzo netto, IVA, totale e risultato guardrail.

## Limiti noti

- La pagina admin è statica e non protetta: serve RBAC nel modulo admin futuro.
- Non è ancora presente migration TypeORM dedicata: in dev si usa `synchronize`, in produzione serviranno migration versionate.
- Il catalogo frontend e backend sono duplicati temporaneamente; nei prossimi sprint il frontend dovrà consumare API/server actions o una build-time source unica.
