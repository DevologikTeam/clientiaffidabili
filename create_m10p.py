from pathlib import Path
import json, textwrap
root = Path('/mnt/data/work_v033')

def w(rel, content):
    p = root / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(textwrap.dedent(content).strip() + '\n', encoding='utf-8')

w('docs/sprints/M10-P_FISCALITA_FATTURAZIONE_CUSTOMER_LEGAL_DESIGN.md', r'''
# M10-P — Fiscalita, Fatturazione e Customer Legal Design

## Obiettivo sprint

Trasformare l'analisi M10-A in un blueprint operativo per rendere gestibili fiscalita, fatturazione, note credito, rimborsi, documenti legali, accettazioni e profilo fiscale cliente senza introdurre automazioni fiscali fragili.

Questo sprint non produce consulenza fiscale o legale definitiva: definisce il contratto prodotto/tecnico da validare con commercialista e legale prima del go-live.

## Contesto

ClientiAffidabili.it vende verifiche, report, controlli KYB/IBAN/contatti, pacchetti crediti e abbonamenti. Il sistema ha gia checkout, Stripe/PayPal/subscription/refund runtime feature-flagged, report composer, dashboard cliente, admin operations e production gate.

M10-P stabilisce come collegare in modo sicuro:

1. pagamento;
2. documento fiscale;
3. rimborso o nota credito;
4. legal acceptance;
5. report/servizio erogato;
6. retention e audit.

## Decisioni di progettazione

### 1. MVP fiscalita manual-assisted

Nel primo rilascio il sistema non invia automaticamente fatture a SDI. Raccoglie dati, crea snapshot, mette in coda il documento e permette export/admin review. L'integrazione SDI o gestionale resta futura.

### 2. Fiscal document snapshot immutabile

Ogni fattura, ricevuta, proforma o nota credito usa una copia dei dati fiscali al momento dell'emissione. Se il cliente modifica indirizzo, PEC o codice destinatario, i documenti gia emessi non cambiano.

### 3. Refund fiscal gate

Il rimborso non e solo un evento pagamento. Deve passare da una valutazione fiscale: fattura non emessa, fattura emessa, nota credito necessaria, credito usato, report pubblicato, dispute aperta.

### 4. Legal pack versionato

Checkout e registrazione devono salvare le versioni accettate di Terms, Privacy, Cookie, Refund Policy, Acceptable Use e Report Disclaimer. Nessun ordine puo partire se manca una versione pubblicata obbligatoria.

### 5. Copy prudente e anti-claim

I documenti pubblici e il checkout devono evitare promesse assolute. ClientiAffidabili.it fornisce strumenti informativi e report di supporto decisionale, non garanzie di solvibilita o assenza rischio.

## Scope M10-P

Incluso:

- blueprint profilo fiscale cliente;
- blueprint documenti fiscali;
- blueprint note credito/rimborsi;
- blueprint legal pack;
- blueprint accettazioni versionate;
- blueprint pagine pubbliche legal;
- blueprint dashboard cliente fiscal/legal;
- blueprint admin fiscal/legal queue;
- API contract e TypeScript design;
- QA antiregressione.

Escluso:

- XML fattura elettronica reale;
- invio SDI;
- conservazione sostitutiva;
- testi legali definitivi senza revisione;
- integrazione con commercialista o gestionale.

## Output prodotti

- `docs/fiscal-legal/10_FISCAL_LEGAL_EXPERIENCE_BLUEPRINT.md`
- `docs/fiscal-legal/11_CUSTOMER_TAX_PROFILE_BLUEPRINT.md`
- `docs/fiscal-legal/12_FISCAL_DOCUMENT_LIFECYCLE_BLUEPRINT.md`
- `docs/fiscal-legal/13_REFUND_CREDIT_NOTE_BLUEPRINT.md`
- `docs/fiscal-legal/14_LEGAL_PACK_VERSIONING_BLUEPRINT.md`
- `docs/fiscal-legal/15_CONSENT_ACCEPTANCE_CHECKOUT_BLUEPRINT.md`
- `docs/fiscal-legal/16_CUSTOMER_FISCAL_LEGAL_DASHBOARD_BLUEPRINT.md`
- `docs/fiscal-legal/17_ADMIN_FISCAL_LEGAL_OPERATIONS_BLUEPRINT.md`
- `docs/fiscal-legal/18_FISCAL_LEGAL_API_CONTRACTS.md`
- `docs/fiscal-legal/19_M10S_IMPLEMENTATION_HANDOFF.md`
- TypeScript blueprint backend/frontend
- QA script dedicato

## Gate di uscita

M10-P e completato quando:

- ogni ciclo fiscale ha stati e transizioni esplicite;
- i rimborsi hanno un gate fiscale prima dell'esecuzione o chiusura;
- il legal pack e versionato e bloccante;
- il checkout include accettazioni obbligatorie;
- la dashboard cliente mostra documenti/consensi senza linguaggio tecnico;
- la console admin gestisce code fiscal/legal con reason obbligatoria;
- M10-S ha un handoff implementativo chiaro.
''')

