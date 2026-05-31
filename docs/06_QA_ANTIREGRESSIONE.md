# QA e test antiregressione

## Strategia QA

Ogni sprint deve consegnare codice con test e checklist. Non basta “funziona a mano”.

## Livelli di test

### Unit test

- calcolo prezzi, IVA, margini;
- normalizzazione provider;
- mapping stati provider -> stati interni;
- validazione input P.IVA, CF, IBAN, email, mobile;
- regole feature flag.

### Integration test

- creazione ordine;
- webhook checkout;
- callback provider;
- transizione stati ordine/check;
- persistenza report snapshot;
- audit log generato.

### E2E browser

Percorsi obbligatori:

1. visita landing;
2. selezione servizio;
3. compilazione wizard;
4. checkout simulato;
5. ordine pagato;
6. verifica in elaborazione;
7. report completato;
8. dashboard storico;
9. download/export futuro;
10. errore provider e retry.

## Anti-regressione UX

Ogni release deve verificare:

- mobile 390px;
- tablet 768px;
- desktop 1440px;
- focus tastiera;
- contrasto CTA;
- empty states;
- error states;
- loading states;
- nessun overflow in card/report;
- nessun testo tecnico visibile al cliente base.

## Dataset test

Usare fixture isolate:

- azienda OK;
- azienda con segnali attenzione;
- azienda con rischio alto;
- soggetto non trovato;
- provider timeout;
- pagamento fallito;
- callback duplicata;
- report asincrono completato dopo polling.

## Definition of Done sprint sviluppo

- build frontend OK;
- build backend OK;
- test unitari principali OK;
- migrazioni DB incluse;
- `.env.example` aggiornato;
- documentazione aggiornata;
- changelog aggiornato;
- nessuna chiave in repository;
- QA manuale su flusso principale;
- screenshot desktop/mobile per pagine toccate.
