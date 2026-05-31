# Browser permission prompt guard — v0.75.5

## Perché

Su pagine pubbliche e homepage non devono comparire popup browser che chiedono di accedere ad altri servizi, app o credenziali del dispositivo. Anche quando la richiesta nasce da API moderne come WebAuthn, FedCM o credential management, l'effetto percepito dal cliente finale è invasivo e riduce fiducia.

## Regola prodotto

- Nessun prompt automatico su homepage, servizi, prezzi, guide, contatti o checkout.
- Nessuna chiamata a `navigator.credentials`, `PublicKeyCredential`, FedCM o passkey in codice pubblico.
- Eventuali passkey future saranno solo su click esplicito in area login/account e dopo specifica UX dedicata.
- Le pagine pubbliche inviano `Permissions-Policy` restrittiva per bloccare richieste automatiche a credenziali, identità federate e altri permessi non necessari.

## Interventi tecnici

- `next.config.mjs` imposta `Permissions-Policy` globale con `publickey-credentials-get=()` e `identity-credentials-get=()`.
- Form login/registrazione/invito hanno `autocomplete` espliciti standard: `username`, `current-password`, `new-password`, senza `webauthn`.
- Il gate `qa-browser-permission-public-guards.js` blocca regressioni.