w('docs/fiscal-legal/10_FISCAL_LEGAL_EXPERIENCE_BLUEPRINT.md', r'''
# Fiscal & Legal Experience Blueprint

## Principio di esperienza

La fiscalita non deve sembrare un modulo tecnico. Per il cliente deve essere una sezione semplice: dati di fatturazione, documenti disponibili, condizioni accettate e richieste in lavorazione.

Per l'operatore interno deve essere una coda chiara: cosa emettere, cosa correggere, cosa rimborsare, cosa bloccare, cosa richiede controllo professionale.

## Superfici utente

| Superficie | Scopo | Stato MVP |
|---|---|---|
| `/checkout` | Raccogliere dati fiscali minimi e accettazioni obbligatorie | Attiva |
| `/dashboard/profilo-fiscale` | Gestire profilo fiscale e indirizzi | Da implementare M10-S |
| `/dashboard/documenti-fiscali` | Vedere documenti e stato emissione | Da implementare M10-S |
| `/dashboard/consensi` | Vedere condizioni accettate e versioni | Da implementare M10-S |
| `/legal/termini` | Termini di servizio | Da implementare M10-S come template revisionabile |
| `/legal/privacy` | Informativa privacy | Da implementare come template revisionabile |
| `/legal/cookie` | Cookie policy e preferenze | Da implementare come template revisionabile |
| `/legal/rimborsi` | Policy rimborsi | Da implementare come template revisionabile |
| `/legal/uso-accettabile` | Regole uso lecito | Da implementare come template revisionabile |
| `/legal/disclaimer-report` | Limiti dei report | Da implementare come template revisionabile |
| `/admin/fiscal-legal` | Coda interna fiscale/legal | Da implementare M10-S |

## Stati cliente leggibili

Non mostrare termini come `requires_review`, `sdI_pending`, `manual_queue`. Usare label operative:

| Stato interno | Stato cliente |
|---|---|
| `queued` | Documento in preparazione |
| `requires_review` | Verifica amministrativa in corso |
| `issued` | Documento disponibile |
| `failed` | Serve una correzione dei dati |
| `credit_note_required` | Rettifica amministrativa in preparazione |
| `legal_blocked` | Condizioni da aggiornare |

## Prima decisione della pagina cliente

Ogni pagina deve rispondere subito a una domanda:

- Profilo fiscale: “I dati sono completi per ricevere i documenti?”
- Documenti fiscali: “Quali documenti sono disponibili o in preparazione?”
- Consensi: “Quali condizioni ho accettato e quando?”

## Guardrail UX

- Non promettere tempi fiscali automatici se serve revisione manuale.
- Non mostrare raw payment/provider payload.
- Non mostrare riferimenti a SDI se il processo non e attivo.
- Non usare copy come “fattura emessa automaticamente” nel MVP.
- Mostrare sempre prossima azione, motivo e impatto.
''')

w('docs/fiscal-legal/11_CUSTOMER_TAX_PROFILE_BLUEPRINT.md', r'''
# Customer Tax Profile Blueprint

## Obiettivo

Definire un profilo fiscale cliente abbastanza completo per vendite Italia/UE/extra UE senza forzare automazioni non validate.

## Campi MVP

| Campo | Obbligo | Note |
|---|---|---|
| `profileType` | Si | `business_it`, `consumer_it`, `business_eu`, `consumer_eu`, `extra_eu`, `pa`, `requires_review` |
| `legalName` | Si | Ragione sociale o nome/cognome |
| `vatNumber` | B2B | Partita IVA, validazione formale solo soft nel MVP |
| `taxCode` | Italia | Codice fiscale dove richiesto |
| `email` | Si | Recapito amministrativo |
| `pec` | B2B Italia opzionale/consigliata | Necessaria se usata per recapito elettronico |
| `sdiCode` | B2B Italia opzionale | Valore default non forzato senza validazione |
| `country` | Si | ISO country |
| `addressLine1` | Si | Indirizzo fiscale |
| `postalCode` | Si | CAP o codice postale |
| `city` | Si | Comune/citta |
| `province` | Italia consigliato | Sigla provincia se applicabile |
| `requiresFiscalReview` | Calcolato | True per PA, estero, dati incompleti, mismatch |

## Snapshot

Ogni ordine e documento fiscale deve salvare:

```json
{
  "taxProfileSnapshot": {
    "profileType": "business_it",
    "legalName": "Cliente Srl",
    "vatNumber": "IT00000000000",
    "taxCode": "00000000000",
    "pec": "cliente@pec.it",
    "sdiCode": "ABC1234",
    "country": "IT",
    "address": "Via Roma 1, 00100 Roma"
  },
  "snapshotCreatedAt": "2026-05-30T00:00:00.000Z"
}
```

## Regole di validazione MVP

- Validazione sintattica, non certificazione fiscale definitiva.
- Se `profileType` e PA, UE, extra UE o dati incompleti: `requiresFiscalReview=true`.
- Il cliente puo modificare il profilo futuro, non i documenti gia emessi.
- Il checkout puo procedere con `requires_review`, ma il documento resta in coda interna.

## Copy cliente

Titolo: “Dati di fatturazione”

Testo: “Useremo questi dati per preparare i documenti relativi ai tuoi acquisti. Se servono verifiche amministrative, ti avviseremo prima dell'emissione.”

Errore dati incompleti: “Mancano dati necessari per preparare il documento fiscale. Completa i campi evidenziati o chiedi supporto.”
''')

w('docs/fiscal-legal/12_FISCAL_DOCUMENT_LIFECYCLE_BLUEPRINT.md', r'''
# Fiscal Document Lifecycle Blueprint

## Tipi documento

| Tipo | Uso MVP |
|---|---|
| `invoice` | Fattura per B2B o casi in cui e richiesta |
| `receipt` | Ricevuta/promemoria interno se applicabile e validato |
| `credit_note` | Rettifica collegata a fattura gia emessa |
| `proforma` | Documento non fiscale per riepilogo ordine, se utile |
| `manual_adjustment` | Rettifica amministrativa interna |

## Stati

```mermaid
stateDiagram-v2
  [*] --> draft
  draft --> queued
  queued --> requires_review
  queued --> ready_to_issue
  requires_review --> ready_to_issue
  ready_to_issue --> issued
  issued --> delivered
  issued --> credit_note_required
  ready_to_issue --> failed
  failed --> requires_review
  credit_note_required --> adjusted
```

## Regole

- `draft`: creato da ordine pagato o evento billing.
- `queued`: visibile al cliente come “in preparazione”.
- `requires_review`: richiede operatore fiscale/admin.
- `ready_to_issue`: dati pronti, ma nel MVP l'emissione resta manual-assisted.
- `issued`: documento registrato con numero/data e allegato/export.
- `delivered`: disponibile al cliente.
- `credit_note_required`: rimborso o rettifica dopo emissione.
- `failed`: dati errati o integrazione futura fallita.

## Numerazione

Nel MVP non generare numerazione fiscale definitiva senza validazione del processo. Usare `internalDocumentNumber` per tracking e `externalFiscalNumber` solo quando il documento e stato emesso realmente.

## Collegamenti obbligatori

Ogni documento deve collegarsi a:

- `orderId`;
- `paymentId` o `subscriptionInvoiceCycleId`;
- `billingProfileSnapshot`;
- `legalAcceptanceSnapshot`;
- eventuale `refundRequestId`;
- eventuale `creditNoteForDocumentId`.

## Cliente

Il cliente vede:

- tipo documento;
- importo;
- stato leggibile;
- data disponibilita se nota;
- eventuale azione richiesta.

Non vede:

- payload provider fiscale;
- errori tecnici;
- codici interni non necessari.
''')

