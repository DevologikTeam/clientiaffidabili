# 20 — Build, Dependency and ENV Guards Runtime

## Build e Docker

M21-S crea slot artifact ma non finge log reali. I log richiesti sono:

- `artifacts/rc-hardening/build/pnpm-build.log`;
- `artifacts/rc-hardening/build/pnpm-typecheck.log`;
- `artifacts/rc-hardening/build/docker-build.log`;
- `artifacts/rc-hardening/build/healthcheck-summary.json`.

## Dependency freeze

Il gate `RC-P0-002` resta blocked perche `pnpm-lock.yaml` non e presente. La RC richiede lockfile reale generato dal package manager.

## Production env guard

`scripts/rc-hardening-production-env-guard.js` esporta solo presenza chiavi e sicurezza booleana. Non scrive mai valori ENV.

Controlli P0:

- `ENABLE_DEMO_DATA=false` in production;
- `ENABLE_PROVIDER_CALLS=false` finche i provider non sono certificati;
- `ENABLE_CHECKOUT=false` finche i pagamenti non sono certificati;
- `OPENAI_FEATURES_ENABLED=false` finche AI non e certificata.


Nota Coolify: i log Docker/Coolify reali devono essere allegati come evidenza target prima della RC.
