# M12-S Implementation Handoff

## Obiettivo sviluppo
Implementare il runtime MVP del portale partner/reseller e delle API pubbliche controllate.

## Backend da creare
- `PartnerPortalModule`
- `PartnerAccountEntity`
- `PartnerApiKeyEntity`
- `PartnerWebhookEndpointEntity`
- `PartnerUsageLedgerEntryEntity`
- `PartnerRateLimitProfileEntity`
- `PartnerLiveAccessRequestEntity`
- `PartnerController` customer-facing
- `PartnerApiController` public API `/api/partner/v1`
- `PartnerAdminController`
- `PartnerApiKeyService`
- `PartnerUsageLedgerService`
- `PartnerRateLimitService`
- `PartnerWebhookService`
- `PartnerSandboxService`

## Frontend da creare
- `/dashboard/partner`
- `/dashboard/partner/api-keys`
- `/dashboard/partner/docs`
- `/dashboard/partner/usage`
- `/dashboard/partner/webhooks`
- `/dashboard/partner/go-live`
- `/admin/partners`
- `/admin/partners/[id]`

## Runtime MVP
- API key hash e prefix.
- Sandbox key generation.
- Live request workflow.
- Scope checks.
- Idempotency storage.
- Usage ledger append-only.
- Credit reservation check.
- Mock sandbox company check endpoint.
- Webhook endpoint management.
- Admin review queue.

## Non fare in M12-S
- Non integrare provider reale live per partner senza gate M13.
- Non attivare revenue share automatico.
- Non esporre raw payload provider.
- Non generare API key live senza review.
- Non introdurre dati demo in tenant/account reali.

## QA M12-S atteso
- API key mai salvata in chiaro.
- Live disabilitato di default.
- `Idempotency-Key` obbligatoria su create check.
- Usage ledger append-only.
- Scope e object authorization presenti.
- Webhook secret non esposto dopo creazione.
