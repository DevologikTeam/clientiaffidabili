# 12 — Runtime Config, Secrets & Feature Flag Freeze Blueprint

## Obiettivo

Bloccare configurazioni pericolose prima della RC e separare con chiarezza locale, sandbox, staging e produzione.

## Regole P0

- `ENABLE_DEMO_DATA=false` in produzione.
- Nessuna chiave live in frontend o variabili `NEXT_PUBLIC_*` sensibili.
- Provider live attivati solo dopo sandbox passata e flag abilitato esplicitamente.
- Feature non certificate restano off o `waived_with_feature_off`.
- Route admin, dashboard, report, checkout e inviti restano `noindex` e fuori da tracking esterno.

## Matrice ambienti

| Ambiente | Demo data | Provider | Email | Tracking | Note |
| --- | --- | --- | --- | --- | --- |
| local | opzionale | mock/sandbox | mock/sandbox | off di default | sviluppo |
| sandbox | fixture isolate | sandbox | sandbox | off sensibile | test provider |
| staging | false salvo tenant demo isolato | sandbox/live test controllato | sandbox | privacy-safe | pre-RC |
| production | false | live certificato | live certificato | consentito solo pagine pubbliche | release |

## Evidenze

- Export `.env.example` verificato.
- Diff variabili staging/production redatto senza valori sensibili.
- Report `security-secret-scan`.
- Manifest feature flag con stato on/off e owner.
- Lista route sensibili con metadata `noindex`.

## Uscita gate

`rc-env-secrets-feature-flags` passa solo se non ci sono secret esposti, demo data e feature non certificate sono off, e ogni override ha owner e motivazione.
