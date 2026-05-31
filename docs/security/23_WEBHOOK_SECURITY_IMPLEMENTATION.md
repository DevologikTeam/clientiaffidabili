# Webhook security implementation

## Servizio aggiunto

`WebhookSecurityService` fornisce:

- verifica firma HMAC con `timingSafeEqual`;
- finestra temporale opzionale tramite `toleranceSeconds`;
- generazione chiave idempotente `provider:eventId`.

## Provider coperti

- Stripe;
- PayPal;
- Openapi/callback provider.

## Regole operative

- Nessun webhook senza secret configurato.
- Nessun webhook senza firma.
- Nessun replay fuori tolleranza temporale.
- Nessun effetto duplicato su evento già processato.

## Note

La verifica Stripe e PayPal reale va completata usando le rispettive SDK/signature flow in sandbox. Il servizio implementato definisce la base comune e l'approccio sicuro.
