# 40 — Tag Loader & Consent Blueprint

## Componenti frontend previsti

```text
apps/web/components/analytics/TagManagerProvider.tsx
apps/web/components/analytics/ClarityProvider.tsx
apps/web/components/analytics/ConsentModeBridge.tsx
apps/web/components/analytics/CampaignEventTracker.tsx
apps/web/lib/analytics/tag-manager-runtime.ts
apps/web/lib/analytics/clarity-runtime.ts
apps/web/lib/analytics/campaign-events.ts
```

## Sequenza runtime

1. App legge public config backend.
2. App imposta consenso default `denied`.
3. App valuta route corrente.
4. App valuta consenso utente.
5. Se consentito, carica GTM.
6. Se consentito e route permessa, carica Clarity.
7. Gli eventi passano dal sanitizer prima di `dataLayer.push`.

## Consent Mode v2

Default prudente:

```ts
const defaultConsent = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
};
```

Aggiornamento solo dopo scelta utente:

```ts
updateConsentMode({
  analytics_storage: userConsent.analytics ? 'granted' : 'denied',
  ad_storage: userConsent.marketing ? 'granted' : 'denied',
  ad_user_data: userConsent.marketing ? 'granted' : 'denied',
  ad_personalization: userConsent.marketing ? 'granted' : 'denied'
});
```

## Regola fondamentale

Il consenso utente abilita l'invio verso strumenti esterni, ma non deve mai bypassare le denylist interne. Anche con consenso completo, Clarity resta spento in checkout, dashboard, admin, report, fatture, API e pagine token.
