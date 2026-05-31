# Operations e supporto checkout

## Obiettivo

Prevedere fin dall'inizio cosa succede quando un pagamento, una fattura o un report non vanno a buon fine.

## Casi supporto principali

| Caso | Stato | Azione operatore |
|---|---|---|
| Cliente paga ma webhook tarda | `payment_processing` | attendere/retry webhook/provider dashboard |
| Cliente torna da checkout success ma non risulta pagato | `checkout_pending` | mostra messaggio prudente e refresh stato |
| Pagamento riuscito ma provider dati fallisce | `provider_failed` | retry o rimborso/credito |
| Dati fiscali incompleti | `billing_data_missing` | richiedere completamento |
| Fattura scartata | `invoice_rejected` | correzione dati e reinvio |
| Richiesta rimborso prima provider run | `refund_requested` | approvare se policy rispettata |
| Contestazione carta | `disputed` | raccogli evidenze e blocca automatismi |

## Dashboard admin M4-P

Servono almeno tre code operative:

1. **Pagamenti da verificare**: webhook falliti, sessioni pendenti, mismatch importo.
2. **Report da recuperare**: provider failed, retry massimo superato, report manuale.
3. **Fatture e rimborsi**: dati mancanti, scarti, richieste rimborso, dispute.

## Email transazionali minime

- checkout creato / pagamento non completato;
- pagamento ricevuto, report in lavorazione;
- report pronto;
- dati fiscali da completare;
- rimborso ricevuto/in revisione;
- errore tecnico con presa in carico.

## Metriche operative

- ordini pagati non completati entro SLA;
- webhook falliti per provider;
- fatture in stato rejected;
- rimborsi per causa;
- provider failure rate;
- tempo medio pagamento → report;
- tasso abbandono checkout.
