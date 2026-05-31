# M16B-S — Tag Manager, Clarity & Campaign Event Tracking Development

## Obiettivo

Implementare il runtime iniziale per configurare da backend/admin Google Tag Manager e Microsoft Clarity senza hardcoding, con consenso prudente, dataLayer controllato, route denylist e QA anti-PII.

## Implementato

- Settings namespace `analytics` per GTM, Clarity, Consent Mode e route policy.
- Endpoint backend redatto `GET /analytics/public-config`.
- Service backend `TagManagerClarityService` con validazione `GTM-*` e project ID Clarity.
- Loader frontend `ExternalTrackingProvider` in `app/layout.tsx`.
- Helper runtime `sanitizeCampaignPayload`, `pushCampaignEvent`, `isRouteAllowedForExternalTracking`.
- Page view events controllati per home, servizi, prezzi, guide e garanzia operativa.
- Admin policy page `/admin/settings/analytics`.
- QA anti hardcoded ID, anti PII payload, route denylist e sorgenti.

## Guardrail

- GTM e Clarity sono disabilitati di default.
- Nessun tracking ID hardcoded.
- Consent default `denied`.
- Clarity vietato su admin, dashboard, checkout, report, fatture, API, reset e inviti.
- Gli eventi esterni passano solo da helper whitelistato.
- Payload esterno senza PII, token, raw payload, dati report, prompt OpenAI, card, IBAN o IP.

## Non fatto

- CMP reale non implementata.
- GA4/GTM/Clarity reali non testati.
- Server-side tagging non implementato.
- Build Docker/Coolify reale non eseguita in questo ambiente.
