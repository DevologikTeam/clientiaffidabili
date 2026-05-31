# Price Snapshot Implementation

Lo snapshot prezzo è il contratto tra catalogo, ordine e checkout.

## Campi minimi

- `productCode`
- `productName`
- `unitPriceNetCents`
- `quantity`
- `subtotalNetCents`
- `vatRate`
- `vatCents`
- `totalGrossCents`
- `currency`
- `formatted`
- `guard`
- `createdAt`

## Regola

Dopo la creazione ordine, il prezzo dell’ordine non deve più dipendere dal catalogo corrente. Se il catalogo cambia, gli ordini già creati mantengono lo snapshot.

## Protezione margine

`PriceGuardService` valuta:

- costo provider stimato;
- riserva checkout;
- riserva supporto;
- riserva retry;
- margine target;
- margine minimo.

Lo stato `blocked` impedisce l’ordine.
