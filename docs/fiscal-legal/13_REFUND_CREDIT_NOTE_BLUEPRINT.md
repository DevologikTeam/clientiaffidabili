# Refund & Credit Note Blueprint

## Obiettivo

Evitare che rimborsi pagamento e rettifiche fiscali procedano separati, creando incoerenze tra Stripe/PayPal, ledger interno, fatture, note credito e report gia erogati.

## Matrice decisionale

| Scenario | Rimborso | Nota credito | Review |
|---|---|---|---|
| Pagamento confermato, provider non chiamato | Possibile | No se fattura non emessa | Support/Billing |
| Provider chiamato, report non pubblicato | Valutabile | Dipende da fattura | Billing + Operations |
| Report pubblicato/scaricato | Di norma bloccato o eccezione | Se fattura emessa | Super Admin/Legal |
| Fattura non emessa | Rimborso diretto possibile | No | Billing |
| Fattura emessa | Rimborso solo con rettifica fiscale | Si | Billing |
| Crediti acquistati non usati | Rimborso residuo possibile | Se fattura emessa | Billing |
| Crediti parzialmente usati | Rimborso solo residuo | Possibile parziale | Billing |
| Dispute aperta | Blocco rimborso manuale | Da valutare | Billing + Legal |

## Stati `RefundRequest`

- `requested`
- `eligibility_check`
- `fiscal_review_required`
- `approved`
- `provider_refund_pending`
- `refunded`
- `rejected`
- `cancelled`
- `dispute_blocked`

## Stati fiscal adjustment

- `not_required`
- `credit_note_required`
- `credit_note_queued`
- `credit_note_issued`
- `manual_review`

## Reason obbligatoria

Obbligatoria per:

- approvazione rimborso;
- rifiuto rimborso;
- eccezione su report gia pubblicato;
- emissione nota credito;
- annullamento manuale;
- override importo;
- chiusura dispute.

## Copy cliente

Richiesta ricevuta: “Abbiamo ricevuto la richiesta di rimborso. Verificheremo stato del pagamento, servizio acquistato e documenti amministrativi collegati.”

Rimborso approvato: “Il rimborso e stato approvato. I tempi di accredito dipendono dal metodo di pagamento usato.”

Rimborso non disponibile: “Il servizio risulta gia erogato o il report e gia disponibile. Puoi contattare il supporto per una verifica manuale.”
