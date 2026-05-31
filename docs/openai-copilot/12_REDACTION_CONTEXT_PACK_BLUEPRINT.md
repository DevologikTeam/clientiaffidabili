# Redaction and Context Pack Blueprint

## Obiettivo

Prima di chiamare OpenAI, il backend deve trasformare i dati interni in un **context pack redatto**, minimo e orientato al task.

## Dati mai inviabili

- dati carta;
- IBAN completo;
- API key;
- token reset/invito/sessione;
- raw payload provider;
- allegati PDF completi;
- password/hash;
- IP completo;
- codice fiscale/P.IVA se non strettamente necessario e comunque redatto;
- email/telefono in chiaro;
- contenuti di report non necessari.

## Context pack per CMS

```json
{
  "pageType": "customer_education",
  "targetIntent": "verificare affidabilita azienda",
  "draftTitle": "...",
  "draftBodyExcerpt": "...",
  "allowedClaims": ["fonti indicate", "limiti spiegati", "supporto"],
  "prohibitedClaims": ["rischio zero", "pagamento garantito"]
}
```

## Context pack per supporto

```json
{
  "ticketCategory": "pagamento",
  "customerMessageRedacted": "...",
  "orderStatus": "payment_failed",
  "paymentStatus": "failed",
  "allowedActions": ["spiegare", "richiedere dati mancanti", "aprire verifica interna"],
  "forbiddenActions": ["promettere rimborso", "confermare report pronto"]
}
```

## Context pack per error ledger

```json
{
  "errorType": "payment_webhook_failed",
  "provider": "stripe",
  "count": 3,
  "lastSeenAt": "2026-05-30T00:00:00Z",
  "customerImpact": "report_delayed",
  "safeLogs": ["signature mismatch", "idempotency duplicate"]
}
```

## Redaction audit

Ogni richiesta deve salvare:

- numero campi redatti;
- categorie redatte;
- hash del context pack;
- prompt version;
- output schema version.
