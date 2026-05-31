# Sandbox Test Data & Fixture Analysis

## Policy

- Nessun dato reale di persone o aziende reali nei test automatici.
- Dati aziendali demo esplicitamente fittizi.
- Email test su domini riservati o mailbox sandbox.
- Nessuna carta reale.
- Nessun IBAN reale salvo valori test dichiarati.
- Nessuna API key reale nel repository.

## Dataset minimo

- Customer owner.
- Customer billing user.
- Admin super admin.
- Operatore supporto.
- Partner sandbox.
- Ordine one-shot.
- Abbonamento starter.
- Report pronto.
- Report in review.
- Pagamento fallito.
- Rimborso pending.
- Provider error.
- Email failed.

## Obiettivo

Le fixture devono rendere ripetibili i test M19-S e Playwright senza dipendere da dati o servizi live.
