# 09 — Purchase Kill Switch Analysis

## Esigenza

Il Super Admin deve poter disabilitare temporaneamente gli acquisti, per esempio in caso di:

- problemi Stripe/PayPal;
- errori margine/prezzi;
- provider Openapi non disponibile;
- rischio compliance;
- bug checkout/report;
- manutenzione programmata.

## Principio chiave

Il kill switch deve bloccare **solo la creazione di nuovi pagamenti/acquisti**. Non deve bloccare:

- consultazione report gia' acquistati;
- lavorazione di ordini gia' pagati;
- download fatture;
- supporto;
- rimborsi;
- admin operations.

## Stati proposti

- `enabled`: acquisti attivi;
- `disabled_manual`: disabilitati manualmente;
- `disabled_provider_incident`: disabilitati per incidente provider;
- `disabled_margin_guard`: disabilitati per margine/prezzo;
- `disabled_compliance_review`: disabilitati per review legale/compliance;
- `disabled_maintenance`: manutenzione.

## UX pubblico

Il sito deve mostrare:

- motivo breve e rassicurante;
- conferma che ordini gia' acquistati restano validi;
- alternativa: contatto o richiesta assistita;
- nessun dettaglio tecnico interno.

Copy consigliato:

> Gli acquisti sono temporaneamente sospesi. Le verifiche gia' acquistate restano in lavorazione. Puoi inviarci una richiesta e ti avviseremo appena il checkout sara' riattivato.

## Guardrail backend

Il blocco deve stare nel backend, non solo in UI:

- `POST /checkout/session` controlla setting server-side;
- partner API check paid controlla setting server-side;
- subscription purchase controlla setting server-side;
- retry pagamento non deve creare nuova sessione se blocco attivo, salvo override admin.

## Audit

Ogni cambio deve salvare:

- precedente stato;
- nuovo stato;
- reason;
- admin actor;
- timestamp;
- eventuale scadenza;
- impatto stimato.
