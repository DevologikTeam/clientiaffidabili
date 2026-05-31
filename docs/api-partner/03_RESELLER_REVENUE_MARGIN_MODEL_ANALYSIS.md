# 03 — Reseller Revenue & Margin Model Analysis

## Modelli economici

### Credit wallet

Il partner compra crediti prima di consumare. È il modello più sicuro per MVP perché evita esposizione a costi non coperti.

### Canone + crediti inclusi

Permette MRR e migliore prevedibilità, ma richiede entitlement e gestione overage.

### Sconto reseller

Sconto sul listino pubblico. Semplice da capire, ma deve essere bloccato da price guard.

### Commissione/revenue share

Da rimandare. Richiede payout, contrattualistica, fatture/commissioni, note credito e riconciliazione fiscale.

## Margine minimo

Ogni prodotto partner deve rispettare:

```text
partner_net_price - provider_cost_snapshot - payment_fee_estimate - platform_cost_buffer >= minimum_margin
```

## Esempio iniziale

| Servizio pubblico | Prezzo pubblico | Prezzo partner Pro | Guardrail |
|---|---:|---:|---|
| Verifica essenziale | €14,90 | €11,90 | ok solo se margine > soglia |
| Check Pro | €24,90 | €19,90 | core partner |
| KYB | €49,90 | €39,90 | solo partner approvati |
| IBAN | €4,90 | €3,90 | alta frequenza, rate limit |

## Policy sconti

- Lo sconto non può essere impostato manualmente sotto soglia margine.
- Override solo super admin, con reason, scadenza e audit.
- Ogni piano partner deve avere snapshot versione listino.
- I prezzi partner non devono dipendere direttamente dal costo provider live senza snapshot.
