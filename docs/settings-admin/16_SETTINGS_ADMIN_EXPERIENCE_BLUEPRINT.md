# 16 — Settings Admin Experience Blueprint

## Route admin

- `/admin/settings` — overview operativa.
- `/admin/settings/commerce` — acquisti, checkout, modalita' manutenzione commerciale.
- `/admin/settings/payments` — Stripe, PayPal, rimborsi, subscription e ledger.
- `/admin/settings/provider-openapi` — Openapi provider, sandbox/live, timeout, retry e cost guard.
- `/admin/settings/openai` — OpenAI API use case, model policy, budget e redaction.
- `/admin/settings/errors` — operational error ledger.
- `/admin/settings/security` — bootstrap, audit, IP retention e controlli produzione.

## Layout

Ogni pagina settings deve avere:

1. stato operativo in alto;
2. spiegazione chiara del perche' il setting esiste;
3. sorgente del valore: env, database, default, secret reference;
4. impatto operativo;
5. ultima modifica con autore e motivo;
6. azioni possibili e azioni bloccate;
7. audit timeline sintetica.

## Regola UX

Il pannello non deve sembrare un file `.env` esposto in UI. Deve guidare l'operatore con linguaggio decisionale:

- cosa e' attivo;
- cosa e' bloccato;
- cosa succede se cambio valore;
- quali rischi ci sono;
- quale prossima azione sicura posso fare.
