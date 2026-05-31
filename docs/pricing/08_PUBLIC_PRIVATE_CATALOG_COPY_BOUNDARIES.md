# Public/private catalog copy boundaries

## Obiettivo

Evitare che informazioni interne di marginalità, provider, costi, limiti contrattuali o note di rischio finiscano nel frontend pubblico.

## Copy pubblico consentito

Il frontend può mostrare:

- nome servizio;
- prezzo netto/lordo secondo scelta checkout;
- tempi stimati;
- dati richiesti;
- cosa riceve il cliente;
- cosa non garantisce il servizio;
- finalità consentite;
- FAQ e limiti operativi;
- CTA checkout.

## Copy pubblico vietato

Non mostrare:

- nome endpoint provider se crea confronto al centesimo;
- costo provider;
- margine;
- “fonte segreta” o linguaggio opaco;
- “garantito”, “sicuro”, “pagherà”, “assenza rischio”;
- “indagine”, “spiare”, “controllare persona”;
- note interne tipo “high-risk”, “tenant scoped”, “audit interno”.

## Copy admin consentito

Admin può vedere:

- provider endpoint map;
- costo stimato/effective;
- margine target/effective;
- stato rischio;
- motivi blocco pubblicazione;
- audit modifiche;
- note compliance interne;
- stato integrazione provider.

## Esempi di trasformazione copy

| Interno | Pubblico |
|---|---|
| `Credit Scoring Advanced + Negatività + Company Full` | Check Affidabilità Pro |
| `margine alto su endpoint low-cost` | Report sintetico con dati essenziali e prossima azione |
| `high risk AML` | Richiede finalità professionale e uso proporzionato |
| `provider timeout` | Alcuni dati potrebbero richiedere più tempo; ti aggiorniamo sullo stato |
| `partial failure` | Report parziale disponibile con indicazione dei dati non ricevuti |

## Regola per report

Ogni report deve includere:

- data e ora richiesta;
- dati inseriti dal cliente;
- fonti/categorie informative ove possibile;
- esito sintetico;
- limiti e avvertenze;
- prossima azione consigliata;
- riferimento ordine/fattura.

## Decisione

Nel prossimo sprint M3-P, ogni campo catalogo deve essere classificato come:

- `public`
- `checkoutOnly`
- `reportOnly`
- `adminOnly`
- `superAdminOnly`
