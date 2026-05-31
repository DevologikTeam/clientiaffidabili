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
