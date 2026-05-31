# 02 — Bootstrap Admin & Purchase Kill Switch Blueprint

## Bootstrap admin

Serve un utente admin iniziale creato in modo sicuro al primo avvio o tramite comando seed controllato.

Variabili bootstrap iniziali:

- `BOOTSTRAP_ADMIN_EMAIL`
- `BOOTSTRAP_ADMIN_NAME`
- `BOOTSTRAP_ADMIN_PASSWORD` oppure `BOOTSTRAP_ADMIN_PASSWORD_HASH`
- `BOOTSTRAP_ADMIN_CREATE_ON_START=false` di default

Regole:

- creare l'admin solo se non esiste alcun super admin;
- forzare cambio password al primo login;
- audit `bootstrap_admin_created`;
- disabilitare bootstrap dopo creazione;
- mai loggare password o hash.

## Purchase kill switch

Settings server-side:

- `commerce.purchases.enabled`
- `commerce.purchases.disabledReason`
- `commerce.purchases.disabledUntil?`
- `commerce.checkout.visibleWhenDisabled` per permettere pagina informativa ma non pagamento.

Comportamento:

- se disabilitato, nessuna sessione pagamento viene creata;
- il frontend mostra messaggio chiaro;
- admin può riattivare con reason;
- audit obbligatorio;
- eventuali ordini già pagati continuano il lifecycle.

## Copy pubblico

> Gli acquisti sono temporaneamente sospesi. Le verifiche già acquistate restano in lavorazione. Puoi lasciare una richiesta e ti aggiorneremo appena il checkout sarà riattivato.
