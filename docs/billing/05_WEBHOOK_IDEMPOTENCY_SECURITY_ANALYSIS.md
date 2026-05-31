# Webhook, idempotenza e sicurezza

## Problema

I provider pagamento inviano webhook più volte, in ordine non sempre prevedibile. Il sistema deve gestirli senza doppio accredito, doppia chiamata provider dati o doppio rimborso.

## Regole webhook

1. Verifica firma provider.
2. Salva evento raw ridotto in `PaymentWebhookEvent`.
3. Usa `providerEventId` come chiave idempotente.
4. Se evento già processato, rispondi `200` senza rieseguire side effect.
5. Associa evento a ordine usando metadata server-side.
6. Valida importo, valuta, product snapshot e payment session.
7. Applica transizione stato in transazione database.
8. Scrivi ledger entry.
9. Pubblica job provider solo dopo commit.

## Anti-duplicazione provider data call

Creare una tabella/job `ProviderExecution` con unique key:

```text
unique(orderId, productCode, executionReason)
```

Così un webhook duplicato non può generare due richieste Openapi.

## Segreti e ambienti

| Segreto | Dove vive | Regola |
|---|---|---|
| Stripe secret key | Coolify/API env | mai frontend |
| Stripe webhook secret | Coolify/API env | ruotabile |
| Provider Openapi key | Coolify/API env o secret manager | mai frontend |
| Public key provider pagamento | frontend env pubblico | solo se necessario |

## Logging sicuro

Non salvare:

- numero carta;
- CVC;
- token pagamento completi non necessari;
- payload webhook integrali con dati personali non indispensabili;
- documenti/report in log applicativi.

Salvare:

- event id;
- order id;
- payment id;
- importo;
- valuta;
- stato;
- hash/riferimento payload;
- errore normalizzato.

## Recovery operativo

Ogni webhook fallito deve generare:

- stato `webhook_processing_failed` su tabella eventi;
- retry automatico se errore temporaneo;
- task admin se errore dati/integrità;
- nessuna chiamata provider dati se il pagamento non è verificato.
