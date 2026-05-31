# Secrets, Coolify e production gate implementation

## Script aggiunti

- `scripts/security-secret-scan.js`
- `scripts/security-production-gate.js`

## Secret scan

Lo scan cerca pattern ad alto rischio:

- Stripe live secret key;
- PayPal client secret valorizzato;
- Openapi API key valorizzata;
- JWT secret reale;
- private key block;
- esposizione `NEXT_PUBLIC_*SECRET/TOKEN/KEY` nel frontend.

`.env.example` può contenere placeholder vuoti o `change_me`, ma non valori reali.

## Coolify

Coolify dovrà contenere solo secret runtime e variabili non committate. Nel repository restano esempi e flag disattivati.

## Production gate

Il gate verifica presenza di:

- modulo security;
- guard;
- servizi di redaction/webhook/object auth;
- runbook backup/incident;
- script secret scan;
- flag espliciti di evidenza.
