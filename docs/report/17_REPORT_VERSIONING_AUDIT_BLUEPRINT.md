# Report Versioning & Audit Blueprint

## Versioning

Ogni report deve salvare:

- `templateCode`;
- `templateVersion`;
- `composerVersion`;
- `scoreModelVersion`;
- `sourceSnapshotVersion`;
- `generatedAt`;
- `publishedAt`;
- `hash` dello snapshot;
- `snapshotHash` come impronta tecnica dello snapshot pubblicato.

## Snapshot immutabile

Dopo pubblicazione il report non viene modificato. Se serve correggere:

1. si crea una nuova versione report;
2. si collega alla precedente;
3. si registra motivo;
4. si notifica il cliente se necessario.

## Audit events

| Evento | Quando |
|---|---|
| `report.compose_requested` | avvio composizione |
| `report.composed` | composizione completata |
| `report.review_required` | review obbligatoria |
| `report.review_approved` | approvazione admin |
| `report.published` | report visibile cliente |
| `report.download_requested` | download o export |
| `report.voided` | annullamento |

## Retention

La retention va definita nei termini legali. Fino a definizione contrattuale, il sistema deve evitare promesse pubbliche sulla conservazione a lungo termine.

## Integrità

L'hash snapshot permette di dimostrare che il report scaricato corrisponde al report pubblicato.
