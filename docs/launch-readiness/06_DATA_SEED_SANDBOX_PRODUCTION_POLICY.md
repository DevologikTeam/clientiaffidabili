# 06 — Data Seed, Sandbox & Production Policy

## Principio
I dati demo possono esistere solo in ambiente demo/staging. In produzione reale non devono essere creati automaticamente dati falsi nei tenant/clienti reali.

## Dataset necessari

### E2E seed
- customer owner;
- customer analyst;
- admin operations;
- admin billing;
- partner sandbox;
- servizio MVP pubblicato;
- ordine paid mock;
- provider completed mock;
- report published;
- invoice pending;
- refund eligible.

### Dataset negati in produzione
- aziende reali inventate;
- report falsi presentati come veri;
- fatture fake;
- crediti regalati senza audit;
- provider payload inventati in tenant reali.

## Ambienti

| Ambiente | Dati demo | Pagamenti | Provider | Note |
|---|---|---|---|---|
| local | ammessi | mock | mock | sviluppo |
| staging | ammessi e marcati | sandbox | sandbox/mock | QA |
| demo commerciale | ammessi e isolati | mock/sandbox | mock/sandbox | presentazioni |
| production | vietati nei tenant reali | live | live controllato | solo dati reali |

## Guardrail seed
Ogni seed deve verificare `NODE_ENV`, `APP_ENV` e feature flag espliciti. Nessun seed deve partire automaticamente in production.
