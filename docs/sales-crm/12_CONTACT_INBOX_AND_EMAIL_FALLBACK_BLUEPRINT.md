# 12 — Contact Inbox & Email Fallback Blueprint

## Regola principale

Il messaggio deve essere salvato nel database **prima** di qualsiasi invio email.

Flusso:

1. Validazione input minima.
2. Creazione `ContactMessage` con stato `new`.
3. Audit `contact_message_created`.
4. Tentativo invio email transazionale.
5. Se l'email va a buon fine: `emailDeliveryStatus=sent`.
6. Se l'email fallisce: `emailDeliveryStatus=failed` + creazione `OperationalErrorEvent`.
7. Notifica admin interna o badge nella CRM inbox.

## Perché

- Nessuna richiesta deve andare persa se il provider email fallisce.
- Il team può leggere e gestire i messaggi da admin.
- È possibile dimostrare quando il messaggio è arrivato.
- Gli errori email diventano analizzabili e risolvibili.

## Stato messaggio

| Stato | Significato |
|---|---|
| `new` | appena ricevuto |
| `triage` | in valutazione |
| `linked_to_lead` | convertito in lead |
| `linked_to_ticket` | convertito in ticket |
| `spam` | marcato come spam |
| `archived` | archiviato |

## Anti-abuse

- honeypot;
- rate limit per IP/email;
- blocco link-heavy;
- user agent salvato solo se utile ad antifrode/debug;
- IP in chiaro solo se strettamente necessario e con retention; preferire hash o storage protetto.
