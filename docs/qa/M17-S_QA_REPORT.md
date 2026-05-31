# M17-S QA Report

## Controlli eseguiti

- presenza modulo backend OpenAI;
- presenza entita' runtime;
- presenza servizi redaction/output guard/adapter;
- presenza pagina admin;
- verifica claim vietati nei guardrail;
- verifica nessun adapter reale hardcoded obbligatorio;
- source syntax smoke;
- zip integrity.

## Esito

Passed.

## Limiti

Non sono state eseguite chiamate reali OpenAI, build Docker/Coolify, migrazioni DB o Playwright reale.
