# Sandbox Certification Admin UI Blueprint

## Route

```text
/admin/launch-readiness/sandbox-certification
/admin/launch-readiness/sandbox-certification/[runId]
/admin/launch-readiness/sandbox-certification/scenarios
```

## Componenti

- `CertificationSummaryCards`
- `CertificationScenarioTable`
- `CertificationRunTimeline`
- `CertificationEvidenceList`
- `CertificationBlockerPanel`
- `CertificationWaiverModal`
- `CertificationRunbookCard`

## UX

La dashboard deve evidenziare:

- scenari blocker falliti;
- scenari non eseguiti;
- provider non configurati;
- feature disabilitate per RC;
- ultime evidenze;
- prossima azione sicura.

## Azioni admin

- Avvia scenario singolo.
- Avvia suite sandbox.
- Marca scenario come waived con reason.
- Collega errore a ticket/fix/rimborso.
- Scarica report evidenze.

## Guardrail

Un waiver richiede:

- ruolo autorizzato;
- reason obbligatoria;
- modulo disabilitato o feature flag spento;
- audit append-only.
