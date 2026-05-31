# 18 — Release, Rollback and Sign-off Blueprint

## Release candidate
Ogni RC deve avere:

- versione pacchetti allineata;
- changelog;
- release notes;
- zip artefatto;
- production gate report;
- test report;
- elenco migrazioni;
- rollback plan;
- note feature flag.

## Rollback minimo
- Tag immagine precedente disponibile.
- Backup DB prima del deploy.
- Script per disabilitare provider live.
- Script per disabilitare checkout live.
- Procedura per mettere il sito in maintenance mode.

## Sign-off

| Area | Owner | Evidenza |
|---|---|---|
| Tecnica | Tech lead | build/test/deploy |
| Security | Security owner | secret scan/RBAC/webhook |
| Billing | Billing owner | Stripe/PayPal/refund |
| Provider | Operations | sandbox/provider idempotency |
| Legal/Fiscal | Commercialista/legale | testi e fatturazione |
| Marketing | Growth/Design | funnel/copy/SEO |

## Stato possibile release
- `draft`
- `qa-running`
- `qa-failed`
- `staging-approved`
- `launch-candidate`
- `released`
- `rolled-back`

## Regola
Nessuna release puo' passare a `launch-candidate` senza evidenze archiviate.