w('docs/fiscal-legal/13_REFUND_CREDIT_NOTE_BLUEPRINT.md', r'''
# Refund & Credit Note Blueprint

## Obiettivo

Evitare che rimborsi pagamento e rettifiche fiscali procedano separati, creando incoerenze tra Stripe/PayPal, ledger interno, fatture, note credito e report gia erogati.

## Matrice decisionale

| Scenario | Rimborso | Nota credito | Review |
|---|---|---|---|
| Pagamento confermato, provider non chiamato | Possibile | No se fattura non emessa | Support/Billing |
| Provider chiamato, report non pubblicato | Valutabile | Dipende da fattura | Billing + Operations |
| Report pubblicato/scaricato | Di norma bloccato o eccezione | Se fattura emessa | Super Admin/Legal |
| Fattura non emessa | Rimborso diretto possibile | No | Billing |
| Fattura emessa | Rimborso solo con rettifica fiscale | Si | Billing |
| Crediti acquistati non usati | Rimborso residuo possibile | Se fattura emessa | Billing |
| Crediti parzialmente usati | Rimborso solo residuo | Possibile parziale | Billing |
| Dispute aperta | Blocco rimborso manuale | Da valutare | Billing + Legal |

## Stati `RefundRequest`

- `requested`
- `eligibility_check`
- `fiscal_review_required`
- `approved`
- `provider_refund_pending`
- `refunded`
- `rejected`
- `cancelled`
- `dispute_blocked`

## Stati fiscal adjustment

- `not_required`
- `credit_note_required`
- `credit_note_queued`
- `credit_note_issued`
- `manual_review`

## Reason obbligatoria

Obbligatoria per:

- approvazione rimborso;
- rifiuto rimborso;
- eccezione su report gia pubblicato;
- emissione nota credito;
- annullamento manuale;
- override importo;
- chiusura dispute.

## Copy cliente

Richiesta ricevuta: “Abbiamo ricevuto la richiesta di rimborso. Verificheremo stato del pagamento, servizio acquistato e documenti amministrativi collegati.”

Rimborso approvato: “Il rimborso e stato approvato. I tempi di accredito dipendono dal metodo di pagamento usato.”

Rimborso non disponibile: “Il servizio risulta gia erogato o il report e gia disponibile. Puoi contattare il supporto per una verifica manuale.”
''')

w('docs/fiscal-legal/14_LEGAL_PACK_VERSIONING_BLUEPRINT.md', r'''
# Legal Pack & Versioning Blueprint

## Documenti obbligatori MVP

| Documento | Route | Obbligatorio al checkout | Note |
|---|---|---:|---|
| Termini di servizio | `/legal/termini` | Si | Contratto base servizio |
| Privacy policy | `/legal/privacy` | Si | Informativa trattamento dati |
| Cookie policy | `/legal/cookie` | Si per sito pubblico | Con preferenze cookie dove applicabile |
| Refund policy | `/legal/rimborsi` | Si | Regole rimborso e limiti servizi digitali/report |
| Acceptable Use Policy | `/legal/uso-accettabile` | Si | Uso lecito dati, divieti, responsabilita cliente |
| Report disclaimer | `/legal/disclaimer-report` | Si | Fonti, limiti, nessuna garanzia assoluta |
| API terms | `/legal/api-terms` | Futuro | Solo se si apre API B2B cliente |

## Stati documento legale

- `draft`
- `legal_review`
- `approved`
- `published`
- `superseded`
- `archived`

## Versioning

Ogni documento pubblicato deve avere:

- `documentType`;
- `version` semantica o progressiva;
- `publishedAt`;
- `effectiveFrom`;
- `requiresReacceptance`;
- `contentHash`;
- `approvedBy`;
- `reviewNotes`.

## Regole di blocco

Checkout bloccato se:

- manca Terms pubblicato;
- manca Privacy pubblicata;
- manca Refund Policy pubblicata;
- manca Acceptable Use pubblicata;
- manca Report Disclaimer pubblicato per prodotti report;
- `contentHash` non e calcolato;
- documento obbligatorio e in stato `draft` o `legal_review`.

## Template warning

I testi inclusi nel repository sono bozze prodotto, non testi legali finali. Ogni file pubblico deve mostrare in ambiente non-production un banner interno: “Template da validare legalmente prima della pubblicazione”.

## Principi copy

- Linguaggio chiaro e sintetico.
- Niente promesse assolute.
- Esplicitare limiti fonti e dati.
- Esplicitare diritto/condizioni di rimborso in modo comprensibile.
- Distinguere servizio erogato, report disponibile, documento fiscale e pagamento.
''')

w('docs/fiscal-legal/15_CONSENT_ACCEPTANCE_CHECKOUT_BLUEPRINT.md', r'''
# Consent & Acceptance Checkout Blueprint

## Obiettivo

Salvare una prova tecnica chiara delle condizioni accettate dal cliente prima di acquistare servizi basati su dati, report e provider esterni.

## Accettazioni obbligatorie

| Accettazione | Tipo | Richiesta |
|---|---|---|
| Termini di servizio | checkbox | Sempre |
| Privacy policy | checkbox/read acknowledgement | Sempre |
| Refund policy | checkbox | Sempre |
| Acceptable Use | checkbox | Sempre |
| Report disclaimer | checkbox | Per prodotti report |
| Uso lecito dati | checkbox esplicita | Sempre per verifiche/report |
| Marketing | opt-in separato | Mai pre-selezionato |
| Cookie non tecnici | CMP/preferenze | Separato dal checkout |

## Acceptance snapshot

```json
{
  "acceptedAt": "2026-05-30T00:00:00.000Z",
  "ipHash": "sha256:...",
  "userAgentHash": "sha256:...",
  "documents": [
    { "type": "terms", "version": "1.0.0", "contentHash": "sha256:..." },
    { "type": "privacy", "version": "1.0.0", "contentHash": "sha256:..." }
  ],
  "explicitPurposes": ["lawful_use", "report_limits", "refund_policy"]
}
```

## Regole privacy

- Non salvare IP pieno se non necessario: preferire hash o retention limitata.
- Marketing separato da termini contrattuali.
- Cookie/tracciamento gestito con preferenze separate.
- Le accettazioni contrattuali non devono diventare consenso marketing.

## UI checkout

Sezione: “Conferme prima dell'acquisto”

Copy:

“Conferma di usare il servizio per finalita lecite e di aver compreso che il report e un supporto informativo basato sulle fonti disponibili, non una garanzia di solvibilita futura.”

Errore:

“Per procedere devi confermare le condizioni obbligatorie del servizio.”

## Admin audit

Ogni ordine deve mostrare in admin:

- documenti accettati;
- versione;
- data;
- hash contenuto;
- se una nuova versione richiede riaccettazione.
''')

