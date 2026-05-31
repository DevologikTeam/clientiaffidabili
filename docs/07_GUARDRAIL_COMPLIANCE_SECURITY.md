# Guardrail compliance, sicurezza e prodotto

## Guardrail non negoziabili

1. Nessuna chiave provider nel frontend.
2. Nessun dato carta gestito direttamente dalla piattaforma: usare checkout hosted/certificato.
3. Nessun dato demo/fake in produzione reale.
4. Ogni verifica deve avere audit log.
5. Ogni report deve avere fonte, timestamp, prodotto, stato e disclaimer.
6. Ogni chiamata provider deve essere associata a ordine, organizzazione e utente.
7. Ogni query deve rispettare `organization_id`.
8. I dati personali devono avere base giuridica/uso lecito dichiarato.
9. I risultati non devono essere presentati come verdetti assoluti.
10. Le azioni rischiose devono richiedere conferma.

## GDPR e dati persona

Prima del go-live su servizi persona, KYC, AML, adverse media:

- definire titolare/responsabile;
- DPA con provider;
- retention;
- informativa;
- base giuridica;
- log accessi;
- eventuale DPIA se necessario;
- processo contestazione/esercizio diritti.

## Sicurezza applicativa

- Password hash con algoritmo moderno.
- MFA in roadmap per account admin/team.
- Rate limit per endpoint pubblici.
- Webhook con firma verificata.
- Idempotency key per checkout e provider callback.
- Logging senza PII sensibile in chiaro.
- Cifratura segreti tramite variabili ambiente/Coolify secrets.
- Backup PostgreSQL e restore testato.

## Compliance commerciale

Prima della vendita:

- condizioni d’uso;
- privacy policy;
- cookie policy;
- condizioni rimborso;
- clausola uso lecito;
- disclaimer fonti dati;
- limiti SLA;
- istruzioni per rettifica/assistenza.

## Regola UI

La UI cliente non deve mostrare termini interni come:

- provider adapter;
- tenant scoped;
- callback;
- feature flag;
- audit interno;
- Openapi token;
- stack tecnico.

Questi concetti restano in admin, log o documentazione interna.
