# M16-S QA and next readiness

## QA eseguito

- presenza file runtime backend/frontend;
- presenza dashboard admin;
- controllo source syntax smoke;
- validazione archivio ZIP.

## Non eseguito

- build Docker/Coolify reale;
- migrazioni DB;
- Playwright reale;
- integrazione GA4/Matomo/Search Console;
- CMP reale;
- aggregazioni cron reali.

## Next readiness

Il modulo M17 potrà usare questi analytics solo in forma aggregata. OpenAI non deve ricevere eventi con PII, payload provider, prompt storici o informazioni sensibili.
