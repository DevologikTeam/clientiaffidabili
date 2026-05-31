# Work queue and filters blueprint

## Obiettivo

Creare una queue unificata che aggreghi segnali da ordini, pagamenti, provider, report, fatture e supporto.

## Tipi item MVP

| Tipo | Label UI | Owner | Azione primaria |
|---|---|---|---|
| `payment_pending` | Pagamento in attesa | Billing | Verifica pagamento |
| `paid_not_requested` | Ordine pagato da avviare | Operations | Avvia richiesta provider |
| `provider_failed` | Fornitore dati non completato | Operations | Valuta retry sicuro |
| `provider_manual_review` | Richiede verifica compliance | Compliance | Revisiona richiesta |
| `report_ready_for_review` | Report da controllare | Analyst | Revisiona report |
| `report_blocked` | Report bloccato | Compliance | Risolvi blocco |
| `invoice_pending` | Fattura da completare | Billing | Prepara fattura |
| `refund_requested` | Rimborso richiesto | Super admin/Billing | Valuta rimborso |
| `support_open` | Ticket aperto | Support | Rispondi al ticket |
| `incident_anomaly` | Anomalia critica | Super admin | Apri incidente |

## Filtri principali

- Priorità: P0, P1, P2, P3.
- Area: ordini, billing, provider, report, supporto, sicurezza.
- Owner: non assegnato, mio team, mio utente.
- Stato: aperto, in lavorazione, in attesa, risolto, bloccato.
- SLA: scaduto, entro oggi, questa settimana.
- Servizio: verifica azienda, check pro, KYB, IBAN, contatti.

## Ordinamento default

1. P0 critici.
2. P1 con cliente bloccato.
3. Ordini pagati senza avanzamento.
4. SLA scaduti.
5. Report pronti per review.
6. Fatture/ticket.

## Empty state

Quando non ci sono item:

- titolo: `Nessun blocco operativo`;
- testo: `Non risultano ordini, pagamenti, provider o report che richiedono intervento.`;
- azione secondaria: `Consulta audit recente`.

## Stati visuali

- Rosso: P0 o violazione potenziale.
- Giallo: P1/P2 da lavorare.
- Blu: informativo o in attesa esterna.
- Verde: risolto.
- Grigio: non assegnato o non applicabile.

## Regola dati sensibili

La lista non mostra:

- raw payload provider;
- codice fiscale/persona fisica se non necessario;
- documenti allegati;
- dati pagamento completi;
- stack trace;
- token, idempotency key, secrets.

Mostra invece identificativi interni abbreviati e link al dettaglio autorizzato.
