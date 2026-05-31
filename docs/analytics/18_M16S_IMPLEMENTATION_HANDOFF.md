# 18 — M16-S Implementation Handoff

## Da implementare in M16-S

1. `AnalyticsModule` backend.
2. Entità TypeORM per eventi e snapshot.
3. Event allowlist registry.
4. Event redaction validator.
5. Endpoint public/internal/admin.
6. Tracker frontend minimizzato.
7. Admin analytics pages.
8. Seed KPI/demo solo non-production.
9. QA script dedicato.
10. Integrazione iniziale con contact/checkout/report/email/error ledger a livello di eventi server-side.

## Non implementare ancora

- Sync reale GA4.
- Sync reale Search Console.
- Matomo reale.
- Attribuzione predittiva AI.
- Profilazione utente individuale.

## Gate M16-S

- Nessun evento deve contenere campi vietati.
- Eventi client-side devono passare allowlist.
- Dashboard admin non deve mostrare PII.
- Analytics deve rispettare kill switch/settings admin.
- Source syntax smoke deve passare.
