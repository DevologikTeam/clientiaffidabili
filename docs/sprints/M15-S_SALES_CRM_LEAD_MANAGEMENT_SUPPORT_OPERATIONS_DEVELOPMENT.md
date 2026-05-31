# M15-S — Sales CRM, Lead Management & Support Operations Development

## Obiettivo

Implementare il runtime MVP del CRM commerciale e supporto operativo.

## Incluso

- Modulo NestJS `SalesCrmModule`.
- Contact inbox persistente.
- Form pubblico `/contatti`.
- Salvataggio messaggio prima dell'invio email.
- Stato consegna email `pending/sent/failed/skipped`.
- Lead commerciali.
- Opportunita commerciali.
- Ticket CRM/supporto.
- Admin CRM `/admin/crm`.
- Inbox `/admin/crm/inbox`.
- Lead `/admin/crm/leads`.
- Ticket `/admin/crm/tickets`.
- Hash IP e user agent su messaggi contatto con minimizzazione.

## Decisioni

1. Il messaggio contatto e' la fonte primaria: viene salvato sempre prima dell'invio email.
2. L'email e' un canale di notifica, non l'unica copia operativa.
3. I contenuti report e raw payload provider non entrano nel CRM commerciale.
4. Errori email vengono resi visibili in admin e preparano l'integrazione futura con Operational Error Ledger M15B.
5. IP e user agent sono dati tecnici/audit: retention e visualizzazione vanno limitate.

## Handoff

Il prossimo modulo M15B dovra collegare:

- kill switch acquisti;
- admin bootstrap;
- settings pagamenti/Openapi/OpenAI;
- operational error ledger;
- salvataggio IP acquisto;
- rimborsi guidati da errori tracciati.
