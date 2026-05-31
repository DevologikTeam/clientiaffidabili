# 17 — Bootstrap Admin Workflow Blueprint

## Obiettivo

Garantire la creazione del primo super admin senza lasciare backdoor permanenti.

## Flusso previsto

1. Al primo avvio il backend verifica se esiste almeno un `super_admin` attivo.
2. Se non esiste, abilita una modalita' bootstrap limitata.
3. La creazione richiede variabili temporanee di bootstrap o comando CLI protetto.
4. Dopo la creazione, la modalita' bootstrap viene disabilitata automaticamente.
5. Ogni tentativo successivo viene tracciato come evento security.

## Regole

- Il bootstrap non deve funzionare se esiste gia' un super admin attivo.
- Nessuna password admin deve essere committata nel repository.
- Il token bootstrap deve avere scadenza breve.
- Tutti i tentativi devono finire nell'audit log.
- MFA admin resta blocker pre-go-live, anche se non implementata in M15B-S.

## Handoff tecnico

Creare in M15B-S:

- `BootstrapAdminService`;
- comando/script `bootstrap-admin`;
- endpoint solo se esplicitamente abilitato e protetto;
- evento audit `bootstrap_admin.created`;
- evento audit `bootstrap_admin.rejected_existing_admin`.
