# M15B-A — Settings Admin Source Notes

## OpenAI Platform

La configurazione OpenAI deve rispettare il principio di segregazione dei segreti e controllo dei progetti/permessi. Le API key devono essere gestite come segreti backend e non devono essere esposte in frontend, repository, log o payload admin non redatti.

Fonti ufficiali consultate:

- OpenAI Production Best Practices: uso prudente in produzione, sicurezza, deploy e controlli operativi.
- OpenAI Admin API Keys reference: API keys come risorse amministrative da trattare con permessi elevati.
- OpenAI Help Center sui progetti API Platform: gestione per progetti, accessi e separazione operativa.

## Impatto sul progetto

Per ClientiAffidabili.it, OpenAI settings non devono essere semplici ENV modificabili manualmente. Serve una governance admin con:

- enabled/disabled per use case;
- modello e limiti costo;
- redaction obbligatoria;
- logging metadata-only o redatto;
- error ledger dedicato;
- nessun invio automatico di raw provider payload o dati sensibili.

## Openapi/provider

La base servizi e margini resta quella acquisita nel documento strategico iniziale. Le credenziali provider devono restare server-side e la UI admin deve mostrare solo stato e ultimi errori redatti.

## Pagamenti

Stripe/PayPal settings devono essere separati da checkout runtime: la modifica admin deve essere auditata e non deve permettere live mode senza checklist.
