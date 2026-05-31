# Reseller Pricing & Revenue Share Blueprint

## Modelli supportati
### 1. Partner usa API per se stesso
Pagamento a crediti o abbonamento, prezzi definiti da listino partner.

### 2. Reseller rivende report ai propri clienti
Clienti finali fatturati dal reseller. ClientiAffidabili.it fattura al reseller usage/abbonamento.

### 3. Referral commerciale
Da rimandare: revenue share automatico non MVP.

## Pricing tiers partner
- `starter`: accesso sandbox/live controllato, prezzi standard.
- `pro`: volumi maggiori, sconto controllato.
- `agency`: sconto maggiore, onboarding manuale obbligatorio.
- `custom`: contratto enterprise, sempre manuale.

## Margin guard
Ogni prezzo partner deve superare:
`providerCost + paymentFee + operationalBuffer + minimumGrossMargin`.

## Sconti
- sconti solo su servizi con margine sufficiente;
- no sconto automatico su servizi a costo alto/manuale;
- override solo super admin con reason e audit;
- sconto con data di scadenza opzionale.

## Revenue share futuro
Il revenue share automatico richiede:
- contratti partner;
- tracciamento referral;
- fiscalita e note credito;
- gestione rimborsi/dispute;
- approvazione legale/fiscale.

Per MVP si usa modello semplice: il partner compra crediti o piano, rivende autonomamente se previsto dal contratto.
