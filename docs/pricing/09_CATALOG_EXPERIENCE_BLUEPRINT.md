# Catalog experience blueprint

## Principio UX

Il catalogo pubblico non deve sembrare un marketplace tecnico di API. Deve sembrare un assistente operativo per PMI che devono decidere se fidarsi di clienti, fornitori, dati di pagamento e contatti.

## Architettura pagine

```text
/servizi
  scenario selector
  prodotti consigliati
  bundle evidenziati
  trust/compliance notice
  FAQ operative

/servizi/[slug]
  hero servizio
  cosa controlli
  dati richiesti
  output report
  tempi e prezzo
  limiti e responsabilità
  add-on consigliati
  checkout entry

/prezzi
  pacchetti one-shot
  tabella confrontabile
  add-on
  piani futuri non attivi
  note IVA/imposte
```

## Scenario selector

| Scenario | Messaggio | Prodotti mostrati |
|---|---|---|
| Nuovo cliente | “Riduci decisioni al buio prima di concedere credito o spedire merce.” | Essential, Pro, Pro + Bilancio |
| Nuovo fornitore | “Raccogli dati societari e segnali utili prima di inserire un partner.” | Pro, KYB |
| Dati di pagamento | “Controlla IBAN e contatti prima di aggiornare anagrafiche e pagamenti.” | IBAN, Contact Check |
| Partner sensibile | “Approfondisci assetti e segnali compliance con un controllo più prudente.” | KYB, Pro + Bilancio |

## Card prodotto pubblica

Ogni card deve contenere:

- nome comprensibile;
- scenario principale;
- prezzo netto “da” o fisso;
- tempo stimato;
- 3 bullet di valore;
- dati richiesti principali;
- CTA primaria;
- nota breve sui limiti.

Non deve contenere:

- nomi endpoint provider;
- costo Openapi/provider;
- margine;
- termini come payload, chiamata, tenant, adapter, raw response;
- promesse assolute di pagamento, solvibilità o assenza rischio.

## Sezione dettaglio servizio

### Blocco sopra la piega

1. badge categoria;
2. titolo;
3. sottotitolo decisionale;
4. prezzo netto + IVA separata;
5. tempo stimato;
6. CTA “Avvia questa verifica”;
7. secondaria “Guarda cosa ricevi”.

### Blocco “Cosa ricevi”

Usare una preview report con:

- sintesi decisionale;
- segnali disponibili;
- dati principali;
- fonti/limiti;
- prossima azione consigliata.

### Blocco “Prima di procedere”

Deve spiegare:

- quali dati servono;
- per quale finalità è lecito usare il servizio;
- cosa il servizio non garantisce;
- eventuali tempi non real-time.

## Pagina prezzi

La pagina prezzi deve evitare il confronto diretto con il costo API grezzo. Deve organizzare i pacchetti per valore:

1. **Essenziale** — primo controllo dati aziendali.
2. **Pro** — scelta consigliata per decisioni B2B.
3. **Pro + Bilancio** — per importi o rapporti più rilevanti.
4. **KYB Compliance** — controllo partner/assetti più prudente.
5. **Antifrode dati** — IBAN e contatti.

## Stati UI pubblici

| Stato | UI |
|---|---|
| Disponibile | prezzo, tempi, CTA checkout |
| In manutenzione | prezzo nascosto o invariato, CTA disabilitata, testo “temporaneamente non acquistabile” |
| Assistito | CTA “Richiedi valutazione” |
| Non disponibile nel paese | messaggio chiaro, nessuna promessa |
| Tempo variabile | mostra range e nota “in giorni lavorativi” |

## SEO/GEO

Ogni pagina servizio deve avere:

- title orientato al problema;
- meta description senza claim assoluti;
- FAQ coerenti con uso professionale;
- schema dati `Service` solo quando i dati sono verificati;
- contenuto leggibile anche da AI answer engines.
