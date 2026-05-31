# 23 — Settings Admin API Contracts Blueprint

## Customer-facing

Nessuna API customer deve leggere settings sensibili.

## Admin API

### `GET /admin/settings/overview`

Ritorna gruppi settings, stato operativo, issue aperte e ultimi cambi.

### `GET /admin/settings/:namespace`

Ritorna setting metadata e valori non sensibili.

### `PATCH /admin/settings/:namespace/:key`

Aggiorna un valore non segreto. Richiede reason se configurato.

### `POST /admin/settings/:namespace/:key/secret`

Aggiorna un secret write-only. La response deve restituire solo `secretRef`, stato e audit id.

### `POST /admin/settings/commerce/purchases/disable`

Disabilita acquisti. Richiede reason e messaggio customer-facing.

### `POST /admin/settings/commerce/purchases/enable`

Riabilita acquisti. Richiede reason.

### `GET /admin/errors`

Lista error ledger filtrabile.

### `POST /admin/errors/:id/action`

Azioni: assign, mark investigating, retry, link refund, link fix, resolve, ignore.

## Regole API

- RBAC obbligatorio.
- Object/action authorization obbligatoria.
- Audit append-only.
- Redaction in response.
- Rate limit su endpoint settings sensibili.
