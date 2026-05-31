# 18 — Purchase Kill Switch Runtime Blueprint

## Obiettivo

Permettere all'admin di sospendere temporaneamente nuovi acquisti senza bloccare ordini gia' pagati, assistenza, report o rimborsi.

## Settings

- `commerce.purchases.enabled`
- `commerce.purchases.disabled_reason`
- `commerce.purchases.disabled_until`
- `commerce.purchases.disabled_by`
- `commerce.purchases.allow_existing_order_completion`

## Enforcement server-side

Il kill switch deve essere controllato almeno in questi punti:

1. creazione ordine;
2. creazione checkout session;
3. acquisto pacchetto crediti;
4. attivazione abbonamento;
5. API partner che consumano credito/acquisto.

## UX cliente

Se gli acquisti sono sospesi, il cliente deve vedere:

- messaggio chiaro;
- motivo non tecnico;
- eventuale data stimata di riapertura;
- CTA contatto/supporto;
- nessun errore 500 o messaggio tecnico.

## Guardrail

- I pagamenti confermati prima della sospensione continuano.
- I rimborsi restano disponibili.
- I report gia' disponibili restano accessibili.
- Ogni cambio stato richiede reason e audit.
