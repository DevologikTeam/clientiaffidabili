# Customer Dashboard — Notifications, Tasks & Support Analysis

## Obiettivo

Le notifiche devono ridurre incertezza e ticket inutili. Devono essere poche, utili e collegate a uno stato reale.

## Tipologie notifiche MVP

| Tipo | Trigger | CTA |
|---|---|---|
| Report pronto | `REPORT_PUBLISHED` | Apri report |
| Pagamento fallito | `PAYMENT_FAILED` | Riprova pagamento |
| Verifica in ritardo | provider oltre soglia | Vedi stato |
| Dati mancanti | ordine o richiesta incompleta | Completa dati |
| Fattura disponibile | `INVOICE_ISSUED` | Scarica fattura |
| Supporto aggiornato | risposta operatore | Leggi risposta |

## Task cliente

I task non devono essere generici. Ogni task deve avere:

- titolo breve;
- motivo;
- impatto;
- una sola CTA;
- scadenza solo se reale.

Esempi:

- `Completa il pagamento per avviare la verifica`
- `Aggiungi la Partita IVA corretta`
- `Leggi il report pubblicato`
- `Scarica la fattura disponibile`

## Centro supporto

MVP:

- apri richiesta su ordine/report;
- categorizzazione semplice;
- descrizione del problema;
- allegato post-MVP;
- stato richiesta;
- risposta operatore post-MVP.

Categorie:

- problema pagamento;
- report non disponibile;
- dati azienda errati;
- richiesta fattura;
- uso del report;
- altro.

## Evitare notifiche rumorose

Non notificare:

- ogni retry provider;
- ogni evento webhook interno;
- ogni passaggio tecnico;
- stati che durano pochi secondi.

## Canali futuri

- email transazionale;
- in-app notifications;
- webhook cliente per account API;
- SMS/WhatsApp solo se giustificato e con consenso.

## Regola sicurezza

Le notifiche email non devono contenere dati sensibili del report. Devono invitare ad accedere all'area cliente autenticata.
