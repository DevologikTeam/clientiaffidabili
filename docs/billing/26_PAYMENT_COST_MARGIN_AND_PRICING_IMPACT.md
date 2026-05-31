# 26 — Payment cost, margin and pricing impact

## Perche' le fee contano

I servizi ClientiAffidabili.it hanno tre costi principali:

1. costo provider dati;
2. fee pagamento;
3. costo operativo/supporto/compliance.

Il pricing deve proteggere il margine anche su importi piccoli. Le fee fisse penalizzano prodotti da pochi euro, quindi conviene spingere pacchetti o credito minimo.

## Esempio margine one-shot

| Prodotto | Prezzo netto | Costo provider stimato | Fee pagamento stimata | Margine operativo indicativo |
|---|---:|---:|---:|---:|
| Verifica email/telefono | €4,90 | basso | alto peso relativo | fragile |
| Verifica IBAN | €4,90 | medio-basso | alto peso relativo | medio |
| Check Affidabilita' Pro | €24,90 | medio | sostenibile | buono |
| KYB Compliance | €49,90 | medio/alto | sostenibile | buono |

## Implicazioni commerciali

- Evitare checkout singoli troppo bassi se non legati a bundle.
- Minimo ordine consigliato: €9,90 o pacchetto crediti.
- Per micro-verifiche usare crediti prepagati.
- Nei piani subscription includere crediti con margine stimato prudente.
- Monitoraggio con costo provider ricorrente deve avere margine dedicato e limiti.

## Fee model interno

Ogni transazione deve salvare uno snapshot:

```text
paymentGrossAmount
paymentProviderFeeEstimate
paymentProviderFeeActual
providerDataCostEstimate
providerDataCostActual
vatAmount
netRevenue
estimatedGrossMargin
actualGrossMargin
```

## Guardrail margine

- Se margine stimato sotto soglia, bloccare acquisto o richiedere approvazione.
- Se fee provider cambia, non modificare ordini gia' pagati.
- Se piano subscription diventa non sostenibile, applicare nuova versione piano solo ai rinnovi/nuovi clienti secondo policy.
- Overage sempre prepagato o autorizzato.
