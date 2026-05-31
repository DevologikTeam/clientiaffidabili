# Approval and Audit Workflow Blueprint

## Workflow

```text
request -> generate -> validate -> draft -> review -> approve/apply OR discard -> audit
```

## Stati bozza

| Stato | Descrizione |
|---|---|
| `draft` | generata, non ancora vista |
| `needs_review` | richiede revisione esplicita |
| `approved` | approvata da admin |
| `applied` | applicata a CMS/ticket/note |
| `discarded` | scartata |
| `blocked` | bloccata da policy |
| `expired` | scaduta |

## Azioni con reason obbligatoria

- approvare output per pagina pubblica;
- applicare risposta supporto;
- usare sintesi errore per rimborso/fix;
- superare warning claim;
- rigenerare oltre soglia budget.

## Audit payload

L'audit non deve salvare prompt/output completi se `logPromptOutputMode=metadata_only`.

Salvare sempre:

- use case;
- prompt key/version;
- schema key/version;
- modello;
- input/output token stimati;
- costo stimato;
- risultato validation;
- admin actor;
- reason;
- target entity;
- draft hash.
