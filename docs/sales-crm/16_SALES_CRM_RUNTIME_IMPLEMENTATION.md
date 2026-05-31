# Sales CRM runtime implementation

Il runtime CRM introduce un flusso save-first per tutti i messaggi di contatto.

## Flusso contatto

1. Utente compila form pubblico.
2. API valida consenso privacy.
3. API salva `ContactMessage`.
4. API tenta consegna email, se configurata.
5. Stato consegna viene aggiornato sul messaggio.
6. Admin qualifica il messaggio come lead, ticket, spam o archivio.

## Perche'

Questo evita perdita di richieste se SMTP/provider email non risponde e prepara la console operativa per CRM e supporto.
