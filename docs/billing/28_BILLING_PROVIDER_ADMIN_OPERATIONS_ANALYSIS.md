# 28 — Billing provider admin operations analysis

## Obiettivo admin

L'operatore deve poter capire rapidamente cosa e' successo a pagamento, abbonamento, crediti e ordini senza accedere ai pannelli Stripe/PayPal per ogni caso.

## Code operative

| Coda | Quando nasce | Azione operatore |
|---|---|---|
| Pagamento non riconciliato | webhook ricevuto ma ordine non aggiornato | verifica e riconcilia |
| Subscription past due | rinnovo fallito | contatta cliente o sospendi benefit |
| Crediti negativi/bloccati | riserva/consumo incoerente | analizza ledger |
| Refund richiesto | cliente chiede rimborso | verifica consumo provider |
| Dispute/chargeback | evento provider | blocca nuove richieste costose |
| Piano non mappato | provider plan sconosciuto | mappa o blocca |

## Azioni sensibili

- riconciliare pagamento;
- assegnare crediti manuali;
- stornare crediti;
- sospendere subscription;
- riattivare subscription;
- segnare rimborso come approvato;
- bloccare account per dispute.

Tutte richiedono reason e audit.

## Super Admin requirements

- vedere provider esterno, id evento, stato normalizzato;
- non vedere dati carta;
- non vedere raw payload completo di default;
- avere link esterno al provider dashboard solo se configurato;
- poter esportare audit operazione;
- poter filtrare per cliente, ordine, subscription, importo e stato.

## Guardrail

- Nessuna correzione economica senza ledger entry.
- Nessun saldo credito modificato direttamente senza entry compensativa.
- Nessun retry payment manuale senza conferma provider/cliente.
- Nessun accesso raw payload a ruoli support standard.
