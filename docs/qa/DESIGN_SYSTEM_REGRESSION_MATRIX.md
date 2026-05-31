# Design System Regression Matrix

| Area | Test manuale | Test automatico futuro | Priorità |
|---|---|---|---|
| Button | varianti, focus, disabled, mobile tap | visual snapshot + axe | Alta |
| Badge | semantica colore/testo | snapshot | Media |
| Field | label, help, error, aria-invalid | component test | Alta |
| PriceCard | prezzo, CTA, lista inclusioni | snapshot | Alta |
| TrustNotice | info/warning/danger | snapshot + copy lint | Alta |
| Checkout summary | prezzo, IVA, conferma | e2e Playwright | Critica |
| Report header | esito, fonti, limiti | e2e + snapshot | Critica |
| Dashboard | empty/loading/error | e2e | Alta |
| Mobile | landing/checkout/report | Playwright mobile | Critica |
| Copy | no termini tecnici vietati | grep/ESLint custom | Alta |

## Comandi previsti nel futuro sprint M1-S

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm --filter @clientiaffidabili/web test:e2e
```

## Prima lista parole vietate per lint copy

```text
endpoint
payload
tenant
adapter
mock
fake
provider raw
scoring garantito
affidabilità garantita
```
