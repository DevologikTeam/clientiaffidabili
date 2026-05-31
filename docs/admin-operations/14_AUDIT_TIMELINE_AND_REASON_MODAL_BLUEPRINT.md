# Audit timeline and reason modal blueprint

## Audit timeline

La timeline audit deve essere leggibile da operatori non sviluppatori.

### Campi mostrati

- data/ora;
- attore;
- ruolo;
- azione;
- entità collegata;
- severità;
- motivo se presente;
- risultato;
- riferimento audit.

### Severità

- `info`: consultazione o evento ordinario;
- `warning`: anomalia non bloccante;
- `high`: azione economica, provider, report o compliance;
- `critical`: rischio sicurezza, privacy o doppio costo.

## Reason modal

Usata per azioni critiche.

### Componenti

1. Titolo azione.
2. Riepilogo item.
3. Cosa succede dopo.
4. Motivo obbligatorio.
5. Categoria motivo.
6. Checkbox conferma guardrail.
7. Preview audit event.
8. CTA esplicita.

### Categorie motivo

- `customer_request`;
- `provider_error`;
- `billing_reconciliation`;
- `compliance_review`;
- `data_quality_issue`;
- `manual_override`;
- `security_incident`;
- `other`.

## Esempio copy

### Retry provider

Titolo: `Ripeti richiesta provider sicura`

Messaggio: `Questa azione può generare un nuovo tentativo verso il fornitore dati. Procedi solo se il precedente tentativo non ha prodotto costo o se il retry è classificato come sicuro.`

Checkbox: `Confermo che il retry rispetta le regole di idempotenza e non espone il cliente a un doppio addebito.`

### Pubblica report

Titolo: `Pubblica report al cliente`

Messaggio: `Il report diventerà visibile nell'area cliente. Verifica che fonte, limiti, score e autorizzazione cliente siano corretti.`

Checkbox: `Confermo che il report è stato revisionato e può essere mostrato al cliente autorizzato.`

## Regola audit preview

Prima dell'azione, la UI mostra una preview:

```text
Evento audit: report.publish
Severità: high
Attore: ruolo corrente
Motivo: obbligatorio
Entità: report + ordine collegato
```

## Anti-pattern

- Reason generica come `ok`, `test`, `fix`.
- Conferme senza impatto operativo.
- Audit nascosto dopo azione.
- Stack trace in timeline.
- Payload provider in timeline standard.
