# 07 — Platform Settings Product Strategy Analysis

## Problema

ClientiAffidabili.it integra pagamenti, provider dati, report, email, partner API e in futuro funzionalita' AI. Se queste configurazioni restano solo in ENV/Coolify, ogni modifica operativa richiede un deploy o intervento tecnico.

Questo non e' sostenibile per un prodotto commerciale che deve poter:

- sospendere gli acquisti in emergenza;
- cambiare modalita' sandbox/live;
- disabilitare temporaneamente un provider degradato;
- limitare OpenAI o provider esterni in caso di errore/costo anomalo;
- leggere gli errori e decidere se rimborsare o correggere;
- dimostrare audit e responsabilita' delle azioni.

## Posizionamento del modulo

Il modulo settings deve essere accessibile solo a Super Admin e, in lettura parziale, a ruoli interni autorizzati.

Non deve diventare un pannello per sviluppatori. Deve essere una cabina di regia operativa con:

- stato piattaforma;
- stato acquisti;
- stato provider;
- errori recenti;
- azioni sicure;
- blocchi e motivazioni;
- audit modifiche.

## Settings da gestire

### Commerce

- acquisti abilitati/disabilitati;
- motivo sospensione;
- durata prevista;
- messaggio pubblico;
- checkout visibile ma bloccato;
- soglia margine minima;
- allowlist prodotti temporaneamente vendibili.

### Payments

- Stripe enabled;
- PayPal enabled;
- sandbox/live;
- refunds enabled;
- subscriptions enabled;
- webhook health;
- fee model;
- provider priority.

### Openapi

- provider calls enabled;
- sandbox/live;
- base URL;
- timeout;
- retry policy;
- mapping active version;
- cost guard;
- credential status redatto.

### OpenAI

- OpenAI features enabled;
- allowed use cases;
- model policy;
- usage cap;
- prompt logging policy;
- PII redaction required;
- fallback behavior;
- credential status redatto.

### Operational errors

- retention;
- escalation owner;
- auto-create ticket;
- refund review threshold;
- critical alert recipients.

## Metriche di successo

- Tempo di sospensione acquisti inferiore a pochi secondi senza deploy.
- Ogni errore critico visibile in admin con correlazione business.
- Nessun segreto esposto in UI/log.
- Ogni modifica sensibile auditata.
- Possibilita' di decidere rimborso/fix da una vista unica.

## Non-obiettivi MVP

- Non costruire un secret manager enterprise completo.
- Non sostituire backup/observability esterni.
- Non attivare AI automatica su dati sensibili.
- Non creare automazioni di rimborso senza review umana.
