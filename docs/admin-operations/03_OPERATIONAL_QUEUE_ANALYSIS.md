# Operational queue analysis

## Queue principali

| Queue | Scopo | Owner primario | Rischio |
|---|---|---|---|
| `payment_pending` | pagamento iniziato ma non confermato | billing | medio |
| `paid_not_requested` | ordine pagato ma provider non ancora avviato | operations | alto |
| `provider_failed` | richiesta provider fallita | operations/compliance | alto |
| `provider_manual_review` | payload o servizio richiede verifica | compliance | alto |
| `report_ready_for_review` | report generato da approvare | analyst/compliance | medio |
| `report_blocked` | report non pubblicabile | compliance | alto |
| `invoice_pending` | fattura da emettere o verificare | finance | medio |
| `refund_requested` | cliente o operatore richiede rimborso | finance/super admin | alto |
| `support_open` | ticket cliente aperto | support | medio |
| `incident_anomaly` | evento anomalo o sicurezza | super admin | critico |

## Priorità

### P0 critico

- Doppio addebito sospetto.
- Provider chiamato senza pagamento confermato.
- Report pubblicato a cliente non autorizzato.
- Raw payload esposto per errore.
- Dispute pagamento.

### P1 alto

- Ordine pagato ma report non avanza.
- Provider failed su ordine pagato.
- Rimborso richiesto.
- Report bloccato da compliance.

### P2 medio

- Fattura pending.
- Ticket cliente aperto.
- Report in review oltre soglia.

### P3 basso

- Notifiche informative.
- Follow-up operativo non bloccante.

## Regola di visibilità

La queue non deve esporre dati sensibili non necessari. In lista bastano:

- codice ordine;
- servizio;
- stato operativo;
- urgenza;
- importo;
- owner;
- prossima azione.

Il dettaglio mostra dati estesi solo a ruoli autorizzati.
