# Delivery ledger and provider webhooks runtime

Ogni invio produce:

- `EmailEvent`;
- `EmailDelivery`;
- eventuale `EmailProviderWebhookEvent`.

Gli stati supportati sono `queued`, `sending`, `sent`, `delivered`, `failed`, `queued_retry`, `bounced`, `complained`, `suppressed`.

I webhook provider sono idempotency-ready e salvano payload redatti.
