# Catalog data model analysis

## Entità necessarie

### Product

Rappresenta il servizio vendibile.

Campi:

- `id`
- `code`
- `slug`
- `status`: draft, review, published, archived
- `family`
- `riskLevel`
- `deliveryMode`
- `publicName`
- `publicShortDescription`
- `publicLongDescription`
- `publicUseCases[]`
- `publicLimitations[]`
- `requiredInputs[]`
- `requiresLegalBasis`
- `checkoutConfirmationText`
- `reportTemplateCode`

### ProductPrice

Versiona prezzo e regole economiche.

- `productId`
- `currency`
- `publicPriceNet`
- `vatRate`
- `taxesAndDutiesPolicy`
- `providerCostEstimated`
- `checkoutFeeEstimated`
- `supportReserve`
- `minimumAllowedPriceNet`
- `targetMarginRatio`
- `validFrom`
- `validTo`
- `createdBy`
- `approvedBy`

### ProviderEndpoint

Mappa endpoint provider disponibili.

- `provider`
- `providerProductCode`
- `name`
- `category`
- `unitCostList`
- `unitCostCommitted`
- `deliveryEstimate`
- `requiresSpecialConsent`
- `isManual`
- `isEnabled`

### ProductProviderMap

Mappa prodotto vendibile agli endpoint provider.

- `productId`
- `providerEndpointId`
- `executionOrder`
- `isRequired`
- `isAddOn`
- `failurePolicy`: fail_order, partial_report, retry, manual_review
- `costAllocationWeight`

### OrderPriceSnapshot

Snapshot economico dell'ordine.

- `orderId`
- `productCode`
- `catalogVersion`
- `publicPriceNet`
- `vatAmount`
- `totalGross`
- `providerCostEstimated`
- `checkoutFeeEstimated`
- `targetMarginRatio`
- `minimumAllowedPriceNet`

### ActualCostLedger

Ledger costi effettivi.

- `orderId`
- `checkId`
- `providerCallId`
- `providerCostEffective`
- `retryCount`
- `refundAmount`
- `marginComputedAt`
- `actualMarginRatio`

## Stati prodotto

| Stato | Significato |
|---|---|
| draft | Visibile solo admin, modificabile. |
| review | Pronto per revisione pricing/copy/compliance. |
| published | Visibile pubblicamente. |
| paused | Non acquistabile ma storico preservato. |
| archived | Non più vendibile, ordini storici invariati. |

## Stati prezzo

| Stato | Significato |
|---|---|
| active | Prezzo corrente. |
| scheduled | Prezzo programmato. |
| expired | Prezzo precedente. |
| rejected | Prezzo non approvato. |

## Decisione architetturale

Il catalogo deve essere database-backed, non hardcoded. Il file `apps/web/lib/catalog/pricing-analysis.ts` resta solo come baseline di analisi/seed iniziale.

## Vincoli multi-tenant futuri

Anche se il MVP può partire single-tenant/platform-level, il data model deve prevedere:

- prezzi globali;
- eventuali override per partner/tenant;
- feature flag per prodotto;
- piano abilitato;
- audit separato per modifiche.
