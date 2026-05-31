# M5-P / M5-S Readiness Checklist

## Documentazione provider da ottenere

- [ ] base URL sandbox e production;
- [ ] metodo autenticazione;
- [ ] formato token/scadenza;
- [ ] header richiesti;
- [ ] endpoint per ogni servizio MVP;
- [ ] payload request/response;
- [ ] callback/webhook se presenti;
- [ ] polling/status endpoint se presenti;
- [ ] codici errore;
- [ ] rate limit;
- [ ] idempotenza supportata;
- [ ] costo e regole di addebito per errore/retry;
- [ ] termini di conservazione e uso dati;
- [ ] ambiente test o sandbox;
- [ ] possibilità di disattivare singoli servizi.

## Gate per M5-P

- [ ] Disegnare entity `ProviderRequest`.
- [ ] Disegnare entity `ProviderServiceMapping`.
- [ ] Disegnare provider cost ledger.
- [ ] Disegnare DTO request/response normalizzati.
- [ ] Disegnare admin provider queue.
- [ ] Disegnare provider adapter interface.
- [ ] Disegnare job worker post-payment.
- [ ] Disegnare callback/polling contract.

## Gate per M5-S

- [ ] Implementare provider adapter mock/sandbox-ready.
- [ ] Implementare provider request lifecycle.
- [ ] Implementare idempotency key.
- [ ] Implementare cost snapshot provider.
- [ ] Implementare queue worker base.
- [ ] Implementare error taxonomy.
- [ ] Implementare raw payload guard.
- [ ] Implementare admin provider queue.
- [ ] Implementare QA con fixture provider.

## Blocchi release production

- [ ] credenziali non verificate;
- [ ] documentazione endpoint non validata;
- [ ] costi provider non confermati;
- [ ] servizi paid senza retry policy;
- [ ] raw payload esposto in UI;
- [ ] chiamate provider abilitate prima del pagamento;
- [ ] assenza di audit request provider;
- [ ] assenza di mascheramento PII;
- [ ] report senza fonte/data/limiti.

