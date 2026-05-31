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
