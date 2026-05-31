# Secrets & Coolify Hardening Blueprint

## Obiettivo

Ridurre rischio di esposizione segreti e rendere il deploy Coolify ripetibile e sicuro.

## Secrets source of truth

| Secret | Dove vive | Visibile frontend | Note |
|---|---|---|---|
| `DATABASE_URL` | Coolify backend/api | no | DB private network |
| `JWT_SECRET` | Coolify backend/api | no | rotazione programmata |
| `OPENAPI_API_KEY` | Coolify backend/api | no | provider adapter only |
| `STRIPE_SECRET_KEY` | Coolify backend/api | no | mai in Next public env |
| `STRIPE_WEBHOOK_SECRET` | Coolify backend/api | no | firma webhook |
| `PAYPAL_CLIENT_SECRET` | Coolify backend/api | no | adapter backend |
| `ENCRYPTION_KEY` | Coolify backend/api | no | vault/field encryption futura |
| `NEXT_PUBLIC_API_BASE_URL` | Coolify web | si | solo URL pubblico API |

## Coolify deployment rules

- rete privata tra API e Postgres;
- database non esposto pubblicamente;
- healthcheck API e web;
- rolling deploy o downtime controllato;
- volume backup DB separato;
- variabili `NEXT_PUBLIC_*` solo per dati pubblici;
- `ENABLE_PROVIDER_CALLS=false` in staging finche' non validato;
- `ENABLE_PAYPAL=false` finche' sandbox/webhook non validati;
- `NODE_ENV=production` in ambiente live;
- accesso Coolify con MFA e utenti minimi.

## Secret scanning

M9-S deve aggiungere script che blocca:

- `sk_live_`, `sk_test_` committati;
- API key Openapi;
- JWT secret hardcoded;
- password DB fuori `.env.example`;
- private key o token generici.

## Rotation policy

- rotazione immediata se secret appare in repo/log/screenshot;
- rotazione programmata almeno trimestrale per provider/payment quando praticabile;
- webhook secret separato per staging/production;
- chiave cifratura con piano di rotazione documentato.
