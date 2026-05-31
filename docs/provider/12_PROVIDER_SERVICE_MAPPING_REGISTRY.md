# Provider service mapping registry

## Principio

Il cliente acquista un prodotto comprensibile, ad esempio **Check Affidabilità Pro**. Il backend lo traduce in un mapping provider versionato. Questo evita di esporre endpoint e nomi tecnici Openapi nel sito pubblico.

## Registry MVP

| Product code | Nome pubblico | Provider service code design | Modalità | Review | Note |
|---|---|---|---|---|---|
| `COMPANY_ESSENTIAL` | Verifica azienda essenziale | `company-start-it + pec/sdi enrichment` | sync | no | Profilo anagrafico/operativo. |
| `COMPANY_PRO` | Check Affidabilità Pro | `company-full-it + credit-scoring-start/top` | async_polling | se parziale | Prodotto core. |
| `COMPANY_PRO_BALANCE` | Pro + Bilancio | `company-full-it + bilancio-imprese-italiane` | async_polling | sì | Costo e disponibilità variabili. |
| `KYB_COMPLIANCE` | KYB Compliance | `aml-it + titolare-effettivo + sanctions/pep` | async_polling | sì | Compliance sensitive. |
| `IBAN_VERIFY` | Verifica IBAN | `iban-start` | sync | no | Dati pagamento, minimizzazione. |
| `CONTACT_VERIFY` | Verifica email e telefono | `email-start + mobile-start/advanced` | sync | no | Non promettere identità certa. |

## Campi mapping

- `productCode`
- `providerName`
- `providerServiceCode`
- `providerServiceVersion`
- `deliveryMode`
- `enabledInSandbox`
- `enabledInProduction`
- `requiredInputs`
- `optionalInputs`
- `estimatedCostCents`
- `maxAcceptedCostCents`
- `normalizationProfile`
- `retryPolicy`
- `requiresManualReview`
- `legalUseConfirmationRequired`
- `customerVisibleOutput`
- `hiddenProviderFields`

## Versioning

Ogni modifica a mapping, costi, delivery mode o normalizzazione crea nuova versione. Gli ordini già pagati mantengono mapping version e provider cost snapshot usati al momento della richiesta.

## Produzione

Un mapping può essere pubblicato nel catalogo, ma non abilitato in produzione provider. Questa distinzione evita che una pagina pubblica pronta provochi chiamate esterne non certificate.
