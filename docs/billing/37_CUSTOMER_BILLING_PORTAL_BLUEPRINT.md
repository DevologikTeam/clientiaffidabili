# Customer Billing Portal Blueprint

## Scopo

Disegnare l'esperienza cliente per pagamenti, fatture, abbonamenti, crediti e richieste di rimborso.

## Route future

| Route | Funzione |
|---|---|
| `/dashboard/fatture` | ordini, fatture, pagamenti |
| `/dashboard/abbonamento` | piano attivo, rinnovo, cancellazione |
| `/dashboard/crediti` | saldo e movimenti crediti |
| `/dashboard/rimborsi` | richieste e stato rimborsi |

## Copy customer

- "Puoi richiedere una verifica del rimborso: ti mostriamo subito se e' gestibile automaticamente o se serve controllo interno." 
- "Se il report e' gia' stato prodotto o scaricato, il rimborso potrebbe non essere disponibile." 
- "Se hai un abbonamento, puoi interrompere il rinnovo alla fine del periodo." 
- "I crediti gia' usati per richiedere un report non vengono riaccreditati automaticamente."

## Stato rimborso customer-facing

| Stato tecnico | Label cliente |
|---|---|
| `requested` | Richiesta ricevuta |
| `policy_review` | Stiamo verificando la richiesta |
| `approved` | Rimborso approvato |
| `provider_pending` | Rimborso inviato al gestore pagamento |
| `succeeded` | Rimborso avviato/confermato |
| `failed` | Serve assistenza |
| `rejected` | Rimborso non disponibile |

## UX rules

- Mostrare importo e motivo, non dettagli tecnici provider.
- Non promettere tempi bancari certi.
- Mostrare riferimento rimborso solo se disponibile.
- Per subscription, distinguere cancellazione rinnovo da rimborso.
- Per crediti, mostrare saldo, scadenza e consumi.

## Guardrail

- Cliente non puo' forzare refund provider.
- Cliente non vede raw gateway data.
- Richiesta rimborso crea work item se non automatica.
- Le policy bloccanti devono spiegare motivo e prossimo passo.