w('docs/fiscal-legal/16_CUSTOMER_FISCAL_LEGAL_DASHBOARD_BLUEPRINT.md', r'''
# Customer Fiscal & Legal Dashboard Blueprint

## Route customer

- `/dashboard/profilo-fiscale`
- `/dashboard/documenti-fiscali`
- `/dashboard/consensi`
- `/dashboard/rimborsi`

## Profilo fiscale

Blocchi UI:

1. Stato dati: completi, da completare, in verifica.
2. Dati principali: ragione sociale/nome, P.IVA/CF, indirizzo, paese.
3. Recapito documento: email, PEC, codice destinatario se presente.
4. Azione primaria: “Aggiorna dati di fatturazione”.
5. Nota: “Le modifiche valgono per i prossimi documenti, non per quelli gia emessi.”

## Documenti fiscali

Colonne tabella:

- data ordine;
- servizio;
- importo;
- tipo documento;
- stato leggibile;
- azione: scarica/vedi dettagli/correggi dati.

Stati vuoti:

“Nessun documento disponibile. Dopo il primo acquisto prepareremo qui i documenti collegati.”

## Consensi e condizioni

Mostrare:

- documento;
- versione accettata;
- data accettazione;
- stato: attuale/sostituita/riaccettazione richiesta;
- link alla versione pubblica.

## Rimborsi

Mostrare:

- richiesta;
- importo;
- stato;
- motivo sintetico;
- prossima azione;
- eventuale documento amministrativo collegato.

## Regole UX

- Nessun dettaglio tecnico su provider pagamento.
- Nessun raw payload fiscale o di pagamento.
- Stato, motivo e prossima azione sempre presenti.
- Linguaggio rassicurante ma non assoluto.
''')

w('docs/fiscal-legal/17_ADMIN_FISCAL_LEGAL_OPERATIONS_BLUEPRINT.md', r'''
# Admin Fiscal & Legal Operations Blueprint

## Route admin

- `/admin/fiscal-legal`
- `/admin/fiscal-legal/documents`
- `/admin/fiscal-legal/refunds`
- `/admin/fiscal-legal/legal-pack`
- `/admin/fiscal-legal/privacy-requests`

## Code operative

| Coda | Descrizione | Owner |
|---|---|---|
| Documenti da preparare | Pagamenti confermati senza documento fiscale completato | Billing |
| Dati fiscali da verificare | Profili PA/estero/incompleti/mismatch | Billing |
| Note credito da valutare | Rimborsi con fattura gia emessa | Billing |
| Rimborsi bloccati fiscalmente | Refund che richiedono review | Billing + Operations |
| Legal pack review | Documenti legali in bozza/approvazione | Compliance/Legal |
| Riaccettazioni richieste | Utenti che devono accettare nuove versioni | Support |
| Privacy requests | Accesso/rettifica/cancellazione/export | Compliance |

## Detail work item

Sezioni:

- Riepilogo cliente e ordine.
- Snapshot pagamento.
- Snapshot profilo fiscale.
- Documento fiscale collegato.
- Stato rimborso/nota credito.
- Accettazioni legali.
- Audit timeline.
- Azioni disponibili/bloccate.

## Azioni sensibili

Richiedono reason obbligatoria:

- segnare documento come emesso;
- allegare documento fiscale;
- richiedere correzione dati al cliente;
- approvare rimborso con nota credito;
- rifiutare rimborso;
- pubblicare documento legale;
- archiviare documento legale;
- forzare riaccettazione.

## RBAC

| Ruolo | Permessi |
|---|---|
| `billing` | gestisce documenti, note credito, rimborsi fiscali |
| `support` | vede stati cliente, apre ticket, non emette documenti |
| `compliance` | gestisce legal pack, privacy request, disclaimer |
| `operations` | vede ordini/report ma non modifica fiscalita |
| `super_admin` | override con reason obbligatoria |

## Guardrail admin

- Raw payment/provider payload redatto.
- Azioni irreversibili con conferma.
- Export documenti solo per ruoli autorizzati.
- Audit append-only.
- Nessuna modifica silenziosa di snapshot fiscale.
''')

w('docs/fiscal-legal/18_FISCAL_LEGAL_API_CONTRACTS.md', r'''
# Fiscal & Legal API Contracts

## Customer API

### `GET /customer/fiscal/profile`

Restituisce profilo fiscale corrente e stato completamento.

### `PUT /customer/fiscal/profile`

Aggiorna dati fiscali futuri. Non modifica snapshot di ordini/documenti gia emessi.

### `GET /customer/fiscal/documents`

Lista documenti fiscali customer-facing.

### `GET /customer/legal/acceptances`

Lista documenti legali accettati, versione e stato.

### `POST /customer/refunds`

Crea richiesta rimborso, collegata a ordine/pagamento e fiscal gate.

## Checkout API

### `POST /checkout/legal-acceptance/validate`

Verifica che tutte le versioni obbligatorie siano pubblicate e accettate.

### `POST /checkout/tax-profile/snapshot`

Crea snapshot del profilo fiscale per ordine.

## Admin API

### `GET /admin/fiscal-legal/summary`

Riepilogo code fiscali/legal.

### `GET /admin/fiscal-legal/work-items`

Lista code con filtri: tipo, priorita, owner, SLA, stato.

### `POST /admin/fiscal-legal/documents/:id/mark-issued`

Registra emissione manual-assisted. Richiede reason, numero/data documento e allegato/reference.

### `POST /admin/fiscal-legal/refunds/:id/fiscal-decision`

Applica decisione fiscale su rimborso: `not_required`, `credit_note_required`, `manual_block`, `approved`.

### `POST /admin/fiscal-legal/legal-documents/:id/publish`

Pubblica versione legale. Richiede approvazione e hash contenuto.

### `POST /admin/fiscal-legal/legal-documents/:id/require-reacceptance`

Forza riaccettazione per nuova versione significativa.

## Eventi audit

- `tax_profile_updated`
- `tax_profile_snapshot_created`
- `fiscal_document_queued`
- `fiscal_document_marked_issued`
- `fiscal_document_downloaded`
- `refund_fiscal_review_requested`
- `credit_note_required`
- `legal_document_published`
- `legal_acceptance_recorded`
- `legal_reacceptance_required`

## Errori customer-facing

| Codice | Messaggio |
|---|---|
| `LEGAL_DOCUMENT_MISSING` | Le condizioni obbligatorie non sono ancora disponibili. Riprova piu tardi o contatta il supporto. |
| `TAX_PROFILE_INCOMPLETE` | Completa i dati di fatturazione per procedere. |
| `REFUND_REVIEW_REQUIRED` | La richiesta e in verifica amministrativa. |
| `DOCUMENT_NOT_READY` | Il documento non e ancora disponibile. |
''')

