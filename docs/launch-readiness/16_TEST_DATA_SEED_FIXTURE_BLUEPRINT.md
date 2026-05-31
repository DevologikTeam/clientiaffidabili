# 16 — Test Data, Seed and Fixture Blueprint

## Principio
I test devono usare dati realistici ma non reali. Nessun dato demo o fake deve contaminare tenant/account di produzione.

## Ambienti

| Ambiente | Dati | Regola |
|---|---|---|
| local | seed deterministico | consentito |
| test/CI | fixture isolate | obbligatorio |
| staging | dataset demo realistico | consentito ma isolato |
| production | niente seed demo | bloccato |

## Fixture minime
- Account owner cliente.
- Account analyst.
- Admin operations.
- Partner sandbox.
- Servizio `COMPANY_PRO`.
- Ordine pagato mock.
- Provider result normalizzato.
- Report pubblicato.
- Fattura pending/manual-assisted.
- Refund request bloccata.

## Regole dati
- Email `.test`.
- P.IVA/codici fiscali di test o placeholder espliciti.
- Nessun dato reale di aziende o persone.
- Ogni fixture ha `fixtureRunId`.
- Cleanup o isolamento per run.

## Seed command proposto

```bash
pnpm --filter @clientiaffidabili/api seed:e2e
```

## Blocco produzione
Il seed E2E deve rifiutarsi di girare se:

```bash
NODE_ENV=production
APP_ENV=production
ENABLE_E2E_SEED=false
```
