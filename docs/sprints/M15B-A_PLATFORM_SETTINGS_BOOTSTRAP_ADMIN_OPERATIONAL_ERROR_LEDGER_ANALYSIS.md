# M15B-A — Platform Settings, Bootstrap Admin & Operational Error Ledger Analysis

## Obiettivo sprint

Questo sprint analizza il modulo trasversale che permette di governare la piattaforma da pannello admin, senza modificare ENV o ridistribuire l'applicazione per ogni cambio operativo.

Il modulo copre:

- utente admin di bootstrap;
- kill switch per disabilitare temporaneamente gli acquisti;
- settings amministrabili per Stripe, PayPal, Openapi e OpenAI;
- ledger errori operativi per pagamenti, rimborsi, provider, OpenAI, email, webhook, checkout e report;
- salvataggio IP/hash IP degli utenti che acquistano;
- audit append-only per modifiche sensibili;
- guardrail per evitare segreti in chiaro, raw payload esposti e modifiche non tracciate.

## Decisione prodotto

Il modulo deve essere una **control room interna**, non una pagina tecnica dispersiva.

La UI admin deve rispondere subito a quattro domande:

1. La piattaforma puo' vendere in questo momento?
2. Quali provider sono attivi, degradati o bloccati?
3. Quali errori richiedono rimborso, retry, fix o comunicazione al cliente?
4. Quali modifiche sensibili sono state fatte, da chi e per quale motivo?

## Perimetro M15B-A

In questo sprint non implementiamo ancora il runtime. Definiamo:

- priorita' business;
- rischi operativi;
- modello dati candidato;
- workflow admin;
- error categories;
- retention e privacy;
- readiness per M15B-P/M15B-S.

## Requisiti obbligatori

- Nessun segreto in chiaro nel frontend.
- Nessuna API key completa leggibile dopo il salvataggio.
- Ogni modifica sensibile richiede reason obbligatoria.
- Il kill switch acquisti deve essere server-side e bloccare la creazione sessioni pagamento.
- Gli ordini gia' pagati devono continuare il lifecycle anche se gli acquisti vengono disabilitati.
- Tutti gli errori operativi devono essere correlabili a ordine, pagamento, refund, provider request, report, contatto o account.
- IP acquisto e user agent devono essere trattati come dati personali/tecnici con retention e visibilita' limitate.

## Output

- Analisi prodotto e operativa.
- Analisi settings provider.
- Analisi error ledger.
- Analisi bootstrap admin e kill switch.
- Analisi buyer IP audit.
- Data model candidate.
- Readiness checklist per design e sviluppo.
