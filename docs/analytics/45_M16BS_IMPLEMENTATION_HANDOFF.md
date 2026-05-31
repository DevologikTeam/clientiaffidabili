# 45 — M16B-S Implementation Handoff

## Obiettivo M16B-S

Implementare runtime configurabile per GTM, Clarity e campaign event tracking.

## File da creare

```text
apps/api/src/modules/analytics/tag-settings.controller.ts
apps/api/src/modules/analytics/tag-settings.service.ts
apps/api/src/modules/analytics/entities/tag-setting-audit.entity.ts
apps/web/components/analytics/TagManagerProvider.tsx
apps/web/components/analytics/ClarityProvider.tsx
apps/web/components/analytics/ConsentModeBridge.tsx
apps/web/lib/analytics/campaign-event-registry.ts
apps/web/lib/analytics/campaign-event-tracker.ts
apps/web/lib/analytics/route-tracking-policy.ts
apps/web/app/admin/settings/analytics/page.tsx
scripts/qa-tag-manager-clarity-development.js
```

## Must have

- settings default disabled;
- public config redatta;
- GTM loader controllato;
- Clarity loader controllato;
- consent default denied;
- dataLayer helper unico;
- sanitizer payload;
- route denylist;
- admin settings UI;
- audit settings;
- QA anti-PII.

## Must not have

- tracking ID hardcoded;
- dataLayer push diretto in pagine/componenti;
- Clarity in aree sensibili;
- invio PII a strumenti esterni;
- eventi tecnici dettagliati verso provider esterni;
- consenso dato per scontato.

## Nota

Il progetto potra' usare GTM/Clarity in produzione solo dopo validazione CMP/cookie policy/privacy e test reali su staging.
