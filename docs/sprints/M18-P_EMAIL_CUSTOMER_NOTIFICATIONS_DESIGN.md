# M18-P — Email & Customer Notifications Design

Versione: **0.64.0**  
Data: **2026-05-30**  
Tipo sprint: **Progettazione**

## Obiettivo

Trasformare l'analisi M18-A in un blueprint operativo per tutte le email tecniche cliente/admin di ClientiAffidabili.it.

Il sistema email deve diventare una parte del prodotto, non un accessorio: registrazione, verifica email, recupero password, remember-me, inviti team, acquisti, pagamenti, rimborsi, documento pronto, PDF, fatture, note credito, abbonamenti, crediti, supporto e partner API devono essere tracciati, ripetibili, monitorabili e sicuri.

## Decisione architetturale

Il design definisce un sistema **event-driven**:

1. un modulo applicativo genera un `EmailEvent`;
2. il motore email seleziona template, lingua, destinatario e policy;
3. viene creata una `EmailDelivery` append-only;
4. il provider invia l'email tramite adapter;
5. webhook bounce/delivery/complaint aggiornano lo stato;
6. errori e anomalie sono collegati all'Operational Error Ledger;
7. admin puo' vedere, filtrare, reinviare quando sicuro o aprire ticket/fix.

## Funzioni coperte

### Account e sicurezza

- registrazione cliente;
- verifica email;
- recupero password;
- password modificata;
- remember-me attivato o nuovo dispositivo persistente;
- login sospetto o device nuovo;
- invito team;
- invito accettato/scaduto/revocato;
- cambio ruolo team;
- MFA futura.

### Acquisti, pagamenti e rimborsi

- ordine creato;
- pagamento riuscito;
- pagamento fallito;
- azione pagamento richiesta;
- rimborso richiesto;
- rimborso approvato/emesso;
- rimborso rifiutato;
- dispute/chargeback ricevuto;
- fattura disponibile;
- nota credito disponibile.

### Report, documenti e PDF

- verifica ricevuta;
- documento/report in lavorazione;
- documento pronto;
- PDF disponibile;
- PDF inviato via link sicuro;
- PDF allegato solo se policy admin lo abilita;
- link scaduto o rigenerato;
- documento bloccato in review.

### Abbonamenti, crediti e partner API

- abbonamento attivato;
- rinnovo riuscito/fallito;
- cancellazione abbonamento;
- crediti quasi esauriti;
- crediti esauriti;
- API key creata/revocata/ruotata;
- webhook partner fallito;
- usage threshold superata.

### Supporto e CRM

- richiesta contatto ricevuta;
- ticket creato;
- ticket aggiornato;
- ticket chiuso;
- messaggio non consegnato via email ma salvato in admin inbox.

## Guardrail

- nessun invio diretto da controller senza ledger;
- nessun token in chiaro nei log;
- password reset/inviti/report/PDF solo con token hashato e scadenza;
- PDF via link sicuro first;
- allegato PDF solo se abilitato da policy;
- email non devono contenere raw payload provider, prompt OpenAI, API key, IBAN completo o dati carta;
- retry solo su errori temporanei;
- suppression list obbligatoria per bounce/complaint;
- admin retry sempre auditato;
- template modificabili solo con ruolo e reason adeguati;
- ogni provider webhook deve essere firmato e idempotente.

## Output sprint

- blueprint esperienza email;
- registry eventi e template;
- blueprint ledger delivery/webhook;
- blueprint email account/security;
- blueprint email ordine/pagamento/rimborso;
- blueprint email report/PDF/documenti;
- blueprint admin monitor;
- blueprint provider/deliverability/settings;
- handoff completo per M18-S.

## Non incluso

- invio email reale;
- integrazione provider SMTP/Resend/Mailgun/SES reale;
- build Docker/Coolify;
- test deliverability reale;
- template HTML finali pixel-perfect.
