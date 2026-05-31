# Partner Portal Experience Blueprint

## Posizionamento UX
Il portale partner deve comunicare fiducia, controllo e chiarezza. Non deve sembrare una console tecnica grezza: l'obiettivo e' far capire rapidamente se il partner puo integrare un servizio, cosa manca per andare live e quale sara il costo operativo.

## Navigazione MVP
- **Panoramica**: stato onboarding, ambiente attivo, crediti, errori recenti, prossima azione.
- **API key**: chiavi sandbox/live, scope, rotazione, revoca, ultima attivita.
- **Sandbox**: richieste test, esempi payload, risposte simulate, errori guidati.
- **Documentazione**: quickstart, endpoint, limiti, idempotenza, webhook, esempi.
- **Usage**: consumi per servizio, costo interno, prezzo partner, margine, rate limit.
- **Billing**: wallet crediti, abbonamento, fatture, rimborsi se pertinenti.
- **Webhook**: endpoint, secret, test firma, retry log.
- **Go live**: checklist, review, stato approvazione, motivi blocco.
- **Supporto**: ticket tecnici e commerciali collegati a API key/usage.

## Stati onboarding
- `draft_profile`: profilo non completo.
- `sandbox_enabled`: sandbox attiva.
- `sandbox_testing`: test in corso.
- `live_review_requested`: richiesta live inviata.
- `live_changes_required`: modifiche richieste.
- `live_approved`: live approvata.
- `live_suspended`: live sospesa.

## Pattern UI
Ogni pagina deve mostrare in alto:
- stato corrente;
- motivo dello stato;
- impatto operativo;
- prossima azione sicura.

## Copy guida
Usare copy operativo: "Completa il profilo aziendale", "Genera una chiave sandbox", "Richiedi revisione live".
Evitare copy assoluto: "API illimitate", "accesso immediato a tutti i dati", "rischio zero".
