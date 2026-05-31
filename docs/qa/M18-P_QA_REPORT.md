# M18-P QA Report

Versione: **0.64.0**

## Controlli eseguiti

```bash
node scripts/qa-email-notifications-design.js
node scripts/qa-source-syntax-smoke.js
zip -T /mnt/data/clientiaffidabili_foundation_v0_64_0.zip
```

## Esito

- File blueprint M18-P presenti.
- Copertura email account/security, pagamenti, rimborsi, report, PDF, fatture, supporto e partner API presente.
- Ledger, webhook, retry, bounce, complaint, suppression e error ledger coperti.
- Guardrail token/link/PDF/sensitive data documentati.
- Source syntax smoke passato.

## Note

Non sono stati eseguiti invii email reali, build Docker/Coolify, provider webhook reali o Playwright.
