# 07 — Admin Fiscal and Legal Operations Analysis

## Obiettivo

Definire le code operative interne per fiscalita e legal, integrate con Admin Operations.

## Code operative

### Fiscal documents queue

Include:

- fatture da emettere;
- fatture fallite;
- profili fiscali incompleti;
- clienti esteri/PA;
- documenti da esportare;
- documenti da riconciliare con pagamento.

### Refund fiscal review queue

Include:

- rimborso richiesto con fattura emessa;
- rimborso parziale;
- disputa aperta;
- credito consumato parzialmente;
- richiesta eccezionale dopo report pubblicato.

### Legal documents queue

Include:

- bozze da revisionare;
- documenti approvati ma non pubblicati;
- documenti scaduti;
- nuove versioni da accettare;
- policy mancanti nel checkout.

### Privacy requests queue

Futuro:

- accesso dati;
- rettifica;
- cancellazione dove applicabile;
- opposizione;
- portabilita;
- data breach/incident request.

## Priorita

| Priorita | Esempio |
|---|---|
| P0 | documento fiscale duplicato, refund senza nota credito, policy checkout mancante |
| P1 | fattura fallita, profilo fiscale estero, legal doc in scadenza |
| P2 | export commercialista, aggiornamento copy policy |
| P3 | miglioramento UX o template |

## Azioni admin

Azioni sicure:

- apri dettaglio;
- assegna owner;
- aggiungi nota interna;
- esporta dati fiscali.

Azioni con reason obbligatoria:

- marca documento come emesso;
- retry emissione;
- approva nota credito;
- sblocca rimborso;
- pubblica documento legale;
- forza richiesta nuova accettazione;
- modifica stato profilo fiscale.

Azioni vietate senza super admin:

- cancellare documento fiscale;
- modificare snapshot fiscale;
- cancellare accettazione legale;
- cancellare audit.

## Audit event

- `fiscal_document_queued`
- `fiscal_document_issued`
- `fiscal_document_failed`
- `credit_note_required`
- `refund_fiscal_review_required`
- `legal_document_published`
- `legal_acceptance_recorded`
- `tax_profile_locked`
- `tax_profile_review_required`

## Integrazione Admin Operations

Ogni elemento critico fiscale/legal deve poter diventare `AdminWorkItem` con:

- categoria `fiscal` o `legal`;
- priorita;
- owner;
- impatto cliente;
- prossima azione;
- reason modal;
- audit timeline.
