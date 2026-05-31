# 05 — Security, Privacy and Compliance Freeze Audit

## Baseline positiva

- Header base impostati in API: nosniff, frame deny, referrer policy e permissions policy.
- ValidationPipe con whitelist e transform.
- CORS limitato da `APP_URL`.
- Security module, RBAC, object authorization, redaction service e webhook security sono presenti.
- Noindex sensibile e tracking denylist sono stati rafforzati in M20-S.
- Secret scan statico e launch gate sono presenti.

## Blocchi RC

| Area | Blocco | Severita |
|---|---|---|
| Auth/sessioni | refresh/session lifecycle non certificato browser | P0 |
| RBAC/object auth | serve test su cross-account/cross-tenant | P0 |
| Provider payload | raw payload e vault devono restare redatti lato UI/log | P0 |
| Cache | route sensibili devono evitare cache pubblica | P0 |
| Webhook | firma, replay e idempotenza da provare in sandbox | P0 |
| Privacy | tracking e analytics devono restare esclusi da admin/dashboard/checkout success sensibili | P0 |
| Dati personali | retention/export/delete non ancora provati end-to-end | P1 |

## Freeze policy

- Nessun nuovo scope dati prima della RC.
- Nessun nuovo provider senza threat model breve e sandbox passata.
- Nessun log con token, secret, raw payload provider, dati carta, documento o credenziali.
- Ogni azione admin sensibile deve avere audit, motivo e owner.

## Output M21-P

Security freeze checklist con controlli scriptabili e mapping P0/P1.