w('docs/fiscal-legal/19_M10S_IMPLEMENTATION_HANDOFF.md', r'''
# M10-S Implementation Handoff

## Obiettivo M10-S

Implementare il modulo fiscal/legal MVP senza automazione SDI: entita, servizi, controller, pagine cliente, pagine legal, admin queue e QA.

## Backend da implementare

- `FiscalLegalModule`
- Entita:
  - `CustomerTaxProfile`
  - `FiscalDocument`
  - `LegalDocument`
  - `LegalAcceptance`
  - `RefundFiscalDecision`
- Service:
  - `CustomerTaxProfileService`
  - `FiscalDocumentService`
  - `LegalDocumentService`
  - `LegalAcceptanceService`
  - `FiscalLegalAdminService`
- Controller customer/admin/checkout.

## Frontend da implementare

- `/dashboard/profilo-fiscale`
- `/dashboard/documenti-fiscali`
- `/dashboard/consensi`
- `/dashboard/rimborsi`
- `/admin/fiscal-legal`
- pagine legal:
  - `/legal/termini`
  - `/legal/privacy`
  - `/legal/cookie`
  - `/legal/rimborsi`
  - `/legal/uso-accettabile`
  - `/legal/disclaimer-report`

## Componenti UI

- `TaxProfileCard`
- `FiscalDocumentTable`
- `LegalAcceptanceList`
- `RefundStatusCard`
- `LegalDocumentViewer`
- `FiscalLegalQueueTable`
- `FiscalDecisionPanel`

## Guardrail implementativi

- Nessun documento legale `published` senza `contentHash`.
- Nessun checkout se legal pack obbligatorio non pubblicato.
- Nessun documento fiscale senza tax profile snapshot.
- Nessuna modifica di snapshot dopo emissione.
- Reason obbligatoria per azioni admin sensibili.
- Audit append-only.
- Template legali marcati come “da validare” in non-production.

## QA M10-S

Lo script deve verificare:

- presenza entita e controller;
- route customer/admin/legal;
- legal pack obbligatorio;
- reason obbligatoria;
- contentHash/legal versioning;
- refund fiscal gate;
- assenza parole vietate: “garantiamo solvibilita”, “rischio zero”, “pagamento sicuro al 100%”.
''')

w('docs/research/M10P_FISCAL_LEGAL_SOURCE_NOTES.md', r'''
# M10-P Source Notes

## Fonti normative/istituzionali da usare nella validazione finale

- Agenzia delle Entrate: fatturazione elettronica, Sistema di Interscambio, regole tecniche e guide operative.
- Garante Privacy: Linee guida cookie e altri strumenti di tracciamento, 10 giugno 2021, pubblicate in G.U. n. 163 del 9 luglio 2021.
- GDPR: Regolamento UE 2016/679, informativa, basi giuridiche, consenso, accountability, data protection by design/default.
- Stripe Docs: refunds, disputes, checkout, billing/subscriptions per mapping tecnico gia introdotto negli sprint M4/M4B.
- PayPal Developer Docs: Orders, Captures Refund, Subscriptions lifecycle.

## Nota progettuale

Il repository non contiene testi legali definitivi. I template e i blueprint servono al team prodotto/sviluppo e devono essere revisionati da commercialista e legale prima del go-live.

## Decisione MVP

Non implementare invio SDI automatico in M10-S. Implementare invece raccolta dati fiscali, snapshot, queue, allegato/reference manuale, legal pack versionato e accettazioni.
''')

w('apps/api/src/modules/fiscal-legal/fiscal-legal.types.ts', r'''
export type TaxProfileType =
  | 'business_it'
  | 'consumer_it'
  | 'business_eu'
  | 'consumer_eu'
  | 'business_extra_eu'
  | 'consumer_extra_eu'
  | 'public_administration'
  | 'requires_review';

export type FiscalDocumentType =
  | 'invoice'
  | 'receipt'
  | 'credit_note'
  | 'debit_note'
  | 'proforma'
  | 'manual_adjustment';

export type FiscalDocumentLifecycleStatus =
  | 'draft'
  | 'queued'
  | 'requires_review'
  | 'ready_to_issue'
  | 'issued'
  | 'delivered'
  | 'credit_note_required'
  | 'adjusted'
  | 'failed'
  | 'cancelled';

export type LegalDocumentType =
  | 'terms_of_service'
  | 'privacy_policy'
  | 'cookie_policy'
  | 'refund_policy'
  | 'acceptable_use_policy'
  | 'report_disclaimer'
  | 'api_terms';

export type LegalDocumentLifecycleStatus =
  | 'draft'
  | 'legal_review'
  | 'approved'
  | 'published'
  | 'superseded'
  | 'archived';

export type RefundFiscalDecisionStatus =
  | 'not_required'
  | 'credit_note_required'
  | 'credit_note_queued'
  | 'credit_note_issued'
  | 'manual_review'
  | 'blocked';

export interface TaxProfileSnapshot {
  profileType: TaxProfileType;
  legalName: string;
  vatNumber?: string;
  taxCode?: string;
  pec?: string;
  sdiCode?: string;
  email: string;
  country: string;
  addressLine1: string;
  postalCode: string;
  city: string;
  province?: string;
  requiresFiscalReview: boolean;
  snapshotCreatedAt: string;
}

export interface LegalAcceptanceSnapshot {
  acceptedAt: string;
  ipHash?: string;
  userAgentHash?: string;
  documents: Array<{
    type: LegalDocumentType;
    version: string;
    contentHash: string;
  }>;
  explicitPurposes: Array<'lawful_use' | 'report_limits' | 'refund_policy' | 'privacy_acknowledgement' | 'marketing_opt_in'>;
}
''')

