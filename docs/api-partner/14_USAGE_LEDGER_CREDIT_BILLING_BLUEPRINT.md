# Usage Ledger, Credit Wallet & Billing Blueprint

## Fonte di verita economica
La fonte interna di verita e' il ledger append-only, non lo stato visuale di una singola tabella.

## Credit wallet
Campi principali:
- `partnerAccountId`
- `environment`
- `availableCreditsCents`
- `reservedCreditsCents`
- `currency`
- `updatedAt`

## Reservation flow
1. Ricezione richiesta API.
2. Validazione API key/scope/rate limit.
3. Calcolo prezzo partner e costo stimato.
4. Verifica crediti/entitlement.
5. Creazione reservation ledger.
6. Avvio richiesta provider o sandbox job.
7. Commit/settlement oppure release reservation.

## Ledger entry types
- `credit_purchase`
- `subscription_grant`
- `usage_reservation`
- `usage_commit`
- `usage_release`
- `manual_adjustment`
- `refund_credit`
- `chargeback_hold`
- `chargeback_release`

## Prezzo partner
Ogni usage deve salvare snapshot di:
- service code;
- listino partner;
- prezzo partner;
- costo provider stimato/effettivo;
- fee pagamento se applicabile;
- margine lordo stimato/effettivo;
- versione pricing.

## Billing partner
MVP consigliato:
- ricarica crediti prepagata;
- piani mensili con crediti inclusi;
- extra usage solo se preautorizzato;
- invoice manual-assisted gia compatibile con M10.

## Guardrail margine
La richiesta deve bloccarsi se il prezzo partner non copre costo provider + fee pagamento + margine minimo configurato.
