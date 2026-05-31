# Resale pricing & margin model

## Formula di margine

Per ogni ordine/check:

```text
netRevenue = publicPriceNet - discountsNet - refundsNet
variableCost = providerCostEffective + checkoutFee + invoiceCost + reportGenerationCost + supportReserve + retryReserve
grossMargin = netRevenue - variableCost
grossMarginRatio = grossMargin / netRevenue
```

## Variabili da salvare

| Campo | Descrizione | Visibilità |
|---|---|---|
| `publicPriceNet` | Prezzo netto cliente | Pubblica/checkout |
| `vatRate` | Aliquota IVA applicata | Pubblica/checkout |
| `taxesAndDutiesNet` | Imposte, bolli, diritti se applicabili | Pubblica/checkout |
| `providerCostEstimated` | Stima interna prima della chiamata | Admin |
| `providerCostEffective` | Costo reale dopo esecuzione | Admin/super admin |
| `checkoutFeeEstimated` | Fee pagamento stimata | Admin |
| `supportReserve` | Buffer assistenza/rimborso | Admin |
| `minimumAllowedPriceNet` | Prezzo minimo sotto cui bloccare pubblicazione | Admin |
| `targetMarginRatio` | Margine target | Admin |
| `actualMarginRatio` | Margine effettivo | Admin |

## Prezzi consigliati MVP

| Prodotto | Prezzo netto | Costo prudente | Buffer fee/supporto | Margine stimato |
|---|---:|---:|---:|---:|
| Verifica azienda essenziale | €14,90 | €0,25 | €1,00 | ~91,6% |
| Check Affidabilità Pro | €24,90 | €2,20 | €1,50 | ~85,1% |
| Pro + Bilancio | €34,90 | €7,00 | €2,00 | ~74,2% |
| KYB Compliance | €49,90 | €4,50 | €2,50 | ~86,0% |
| Verifica IBAN | €4,90 | €0,20 | €0,60 | ~83,7% |
| Verifica email/telefono | €4,90 | €0,12 | €0,60 | ~85,3% |

I margini sono stime strategiche per definire listino. In produzione devono essere ricalcolati su costo effettivo, fee checkout reale, IVA, rimborsi, retry e assistenza.

## Soglie commerciali

| Soglia | Regola |
|---|---|
| Margine target default | 70% |
| Margine minimo pubblicabile | 55% |
| Margine sotto 55% | Blocco pubblicazione o approvazione super admin |
| Costo provider non aggiornato | Avviso admin e blocco variazioni mass market |
| Servizio high risk | Revisione copy + legal basis nel checkout |
| Costo provider > €7 | Vendere come add-on o richiesta assistita |

## Strategia sconti

- Nessuno sconto automatico nel MVP senza regola di margine.
- Coupon massimo 20% solo se margine resta sopra soglia minima.
- Pacchetti volume solo dopo aver misurato costi effettivi.
- Piani mensili con crediti non monetari, non wallet in euro nella prima fase.

## Piani ricorrenti futuri

| Piano | Prezzo netto | Include | Note |
|---|---:|---|---|
| Team Start | €29/mese | Crediti per controlli entry + storico | Utile per fidelizzare PMI. |
| Team Pro | €99/mese | Più controlli Pro + monitoraggio base | Richiede billing ricorrente. |
| API Partner | da €299/mese | API key, quota, supporto, report uso | Da introdurre dopo hardening API. |

## Decisione MVP

Prima del billing ricorrente, partire con prodotti one-shot e checkout trasparente. I piani devono arrivare quando sono pronti:

- ledger crediti;
- limiti usage;
- fatturazione ricorrente;
- report usage;
- gestione rinnovi;
- retry/failed payment;
- admin per sospensione piano.
