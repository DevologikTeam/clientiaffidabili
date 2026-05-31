# Auth API implementation

Endpoint MVP:

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`
- `POST /auth/password/request-reset`
- `POST /auth/password/reset`
- `POST /auth/invitations`
- `POST /auth/invitations/accept`
- `GET /auth/accounts/:accountId/team`
- `POST /auth/accounts/:accountId/team/role`

## Sicurezza API

Il controller espone contratti runtime, ma prima della produzione dovranno essere collegati:

- cookie reali `Set-Cookie` HttpOnly/Secure/SameSite;
- rate limit login/reset/inviti;
- CSRF strategy per form sensibili se necessaria;
- guard NestJS su ogni endpoint customer/admin;
- object-level authorization su ogni risorsa account-scoped.

## Errori

Login e reset password evitano user enumeration. Gli errori pubblici devono restare generici.
