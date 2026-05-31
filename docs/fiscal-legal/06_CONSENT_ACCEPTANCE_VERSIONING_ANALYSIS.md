# 06 — Consent, Acceptance and Versioning Analysis

## Obiettivo

Rendere dimostrabile quali condizioni il cliente ha accettato, quando e per quale operazione.

## Accettazioni obbligatorie

### Al checkout

- Termini e condizioni;
- Privacy policy;
- Refund policy;
- dichiarazione uso lecito;
- presa visione limiti report;
- consenso marketing opzionale e separato.

### Alla registrazione

- Termini piattaforma;
- Privacy policy;
- Cookie preferences se applicabile.

### All'uso API futuro

- API terms;
- rate limit/abuse policy;
- responsabilita dati;
- divieto di uso non autorizzato.

## Entita concettuale

`LegalAcceptance`

Campi:

- `id`
- `customerId`
- `userId`
- `orderId`
- `documentCode`
- `documentVersion`
- `documentHash`
- `acceptedAt`
- `acceptanceContext`: `registration`, `checkout`, `billing_portal`, `api_access`, `report_download`
- `ipHash`
- `userAgentHash`
- `locale`
- `required`
- `revokedAt`

## Versioning documenti

`LegalDocumentVersion`

Campi:

- `documentCode`
- `version`
- `title`
- `status`
- `publishedAt`
- `effectiveFrom`
- `contentHash`
- `reviewedBy`
- `reviewedAt`
- `changeSummary`

## Regole

- Le accettazioni non devono essere sovrascritte.
- Nuova versione documento richiede nuova accettazione solo se modifica materiale.
- Marketing consent deve essere separato e revocabile.
- Uso lecito deve essere confermato per ogni acquisto/report sensibile.
- Report download puo registrare presa visione disclaimer.

## Privacy UX

- checkbox non preselezionate per consensi non necessari;
- testo breve accanto alla checkbox;
- link al documento completo;
- versione documento visibile o almeno registrata;
- marketing separato da termini obbligatori.

## Admin/legal operations

- lista versioni documenti;
- chi ha pubblicato cosa;
- export accettazioni per ordine;
- audit su modifiche documenti;
- blocco checkout se documento obbligatorio non published.
