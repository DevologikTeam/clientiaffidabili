# 08 — Email Product Strategy Analysis

## Tesi

ClientiAffidabili.it vende fiducia, report e riduzione dell'incertezza. Le email tecniche devono quindi essere precise, tempestive, sobrie e tracciabili.

Il cliente deve sempre sapere:

1. cosa e' successo;
2. cosa deve fare ora;
3. dove trova il documento o il pagamento;
4. cosa succede se qualcosa non va;
5. come contattare supporto.

## Categorie email

| Categoria | Esempi | From consigliato | Marketing? |
|---|---|---|---|
| Account | verifica email, reset password, invito team | account@clientiaffidabili.it | No |
| Ordini/Pagamenti | ordine, pagamento, rimborso | pagamenti@clientiaffidabili.it | No |
| Documenti/Report | report pronto, PDF disponibile | documenti@clientiaffidabili.it | No |
| Fiscale | fattura, nota credito | fatture@clientiaffidabili.it | No |
| Supporto | ticket aperto/aggiornato | supporto@clientiaffidabili.it | No |
| Partner/API | API key, webhook, limite usage | developer@clientiaffidabili.it | No |
| Marketing opzionale | newsletter, promozioni | news@clientiaffidabili.it | Si |

## Principi copy

- Oggetto chiaro e non allarmistico.
- Una sola azione primaria.
- Nessun claim di solvibilita' garantita.
- Nessun linguaggio tecnico se non utile.
- Chiarezza su limiti e prossime azioni.
- Firma coerente con il brand.

## Casi critici

### Documento pronto

L'email deve spiegare che il documento e' disponibile nell'area cliente e, se abilitato, allegare PDF o fornire link sicuro.

### Invio PDF via email

Preferenza MVP: link sicuro e scadente.

Allegato PDF solo se:

- cliente autenticato e autorizzato;
- report non contiene dati eccessivamente sensibili;
- dimensione accettabile;
- policy admin abilita gli allegati;
- invio e download restano auditati.

### Recupero password

Token monouso, scadenza breve, nessuna conferma se email inesistente, rate limit e audit.

### Remember me

La funzione ricordami deve estendere la sessione in modo controllato, non deve aumentare privilegi e deve essere revocabile.

## Non obiettivi M18

- Newsletter marketing completa.
- Marketing automation avanzata.
- Template builder drag-and-drop.
- Invio massivo.
- SMS/WhatsApp.
