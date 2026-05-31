# Auth API Contracts Blueprint

## Public auth API

### `POST /auth/register`

Crea user + account + owner membership.

Request:

```json
{
  "email": "cliente@example.com",
  "password": "...",
  "name": "Mario Rossi",
  "account": {
    "legalName": "Rossi Srl",
    "vatNumber": "IT00000000000"
  },
  "acceptedLegalVersionIds": ["terms_v1", "privacy_v1"]
}
```

Response:

```json
{ "status": "created", "next": "verify_email" }
```

### `POST /auth/login`

Request:

```json
{ "email": "cliente@example.com", "password": "..." }
```

Response:

```json
{ "status": "ok", "defaultAccountId": "acc_...", "requiresMfa": false }
```

Errore sempre neutro:

```json
{ "error": "invalid_credentials" }
```

### `POST /auth/logout`

Revoca sessione corrente.

### `POST /auth/password/forgot`

Sempre risposta neutra:

```json
{ "status": "if_account_exists_email_sent" }
```

### `POST /auth/password/reset`

Consuma token monouso e revoca sessioni precedenti.

## Customer account/team API

### `GET /accounts/current`

Ritorna account corrente, ruolo e feature abilitate.

### `GET /accounts/:accountId/team`

Richiede membership attiva e permesso `team.read`.

### `POST /accounts/:accountId/invitations`

Richiede `team.invite`, step-up recente se ruolo elevato.

### `PATCH /accounts/:accountId/memberships/:membershipId`

Cambio ruolo/stato. Blocca ultimo owner.

### `DELETE /accounts/:accountId/invitations/:invitationId`

Revoca invito pending.

## Admin API

### `GET /admin/auth/accounts`

Solo admin interno autorizzato. Non espone password hash/token/session raw.

### `POST /admin/auth/accounts/:id/suspend`

Richiede reason obbligatoria e audit.
