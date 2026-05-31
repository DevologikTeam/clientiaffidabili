# 03 — Browser E2E Test Strategy

## Scelta strumento
Playwright e' lo strumento consigliato per test browser end-to-end perche' copre Chromium, Firefox e WebKit, consente test in CI, trace, screenshot e report HTML.

## Regola di stabilita'
In CI i test devono privilegiare riproducibilita' e stabilita'. La configurazione deve partire con workers ridotti, base URL esplicito, trace su retry e artifact conservati.

## Suite minime

### Public funnel
- Home render.
- Navigazione catalogo.
- Dettaglio servizio.
- Prezzi.
- Avvio checkout.

### Checkout/billing
- Creazione ordine.
- Conferma uso lecito.
- Sessione pagamento mock/Stripe sandbox.
- Success/cancel.
- Stato pagamento in dashboard.

### Customer dashboard
- Login.
- Dashboard.
- Verifiche.
- Dettaglio verifica.
- Report access autorizzato.
- Billing/profilo fiscale.

### Admin operations
- Login admin.
- Operations queue.
- Detail item.
- Action con reason.
- Audit timeline.

### Partner portal
- Dashboard partner.
- Creazione API key sandbox.
- Test endpoint sandbox.
- Usage ledger.
- Webhook test.

## Anti-flaky rules
- Preferire data-testid stabili.
- Evitare dipendenze da orari reali senza freeze/mocking.
- Usare dataset seed dedicato E2E.
- Isolare account cliente/admin/partner.
- Non usare provider reali nei test base.
- Salvare trace e screenshot solo su fallimento/retry.

## Output M13-P/M13-S
- `playwright.config.ts`.
- `tests/e2e/public-funnel.spec.ts`.
- `tests/e2e/checkout.spec.ts`.
- `tests/e2e/customer-dashboard.spec.ts`.
- `tests/e2e/admin-operations.spec.ts`.
- `tests/e2e/partner-portal.spec.ts`.
- `tests/e2e/security-cross-account.spec.ts`.
