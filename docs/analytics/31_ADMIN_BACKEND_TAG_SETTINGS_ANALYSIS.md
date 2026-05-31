# 31 — Admin/Backend Tag Settings Analysis

## Settings necessari

| Setting | Tipo | Sensibile | Default | Note |
|---|---|---:|---|---|
| `analytics.gtm.enabled` | boolean | no | false | Abilita rendering container GTM |
| `analytics.gtm.containerId` | string | no | empty | Formato previsto `GTM-XXXXXXX` |
| `analytics.gtm.environment` | enum | no | staging | staging/production |
| `analytics.gtm.serverSideEndpoint` | url | no | empty | Futuro server-side tagging |
| `analytics.clarity.enabled` | boolean | no | false | Abilita Clarity solo su pagine permesse |
| `analytics.clarity.projectId` | string | no | empty | ID progetto Clarity |
| `analytics.externalTags.enabled` | boolean | no | false | Master switch tag esterni |
| `analytics.consent.defaultMode` | enum | no | denied | Default prudente |
| `analytics.debug.enabled` | boolean | no | false | Solo staging/admin |

## Governance

Ogni modifica dei settings di tracking deve richiedere:

- ruolo admin autorizzato;
- reason obbligatoria;
- audit append-only;
- ambiente staging/production esplicito;
- validazione formato ID;
- preview prima della pubblicazione.

## Guardrail

- I setting sensibili rimangono backend-only.
- Nessun ID tracking hardcoded nei componenti.
- In staging i tag sono disabilitati o puntano a container separato.
- Robots/staging policy già presente resta invariata.
- Se il kill switch acquisti è attivo, si possono tracciare solo eventi pubblici/aggregati, non tentativi checkout tecnici.
