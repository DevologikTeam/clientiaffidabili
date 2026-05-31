# Security runtime implementation notes

## Modulo applicativo

`SecurityModule` introduce una superficie interna per controlli di sicurezza e readiness:

- `GET /security/controls`
- `GET /security/production-gate`
- `POST /security/production-gate/override-preview`
- `POST /security/redaction-preview`
- `POST /security/webhook/signature-preview`
- `POST /security/object-access-preview`

Gli endpoint sono pensati per Super Admin/Compliance/Operations e non devono diventare pubblici.

## Stato produzione

Il runtime gate legge variabili esplicite:

- `REAL_BUILD_VERIFIED`
- `OBJECT_AUTH_VERIFIED`
- `WEBHOOK_SECURITY_VERIFIED`
- `SECRET_SCAN_VERIFIED`
- `RESTORE_DRILL_VERIFIED`

Finché queste evidenze non sono `true`, la produzione resta considerata non pronta.

## Security headers

`main.ts` aggiunge header base:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` restrittiva per camera/microfono/geolocalizzazione.

## Limite intenzionale

Non viene introdotto `helmet` come dipendenza aggiuntiva per non complicare lo scaffold offline. Potrà essere aggiunto nella fase di build reale.
