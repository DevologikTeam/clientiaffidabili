# 10 — Sales CRM Experience Blueprint

## Principio UX

La console CRM deve essere una cabina di regia operativa, non una lista dispersiva. Ogni riga deve rispondere a:

- chi ha scritto;
- da dove arriva;
- cosa vuole;
- quanto è urgente;
- chi deve rispondere;
- qual è la prossima azione sicura.

## Route admin MVP

| Route | Scopo |
|---|---|
| `/admin/crm` | home CRM con priorità e metriche |
| `/admin/crm/inbox` | messaggi contatto, demo, partner/API e supporto in ingresso |
| `/admin/crm/leads` | lead commerciali |
| `/admin/crm/leads/[id]` | scheda lead |
| `/admin/crm/opportunities` | opportunità commerciali |
| `/admin/crm/tickets` | ticket supporto |
| `/admin/crm/tickets/[id]` | dettaglio ticket |
| `/admin/crm/templates` | template risposta |
| `/admin/settings` | settings trasversali piattaforma |

## Home CRM

La home mostra quattro blocchi:

1. **Da rispondere ora** — nuovi contatti, demo, ticket P0/P1.
2. **Da qualificare** — lead senza owner o senza stato.
3. **Da sbloccare** — ticket collegati a errori pagamento/provider/OpenAI.
4. **Da seguire** — opportunità con follow-up scaduto.

## Contact inbox

Ogni form pubblico crea prima un record persistente `ContactMessage`, poi tenta l'invio email. Se l'email fallisce, il messaggio resta leggibile in admin e viene creato un errore operativo.

## Copy admin

Usare copy operativo:

- “Rispondi al messaggio”;
- “Qualifica richiesta”;
- “Crea opportunità”;
- “Converti in ticket”;
- “Collega a ordine/report”;
- “Segna come spam”.

Evitare copy tecnico come “payload”, “webhook”, “provider exception” nelle viste base. I dettagli tecnici devono stare in pannelli avanzati e redatti.
