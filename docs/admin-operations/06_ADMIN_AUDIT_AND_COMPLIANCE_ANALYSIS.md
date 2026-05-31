# Admin audit and compliance analysis

## Eventi audit obbligatori

- Login admin e cambio ruolo/sessione.
- Apertura report sensibile.
- Apertura raw payload vault.
- Cambio stato ordine.
- Retry provider.
- Override price guard.
- Pubblicazione report.
- Blocco report.
- Creazione rimborso.
- Chiusura dispute.
- Modifica fattura/stato fiscale.
- Risposta ticket con dati sensibili.

## Campi minimi audit

- `id`.
- `actorId`.
- `actorRole`.
- `action`.
- `entityType`.
- `entityId`.
- `severity`.
- `reason` obbligatoria per azioni critiche.
- `beforeSnapshot` redatto.
- `afterSnapshot` redatto.
- `ipHash` o metadata sicurezza.
- `createdAt`.

## Severity

- `info`: consultazione o evento ordinario.
- `warning`: stato anomalo ma non critico.
- `high`: azione economica, compliance o pubblicazione.
- `critical`: possibile violazione sicurezza/privacy o doppio addebito.

## Compliance copy interno

Anche l'admin deve usare linguaggio prudente:

- “indice di attenzione”, non “certezza di insolvenza”;
- “evidenza disponibile”, non “verità definitiva”;
- “dati insufficienti”, non “cliente affidabile per assenza di dati negativi”.

## Retention

La retention deve essere parametrica e documentata. Il progetto non deve cancellare audit critici senza policy esplicita.
