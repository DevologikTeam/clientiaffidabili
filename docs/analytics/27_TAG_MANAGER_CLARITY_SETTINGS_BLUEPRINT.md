# Tag Manager & Clarity Settings Blueprint

Versione: **0.59.1**

## Settings admin

I settings devono essere salvati nel modulo `settings-admin` e serviti al frontend tramite endpoint pubblico redatto, ad esempio:

```ts
export type PublicTrackingSettings = {
  tagManager: {
    enabled: boolean;
    containerId?: string;
    serverEndpoint?: string;
    environment: 'disabled' | 'sandbox' | 'staging' | 'production';
    consentMode: 'disabled' | 'basic' | 'advanced';
    allowedEvents: string[];
  };
  clarity: {
    enabled: boolean;
    projectId?: string;
    requireAnalyticsConsent: boolean;
    maskMode: 'strict';
    disabledPathPrefixes: string[];
  };
};
```

## Valori sensibili

Container ID e project ID non sono segreti come API key, ma restano configurazioni operative. Devono essere modificabili solo da admin autorizzati, con audit e reason.

## Default consigliati

```json
{
  "tagManager.enabled": false,
  "tagManager.consentMode": "basic",
  "tagManager.allowedEvents": [
    "page_view",
    "guide_view",
    "service_view",
    "pricing_view",
    "checkout_started",
    "checkout_completed",
    "contact_submitted"
  ],
  "clarity.enabled": false,
  "clarity.requireAnalyticsConsent": true,
  "clarity.maskMode": "strict",
  "clarity.disabledPathPrefixes": [
    "/admin",
    "/dashboard/report",
    "/dashboard/fatture",
    "/checkout",
    "/api"
  ]
}
```

## Runtime frontend

Il frontend dovra' includere un componente tipo `TrackingProvider` che:

1. legge settings pubblici;
2. legge preferenze consenso;
3. carica GTM solo se abilitato e consentito;
4. inizializza `window.dataLayer`;
5. carica Clarity solo se abilitato, consentito e pagina ammessa;
6. invia eventi dataLayer normalizzati;
7. non invia mai payload sensibili.

## Runtime backend

Il backend dovra':

- validare settings;
- redigere valori sensibili quando letti da UI;
- auditare modifiche;
- esporre settings pubblici per frontend;
- fornire registry eventi consentiti;
- bloccare configurazioni non valide come container ID non conforme.

## QA richiesti

- Container ID GTM valido solo formato `GTM-...`.
- Clarity project ID non vuoto se enabled.
- Staging non invia eventi production.
- Admin/dashboard/report/checkout esclusi da Clarity per default.
- `qa-source-syntax-smoke` sempre eseguito.
- Nuovo QA `qa-tag-manager-clarity-roadmap.js` deve verificare roadmap, settings e guardrail.
