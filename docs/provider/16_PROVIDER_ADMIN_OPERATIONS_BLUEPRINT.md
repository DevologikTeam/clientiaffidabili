# Provider admin operations blueprint

## Obiettivo

L'area admin deve permettere al team operativo di capire cosa è bloccato, perché, qual è l'impatto cliente e quale azione sicura è disponibile.

## Queue principali

1. **In attesa provider**: richieste inviate e non ancora concluse.
2. **Da verificare**: payload parziali, incongruenze, mapping incerto.
3. **Errori provider**: timeout, rate limit, auth, unavailable.
4. **Costo/margine**: richieste bloccate da cost guard.
5. **Compliance review**: KYB/AML/PEP/sanzioni o uso lecito da verificare.

## Colonne admin

- ordine;
- prodotto;
- provider;
- stato;
- tempo trascorso;
- costo snapshot;
- tentativi;
- motivo blocco;
- prossima azione sicura;
- SLA interno.

## Azioni consentite

| Azione | Quando | Guardrail |
|---|---|---|
| Retry | errore tecnico safe | stessa idempotency key. |
| Segna manual review | dato ambiguo | obbligatorio motivo. |
| Richiedi support provider | errore paid/contrattuale | allegare providerRequestId interno. |
| Completa manualmente | servizio manual-assisted | allegare evidenza e fonte. |
| Rimborso se non consumato | provider non chiamato | passa da billing/refund. |
| Blocca report | compliance high-risk | audit e reason obbligatori. |

## Copy admin consigliato

- “La richiesta è ferma perché il provider non ha ancora restituito esito.”
- “Il costo stimato supera la soglia massima configurata.”
- “La risposta contiene dati parziali: serve controllo operativo prima del report.”
- “Il provider ha restituito errore dopo consumo: valutare supporto provider o gestione cliente.”

## Cosa non fare

- Non mostrare raw payload completo nella tabella.
- Non permettere retry infinito.
- Non permettere override costo senza ruolo autorizzato.
- Non permettere completamento manuale senza fonte/evidenza.
- Non mostrare al cliente dettagli tecnici provider.
