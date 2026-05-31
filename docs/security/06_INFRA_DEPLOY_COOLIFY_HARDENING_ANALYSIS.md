# Infrastructure, Deploy & Coolify Hardening Analysis

## Obiettivo

Definire una baseline per deploy sicuro su Coolify con Docker Compose, PostgreSQL, backend NestJS e frontend Next.js.

## Coolify env governance

- Solo segreti necessari in Coolify secrets.
- Nessun secret nel repository.
- Separazione ambienti: local, staging, production.
- Feature flag per provider reali, PayPal, subscription, refunds, report PDF export.
- `ENABLE_PROVIDER_CALLS=false` di default fuori produzione autorizzata.

## Docker hardening

- Immagini pinned e aggiornate.
- User non-root nei container dove possibile.
- Healthcheck per web/api/db.
- Resource limit e restart policy.
- Volumi persistenti per Postgres.
- Network separati backend/db quando possibile.
- Nessun mount di `.env` contenente segreti in repo.

## Reverse proxy e headers

- HTTPS obbligatorio.
- HSTS in produzione.
- CSP progressiva.
- X-Frame-Options / frame-ancestors.
- Referrer-Policy.
- Permissions-Policy.
- Secure, HttpOnly, SameSite cookie.

## Database

- Utente DB dedicato e privilegi minimi.
- Backup cifrati.
- Migrazioni controllate.
- `synchronize=false` in produzione.
- Indici su ownership/account/report/order.
- Row-level guard lato app obbligatorio; RLS Postgres valutabile in fase hardening avanzata.

## Deploy gate

Ogni deploy production deve avere:

1. commit/tag release;
2. changelog;
3. env diff review;
4. migration review;
5. backup pre-deploy;
6. smoke test post-deploy;
7. rollback plan;
8. ownership del deploy.
