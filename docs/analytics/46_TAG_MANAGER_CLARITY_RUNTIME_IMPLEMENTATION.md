# Runtime GTM/Clarity

Il runtime usa una configurazione pubblica redatta restituita da `/analytics/public-config`. Il frontend non riceve secret, API key o impostazioni sensibili.

## Config pubblica

```ts
{
  externalTagsEnabled: boolean,
  gtm: { enabled: boolean, containerId: string | null },
  clarity: { enabled: boolean, projectId: string | null, allowedRoutePrefixes: string[], blockedRoutePrefixes: string[] },
  consentDefault: {
    analytics_storage: 'denied' | 'granted',
    ad_storage: 'denied' | 'granted',
    ad_user_data: 'denied' | 'granted',
    ad_personalization: 'denied' | 'granted'
  }
}
```

## Regola principale

Il loader esterno parte solo se:

1. `analytics.externalTags.enabled = true`;
2. il provider specifico e abilitato;
3. l'ID configurato passa validazione;
4. la route non e in denylist;
5. il consenso utente consente il tracking.

In assenza di consenso reale, la configurazione iniziale resta `denied`.
