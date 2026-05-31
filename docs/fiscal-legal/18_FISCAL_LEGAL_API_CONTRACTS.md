# Fiscal & Legal API Contracts

## Customer API

### `GET /customer/fiscal/profile`

Restituisce profilo fiscale corrente e stato completamento.

### `PUT /customer/fiscal/profile`

Aggiorna dati fiscali futuri. Non modifica snapshot di ordini/documenti gia emessi.

### `GET /customer/fiscal/documents`

Lista documenti fiscali customer-facing.

### `GET /customer/legal/acceptances`

Lista documenti legali accettati, versione e stato.

### `POST /customer/refunds`

Crea richiesta rimborso, collegata a ordine/pagamento e fiscal gate.

## Checkout API

### `POST /checkout/legal-acceptance/validate`

Verifica che tutte le versioni obbligatorie siano pubblicate e accettate.

### `POST /checkout/tax-profile/snapshot`

Crea snapshot del profilo fiscale per ordine.

## Admin API

### `GET /admin/fiscal-legal/summary`

Riepilogo code fiscali/legal.

### `GET /admin/fiscal-legal/work-items`

Lista code con filtri: tipo, priorita, owner, SLA, stato.

### `POST /admin/fiscal-legal/documents/:id/mark-issued`

Registra emissione manual-assisted. Richiede reason, numero/data documento e allegato/reference.

### `POST /admin/fiscal-legal/refunds/:id/fiscal-decision`

Applica decisione fiscale su rimborso: `not_required`, `credit_note_required`, `manual_block`, `approved`.

### `POST /admin/fiscal-legal/legal-documents/:id/publish`

Pubblica versione legale. Richiede approvazione e hash contenuto.

### `POST /admin/fiscal-legal/legal-documents/:id/require-reacceptance`

Forza riaccettazione per nuova versione significativa.

## Eventi audit

- `tax_profile_updated`
- `tax_profile_snapshot_created`
- `fiscal_document_queued`
- `fiscal_document_marked_issued`
- `fiscal_document_downloaded`
- `refund_fiscal_review_requested`
- `credit_note_required`
- `legal_document_published`
- `legal_acceptance_recorded`
- `legal_reacceptance_required`

## Errori customer-facing

| Codice | Messaggio |
|---|---|
| `LEGAL_DOCUMENT_MISSING` | Le condizioni obbligatorie non sono ancora disponibili. Riprova piu tardi o contatta il supporto. |
| `TAX_PROFILE_INCOMPLETE` | Completa i dati di fatturazione per procedere. |
| `REFUND_REVIEW_REQUIRED` | La richiesta e in verifica amministrativa. |
| `DOCUMENT_NOT_READY` | Il documento non e ancora disponibile. |
