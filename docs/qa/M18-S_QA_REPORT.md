# M18-S QA report

## Controlli eseguiti

```bash
node scripts/qa-email-notifications-development.js
node scripts/qa-source-syntax-smoke.js
zip -T /mnt/data/clientiaffidabili_foundation_v0_65_0.zip
```

## Esito

Passed.

## Limiti

Non sono stati eseguiti invii reali, provider webhook, build Docker/Coolify, migrazioni DB o Playwright.
