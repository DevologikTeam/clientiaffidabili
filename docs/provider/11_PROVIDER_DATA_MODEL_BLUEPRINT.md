# Provider data model blueprint

## Entità principali

### ProviderRequest

Rappresenta una singola richiesta verso provider esterno.

Campi chiave:

| Campo | Tipo | Nota |
|---|---|---|
| `id` | UUID | Identificativo interno. |
| `orderId` | UUID | Ordine pagato. |
| `checkId` | UUID | Verifica/report collegato. |
| `productCode` | string | Prodotto pubblico acquistato. |
| `providerName` | enum | `openapi`, `mock`, futuro provider. |
| `providerServiceCode` | string | Servizio provider versionato. |
| `mappingVersion` | string | Versione mapping usata. |
| `idempotencyKey` | string unique | Base: order + check + product + mapping. |
| `status` | enum | created, queued, sent, waiting_callback, polling, normalizing, completed, requires_review, failed. |
| `deliveryMode` | enum | sync, async_callback, async_polling, manual_assisted. |
| `providerRequestId` | string nullable | ID restituito dal provider. |
| `providerCostSnapshotCents` | integer | Costo congelato prima dell'invio. |
| `maxAcceptedCostCents` | integer | Soglia massima consentita. |
| `attemptCount` | integer | Numero tentativi. |
| `nextRetryAt` | datetime nullable | Retry scheduler. |
| `rawPayloadVaultRef` | string nullable | Riferimento payload protetto. |
| `normalizedResultRef` | string nullable | Riferimento risultato normalizzato. |
| `lastErrorCategory` | enum nullable | Tassonomia errore. |
| `requiresManualReviewReason` | text nullable | Motivo leggibile interno. |

### ProviderRequestEvent

Ledger append-only degli eventi richiesta provider.

Eventi minimi:

- `request_created`
- `request_queued`
- `request_dispatched`
- `provider_acknowledged`
- `callback_received`
- `poll_requested`
- `normalization_started`
- `normalization_completed`
- `manual_review_required`
- `request_failed`
- `request_completed`

### ProviderCostLedger

Registra costi attesi, consumati, contestati o corretti.

Regola: se il provider addebita anche una chiamata fallita, il costo non può sparire; va indicato come `consumed_failed` e valutato a livello operations/refund.

### ProviderRawPayloadVault

Non è una tabella da mostrare in admin base. È un riferimento a storage cifrato o tabella cifrata con accesso limitato.

Campi minimi:

- `vaultRef`
- `providerRequestId`
- `payloadHash`
- `encryptedPayload`
- `classification`
- `createdAt`
- `retentionUntil`
- `accessReasonRequired`

## Stati e transizioni

```text
created -> queued -> sent -> waiting_callback -> normalizing -> completed
created -> queued -> sent -> polling -> normalizing -> completed
sent -> requires_review
sent -> failed
requires_review -> completed
requires_review -> failed
failed -> refunded/ops decision fuori dal provider module
```

## Constraint

- `idempotencyKey` unique.
- `ProviderRequest` non cancellabile se già inviata.
- `ProviderRequestEvent` append-only.
- `ProviderCostLedger` append-only.
- Raw payload non incluso nelle API pubbliche.
