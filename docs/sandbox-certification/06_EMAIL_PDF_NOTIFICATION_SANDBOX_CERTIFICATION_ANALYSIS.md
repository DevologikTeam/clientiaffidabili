# Email, PDF & Notification Sandbox Certification Analysis

## Flussi obbligatori

- Email verifica account.
- Recupero password.
- Ordine creato.
- Pagamento riuscito/fallito.
- Report in lavorazione.
- Documento pronto.
- PDF disponibile via link sicuro.
- PDF allegato solo se policy admin lo abilita.
- Fattura disponibile.
- Rimborso aggiornato.
- Ticket supporto.

## Deliverability sandbox

- Provider mock-first.
- Provider reale in modalità sandbox/test quando disponibile.
- Ledger invio sempre creato.
- Retry solo su errori temporanei.
- Bounce/complaint su suppression list.
- Webhook idempotente.

## Criterio

Un documento pronto senza email non deve bloccare l’accesso cliente in dashboard. L’email è canale di notifica, non unica fonte di accesso al documento.
