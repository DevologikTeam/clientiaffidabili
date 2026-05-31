# Email Event Inventory

## Account e sicurezza

| Codice template | Evento | Destinatario | Trigger | Criticita | Note |
|---|---|---|---|---|---|
| `auth_welcome_verify_email` | Benvenuto + verifica email | nuovo utente | registrazione | alta | token monouso, scadenza 24/48h |
| `auth_email_verified` | Conferma email verificata | utente | verifica completata | media | opzionale, utile per fiducia |
| `auth_password_reset_requested` | Recupero password | utente | richiesta reset | alta | link temporaneo, non rivelare se email esiste |
| `auth_password_changed` | Password modificata | utente | cambio password | alta | include CTA “non sei stato tu?” |
| `auth_login_new_device` | Nuovo dispositivo/accesso sospetto | utente | risk signal | media/alta | post-MVP se device fingerprint disponibile |
| `auth_remember_me_enabled` | Ricordami attivato | utente | login remember-me | media | informativa sicurezza opzionale |
| `auth_team_invite` | Invito team | invitato | invito creato | alta | token monouso, scadenza e ruolo |
| `auth_team_role_changed` | Ruolo modificato | membro | cambio ruolo | media | audit e trasparenza |
| `auth_account_owner_changed` | Cambio owner | vecchio/nuovo owner | trasferimento ownership | alta | reason e audit obbligatori |

## Checkout, acquisti e pagamenti

| Codice template | Evento | Destinatario | Trigger | Criticita | Note |
|---|---|---|---|---|---|
| `checkout_started_optional` | Checkout iniziato | utente | sessione creata | bassa | opzionale, no spam |
| `purchase_order_created` | Ordine creato | buyer/billing email | ordine salvato | media | riepilogo servizio e prezzo |
| `payment_succeeded` | Pagamento riuscito | buyer/billing email | webhook confermato | alta | include ricevuta/stato e prossimi step |
| `payment_failed` | Pagamento fallito | buyer | payment failed | alta | niente dettagli carta sensibili |
| `payment_action_required` | Azione pagamento richiesta | buyer | SCA/azione richiesta | alta | link sicuro checkout/provider |
| `payment_refunded` | Rimborso emesso | buyer/billing email | refund completed | alta | importo, motivo, tempi indicativi |
| `payment_refund_failed` | Rimborso non completato | buyer/admin? | refund failed | alta | al cliente solo messaggio prudente |
| `payment_dispute_opened_internal` | Dispute aperta | admin | provider dispute | alta | interna, non customer by default |

## Report/documenti

| Codice template | Evento | Destinatario | Trigger | Criticita | Note |
|---|---|---|---|---|---|
| `report_processing_started` | Verifica avviata | buyer | pagamento confermato/provider avviato | media | utile per servizi non immediati |
| `report_manual_review` | Verifica in revisione | buyer | dati ambigui/manual review | media | copy rassicurante, niente dettagli interni |
| `report_ready` | Documento/report pronto | buyer | report published | alta | CTA accesso dashboard |
| `report_pdf_ready` | PDF pronto | buyer | PDF generato | alta | link sicuro o allegato se policy consente |
| `report_pdf_attached` | Invio PDF allegato | buyer | admin/customer request | alta | solo se dimensione e policy OK |
| `report_blocked_or_delayed` | Ritardo documento | buyer | provider/manual issue | media | tempi e supporto |
| `report_download_link_expiring` | Link in scadenza | buyer | scadenza link | bassa | opzionale |

## Abbonamenti e crediti

| Codice template | Evento | Destinatario | Trigger | Criticita | Note |
|---|---|---|---|---|---|
| `subscription_started` | Abbonamento attivato | owner/billing | subscription active | alta | piano, crediti, rinnovo |
| `subscription_renewed` | Rinnovo riuscito | billing | invoice/payment succeeded | media | riepilogo |
| `subscription_payment_failed` | Rinnovo fallito | owner/billing | renewal failed | alta | periodo di grazia se previsto |
| `subscription_cancelled` | Abbonamento annullato | owner/billing | cancel | alta | data fine accesso/crediti |
| `credits_low` | Crediti quasi esauriti | owner/admin | soglia crediti | media | no spam, rate limit |
| `credits_added` | Crediti aggiunti | owner/billing | acquisto/ricarica | media | wallet update |

## Fatture/legal

| Codice template | Evento | Destinatario | Trigger | Criticita | Note |
|---|---|---|---|---|---|
| `invoice_available` | Documento fiscale disponibile | billing email | fattura pronta | alta | link dashboard |
| `credit_note_available` | Nota credito disponibile | billing email | nota credito pronta | alta | collegata a rimborso |
| `legal_terms_updated` | Termini aggiornati | account owner | nuova versione importante | media | se serve riaccettazione |
| `legal_acceptance_required` | Accettazione richiesta | owner | azione bloccante | alta | CTA dashboard |

## CRM/supporto

| Codice template | Evento | Destinatario | Trigger | Criticita | Note |
|---|---|---|---|---|---|
| `contact_message_received` | Conferma richiesta contatto | utente | form contatto salvato | media | messaggio salvato anche in admin |
| `support_ticket_created` | Ticket aperto | cliente | ticket creato | media | numero ticket |
| `support_ticket_updated` | Aggiornamento ticket | cliente | risposta/stato | media | no dati sensibili in oggetto |
| `support_ticket_closed` | Ticket chiuso | cliente | chiusura | bassa/media | feedback opzionale |

## Partner/API

| Codice template | Evento | Destinatario | Trigger | Criticita | Note |
|---|---|---|---|---|---|
| `partner_application_received` | Richiesta partner ricevuta | partner | candidatura | media | sandbox-first |
| `partner_api_key_created` | API key creata | partner admin | key created | alta | secret mostrato solo una volta, mai in email |
| `partner_api_key_rotated` | API key ruotata | partner admin | rotate | alta | no secret in email |
| `partner_live_access_approved` | Accesso live approvato | partner admin | admin approval | alta | policy e limiti |
| `partner_usage_threshold` | Soglia usage/crediti | partner admin | soglia | media | rate limit e crediti |

## Email interne/admin

Le email interne devono essere minimizzate se esiste gia' una dashboard admin. Preferire notifiche admin in-app + email solo per P0/P1:

- pagamento bloccato P0;
- provider error dopo pagamento P0;
- report non generabile P0;
- webhook fallito ripetutamente P0;
- bounce su email documento pronto P1;
- errore OpenAI su funzione admin P2/P3, di norma solo ledger.
