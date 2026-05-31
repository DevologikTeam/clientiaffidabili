# Admin Operations — UI Implementation

## Route implementate

- `/admin/operations`
- `/admin/operations/[id]`

## Componenti

- `AdminOperationsShell`
- `OperationsPriorityStrip`
- `WorkQueueTable`
- `OperationalSnapshotCard`
- `AdminActionPanel`
- `ReasonModalPreview`
- `AuditTimeline`

## Copy operativo

La UI usa copy orientato all'azione:

- motivo;
- impatto;
- prossima azione;
- owner;
- stato;
- azione consentita o bloccata.

Non usa linguaggio come “payload grezzo”, “debug tecnico” o “forzatura” nella schermata principale, se non per spiegare che tali contenuti sono bloccati.

## Responsive

La console riusa griglie e componenti del design system; la sidebar collassa grazie alle regole globali già presenti.
