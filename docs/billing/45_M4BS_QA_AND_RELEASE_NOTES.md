# 45 — M4B-S QA & Release Notes

Lo sprint aggiunge QA antiregressione per verificare presenza di adapter, servizi, entita', UI, docs e script package.

## QA
Eseguito `for f in scripts/qa-*.js; do node "$f"; done`.

## Limite noto
Il pacchetto resta scaffold offline: non sono stati eseguiti `pnpm install`, build Next/Nest o test e2e browser.
