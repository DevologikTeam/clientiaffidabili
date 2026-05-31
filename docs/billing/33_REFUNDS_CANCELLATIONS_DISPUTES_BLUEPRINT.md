# Refunds, Cancellations & Disputes Blueprint

## Obiettivo

Gestire i rimborsi senza perdere controllo economico, evitare doppi rimborsi, proteggere il margine e fornire al cliente una procedura chiara.

## Entita' principali

- `RefundRequest`: richiesta interna di rimborso.
- `RefundLedgerEntry`: evento economico append-only.
- `RefundPolicyDecision`: risultato policy engine.
- `DisputeCase`: contestazione/chargeback normalizzata.
- `SubscriptionCancellationRequest`: richiesta cancellazione abbonamento.

## Stati refund request

| Stato | Significato |
|---|---|
| `draft` | richiesta iniziata ma non inviata |
| `requested` | richiesta cliente/admin ricevuta |
| `policy_review` | serve decisione policy |
| `approved` | rimborso approvato internamente |
| `rejected` | rimborso respinto con motivazione |
| `provider_pending` | chiamata provider avviata |
| `succeeded` | rimborso confermato |
| `failed` | provider ha fallito |
| `cancelled` | richiesta annullata prima del provider |

## Policy engine

Input minimi:

- ordine e pagamento;
- importo pagato e gia' rimborsato;
- provider call status;
- report status;
- report download/access audit;
- credito consumato/residuo;
- subscription period;
- presenza dispute;
- motivazione richiesta.

Output:

- `eligible`;
- `blocked`;
- `manual_review_required`;
- `maxRefundableAmount`;
- `reasonCode`;
- `customerMessage`;
- `adminMessage`.

## Reason code MVP

| Code | Esito | Descrizione |
|---|---|---|
| `NO_PROVIDER_COST` | eligible | Provider non ancora chiamato |
| `PROVIDER_COST_INCURRED` | manual_review | Costo provider gia' sostenuto |
| `REPORT_DELIVERED` | blocked/manual | Report pubblicato o scaricato |
| `SUBSCRIPTION_UNUSED_RENEWAL` | eligible/manual | Rinnovo recente senza utilizzo |
| `CREDITS_PARTIALLY_USED` | manual_review | Calcolo residuo necessario |
| `DISPUTE_OPEN` | blocked | Evita doppio rimborso |
| `OVER_REFUND_ATTEMPT` | blocked | Importo supera pagato residuo |

## Rimborsi parziali

Regola: `maxRefundableAmount = paidAmount - refundedAmount - nonRefundableProviderCost - consumedCreditValue`.

Per MVP, se il calcolo non e' sicuro, la policy deve restituire `manual_review_required`.

## Dispute/chargeback

- Alla ricezione di dispute, bloccare rimborso manuale sul pagamento.
- Creare work item admin P0/P1.
- Congelare eventuali crediti non consumati se rischio abuso.
- Segnare ordine/account come `payment_under_review`.
- Non cancellare report gia' pubblicati, ma bloccare nuovi consumi se necessario.

## Cancellazioni subscription

| Tipo | Effetto |
|---|---|
| `cancel_now` | entitlement termina subito, refund secondo policy |
| `cancel_at_period_end` | entitlement resta fino a fine periodo |
| `suspend` | blocca rinnovi/uso finche' non riattivato |
| `resume` | ripristina solo se provider e pagamento validi |

## UX customer

Il cliente deve vedere:

- cosa puo' chiedere;
- importo massimo stimato se calcolabile;
- tempi indicativi;
- motivo se il rimborso non e' automatico;
- stato richiesta e riferimento provider se disponibile.

## Guardrail

- Nessun refund diretto da UI customer senza policy.
- Refund admin sempre con reason obbligatoria.
- Refund provider sempre idempotente.
- Ledger append-only, mai update distruttivo.
- Webhook provider riconcilia sempre con stato interno.
