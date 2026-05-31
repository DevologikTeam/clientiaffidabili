# 11 — Performance & Observability Blueprint

## Scopo

Rendere misurabile il polish pre-RC. M20-S deve introdurre budget e smoke test, non solo modifiche estetiche.

## Budget iniziale

| Metrica | Mobile target | Desktop target | Note |
|---|---:|---:|---|
| LCP | <= 2.8s | <= 2.0s | pagine pubbliche P0 |
| CLS | <= 0.10 | <= 0.10 | no layout shift su hero/header |
| INP | <= 200ms | <= 200ms | menu mobile e checkout |
| JS first load public | <= budget Next corrente + 10% | <= budget Next corrente + 10% | non introdurre librerie pesanti |
| CSS warning | 0 warning noti | 0 warning noti | includere fix Autoprefixer |

## Route da misurare

- `/`
- `/servizi`
- `/prezzi`
- `/checkout`
- `/guide`
- `/garanzia-operativa`
- `/api`

## Osservabilita privacy-safe

- Nessun PII in eventi analytics.
- Nessun nome azienda cercata, report ID, IBAN, payload provider o email cliente in event payload.
- Tracking esterno disabilitato su admin, dashboard, report, checkout success/cancel e inviti.
- Gli errori frontend devono essere aggregati e redatti.

## QA M20-S

- Lighthouse o equivalente in ambiente locale/staging.
- Axe su home, prezzi, checkout, dashboard, admin sandbox certification.
- Static scan bundle/config per route denylist tracking.
- Snapshot performance salvato in `artifacts/ux-seo-performance-a11y/`.
