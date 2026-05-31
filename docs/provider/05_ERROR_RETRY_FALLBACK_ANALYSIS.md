# Error, Retry & Fallback Analysis

## Tassonomia errori

| Categoria | Esempio | Azione |
|---|---|---|
| `validation` | partita IVA mancante o formato IBAN errato | blocco prima del provider |
| `authentication` | token provider scaduto | retry tecnico dopo refresh, alert admin |
| `authorization` | servizio non abilitato dal contratto | blocco servizio, admin review |
| `rate_limit` | troppe chiamate | retry con backoff, queue |
| `timeout` | rete o provider lento | retry solo se sicuro/idempotente |
| `provider_unavailable` | downtime provider | queue + comunicazione prudente |
| `not_found` | soggetto non trovato | risultato normalizzato, non errore tecnico |
| `ambiguous_subject` | più aziende possibili | richiesta chiarimento/manual review |
| `paid_provider_error` | credito consumato ma payload mancante | support/admin review |
| `normalization_error` | payload inatteso | blocco report + admin review |
| `compliance_block` | scopo non lecito o dati non ammessi | blocco senza provider call |
| `unknown` | errore non classificato | support required |

## Retry decision

| Decisione | Quando |
|---|---|
| `none` | errore finale o risultato valido |
| `safe_retry` | errore temporaneo prima dell'addebito/accettazione provider |
| `manual_review` | risultato ambiguo, servizio paid incerto, payload parziale |
| `refund_review` | pagamento cliente confermato ma servizio non erogabile |
| `support_required` | errore non classificato o possibile bug |

## Fallback

Nel MVP il fallback non deve chiamare automaticamente un secondo provider a costo. La strategia corretta è:

1. prova provider primario;
2. se errore recuperabile, retry controllato;
3. se errore non recuperabile, manual review;
4. solo in futuro, fallback multi-provider con cost guard e consenso interno.

## Comunicazione cliente

La UI non deve mostrare dettagli tecnici come token, endpoint, 500 provider o payload. Deve mostrare:

- "Stiamo completando la verifica";
- "Serve un controllo manuale";
- "Il dato inserito non è sufficiente";
- "Il servizio non è temporaneamente disponibile";
- "Ti aggiorneremo quando il report sarà pronto".

## Alert admin

Ogni errore provider deve generare una riga admin con:

- ordine;
- prodotto;
- provider;
- categoria errore;
- retry decision;
- impatto cliente;
- costo stimato/effettivo;
- prossima azione.

