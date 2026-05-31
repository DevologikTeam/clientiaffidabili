# M13-A — Production QA, Browser E2E & Launch Readiness Analysis

## Tipo sprint
Analisi senior QA/Release/Production.

## Obiettivo
Portare il progetto da scaffold funzionale a piano di certificazione pre-lancio. Lo sprint non dichiara il prodotto pronto alla produzione: definisce cosa deve essere verificato, quali test browser reali servono, quali smoke test devono passare su Coolify e quali blocchi impediscono il go-live.

## Contesto
ClientiAffidabili.it ora include funnel pubblico, catalogo/prezzi, checkout, pagamenti, provider integration, report, dashboard cliente, admin operations, fiscal/legal, auth/account/team e portale partner. Il rischio principale non e' aggiungere nuove funzioni, ma lanciare senza una prova reale end-to-end.

## Decisione strategica
Il go-live deve essere bloccato fino a quando non passano questi gate minimi:

1. build reale `pnpm install`, `pnpm build`, `pnpm -r typecheck`, `pnpm -r lint`;
2. Docker build di `web` e `api`;
3. avvio stack pulito con PostgreSQL;
4. smoke test API e Web;
5. test browser Playwright sui percorsi critici;
6. test object-level authorization cross-account;
7. test webhook Stripe/PayPal sandbox con firma reale;
8. test provider sandbox/Openapi con chiamate bloccate o controllate;
9. test rimborsi/crediti/dispute senza doppio accredito;
10. test backup/restore almeno su staging;
11. production gate firmato da owner tecnico + checklist commerciale/legal.

## Percorsi critici da certificare

### Percorso pubblico
- Homepage.
- Catalogo servizi.
- Dettaglio servizio.
- Prezzi.
- Checkout.
- Success/cancel.

### Percorso cliente
- Registrazione/login.
- Creazione account aziendale.
- Accesso dashboard.
- Storico verifiche.
- Accesso report autorizzato.
- Profilo fiscale.
- Fatture/documenti.
- Team e inviti.

### Percorso pagamento/provider/report
- Ordine creato con price snapshot.
- Pagamento confermato.
- Credito riservato o provider call abilitata.
- Provider request idempotente.
- Report composto da dati normalizzati.
- Report pubblicato solo se autorizzato.
- Download/accesso auditato.

### Percorso admin
- Work queue.
- Admin detail.
- Action con reason obbligatoria.
- Provider retry safe.
- Report review/publish/block.
- Refund/cancel subscription/dispute.
- Security gate.
- Fiscal/legal queue.
- Partner live request.

### Percorso partner/API
- Sandbox API key.
- Test company check sandbox.
- Idempotency key obbligatoria.
- Usage ledger.
- Webhook partner firmato.
- Live access request bloccata finche' non approvata.

## Output di questo sprint
- Strategia M13-A.
- Matrice E2E browser.
- Matrice smoke test Coolify.
- Analisi build/lint/typecheck.
- Analisi payment/provider E2E.
- Analisi backup/restore e rollback.
- Analisi launch gate.
- Handoff per M13-P.

## Non incluso
- Implementazione Playwright reale.
- Pipeline CI completa.
- Test sandbox Stripe/PayPal live.
- Test provider reale.
- Build produzione certificata.

Queste attivita' sono rimandate a M13-P/M13-S.
