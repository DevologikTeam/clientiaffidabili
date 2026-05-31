# 09 — Release Governance & Rollback Analysis

## Release train
Ogni release deve avere:

- versione semantica pacchetto;
- changelog;
- release notes;
- elenco migrazioni;
- elenco feature flag cambiati;
- QA report;
- rollback plan;
- owner approvazione.

## Branch/release policy consigliata
- `main`: stabile.
- `develop`: integrazione.
- `release/x.y.z`: hardening.
- `hotfix/x.y.z`: fix produzione.

## Go-live checklist
- Build passata.
- E2E passati.
- Security gate passato.
- Secret scan passato.
- DB backup pre-release completato.
- Restore drill recente.
- Legal pack validato.
- Stripe/PayPal sandbox validati.
- Provider live abilitato solo con flag e chiavi corrette.
- Monitoring/log redaction attivi.

## Rollback decision
Rollback immediato se:

- checkout non funziona;
- webhook duplicano pagamenti/crediti;
- report cross-account accessibile;
- provider chiamato due volte;
- admin non riesce a bloccare/rimborsare;
- log espongono segreti o raw payload;
- DB migration rompe dati esistenti.
