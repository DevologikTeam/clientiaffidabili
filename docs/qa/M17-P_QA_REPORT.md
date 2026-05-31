# M17-P QA Report

Versione: **0.61.0**

## Controlli eseguiti

```bash
node scripts/qa-openai-copilot-design.js
node scripts/qa-source-syntax-smoke.js
zip -T /mnt/data/clientiaffidabili_foundation_v0_61_0.zip
```

## Esito

Passed.

## Controlli coperti

- presenza blueprint M17-P;
- presenza prompt registry;
- presenza settings/secret blueprint;
- presenza redaction/context pack blueprint;
- presenza approval/audit workflow;
- presenza usage/cost/error ledger;
- presenza handoff M17-S;
- assenza API key OpenAI hardcoded nel corpus M17-P;
- controllo sorgenti generico contro errori di sintassi comuni.

## Non eseguito

- build reale;
- chiamate OpenAI reali;
- test E2E browser;
- migrazioni DB;
- deploy Docker/Coolify.
