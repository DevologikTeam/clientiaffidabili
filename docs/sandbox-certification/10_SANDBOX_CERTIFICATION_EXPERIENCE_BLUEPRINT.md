# Sandbox Certification Experience Blueprint

## Esperienza operativa

La certificazione sandbox deve essere gestibile da una sezione admin dedicata:

```text
/admin/launch-readiness/sandbox-certification
```

La pagina deve rispondere a quattro domande:

1. Cosa è stato testato?
2. Cosa è passato?
3. Cosa blocca la RC?
4. Quale azione sicura può fare l’operatore?

## Stati certificazione

- `not_started`: non ancora eseguito.
- `ready_to_run`: configurazione minima presente.
- `running`: test in corso.
- `passed`: scenario superato.
- `failed`: scenario fallito.
- `blocked`: manca una configurazione o un provider.
- `waived`: escluso manualmente dalla RC con reason e feature flag disabilitato.

## Categorie

- payments.stripe
- payments.paypal
- provider.openapi
- ai.openai
- email.delivery
- report.pdf
- auth.accounts
- customer.dashboard
- admin.operations
- partner.api
- seo.cms
- docker.coolify
- security.audit

## UX admin

Ogni riga deve mostrare:

- categoria;
- scenario;
- stato;
- ultimo esito;
- blocker RC sì/no;
- owner;
- prossima azione;
- link a runbook;
- errori collegati;
- evidenze generate.

## Guardrail

Un waiver non può nascondere un rischio. Se uno scenario viene escluso dalla RC, il relativo modulo deve essere disabilitato da settings admin o feature flag.
