# Admin Payment Operations Blueprint

## Scopo

Estendere la console interna con una vista billing/payments adatta a gestire incassi, abbonamenti, crediti, rimborsi, dispute, fatture e anomalie.

## Code operative

| Queue | Priorita' | Esempi |
|---|---|---|
| `refund_review` | P1 | report non pubblicato, provider cost sostenuto |
| `refund_failed` | P0/P1 | provider refund fallito |
| `dispute_open` | P0 | chargeback/dispute aperta |
| `subscription_payment_failed` | P1 | rinnovo fallito |
| `credit_mismatch` | P1 | saldo non coerente |
| `invoice_pending` | P2 | fattura da emettere/verificare |
| `webhook_unprocessed` | P1 | evento non processato |

## Azioni admin

| Azione | Reason obbligatoria | Idempotenza | RBAC |
|---|---|---|---|
| approva rimborso | si | si | billing/admin |
| rifiuta rimborso | si | no | billing/admin |
| retry refund | si | si | billing/admin |
| blocca account per dispute | si | si | compliance/admin |
| assegna credito manuale | si | si | super admin |
| storna credito | si | si | billing/admin |
| riconcilia pagamento | si | si | billing/admin |
| annulla subscription | si | si | billing/admin |

## UI detail item

Ogni work item payment deve mostrare:

- cliente/account;
- ordine/pagamento/subscription;
- importo pagato/rimborsato/residuo;
- fee stimate;
- stato provider;
- stato interno;
- policy decision;
- timeline ledger;
- azioni consentite e bloccate.

## Guardrail

- Nessun raw payment payload nelle liste.
- Dati sensibili redatti.
- Azioni economiche sempre tracciate.
- Nessun override saldo senza doppia conferma e reason.
- Nessun refund se dispute aperta, salvo decisione compliance.