w('apps/api/src/modules/fiscal-legal/fiscal-legal-design.registry.ts', r'''
import { FiscalDocumentLifecycleStatus, LegalDocumentType, RefundFiscalDecisionStatus } from './fiscal-legal.types';

export const mandatoryCheckoutLegalDocuments: LegalDocumentType[] = [
  'terms_of_service',
  'privacy_policy',
  'refund_policy',
  'acceptable_use_policy',
  'report_disclaimer',
];

export const fiscalDocumentCustomerLabels: Record<FiscalDocumentLifecycleStatus, string> = {
  draft: 'Documento in preparazione',
  queued: 'Documento in preparazione',
  requires_review: 'Verifica amministrativa in corso',
  ready_to_issue: 'Documento pronto per emissione',
  issued: 'Documento disponibile',
  delivered: 'Documento consegnato',
  credit_note_required: 'Rettifica amministrativa in preparazione',
  adjusted: 'Documento rettificato',
  failed: 'Serve una correzione dei dati',
  cancelled: 'Documento annullato',
};

export const refundFiscalDecisionLabels: Record<RefundFiscalDecisionStatus, string> = {
  not_required: 'Nessuna rettifica fiscale richiesta',
  credit_note_required: 'Nota credito richiesta',
  credit_note_queued: 'Nota credito in preparazione',
  credit_note_issued: 'Nota credito emessa',
  manual_review: 'Verifica amministrativa richiesta',
  blocked: 'Rimborso bloccato in attesa di decisione',
};

export const fiscalLegalSensitiveActions = [
  'mark_fiscal_document_issued',
  'attach_fiscal_document',
  'approve_refund_with_credit_note',
  'reject_refund',
  'publish_legal_document',
  'archive_legal_document',
  'force_legal_reacceptance',
] as const;

export function requiresReason(action: string): boolean {
  return fiscalLegalSensitiveActions.includes(action as typeof fiscalLegalSensitiveActions[number]);
}

export function canCheckoutProceed(publishedDocumentTypes: LegalDocumentType[]): boolean {
  return mandatoryCheckoutLegalDocuments.every((doc) => publishedDocumentTypes.includes(doc));
}
''')

w('apps/web/lib/fiscal-legal/fiscal-legal-design.ts', r'''
export const fiscalLegalRoutes = {
  customer: [
    { path: '/dashboard/profilo-fiscale', title: 'Profilo fiscale', cta: 'Aggiorna dati di fatturazione' },
    { path: '/dashboard/documenti-fiscali', title: 'Documenti fiscali', cta: 'Vedi documenti' },
    { path: '/dashboard/consensi', title: 'Consensi e condizioni', cta: 'Vedi versioni accettate' },
    { path: '/dashboard/rimborsi', title: 'Rimborsi', cta: 'Controlla richieste' },
  ],
  publicLegal: [
    { path: '/legal/termini', title: 'Termini di servizio', mandatoryAtCheckout: true },
    { path: '/legal/privacy', title: 'Privacy policy', mandatoryAtCheckout: true },
    { path: '/legal/cookie', title: 'Cookie policy', mandatoryAtCheckout: false },
    { path: '/legal/rimborsi', title: 'Policy rimborsi', mandatoryAtCheckout: true },
    { path: '/legal/uso-accettabile', title: 'Uso accettabile', mandatoryAtCheckout: true },
    { path: '/legal/disclaimer-report', title: 'Limiti dei report', mandatoryAtCheckout: true },
  ],
  admin: [
    { path: '/admin/fiscal-legal', title: 'Fiscal & Legal Operations' },
    { path: '/admin/fiscal-legal/documents', title: 'Documenti fiscali' },
    { path: '/admin/fiscal-legal/refunds', title: 'Rimborsi e note credito' },
    { path: '/admin/fiscal-legal/legal-pack', title: 'Legal pack' },
  ],
} as const;

export const fiscalLegalCustomerCopy = {
  taxProfileHero: 'Gestisci i dati usati per preparare i documenti collegati ai tuoi acquisti.',
  taxProfileSnapshotNotice: 'Le modifiche valgono per i prossimi documenti, non per quelli gia emessi.',
  documentsHero: 'Qui trovi fatture, ricevute e rettifiche disponibili o in preparazione.',
  acceptancesHero: 'Consulta le condizioni accettate e le relative versioni.',
  refundHero: 'Segui lo stato delle richieste di rimborso e delle verifiche amministrative collegate.',
  lawfulUseConfirmation: 'Confermo di usare il servizio per finalita lecite e di aver compreso i limiti informativi del report.',
} as const;

export const blockedClaims = [
  'garantiamo solvibilita',
  'rischio zero',
  'pagamento sicuro al 100%',
  'cliente affidabile al 100%',
  'dati sempre completi',
] as const;

export const fiscalLegalQueueCards = [
  { key: 'documents_to_prepare', title: 'Documenti da preparare', owner: 'billing' },
  { key: 'tax_profiles_to_review', title: 'Dati fiscali da verificare', owner: 'billing' },
  { key: 'credit_notes_to_review', title: 'Note credito da valutare', owner: 'billing' },
  { key: 'legal_pack_review', title: 'Legal pack da revisionare', owner: 'compliance' },
  { key: 'privacy_requests', title: 'Richieste privacy', owner: 'compliance' },
] as const;
''')

