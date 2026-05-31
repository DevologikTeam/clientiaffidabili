# M19-A — Sandbox Certification Analysis

## Obiettivo

Lo sprint M19-A definisce come certificare in sandbox i flussi critici prima della Release Candidate: checkout, pagamenti, rimborsi, abbonamenti, provider dati, OpenAI copilot, email tecniche, PDF report, error ledger, audit, rollback e deploy staging/Coolify.

Il progetto non viene dichiarato production-ready in questo sprint. Lo scopo è creare il perimetro di certificazione, i casi test, i criteri di blocco e gli output necessari per M19-P/M19-S.

## Perimetro di certificazione

- Stripe sandbox: pagamento riuscito, fallito, 3DS/SCA, rimborso full/parziale, dispute simulata, webhook idempotente.
- PayPal sandbox: ordine riuscito, annullato, subscription mock/sandbox, refund capture, webhook normalizzato.
- Openapi/provider: modalità mock/sandbox, chiamata solo post-payment o credito riservato, costo snapshot, idempotenza.
- OpenAI: copilot mock-first, settings abilitati, budget, redaction, usage ledger, error ledger.
- Email provider: invio mock/sandbox, template, link PDF sicuro, retry, suppression, bounce/complaint webhook.
- Dashboard customer/admin/partner: accessi autorizzati, nessun raw payload, errori leggibili e azionabili.
- QA release: build, Docker Compose, smoke, Playwright, secret scan, source syntax smoke, production gate.

## Decisione

M19 diventa il ponte tra sviluppo funzionale e RC. Nessuna feature nuova deve entrare in RC se non passa la certificazione sandbox o viene esplicitamente disabilitata da settings admin/feature flag.

## Exit criteria M19-A

- Matrice sandbox definita.
- Criteri pass/fail documentati.
- Dati fixture e policy no-real-data definiti.
- Casi rimborso/dispute inclusi.
- Error ledger incluso in tutti i test critici.
- Lista blocker RC aggiornata.
