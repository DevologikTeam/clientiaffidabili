# Checkout flow e stati ordine

## Flusso MVP

1. Il cliente seleziona servizio/pacchetto.
2. Il sistema mostra prezzo netto, IVA, totale, tempi, dati richiesti e limiti.
3. Il cliente compila dati fiscali minimi e dati necessari al report.
4. Il cliente conferma uso lecito e condizioni.
5. Backend crea ordine `checkout_pending` con snapshot prezzo.
6. Backend crea sessione checkout provider.
7. Cliente paga su pagina hosted.
8. Webhook conferma pagamento.
9. Ordine passa a `paid`.
10. Provider job parte solo dopo `paid`.
11. Report completato e disponibile in dashboard/email.

## Stati ordine

| Stato | Significato | Azioni consentite |
|---|---|---|
| `draft` | dati checkout non completi | modifica dati |
| `checkout_pending` | sessione creata, pagamento non confermato | attendi/scadenza |
| `checkout_expired` | sessione scaduta | ricrea checkout |
| `payment_processing` | provider sta processando | attendi webhook |
| `paid` | pagamento confermato | avvia provider job |
| `provider_pending` | job in coda | retry/cancel assistito |
| `provider_running` | richiesta inviata al provider dati | nessun rimborso automatico |
| `completed` | report disponibile | download/report/dashboard |
| `provider_failed` | errore dati/provider | retry/assistenza/rimborso |
| `refund_requested` | cliente/admin ha richiesto rimborso | revisione |
| `refunded` | rimborso completato | chiusura ordine |
| `disputed` | contestazione provider pagamento | blocco operativo |
| `canceled` | ordine annullato prima del pagamento | nessuna esecuzione |

## Stati pagamento

| Stato | Origine | Nota |
|---|---|---|
| `created` | backend | sessione creata |
| `requires_payment` | provider | pagamento non completato |
| `processing` | provider | stato transitorio |
| `succeeded` | webhook | unico trigger valido per provider job |
| `failed` | webhook/provider | mostra recovery |
| `refunded_partial` | admin/provider | ledger obbligatorio |
| `refunded_full` | admin/provider | chiusura economica |
| `disputed` | provider | blocco report futuri per ordine |

## Regola critica

Il redirect di successo non basta. Il report parte solo dopo webhook verificato, idempotente e associato a ordine/snapshot validi.

## Token QA

Evento canonico webhook: `payment_succeeded`.