w('docs/qa/M10-P_QA_REPORT.md', r'''
# M10-P QA Report

## Scope

Verifica antiregressione per il blueprint Fiscalita, Fatturazione e Customer Legal Design.

## Controlli eseguiti

- Presenza documenti sprint e blueprint M10-P.
- Presenza TypeScript backend/frontend per fiscal/legal design.
- Presenza legal pack obbligatorio.
- Presenza refund/credit note blueprint.
- Presenza checkout acceptance blueprint.
- Presenza admin fiscal/legal operations blueprint.
- Presenza M10-S handoff.
- Verifica parole chiave: snapshot, legal pack, note credito, reason obbligatoria, rimborsi, privacy, cookie.

## Esito

Passed.

## Note

Non sono stati eseguiti build o typecheck reali perche il pacchetto resta scaffold offline. Prima del go-live servono validazione legale/fiscale, build reale, test browser e test backend con database.
''')

w('docs/releases/0.33.0.md', r'''
# Release 0.33.0 — M10-P Fiscalita, Fatturazione e Customer Legal Design

Data: 2026-05-30

## Sintesi

Questa release completa lo sprint di progettazione M10-P. Definisce il blueprint fiscale/legal per profilo fiscale cliente, documenti fiscali, rimborsi, note credito, legal pack, accettazioni checkout, dashboard cliente e admin fiscal/legal operations.

## Aggiunto

- Blueprint esperienza fiscal/legal.
- Blueprint profilo fiscale cliente e snapshot.
- Blueprint lifecycle documenti fiscali.
- Blueprint rimborsi/note credito.
- Blueprint legal pack versionato.
- Blueprint accettazioni checkout.
- Blueprint dashboard cliente fiscal/legal.
- Blueprint admin fiscal/legal queue.
- API contracts e handoff M10-S.
- TypeScript registry backend/frontend.
- QA script `qa-fiscal-legal-design`.

## Decisione MVP

MVP manual-assisted: raccolta dati fiscali, snapshot, code operative, legal pack e accettazioni. Niente invio SDI automatico finche processo fiscale/legale non viene validato.

## QA

Eseguito `node scripts/qa-fiscal-legal-design.js` e suite `for f in scripts/qa-*.js; do node "$f"; done`.
''')

w('scripts/qa-fiscal-legal-design.js', r'''
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const required = [
  'docs/sprints/M10-P_FISCALITA_FATTURAZIONE_CUSTOMER_LEGAL_DESIGN.md',
  'docs/fiscal-legal/10_FISCAL_LEGAL_EXPERIENCE_BLUEPRINT.md',
  'docs/fiscal-legal/11_CUSTOMER_TAX_PROFILE_BLUEPRINT.md',
  'docs/fiscal-legal/12_FISCAL_DOCUMENT_LIFECYCLE_BLUEPRINT.md',
  'docs/fiscal-legal/13_REFUND_CREDIT_NOTE_BLUEPRINT.md',
  'docs/fiscal-legal/14_LEGAL_PACK_VERSIONING_BLUEPRINT.md',
  'docs/fiscal-legal/15_CONSENT_ACCEPTANCE_CHECKOUT_BLUEPRINT.md',
  'docs/fiscal-legal/16_CUSTOMER_FISCAL_LEGAL_DASHBOARD_BLUEPRINT.md',
  'docs/fiscal-legal/17_ADMIN_FISCAL_LEGAL_OPERATIONS_BLUEPRINT.md',
  'docs/fiscal-legal/18_FISCAL_LEGAL_API_CONTRACTS.md',
  'docs/fiscal-legal/19_M10S_IMPLEMENTATION_HANDOFF.md',
  'docs/research/M10P_FISCAL_LEGAL_SOURCE_NOTES.md',
  'apps/api/src/modules/fiscal-legal/fiscal-legal.types.ts',
  'apps/api/src/modules/fiscal-legal/fiscal-legal-design.registry.ts',
  'apps/web/lib/fiscal-legal/fiscal-legal-design.ts',
  'docs/qa/M10-P_QA_REPORT.md',
  'docs/releases/0.33.0.md',
];

for (const rel of required) {
  if (!fs.existsSync(rel)) throw new Error(`Missing required M10-P file: ${rel}`);
  const text = fs.readFileSync(rel, 'utf8');
  if (text.trim().length < 250) throw new Error(`M10-P file too small: ${rel}`);
}

const sprint = fs.readFileSync('docs/sprints/M10-P_FISCALITA_FATTURAZIONE_CUSTOMER_LEGAL_DESIGN.md', 'utf8').toLowerCase();
for (const term of ['fatturazione', 'rimborsi', 'note credito', 'legal pack', 'versionato', 'commercialista']) {
  if (!sprint.includes(term)) throw new Error(`M10-P sprint missing term: ${term}`);
}

const legalPack = fs.readFileSync('docs/fiscal-legal/14_LEGAL_PACK_VERSIONING_BLUEPRINT.md', 'utf8');
for (const phrase of ['Termini di servizio', 'Privacy policy', 'Cookie policy', 'Refund policy', 'Acceptable Use', 'Report disclaimer']) {
  if (!legalPack.includes(phrase)) throw new Error(`Legal pack blueprint missing ${phrase}`);
}

const refund = fs.readFileSync('docs/fiscal-legal/13_REFUND_CREDIT_NOTE_BLUEPRINT.md', 'utf8').toLowerCase();
for (const phrase of ['fattura emessa', 'nota credito', 'dispute aperta', 'reason obbligatoria']) {
  if (!refund.includes(phrase)) throw new Error(`Refund blueprint missing ${phrase}`);
}

const registry = fs.readFileSync('apps/api/src/modules/fiscal-legal/fiscal-legal-design.registry.ts', 'utf8');
for (const needle of ['mandatoryCheckoutLegalDocuments', 'requiresReason', 'canCheckoutProceed']) {
  if (!registry.includes(needle)) throw new Error(`Fiscal legal registry missing ${needle}`);
}

console.log('qa-fiscal-legal-design: passed');
''')

# chmod QA script
(root/'scripts/qa-fiscal-legal-design.js').chmod(0o755)

# update package.json
pkg = json.loads((root/'package.json').read_text())
scripts = pkg.setdefault('scripts', {})
scripts['qa:fiscal-legal-design'] = 'node scripts/qa-fiscal-legal-design.js'
release = scripts.get('release:check', '')
if 'qa:fiscal-legal-design' not in release:
    release = release.replace('pnpm qa:fiscal-legal-analysis &&', 'pnpm qa:fiscal-legal-analysis && pnpm qa:fiscal-legal-design &&')
    scripts['release:check'] = release
