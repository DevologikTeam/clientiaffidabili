# 06 — Settings Admin API & UI Blueprint

## Route admin

- `/admin/settings`
- `/admin/settings/commerce`
- `/admin/settings/payments`
- `/admin/settings/provider-openapi`
- `/admin/settings/openai`
- `/admin/settings/errors`
- `/admin/settings/bootstrap`

## API contract

```http
GET /api/admin/settings
GET /api/admin/settings/:namespace
PATCH /api/admin/settings/:namespace/:key
POST /api/admin/settings/:namespace/:key/disable
POST /api/admin/settings/:namespace/:key/rotate-secret
GET /api/admin/errors
GET /api/admin/errors/:id
POST /api/admin/errors/:id/action
```

## UI sections

- stato piattaforma;
- acquisti attivi/sospesi;
- pagamenti;
- provider Openapi;
- OpenAI;
- webhook;
- errori recenti;
- audit settings.

## Stati visivi

- verde: operativo;
- giallo: attenzione/review;
- rosso: disabilitato/errore;
- grigio: non configurato.

## Reason modal

Obbligatoria per:

- disabilitare acquisti;
- attivare live payments;
- abilitare provider calls;
- abilitare OpenAI;
- ruotare segreti;
- ignorare errore critical;
- chiudere errore con rimborso.
