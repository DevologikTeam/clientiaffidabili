# 10 — RC Gate Orchestration Blueprint

## Scopo

Definire un orchestratore RC capace di raccogliere lo stato di tutti i gate P0/P1 e decidere se il pacchetto puo diventare Release Candidate.

## Modello gate

Ogni gate deve avere:

- `id` stabile;
- owner operativo;
- stato tra `not_started`, `ready_to_run`, `running`, `passed`, `failed`, `blocked`, `waived_with_feature_off`;
- severita P0/P1/P2;
- evidenze richieste;
- collegamento a error ledger o runbook se fallisce;
- decisione finale con timestamp.

## Gate minimi

1. `rc-build-typecheck-docker` — blocca RC.
2. `rc-dependency-freeze` — blocca RC.
3. `rc-env-secrets-feature-flags` — blocca RC.
4. `rc-database-migration-restore` — blocca RC.
5. `rc-provider-sandbox-certification` — blocca RC.
6. `rc-browser-e2e-real` — blocca RC.
7. `rc-security-privacy-freeze` — blocca RC.
8. `rc-evidence-bundle-signoff` — blocca RC.

## Regole di passaggio

- P0 passa solo con stato `passed` oppure `waived_with_feature_off`.
- Un waiver P0 e' valido solo se la feature resta disabilitata da settings/feature flag e non entra nel perimetro RC.
- `blocked` e `failed` impediscono la RC.
- P1 aperti non bloccano la RC solo se hanno owner, piano e rischio accettato.
- Le evidenze devono essere salvate in `artifacts/rc-hardening/` oppure linkate da un manifest JSON.

## Output atteso M21-S

- Servizio/API per calcolare stato RC.
- Admin command center `/admin/launch-readiness/rc-hardening`.
- Export JSON del bundle evidenze.
- Static gate che fallisce se manca un gate P0.
