# Customer Dashboard — Report Access & Download Analysis

## Accesso report

Il report deve essere accessibile da:

- card `Report pronti` in panoramica;
- lista `Report`;
- dettaglio verifica;
- email transazionale futura;
- storico ordini.

## Requisiti di accesso

1. Utente autenticato.
2. Appartenenza allo stesso account/tenant dell'ordine.
3. Report status `published`.
4. Nessun blocco legale/compliance attivo.
5. Audit log su apertura report e download.

## Stati report nel cliente

| Stato report | Testo cliente | Azione |
|---|---|---|
| draft | Report in preparazione | Nessuna azione richiesta |
| review_required | Report in controllo qualità | Attendi pubblicazione |
| published | Report pronto | Apri report |
| archived | Report archiviato | Richiedi assistenza |
| revoked | Report non disponibile | Contatta supporto |

## Download PDF futuro

Il download PDF deve essere generato da snapshot immutabile, non da dati live.

Requisiti:

- hash snapshot;
- watermark o intestazione con data generazione;
- disclaimer limiti;
- fonti e timestamp;
- audit download;
- rate limit;
- link firmato temporaneo se inviato via email.

## Storico report

Campi consigliati:

- soggetto;
- servizio;
- livello attenzione;
- data report;
- data richiesta;
- stato;
- fonte principale;
- azione.

## Ricerca

Ricerca MVP:

- ragione sociale;
- P.IVA/codice fiscale quando presente e permesso;
- ID ordine;
- servizio;
- stato.

## Guardrail copy report

La dashboard può mostrare uno short summary, ma deve evitare:

- `cliente sicuro`;
- `azienda affidabile al 100%`;
- `pagherà`;
- `rischio zero`;
- `approvato` come decisione definitiva.

Copy ammesso:

- `attenzione bassa/media/alta`;
- `dati insufficienti`;
- `verifica completata con fonti disponibili alla data indicata`;
- `valuta insieme a contratto, anticipo, storico rapporti e contesto commerciale`.
