# Sandbox Admin UI Implementation

## Route

- `/admin/launch-readiness/sandbox-certification`
- `/admin/launch-readiness/sandbox-certification/scenarios`
- `/admin/launch-readiness/sandbox-certification/[runId]`

## Componenti

- `CertificationSummaryCards`: numeri rapidi per scenari, blocker, waiver e passati.
- `CertificationScenarioTable`: registry scenario con stato RC e prossima azione.
- `CertificationRunTimeline`: timeline leggibile della run.
- `CertificationEvidenceList`: evidenze redatte e payload sicuri.
- `CertificationBlockerPanel`: decisione RC e regole operative.
- `CertificationWaiverModal`: anteprima del waiver auditato.
- `CertificationRunbookCard`: comandi da eseguire in ambiente reale.

## UX

La UI non deve vendere una falsa produzione pronta. Deve dire chiaramente:

- cosa e gia predisposto;
- cosa resta bloccante;
- perche la RC non puo avanzare;
- quale evidenza deve essere allegata;
- quando una feature deve restare disabilitata.

## Copy obbligatorio

Evitare claim assoluti. Non usare formule che promettono esiti certi, assenza totale di rischio o affidabilita assoluta. La UI deve restare orientata a certificazione, evidenza, rollback e prossima azione.
