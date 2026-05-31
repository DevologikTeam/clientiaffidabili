# Local Network Access Guard

Le pagine pubbliche non devono eseguire chiamate browser verso `localhost`, `127.0.0.1`, IP privati, hostname Docker (`api`, `postgres`) o endpoint interni.

## Regola

- Browser: solo same-origin, ad esempio `/api/...`.
- Next server route: può usare `INTERNAL_API_URL=http://api:3001`.
- API interna: non deve essere esposta come `NEXT_PUBLIC_*`.

## Motivo

Chrome può mostrare un prompt di Local Network Access quando un sito pubblico prova a collegarsi a servizi sul dispositivo o sulla rete locale dell'utente. Per un sito commerciale pubblico questo genera sfiducia.

## Gate

```bash
node scripts/qa-local-network-access-guards.js
```
