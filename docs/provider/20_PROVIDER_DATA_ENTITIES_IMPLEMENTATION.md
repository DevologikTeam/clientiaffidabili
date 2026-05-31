# Provider data entities — Implementation

## ProviderRequest

Rappresenta una richiesta inviata o da inviare al provider. Contiene mapping versionato, idempotency key, costo stimato, stato, external id e riferimenti a payload/risultato.

Campi critici immutabili dopo dispatch:

- `orderId`
- `checkId`
- `productCode`
- `providerName`
- `providerServiceCode`
- `mappingVersion`
- `providerCostSnapshotCents`
- `idempotencyKey`

## ProviderRequestEvent

Ledger eventi append-only per audit operativo: creazione, blocco, dispatch, callback, errore.

## ProviderCostLedgerEntry

Ledger economico append-only per costo stimato, riserva, consumo, rilascio o aggiustamento.

## ProviderRawPayloadVault

Archivio payload redatto, non visibile al cliente. In produzione dovrà essere esteso con cifratura applicativa, retention policy e audit di accesso puntuale.
