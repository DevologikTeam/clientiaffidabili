# 22 — Email Provider Settings & Deliverability Blueprint

## Provider abstraction

Il sistema deve usare un adapter:

```text
EmailProviderAdapter
- sendTransactionalEmail(input)
- verifyWebhook(signature, payload)
- normalizeWebhook(payload)
- getProviderStatus()
```

Provider MVP:

- `mock` default;
- `smtp` possibile;
- `resend` o provider API moderno adapter-ready;
- SES/Mailgun/Postmark futuri.

## Settings admin

Namespace: `email`.

Settings:

- `email.enabled`;
- `email.provider`;
- `email.from.account`;
- `email.from.billing`;
- `email.from.support`;
- `email.replyTo.support`;
- `email.pdf.secureLinkEnabled`;
- `email.pdf.attachmentsEnabled`;
- `email.pdf.linkTtlHours`;
- `email.retry.maxAttempts`;
- `email.retry.backoffMinutes`;
- `email.suppression.enabled`;
- `email.webhook.signingSecretRef`;
- `email.provider.apiKeyRef`.

Valori sensibili:

- sempre write-only;
- mai esposti in frontend;
- mostrati come `configured/not_configured`.

## Deliverability checklist

Prima del go-live:

- dominio mittente dedicato o coerente;
- SPF;
- DKIM;
- DMARC;
- TLS;
- reverse DNS se applicabile;
- From coerenti per categorie;
- bounce/complaint webhook;
- suppression list;
- monitoring spam rate;
- template testo + HTML;
- link assoluti HTTPS;
- logo e footer coerenti.

## Categorie mittente

| Categoria | From consigliato |
|---|---|
| Account/security | sicurezza@clientiaffidabili.it |
| Ordini/pagamenti | ordini@clientiaffidabili.it |
| Report/documenti | documenti@clientiaffidabili.it |
| Fatture | amministrazione@clientiaffidabili.it |
| Supporto | supporto@clientiaffidabili.it |

## Marketing vs tecnico

Le email tecniche non richiedono unsubscribe marketing, ma devono restare strettamente necessarie.  
Eventuali newsletter, nurturing e campagne vanno in modulo separato e sempre con consenso e unsubscribe.
