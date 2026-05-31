# M19-A Source Notes

## Stripe

Fonte: https://docs.stripe.com/testing

La certificazione Stripe deve usare sandbox/test mode, test API keys, test cards/payment methods, scenari di successo, errore, 3DS/SCA, dispute e refund. Le chiavi live non devono essere usate nei test e non devono essere salvate nel repository.

## PayPal

Fonte: https://developer.paypal.com/tools/sandbox/

PayPal deve essere certificato in sandbox con account business/personal test, ordine/capture/refund e, dove applicabile, subscription sandbox. In assenza di certificazione completa PayPal resta feature-flagged/disabilitato.

## OpenAI

Fonte: https://platform.openai.com/docs/guides/production-best-practices

OpenAI deve essere certificato con API key protette, usage/cost monitoring, redaction, output guard e fallback mock. Nessun use case AI può bypassare approvazione admin.

## Openapi/provider dati

La fonte funzionale rimane il listino e la strategia Openapi caricata all’inizio progetto. Prima del live servono credenziali partner, endpoint ufficiali, regole di addebito, sandbox/mock e test idempotenza.
