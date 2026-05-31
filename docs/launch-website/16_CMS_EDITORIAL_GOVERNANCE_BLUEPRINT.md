# 16 — CMS Editorial Governance Blueprint

## Workflow

```text
Draft -> Review -> Published -> Archived
```

## Ruoli

| Ruolo | Permessi |
|---|---|
| SEO editor | crea/modifica bozza |
| Compliance reviewer | approva limiti/claim/privacy |
| Marketing lead | approva posizionamento e CTA |
| Super admin | pubblica, archivia, rollback |

## Checklist pubblicazione

- title unico;
- meta description presente;
- H1 unico;
- risposta breve iniziale;
- sezione limiti presente;
- CTA coerente;
- internal links presenti;
- claim vietati assenti;
- schema coerente;
- nessun dato reale non autorizzato;
- stato `published` solo dopo review.

## Versioning

Ogni pubblicazione deve creare una versione con:

- snapshot contenuto;
- autore;
- reviewer;
- reason;
- hash;
- data pubblicazione;
- differenze rispetto alla versione precedente.

## Rollback

Rollback ammesso solo a una versione `published` precedente e con reason obbligatoria.

## AI-assisted content futuro

Eventuali testi generati o assistiti da AI devono essere:

- revisionati da umano;
- controllati per claim;
- controllati per accuratezza;
- resi coerenti con legal pack;
- mai pubblicati automaticamente.
