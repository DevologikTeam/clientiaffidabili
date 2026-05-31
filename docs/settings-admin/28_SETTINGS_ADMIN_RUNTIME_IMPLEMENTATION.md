# Settings Admin Runtime Implementation

Il modulo `SettingsAdminModule` centralizza settings operativi che prima sarebbero finiti in ENV sparse o in log non governati.

## Namespace MVP
- `commerce`: acquisti, kill switch e messaggio cliente.
- `payments`: Stripe, PayPal, webhook e subscription readiness.
- `provider_openapi`: chiamate provider e API key Openapi.
- `openai`: abilitazione funzioni AI, API key, budget e guardrail.
- `email`: invio email, utile per contact inbox e fallback.
- `security`, `crm`, `partner`, `launch`: predisposizione per moduli successivi.

## Regola secret write-only
I valori sensibili non vengono letti in chiaro:
1. admin invia il nuovo valore;
2. backend crea `secretRef` e valore redatto;
3. audit salva solo snapshot sicuro;
4. UI mostra solo stato e redaction.

## Impatto operativo
Questa impostazione permette di modificare provider e metodi di pagamento senza nuovo deploy, ma ogni cambio resta auditato e motivato.
