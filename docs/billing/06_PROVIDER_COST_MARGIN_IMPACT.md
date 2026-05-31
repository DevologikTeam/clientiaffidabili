# Impatto commissioni pagamento su margine

## Obiettivo

Integrare le commissioni checkout nella marginalità dei servizi, senza erodere i prezzi MVP definiti in M3.

## Formula margine effettivo

```text
margine_effettivo = prezzo_netto_cliente - costo_provider_dati - commissione_pagamento_stimata - costo_operativo_stimato
margine_percentuale = margine_effettivo / prezzo_netto_cliente
```

## Esempio con commissione carta SEE stimata

Ipotesi commissione: `1,5% + 0,25€`.

| Servizio | Prezzo netto | Costo dati stimato | Fee pagamento stimata | Margine effettivo stimato |
|---|---:|---:|---:|---:|
| Verifica azienda essenziale | €14,90 | €0,15 - €0,80 | €0,47 | alto |
| Check Affidabilità Pro | €24,90 | €1,00 - €2,50 | €0,62 | alto |
| Pro + Bilancio | €34,90 | €4,00 - €7,00 | €0,77 | buono |
| KYB Compliance | €49,90 | €2,00 - €7,00 | €1,00 | alto, ma compliance-heavy |
| Verifica IBAN | €4,90 | €0,03 - €0,20 | €0,32 | attenzione ticket basso |
| Verifica email/telefono | €4,90 | €0,01 - €0,15 | €0,32 | attenzione ticket basso |

## Decisione pricing

I servizi sotto €5 hanno margine percentuale ancora interessante, ma la quota fissa pagamento pesa. Vanno quindi usati come:

- add-on in checkout;
- bundle minimo;
- credito prepagato futuro;
- lead magnet paid solo se CAC basso.

## Price guard aggiornato

Il price guard deve considerare:

1. costo provider dati;
2. fee pagamento stimata;
3. costo operativo/manuale;
4. IVA esclusa dal margine;
5. costo eventuale rimborso/dispute;
6. costo supporto per servizi assistiti.

## Regola MVP

Nessun prodotto pubblicato deve scendere sotto:

- margine lordo assoluto minimo: `€5,00`, salvo micro-servizi add-on;
- margine percentuale minimo: `45%` per prodotti automatizzati;
- margine percentuale minimo: `60%` per prodotti che richiedono intervento umano.
