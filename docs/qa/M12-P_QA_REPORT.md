# M12-P QA Report — API Partner & Reseller Portal Design

## Esito
Passed.

## Controlli eseguiti
- Presenza documenti blueprint M12-P.
- Presenza contratti TypeScript backend/frontend.
- Presenza handoff M12-S.
- Presenza termini obbligatori: API key, sandbox, live, rate limit, Idempotency-Key, usage ledger, credit wallet, webhook, raw payload, reseller.

## Guardrail verificati
- API key hashate e mai persistite in chiaro.
- Sandbox separata da live.
- Produzione live solo su review.
- Idempotenza obbligatoria su richieste costose.
- Credit wallet prima del consumo provider.
- Usage ledger append-only.
- Webhook firmati.
- Raw payload provider non esposto al partner.
- Revenue share automatico rimandato.

## Limiti
Non e' stata eseguita build reale. Il pacchetto resta scaffold offline e il runtime verra implementato in M12-S.
