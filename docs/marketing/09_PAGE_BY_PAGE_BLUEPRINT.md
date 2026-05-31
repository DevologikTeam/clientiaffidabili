# Page-by-page Blueprint

## `/` — Homepage

### Obiettivo

Far capire in meno di 10 secondi:

- cosa fa ClientiAffidabili.it;
- per chi è utile;
- quale verifica posso iniziare;
- perché posso fidarmi del processo;
- cosa succede prima del pagamento.

### Sezioni

| Ordine | Sezione | Output atteso |
|---|---|---|
| 1 | Hero | promessa, due CTA, mock report |
| 2 | Trust strip | elementi verificabili, non promesse assolute |
| 3 | Scenario selector | scelta per bisogno operativo |
| 4 | Pacchetti suggeriti | primi servizi convertibili |
| 5 | Report preview | valore del risultato |
| 6 | Come funziona | riduzione ansia pre-checkout |
| 7 | Compliance notice | uso lecito, fonti, limiti |
| 8 | FAQ | obiezioni principali |
| 9 | CTA finale | passaggio a catalogo o checkout |

### CTA

- Primaria: `Avvia una verifica azienda`
- Secondaria: `Esplora i servizi`
- B2B/API: `Parla con un consulente API`

## `/servizi`

### Obiettivo

Permettere all'utente di scegliere il servizio corretto senza conoscere nomi tecnici o sigle provider.

### Filtri MVP

- Scenario operativo.
- Tipo soggetto: azienda, persona, documento, contatto, immobile, API.
- Tempo evasione: real-time, pochi minuti, ore/giorni.
- Fascia prezzo.

### Card servizio

Campi card:

- nome commerciale;
- categoria;
- descrizione breve;
- dati richiesti;
- tempo stimato;
- prezzo visibile;
- badge `Uso professionale` se necessario;
- CTA `Vedi dettagli`.

## `/servizi/[slug]`

### Obiettivo

Portare l'utente al checkout con aspettative corrette.

### Sezioni

1. Hero servizio.
2. `Quando usarlo`.
3. `Cosa ottieni`.
4. `Dati necessari`.
5. `Tempi, prezzo e limiti`.
6. `Esempio report`.
7. `Uso ammesso e responsabilità`.
8. CTA checkout.
9. FAQ servizio.

## `/prezzi`

### Obiettivo

Creare fiducia prima ancora di avere un catalogo ampio.

### Contenuto

- spiegazione modello: pagamento per verifica, pacchetti, API/volumi;
- prezzi indicativi e/o listino iniziale selezionato;
- disclaimer IVA, diritti, imposte, costi provider;
- opzione contatto commerciale per API e volumi.

## `/api`

### Obiettivo

Separare chiaramente il pubblico software house/gestionali dal self-service.

### Sezioni

- use case: onboarding clienti, KYC leggero, credit pre-check, document retrieval;
- sicurezza: chiavi server-side, audit, rate limit, tenant isolation;
- pricing: volume e credito prepagato;
- CTA: `Richiedi accesso API`.

## `/checkout`

Non deve essere la prima pagina vista dall'utente. Deve ricevere già:

- servizio selezionato;
- prezzo;
- dati minimi;
- finalità dichiarata;
- informativa breve accettata.

## Pagine da non sviluppare ancora

- Blog editoriale completo.
- Marketplace generico di tutte le API.
- Area partner complessa.
- Comparatore automatico competitor.
- Dashboard avanzata multiutente.

Motivo: rischiano di distrarre dal primo flusso convertibile.
