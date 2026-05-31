# 22 — Observability, Error Ledger and Support Runbook Runtime

## Obiettivo

Preparare il pilot senza confondere readiness tecnica con supporto operativo.

## Flussi da coprire

- Checkout bloccato o pagamento non riconciliato.
- Report provider in errore o ritardo.
- Email/PDF non consegnati.
- Refund/dispute/manual review.
- Partner API rate limit o idempotency conflict.
- Rollback feature flag e disabilitazione acquisti.

## Artifact richiesti prima del pilot

- Error ledger summary.
- Support owner per fascia oraria.
- Rollback contact path.
- Template risposta cliente per incidente.
- Alert routing proof.

Il gate e P1: non blocca la RC come i P0, ma deve avere owner e scadenza.
