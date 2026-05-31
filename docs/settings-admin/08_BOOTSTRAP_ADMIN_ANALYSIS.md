# 08 — Bootstrap Admin Analysis

## Esigenza

Alla prima installazione serve un modo sicuro e ripetibile per creare il primo Super Admin senza usare seed manuali fragili, query dirette o utenti hardcoded.

## Rischi

- Creazione ripetuta di admin non autorizzati.
- Password o hash nei log.
- Bootstrap lasciato attivo in produzione.
- Account admin senza cambio password.
- Mancanza di audit su chi/cosa ha creato l'utente iniziale.

## Strategia consigliata

Il bootstrap deve funzionare solo se:

- non esiste alcun utente `super_admin` attivo;
- `BOOTSTRAP_ADMIN_ENABLED=true` e' impostato esplicitamente;
- email, nome e password/hash sono presenti;
- l'ambiente non e' production oppure e' presente una conferma aggiuntiva `BOOTSTRAP_PRODUCTION_CONFIRM=true`.

Dopo la creazione:

- l'utente deve avere `mustChangePassword=true`;
- viene scritto audit `bootstrap_admin_created`;
- l'app deve raccomandare la disattivazione della variabile bootstrap;
- la password non deve mai essere loggata.

## Alternative valutate

### Creazione manuale DB

Semplice, ma fragile e non auditabile.

### Seed sempre attivo

Pericoloso. Rischia di ricreare account o lasciare credenziali note.

### CLI one-shot

Buona soluzione futura. Per MVP si puo' partire da bootstrap controllato + comando successivo.

## Output atteso M15B-P

- Blueprint comando/servizio bootstrap.
- Regole ENV minime.
- Audit event.
- UI admin per verificare stato bootstrap, non per visualizzare segreti.

## Output atteso M15B-S

- `BootstrapAdminService`.
- Seed/command one-shot.
- Guard contro duplicazione.
- QA che fallisce se password viene loggata o se bootstrap e' attivo di default.
