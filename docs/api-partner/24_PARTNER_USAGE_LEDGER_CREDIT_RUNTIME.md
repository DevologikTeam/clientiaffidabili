# Partner Usage Ledger & Credit Runtime

## Movimenti supportati
- `credit_purchase`
- `subscription_grant`
- `usage_reservation`
- `usage_commit`
- `usage_release`
- `manual_adjustment`
- `refund_credit`
- `chargeback_hold`
- `chargeback_release`

## Reservation flow
1. Validazione API key e scope.
2. Verifica stato partner/ambiente.
3. Rate limit check.
4. Idempotency check.
5. Reservation crediti.
6. Esecuzione sandbox o provider-backed futura.
7. Commit o release.

## Margine
Ogni ledger puo salvare snapshot di prezzo partner, costo provider stimato, fee pagamento e margine. La logica di margin guard sara' consolidata in M13/M14.

## Limiti MVP
Il wallet crediti e' scaffold e va collegato al modulo billing reale prima del go-live.
