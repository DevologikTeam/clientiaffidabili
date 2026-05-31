# Provider Request Lifecycle Analysis

## Stati logici

| Stato | Significato | Owner |
|---|---|---|
| `not_started` | Ordine non ancora pagato o non pronto | system |
| `queued_after_payment` | Pagamento confermato, controllo in coda | system |
| `validated` | Input e scopo lecito verificati | system |
| `sent_to_provider` | Richiesta inoltrata al provider | system |
| `waiting_provider` | Attesa callback/polling/risultato manuale | provider |
| `received` | Payload ricevuto | system |
| `normalizing` | Conversione in modello interno | system |
| `completed` | Risultato pronto per report | system |
| `requires_review` | Serve controllo umano | support/admin |
| `retry_scheduled` | Retry programmato e sicuro | system |
| `failed` | Errore non recuperabile | support/admin |
| `cancelled` | Richiesta annullata prima dell'invio provider | system/admin |

## Sequenza MVP

```text
Payment succeeded webhook
  → create Check
  → create ProviderRequest with idempotency key
  → validate input
  → freeze provider cost snapshot
  → call provider or keep mock disabled/enabled by env
  → receive response/callback
  → normalize
  → create report draft
  → mark report ready or requires_review
```

## Idempotenza

La chiave deve essere stabile e non basata sul tempo:

```text
provider:openapi:order:{orderId}:check:{checkId}:product:{productCode}:mapping:{mappingVersion}
```

Una seconda esecuzione con la stessa chiave non deve creare doppio addebito provider né doppio report.

## Tempi e SLA interni

| Modalità | Esempio | SLA UI |
|---|---|---|
| sync | IBAN, email, company start | pochi secondi/minuti |
| async polling | company pro, bilancio | minuti/ore dichiarati |
| async callback | servizi provider asincroni | fino a completamento provider |
| manual assisted | servizi lenti o incerti | tempi indicati, gestione supporto |

## Cancellazione e rimborso

- Prima dell'invio provider: rimborso più semplice.
- Dopo invio provider a costo: rimborso manual review.
- Dopo report completato: rimborso solo su errore documentato o policy commerciale.

## Audit minimo

Ogni richiesta provider deve registrare:

- ordine;
- check;
- prodotto;
- mapping version;
- costo stimato;
- costo effettivo se disponibile;
- stato;
- request timestamp;
- response timestamp;
- error category;
- retry decision;
- user/admin/system actor.

