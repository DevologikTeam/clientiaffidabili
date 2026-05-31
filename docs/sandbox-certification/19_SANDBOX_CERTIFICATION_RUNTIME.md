# Sandbox Certification Runtime

## Scopo

Il runtime M19-S permette di creare e consultare run di certificazione sandbox per i flussi critici di ClientiAffidabili.it. Il primo livello e mock-first: prepara contratti, stati, evidenze e blocchi RC senza usare credenziali provider reali.

## Modello dati

- `SandboxScenario`: definizione scenario e criteri.
- `SandboxCertificationRun`: esecuzione suite o subset scenari.
- `SandboxScenarioResult`: esito scenario, tentativo, messaggio sicuro e rollback.
- `SandboxEvidence`: evidenza redatta con hash.
- `SandboxWaiver`: eccezione auditata, ammessa solo se la feature resta disabilitata.

## Stati

### Scenario

- `not_started`
- `ready_to_run`
- `running`
- `passed`
- `failed`
- `blocked`
- `waived`

### Run

- `queued`
- `running`
- `passed`
- `failed`
- `blocked`
- `cancelled`

## Endpoint admin

```http
GET /admin/sandbox-certification/summary
GET /admin/sandbox-certification/scenarios
POST /admin/sandbox-certification/runs
GET /admin/sandbox-certification/runs/:id
POST /admin/sandbox-certification/runs/:id/scenarios/:scenarioId/retry
POST /admin/sandbox-certification/scenarios/:scenarioId/waive
GET /admin/sandbox-certification/runs/:id/evidence
```

## Regola RC

Una RC puo avanzare solo quando gli scenari bloccanti sono passati oppure risultano coperti da waiver auditato con feature disabilitata. Gli smoke Docker/Coolify e le prove provider sandbox reali non sono sostituiti dal mock runner.
