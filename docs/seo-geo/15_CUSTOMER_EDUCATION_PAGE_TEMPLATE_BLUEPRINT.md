# Customer Education Page Template Blueprint

## Obiettivo template

Ogni pagina educativa deve essere leggibile da tre pubblici:

- imprenditore o amministrativo che cerca una risposta rapida;
- responsabile commerciale/credito che deve decidere;
- motore di ricerca o AI answer engine che deve estrarre una risposta chiara.

## Struttura pagina obbligatoria

### 1. Hero educativo

Campi:

- `h1` orientato al problema;
- sottotitolo di 2 righe massimo;
- risposta breve in evidenza;
- CTA primaria;
- CTA secondaria verso guida/garanzia.

Regola: il primo blocco deve rispondere subito alla domanda dell'utente, senza introdurre il prodotto troppo presto.

### 2. Risposta breve GEO

Blocco da 70-120 parole pensato per rispondere in modo autonomo.

Deve includere:

- definizione o consiglio pratico;
- cosa controllare;
- limite del controllo;
- prossima azione.

### 3. Contesto operativo

Spiega quando il problema si presenta.

Esempi:

- nuovo cliente B2B;
- pagamento dilazionato;
- ordine importante a un fornitore;
- onboarding partner;
- verifica anagrafica prima della fattura.

### 4. Cosa controllare

Lista ragionata, non tecnica, con massimo 5-7 controlli.

Ogni controllo deve avere:

- nome comprensibile;
- perche' conta;
- cosa non dimostra;
- quale servizio ClientiAffidabili.it puo' aiutare.

### 5. Tabella confronto

Utile per pagine comparison.

Colonne suggerite:

- strumento;
- cosa mostra;
- cosa non mostra;
- quando usarlo;
- servizio consigliato.

### 6. Garanzia operativa

Blocco obbligatorio.

Deve spiegare:

- prezzo visibile prima dell'acquisto;
- fonti e data indicate nel report;
- limiti del report;
- supporto in caso di problema;
- rimborso secondo policy e stato lavorazione.

### 7. Limiti e responsabilita'

Blocco prudente.

Formula consigliata:

> Il report non sostituisce una valutazione legale, finanziaria o assicurativa. Aiuta a leggere dati e segnali disponibili al momento della richiesta, indicando fonti, data e limiti.

### 8. CTA contestuale

La CTA non deve essere sempre uguale. Deve seguire l'intento:

- problem-aware: "Scopri quale controllo fare";
- solution-aware: "Confronta i report disponibili";
- purchase-aware: "Avvia la verifica";
- trust-aware: "Leggi garanzie e limiti".

### 9. FAQ

Minimo 4, massimo 8.

Ogni FAQ deve rispondere a dubbi reali:

- tempi;
- costi;
- fonti;
- affidabilita';
- rimborsi;
- uso lecito;
- differenze tra servizi.

### 10. Related pages

Massimo 4 link interni, scelti per intento e non per volume.

## Campi CMS necessari

- `title`
- `slug`
- `excerpt`
- `seoTitle`
- `seoDescription`
- `primaryKeyword`
- `secondaryKeywords`
- `searchIntent`
- `geoAnswerFocus`
- `audience`
- `contentJson`
- `contentHtml`
- `faqItems`
- `recommendedServiceSlug`
- `relatedPageSlugs`
- `schemaType`
- `reviewStatus`
- `lastReviewedAt`
- `publishedAt`

## Stato editoriale

- `draft`: contenuto in lavorazione;
- `review`: pronto per review SEO/compliance;
- `published`: pubblicabile e incluso in sitemap;
- `archived`: non visibile e non indicizzabile.

## Component binding

Il blocco risposta breve viene renderizzato dal componente pubblico `GeoAnswerBox`, in modo da mantenere struttura uniforme, leggibilita' mobile e output adatto a snippet/AI answer.
