# Sprint M3-S — Service Catalog & Pricing Development

Versione: `0.10.0`  
Tipo: Sviluppo  
Modulo: Catalogo servizi, prezzi e marginalità

## Obiettivo

Trasformare il blueprint M3-P in una prima implementazione reale di catalogo/prezzi riutilizzabile da frontend, backend, checkout e admin operations.

## Deliverable completati

- Catalogo frontend centralizzato in `apps/web/lib/catalog/catalog.ts`.
- Schede catalogo pubbliche riutilizzabili.
- Pagina `/servizi` raggruppata per scenario operativo.
- Pagina `/servizi/[slug]` alimentata dal catalogo implementato.
- Pagina `/prezzi` con confronto netto/IVA/totale indicativo.
- Checkout aggiornato con price snapshot coerente.
- Preview admin `/admin/catalog` per stato pubblicazione e guardrail interni.
- Backend NestJS con seed catalogo, entità estesa, price guard, snapshot prezzo e API catalogo.
- Ordini aggiornati per salvare `priceSnapshot`, netto, IVA e totale.

## Decisioni implementative

1. Il pubblico non vede endpoint o costi provider.
2. Il checkout lavora su `productCode` e salva uno snapshot prezzo.
3. I servizi ad alto rischio possono essere pubblici ma in stato `assisted`.
4. I costi provider e le riserve restano nel backend/admin.
5. La base prezzi resta coerente con l’analisi costruita sul listino Openapi.

## Esito

Sprint completato come foundation implementativa. Restano fuori dallo sprint: integrazione provider reale, checkout reale e backoffice RBAC completo.
