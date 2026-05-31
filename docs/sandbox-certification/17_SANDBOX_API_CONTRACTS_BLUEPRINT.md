# Sandbox Certification API Contracts Blueprint

## Admin endpoints

```http
GET /admin/sandbox-certification/summary
GET /admin/sandbox-certification/scenarios
POST /admin/sandbox-certification/runs
GET /admin/sandbox-certification/runs/:id
POST /admin/sandbox-certification/runs/:id/scenarios/:scenarioId/retry
POST /admin/sandbox-certification/scenarios/:scenarioId/waive
GET /admin/sandbox-certification/runs/:id/evidence
```

## Oggetti principali

- `SandboxScenario`
- `SandboxCertificationRun`
- `SandboxScenarioResult`
- `SandboxEvidence`
- `SandboxWaiver`

## Stati run

- `queued`
- `running`
- `passed`
- `failed`
- `blocked`
- `cancelled`

## Sicurezza

Tutti gli endpoint sono admin-only e richiedono RBAC. Le evidenze devono essere redatte prima dell’esposizione UI.
