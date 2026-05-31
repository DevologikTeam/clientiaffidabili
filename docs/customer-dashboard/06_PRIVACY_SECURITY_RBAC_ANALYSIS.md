# Customer Dashboard — Privacy, Security & RBAC Analysis

## Dati visibili al cliente

La dashboard espone dati commerciali e potenzialmente sensibili relativi a verifiche aziendali. Serve una separazione rigida tra:

- dati account;
- ordini;
- billing;
- report;
- evidenze;
- download;
- supporto.

## Regole di accesso

1. Un utente vede solo risorse del proprio account/tenant.
2. Gli operatori interni vedono dati solo in console admin, con audit.
3. Le verifiche su persona fisica richiedono policy dedicata e non sono MVP consumer.
4. Il raw payload provider non è mai visibile al cliente.
5. I log tecnici non sono visibili al cliente.

## Ruoli customer candidati

| Ruolo | Permessi |
|---|---|
| Owner | vede ordini, report, fatture, utenti e impostazioni |
| Admin | vede ordini, report e supporto |
| Analyst | vede report e verifiche, non billing |
| Billing | vede ordini, pagamenti e fatture, non contenuto report sensibile |
| Viewer | sola lettura report autorizzati |

MVP può partire con `owner` e `member`, ma il data model deve essere compatibile con ruoli futuri.

## Audit eventi customer

- login;
- apertura report;
- download report;
- creazione ordine;
- completamento pagamento;
- apertura ticket supporto;
- modifica dati fatturazione;
- invito utente;
- cambio ruolo.

## Privacy by design

- minimizzazione dati nella lista dashboard;
- dati completi solo nel dettaglio autorizzato;
- mascheramento parziale identificativi quando non necessari;
- retention configurabile;
- export e cancellazione da valutare con legale/compliance;
- separazione report snapshot e raw provider vault.

## Rischi

| Rischio | Mitigazione |
|---|---|
| Utente vede report di altro account | tenant scope obbligatorio su ogni query |
| Link report condiviso senza auth | link pubblici vietati nel MVP |
| Download non tracciato | audit obbligatorio |
| Supporto vede troppo | RBAC admin e reason code |
| Email espone contenuti report | email solo notifica, non dati sensibili |

## Guardrail permanente

La dashboard non deve diventare un deposito di dati grezzi. Deve esporre solo informazioni necessarie al cliente per leggere stato, report, ordini e prossime azioni.
