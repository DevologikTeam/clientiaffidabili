# 39 — Tag Settings API & UI Blueprint

## API admin previste

```http
GET    /admin/settings/analytics
PATCH  /admin/settings/analytics/gtm
PATCH  /admin/settings/analytics/clarity
PATCH  /admin/settings/analytics/external-tags
POST   /admin/settings/analytics/validate
GET    /admin/settings/analytics/audit
```

## API pubblica runtime

```http
GET /analytics/public-config
```

Restituisce solo configurazione sicura:

```json
{
  "externalTagsEnabled": false,
  "gtm": {
    "enabled": false,
    "containerId": null
  },
  "clarity": {
    "enabled": false,
    "projectId": null,
    "allowedRoutePrefixes": ["/", "/servizi", "/prezzi", "/guide", "/garanzia-operativa"],
    "blockedRoutePrefixes": ["/admin", "/dashboard", "/checkout", "/reports", "/fatture", "/api"]
  },
  "consentDefault": {
    "analytics_storage": "denied",
    "ad_storage": "denied",
    "ad_user_data": "denied",
    "ad_personalization": "denied"
  }
}
```

## Validazioni

| Campo | Validazione |
|---|---|
| `gtm.containerId` | Regex `^GTM-[A-Z0-9]+$` |
| `clarity.projectId` | Alfanumerico, lunghezza ragionevole |
| `externalTagsEnabled` | Richiede reason e QA pass |
| `environment` | `staging` o `production` |

## Audit

Ogni modifica registra:

- admin user ID;
- setting modificato;
- valore precedente redatto;
- valore nuovo redatto;
- reason;
- IP admin hashato;
- timestamp;
- esito QA.