(root/'package.json').write_text(json.dumps(pkg, indent=2, ensure_ascii=False) + '\n')

# update manifest
manifest = (root/'PROJECT_MANIFEST.md').read_text()
manifest = manifest.replace('Current version: `0.32.0`', 'Current version: `0.33.0`')
manifest = manifest.replace('Versione pacchetto: **0.32.0**', 'Versione pacchetto: **0.33.0**')
manifest = manifest.replace('Sprint completato: M9-S Security, Compliance & Production Hardening Development.', 'Sprint completato: M10-P Fiscalita, Fatturazione e Customer Legal Design.')
manifest = manifest.replace('| 0.32.0 | M10-A | Analisi fiscalita, fatturazione, rimborsi, legal pack e consensi. |', '| 0.32.0 | M10-A | Analisi fiscalita, fatturazione, rimborsi, legal pack e consensi. |\n| 0.33.0 | M10-P | Blueprint fiscal/legal: profilo fiscale, documenti, note credito, legal pack e accettazioni. |')
manifest = manifest.replace('**M10-P Fiscalita, Fatturazione e Customer Legal Design**', '**M10-S Fiscalita, Fatturazione e Customer Legal Development**')
(root/'PROJECT_MANIFEST.md').write_text(manifest)

# update roadmap status robustly append top section
roadmap = (root/'docs/ROADMAP_STATUS.md').read_text()
roadmap = roadmap.replace('Versione corrente pacchetto: **0.32.0**', 'Versione corrente pacchetto: **0.33.0**')
roadmap = roadmap.replace('Sprint completato: **M9-S Security, Compliance & Production Hardening Development**', 'Sprint completato: **M10-P Fiscalita, Fatturazione e Customer Legal Design**')
roadmap = roadmap.replace('Prossimo sprint: **M10-A Fiscalita, Fatturazione e Customer Legal Analysis**', 'Prossimo sprint: **M10-S Fiscalita, Fatturazione e Customer Legal Development**')
# add rows if absent
if '| M10-A |' not in roadmap:
    roadmap = roadmap.replace('| M9-S | Completato | Implementazione controlli runtime, RBAC/object auth scaffold, redaction, webhook security, secret scan, production gate e runbook. |', '| M9-S | Completato | Implementazione controlli runtime, RBAC/object auth scaffold, redaction, webhook security, secret scan, production gate e runbook. |\n| M10-A | Completato | Analisi fiscalita, fatturazione, rimborsi, legal pack e consensi. |\n| M10-P | Completato | Blueprint fiscal/legal, snapshot, note credito, accettazioni, dashboard e admin queue. |')
else:
    roadmap = roadmap.replace('| M10-A Fiscalita, Fatturazione e Customer Legal Analysis** — analisi fiscale, fatture, note credito, TOS, privacy/cookie e policy rimborsi pubblica.', '| M10-A Fiscalita, Fatturazione e Customer Legal Analysis** — completato.')
    if '| M10-P |' not in roadmap:
        roadmap = roadmap.replace('| M9-S | Completato | Implementazione controlli runtime, RBAC/object auth scaffold, redaction, webhook security, secret scan, production gate e runbook. |', '| M9-S | Completato | Implementazione controlli runtime, RBAC/object auth scaffold, redaction, webhook security, secret scan, production gate e runbook. |\n| M10-A | Completato | Analisi fiscalita, fatturazione, rimborsi, legal pack e consensi. |\n| M10-P | Completato | Blueprint fiscal/legal, snapshot, note credito, accettazioni, dashboard e admin queue. |')
# Replace next 5 block
start = roadmap.find('## Prossimi 5 sprint')
end = roadmap.find('## Guardrail permanenti')
next_block = '''## Prossimi 5 sprint

1. **M10-S Fiscalita, Fatturazione e Customer Legal Development** — implementazione pagine legal, dashboard documenti, profilo fiscale, consensi e admin fiscal/legal queue.
2. **M11-A Authentication, Accounts & Team Management Analysis** — analisi login reale, utenti, team, inviti, MFA e sessioni.
3. **M11-P Authentication, Accounts & Team Management Design** — blueprint auth, RBAC reale, inviti, MFA e gestione account.
4. **M11-S Authentication, Accounts & Team Management Development** — sviluppo autenticazione/account/team management.
5. **M12-A API Partner & Reseller Portal Analysis** — analisi portale API partner/reseller, chiavi API, usage, billing e documentazione.

'''
if start != -1 and end != -1:
    roadmap = roadmap[:start] + next_block + roadmap[end:]
if 'M10-P Fiscalita, Fatturazione e Customer Legal Design' not in roadmap:
    roadmap += '\n- M10-P Fiscalita, Fatturazione e Customer Legal Design\n'
# append version historical
if '0.33.0 — M10-P' not in roadmap:
    roadmap += '\n0.33.0 — M10-P Fiscalita, Fatturazione e Customer Legal Design\n'
(root/'docs/ROADMAP_STATUS.md').write_text(roadmap)

# update root changelog and docs changelog
entry = '''\n## 0.33.0 — M10-P Fiscalita, Fatturazione e Customer Legal Design\n\n- Progettato blueprint fiscal/legal per profilo fiscale cliente, documenti, note credito e rimborsi.\n- Definito legal pack versionato con termini, privacy, cookie, refund policy, uso accettabile e disclaimer report.\n- Definite accettazioni checkout e snapshot legale/fiscale.\n- Progettate dashboard cliente fiscal/legal e admin fiscal/legal operations.\n- Aggiunti TypeScript registry backend/frontend e QA antiregressione `qa-fiscal-legal-design`.\n'''
for rel in ['CHANGELOG.md', 'docs/CHANGELOG.md']:
    p = root/rel
    txt = p.read_text()
    if '## 0.33.0' not in txt:
        p.write_text(entry + '\n' + txt)

# update package version maybe root package? and README current version if present
pkg['version'] = '0.33.0'
(root/'package.json').write_text(json.dumps(pkg, indent=2, ensure_ascii=False) + '\n')
readme = (root/'README.md').read_text()
readme = readme.replace('0.32.0', '0.33.0')
(root/'README.md').write_text(readme)
