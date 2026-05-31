# M18-A — Email & Customer Notifications Analysis

Versione: 0.63.0  
Data: 2026-05-30  
Tipo sprint: Analisi

## Obiettivo

Analizzare tutte le email tecniche necessarie per ClientiAffidabili.it prima della progettazione e dello sviluppo del modulo email.

Le email non sono considerate un accessorio: sono parte del prodotto, del supporto e della fiducia cliente. Ogni evento critico deve essere confermato al cliente e tracciato internamente, senza perdere copia del messaggio e senza dipendere da un singolo invio SMTP non osservabile.

## Ambito incluso

- Registrazione cliente.
- Verifica indirizzo email.
- Login security alert dove necessario.
- Recupero password.
- Password modificata.
- Funzione ricordami.
- Invito team.
- Cambio ruolo team.
- Ordine creato.
- Acquisto ricevuto.
- Pagamento riuscito.
- Pagamento fallito.
- Azione pagamento richiesta.
- Rimborso richiesto.
- Rimborso emesso.
- Rimborso rifiutato o in review.
- Report/documento in lavorazione.
- Documento pronto.
- PDF disponibile.
- Invio PDF via link sicuro.
- Invio PDF come allegato solo se policy lo consente.
- Fattura disponibile.
- Nota credito disponibile.
- Abbonamento attivato.
- Abbonamento rinnovato.
- Abbonamento annullato.
- Crediti quasi esauriti.
- Crediti esauriti.
- Ticket supporto creato.
- Ticket supporto aggiornato.
- Ticket supporto chiuso.
- Contatto pubblico ricevuto.
- Partner API: chiave creata, revocata, limite vicino, webhook fallito.
- Admin/security: eventi solo interni o email admin, non cliente.

## Decisione di prodotto

Il modulo deve essere **event-driven**:

```text
Evento business -> Email event -> Template versionato -> Delivery queue -> Provider -> Webhook -> Ledger -> Admin monitor
```

Non deve esistere un invio email diretto non tracciato nei controller.

## Deliverability minima

Prima del go-live il dominio deve avere:

- SPF configurato per il provider scelto.
- DKIM attivo.
- DMARC almeno `p=none` in fase iniziale con report attivi, poi progressione a policy piu' restrittiva.
- TLS obbligatorio.
- From coerenti per categoria.
- Separazione email tecniche e marketing.
- Monitoring bounce/complaint.

## Provider email

Scelta consigliata per MVP:

1. Provider transazionale con API e webhook: Resend, Postmark, Mailgun, Sendgrid o Amazon SES.
2. Adapter interno `EmailProviderAdapter` per evitare lock-in.
3. SMTP come fallback solo se tracciabile e non come canale primario.

## Guardrail

- Nessuna email tecnica deve contenere raw payload Openapi, prompt OpenAI, dati carta, API key o token in chiaro.
- Link reset, inviti, report e PDF devono essere tokenizzati, a scadenza, monouso dove opportuno.
- PDF allegato solo per casi a basso rischio e con dimensione controllata; preferire link sicuro.
- Ogni invio deve avere `templateVersion`, `eventId`, `recipient`, `deliveryStatus`, `providerMessageId` se disponibile.
- Retry automatico solo per errori temporanei.
- Bounce permanente porta a suppression o review.
- Complaint blocca comunicazioni non essenziali.
- Email marketing separate da email tecniche.

## Collegamento con error ledger

Ogni errore email rilevante deve poter generare o aggiornare un evento nell'Operational Error Ledger:

- provider timeout;
- template render failed;
- attachment failed;
- bounced;
- complained;
- retry exhausted;
- webhook signature failed;
- PDF delivery failed;
- password reset delivery failed.

## Output M18-A

Questo sprint produce analisi, inventario eventi, rischi, modello dati e readiness checklist per M18-P/M18-S.
