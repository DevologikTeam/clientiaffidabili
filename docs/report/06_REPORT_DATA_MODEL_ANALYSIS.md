# Report data model analysis

## Entità da progettare in M6-P

### Report

- `id`
- `organizationId`
- `orderId`
- `checkId`
- `providerRequestId`
- `subjectType`
- `subjectName`
- `status`
- `attentionLevel`
- `scoreValue`
- `scoreModelVersion`
- `templateVersion`
- `dataSnapshot`
- `htmlSnapshot`
- `pdfPath`
- `publishedAt`
- `reviewedAt`
- `createdAt`

### ReportSection

- `id`
- `reportId`
- `code`
- `title`
- `summary`
- `position`
- `visibility`
- `severity`
- `payload`

### ReportEvidence

- `id`
- `reportId`
- `sectionId`
- `code`
- `label`
- `value`
- `sourceName`
- `sourceType`
- `sourceTimestamp`
- `retrievedAt`
- `confidence`
- `sensitivity`
- `displayPolicy`
- `limitation`

### ReportReview

- `id`
- `reportId`
- `status`
- `reason`
- `reviewerId`
- `decision`
- `notes`
- `createdAt`

## Stati report

| Stato | Significato |
|---|---|
| queued | Report in coda dopo provider completed. |
| composing | Composer in esecuzione. |
| review_required | Serve verifica admin. |
| ready | Report pubblicato al cliente. |
| failed | Composizione fallita. |
| archived | Report non più attivo. |

## Snapshot immutabile

Ogni report pubblicato deve avere snapshot immutabile:

- dati normalizzati;
- evidenze;
- score;
- template version;
- copy version;
- limiti;
- timestamp.

Se il provider cambia dati in futuro, si genera un nuovo report o un monitoraggio, non si modifica retroattivamente il report pubblicato.

## Relazione con ordini e provider

Ordine pagato → verifica → provider request → normalized provider result → report composer → report ready/review.

Nessun report deve essere generato senza:

- ordine paid;
- provider request completed o manual review;
- dati normalizzati validi;
- template version attiva;
- evidenze con fonti minime.
