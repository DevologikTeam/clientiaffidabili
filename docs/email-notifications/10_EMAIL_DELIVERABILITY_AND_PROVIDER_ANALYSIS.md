# 10 — Email Deliverability and Provider Analysis

## Requisiti dominio

La readiness email deve essere trattata come gate di lancio:

- SPF per autorizzare il provider.
- DKIM con chiave forte.
- DMARC con report attivi.
- TLS per trasmissione.
- Reverse DNS/PTR se si usano IP dedicati o SMTP gestito.
- Monitoraggio bounce, complaint e spam rate.

## Provider adapter

Interfaccia consigliata:

```ts
interface EmailProviderAdapter {
  send(message: RenderedEmailMessage): Promise<EmailProviderSendResult>;
  verifyWebhook(signature: string, payload: string): boolean;
  normalizeWebhook(payload: unknown): EmailWebhookEvent;
}
```

## Provider candidati

| Provider | Pro | Contro |
|---|---|---|
| Resend | API moderna, webhook, DX semplice | validare pricing/limiti reali |
| Postmark | molto forte su transazionale | costo piu' alto |
| Mailgun | robusto e flessibile | setup piu' tecnico |
| Sendgrid | diffuso | deliverability dipende da setup |
| Amazon SES | economico e scalabile | setup e UX piu' complessi |

## Scelta MVP consigliata

Provider transazionale API-first + adapter. La scelta puo' essere configurabile da admin in futuro, ma in M18-S va implementato un provider primario e un mock provider.

## Webhook provider

Eventi minimi da normalizzare:

- sent;
- delivered;
- opened opzionale e solo se consentito/policy;
- clicked opzionale e non per link sensibili;
- bounced;
- complained;
- deferred;
- failed;
- unsubscribed per marketing.

## Deliverability policy

- Email tecniche non devono includere promo.
- Marketing deve usare consenso separato e unsubscribe.
- Messaggi dello stesso tipo devono mantenere From coerente.
- Oggetti non devono simulare reply o urgenze ingannevoli.
- Link devono essere leggibili e prevedibili.
