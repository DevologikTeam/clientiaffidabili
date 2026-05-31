# Sprint M7-A — Customer Dashboard Analysis

## Versione

`0.20.0`

## Obiettivo

Analizzare l'area cliente di ClientiAffidabili.it dopo l'acquisto: dashboard, storico verifiche, stati ordine, accesso report, download futuri, richieste bloccate, notifiche, onboarding e supporto.

Lo sprint non implementa nuove schermate definitive. Definisce il perimetro funzionale e i guardrail da rispettare nello sprint di progettazione `M7-P` e nello sviluppo `M7-S`.

## Problema da risolvere

Dopo checkout, provider request e report composer, il cliente deve capire immediatamente:

1. cosa ha acquistato;
2. in che stato si trova la verifica;
3. se serve una sua azione;
4. quando il report è pronto;
5. quali dati sono stati usati;
6. come leggere il report senza interpretarlo come garanzia assoluta;
7. come recuperare storico, fatture, supporto e prossime azioni.

Senza una dashboard chiara, il prodotto rischia di sembrare un semplice e-commerce di report. L'area cliente deve invece diventare il punto operativo in cui l'utente gestisce le verifiche e prende decisioni con dati, limiti e tracce.

## Decisione prodotto

La dashboard cliente sarà una **cabina di regia post-acquisto**, non un pannello tecnico.

Deve mostrare poche informazioni iniziali, ordinate per priorità:

- verifiche in corso;
- report pronti;
- azioni richieste;
- ordini/pagamenti/fatture;
- storico affidabilità;
- suggerimenti prudenti di prossima azione.

## Scope M7-A

Incluso:

- analisi dashboard cliente;
- lifecycle post-acquisto;
- stati ordine/report/provider esposti al cliente;
- analisi storico verifiche;
- notifiche e task cliente;
- supporto e richieste assistenza;
- privacy, sicurezza, RBAC e audit;
- data model di analisi;
- readiness checklist per M7-P/M7-S.

Escluso:

- sviluppo dashboard definitiva;
- export PDF reale;
- notifiche email/SMS reali;
- autenticazione completa;
- workspace multi-azienda avanzato;
- abbonamenti/crediti, che restano nel modulo futuro M4B.

## Principi UX

1. **Prima priorità visibile**: cosa richiede attenzione ora.
2. **Stati comprensibili**: non mostrare `provider_pending`, ma `Verifica in elaborazione`.
3. **Niente linguaggio tecnico**: raw payload, webhook, idempotenza, provider, adapter e retry non devono apparire nella dashboard cliente.
4. **Report prudenti**: il cliente vede evidenze, fonti e limiti, non claim assoluti.
5. **Tracciabilità operativa**: ogni report deve mostrare data richiesta, data aggiornamento, fonte dati e limiti.
6. **Recupero facile**: storico e filtri devono permettere di ritrovare rapidamente azienda, ordine o report.

## Output sprint

- Documenti di analisi dashboard cliente.
- Modello stati customer-facing.
- Data model candidato.
- Guardrail privacy/security/RBAC.
- QA matrix M7-A.
- Handoff per M7-P e M7-S.
