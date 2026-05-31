# 09 — Email Event Inventory Analysis

## Account e sicurezza

| Evento | Trigger | Destinatario | Priorita' | Note |
|---|---|---|---|---|
| `account.registered` | registrazione completata | utente | alta | Benvenuto + verifica se non gia' fatta |
| `account.email_verification_requested` | creazione/verifica email | utente | alta | Link scadenza breve |
| `account.email_verified` | verifica completata | utente | media | Conferma semplice |
| `auth.password_reset_requested` | richiesta reset | utente | critica | Messaggio neutro anti enumeration |
| `auth.password_changed` | password modificata | utente | critica | Alert sicurezza |
| `auth.remember_me_enabled` | attivazione ricordami | utente | media | Solo se policy lo richiede |
| `team.invitation_sent` | invito team | invitato | alta | Token monouso |
| `team.role_changed` | cambio ruolo | utente coinvolto | alta | Motivo e ruolo nuovo |

## Acquisti, pagamenti e rimborsi

| Evento | Trigger | Destinatario | Priorita' | Note |
|---|---|---|---|---|
| `order.created` | ordine creato | cliente | media | Non promettere report pronto |
| `payment.succeeded` | webhook pagamento OK | cliente | critica | Ricevuta pagamento e prossimi passi |
| `payment.failed` | provider payment failed | cliente | critica | Azione richiesta |
| `payment.action_required` | 3DS/SCA o metodo da completare | cliente | critica | Link checkout sicuro |
| `refund.requested` | richiesta rimborso | cliente | alta | Stato iniziale |
| `refund.approved` | approvazione rimborso | cliente | alta | Tempi indicativi |
| `refund.rejected` | rifiuto motivato | cliente | alta | Copy prudente |
| `dispute.opened` | chargeback/dispute | admin | critica | Cliente solo se necessario |

## Report, documenti e PDF

| Evento | Trigger | Destinatario | Priorita' | Note |
|---|---|---|---|---|
| `report.processing` | provider started | cliente | media | Solo se utile |
| `report.ready` | report published | cliente | critica | Link area cliente |
| `report.requires_review` | dati ambigui | admin | alta | Non cliente salvo ritardo |
| `pdf.ready` | PDF generato | cliente | alta | Link sicuro |
| `pdf.sent` | PDF inviato | cliente | alta | Allegato o link |
| `pdf.delivery_failed` | errore invio | admin | alta | Ledger + possibile retry |

## Fiscale

| Evento | Trigger | Destinatario | Priorita' | Note |
|---|---|---|---|---|
| `invoice.available` | fattura pronta | cliente | alta | Link area cliente |
| `credit_note.available` | nota credito pronta | cliente | alta | Link area cliente |
| `tax_profile.requires_review` | profilo incompleto | cliente/admin | alta | Azione richiesta |

## Supporto e contatti

| Evento | Trigger | Destinatario | Priorita' | Note |
|---|---|---|---|---|
| `contact.received` | form contatto salvato | utente | media | Conferma ricezione |
| `support.ticket_created` | ticket creato | cliente | media | Numero ticket |
| `support.ticket_updated` | risposta staff | cliente | media | Link ticket |
| `support.ticket_closed` | chiusura ticket | cliente | bassa | Feedback opzionale |

## Partner/API

| Evento | Trigger | Destinatario | Priorita' | Note |
|---|---|---|---|---|
| `partner.api_key_created` | nuova chiave | partner | alta | Secret mostrato una volta in UI, non email |
| `partner.api_key_revoked` | revoca | partner | alta | Audit |
| `partner.usage_limit_warning` | soglia vicina | partner | media | No spam |
| `partner.webhook_failed` | webhook partner KO | partner/admin | alta | Diagnostica minima |
