# Team management implementation

Ruoli customer MVP:

- owner
- admin
- analyst
- billing
- viewer

## Regole

- Owner puo' assegnare tutti i ruoli.
- Admin non puo' assegnare owner.
- Analyst, billing e viewer non possono gestire ruoli.
- Invito e cambio ruolo richiedono reason descrittiva.
- Ultimo owner non puo' essere degradato.

## Prossimi step

- UI interattiva reale collegata alle API.
- Revoca inviti.
- Disabilitazione membership.
- Trasferimento ownership guidato.
- Notifiche email.
