# M4-P — QA Report

Sprint: **Checkout & Billing Design**  
Versione: `0.12.0`  
Esito: **passed**

## Controlli eseguiti

- Presenza documento sprint M4-P.
- Presenza blueprint checkout UX.
- Presenza blueprint data model billing.
- Presenza API contract checkout/webhook/admin.
- Presenza regole webhook e idempotenza.
- Presenza workflow fatturazione.
- Presenza admin operations.
- Presenza email transazionali.
- Presenza UI copy/components blueprint.
- Presenza blueprint TypeScript `checkout-design.ts`.
- Verifica termini obbligatori: webhook, idempotenza, BillingProfile, PaymentLedgerEntry, Invoice, uso lecito, nessun dato carta, provider dati, snapshot, rimborso.
- Verifica assenza claim assoluti vietati nel blueprint.

## Guardrail verificati

| Guardrail | Stato |
|---|---|
| Nessun provider dati prima del pagamento | OK |
| Webhook come fonte di verità pagamento | OK |
| Idempotenza provider event | OK |
| Ledger append-only disegnato | OK |
| Rimborso automatico solo se provider non eseguito | OK |
| Dati carta non salvati | OK |
| Conferma uso lecito obbligatoria | OK |
| Copy senza promesse assolute | OK |
| Admin queue per anomalie | OK |

## Comando eseguito

```bash
node scripts/qa-checkout-billing-design.js
```

## Esito

```text
M4-P checkout billing design QA passed
```

## Note

Non è stata eseguita build TypeScript reale perché il pacchetto resta scaffold offline. Il prossimo sprint M4-S dovrà introdurre entità e controller reali, poi eseguire install/build in ambiente con dipendenze disponibili.
