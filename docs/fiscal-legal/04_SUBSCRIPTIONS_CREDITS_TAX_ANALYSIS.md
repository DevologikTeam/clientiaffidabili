# 04 — Subscriptions and Credits Tax Analysis

## Obiettivo

Analizzare l'impatto fiscale e operativo di abbonamenti, crediti e rinnovi gia previsti nel modulo M4B.

## Modelli commerciali possibili

### Piano mensile con crediti inclusi

Esempio:

- Starter: 10 crediti/mese;
- Pro: 50 crediti/mese;
- Agency: 200 crediti/mese.

Documento fiscale collegato al rinnovo mensile.

### Pacchetto crediti prepagato

Esempio:

- 10 verifiche;
- 50 verifiche;
- 100 verifiche.

Documento fiscale collegato all'acquisto pacchetto o al consumo, da validare fiscalmente.

### Monitoraggio continuativo

Esempio:

- monitoraggio fornitore mensile;
- alert negativita;
- aggiornamento score.

Documento fiscale collegato al periodo di servizio.

## Domande fiscali da validare

- Il credito prepagato rappresenta acconto, voucher, servizio gia determinato o wallet interno?
- Quando l'IVA diventa esigibile per crediti non consumati?
- I crediti scaduti vanno trattati come ricavo non rimborsabile?
- La nota credito su abbonamento deve riferirsi al periodo non goduto o al residuo credito?
- Quale descrizione riga fattura usare per evitare ambiguita?

## Scelta MVP prudente

- Abilitare subscription tecnicamente ma non renderle default commerciale prima del parere fiscale.
- Per il primo go-live, privilegiare acquisti one-shot.
- Per abbonamenti, usare descrizione chiara del piano e del periodo.
- Per crediti, mantenere ledger interno e stato fiscale `requires_review` finche non validato.

## Entita aggiuntive

### SubscriptionFiscalSnapshot

- `subscriptionId`
- `planCode`
- `billingPeriodStart`
- `billingPeriodEnd`
- `includedCredits`
- `renewalAmount`
- `taxProfileSnapshot`
- `fiscalDocumentId`

### CreditFiscalTreatment

- `creditWalletId`
- `purchasePaymentId`
- `fiscalTreatmentStatus`: `not_defined`, `validated`, `requires_review`
- `documentPolicy`: `on_purchase`, `on_consumption`, `manual_review`
- `validatedBy`
- `validatedAt`

## Guardrail

- no “crediti illimitati”;
- no rinnovo senza entitlement snapshot;
- no consumo credito se wallet non riconciliato;
- no refund automatico se documento fiscale gia emesso;
- no scadenza crediti nascosta al cliente;
- no piani pubblici senza termini di rinnovo/cancellazione chiari.
