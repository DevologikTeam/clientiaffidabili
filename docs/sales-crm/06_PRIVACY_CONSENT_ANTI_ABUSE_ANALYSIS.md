# 06 — Privacy, Consent & Anti-Abuse Analysis

## Principi privacy

- Minimizzazione dati.
- Finalità chiara: contatto commerciale, supporto, richiesta demo, partner/API.
- Consenso o base giuridica esplicita dove necessaria.
- Nessun dato provider/report nel CRM commerciale.
- Nessun tracking PII nelle analytics.
- Accesso interno limitato per ruolo.

## Consensi necessari

| Contesto | Consenso/base |
|---|---|
| Form contatto | Privacy informativa obbligatoria |
| Demo | Privacy informativa obbligatoria |
| Marketing newsletter | consenso separato, non pre-selezionato |
| Support ticket | trattamento necessario per richiesta assistenza |
| Partner/API | accettazione uso lecito + privacy |
| Checkout handoff | termini/report/refund policy già gestiti nel billing/legal pack |

## Rischi da evitare

- Usare dati di verifica per marketing.
- Mandare email promozionali senza consenso.
- Copiare informazioni sensibili nei commenti CRM.
- Esporre report o provider raw payload ai ruoli sales.
- Automatizzare decisioni commerciali invasive.
- Conservare lead spam per sempre.

## Anti-abuse form

Guardrail MVP:

- honeypot;
- rate limit per IP/email;
- blocco messaggi troppo brevi o link-heavy;
- blocco domini temporanei opzionale;
- `requiresManualReview` per messaggi con parole sensibili;
- audit di tentativi sospetti;
- nessun autoresponder con informazioni sensibili.

## Sicurezza interna

- Ruoli sales/support separati.
- Sales non vede raw provider, payload, dati carta, segreti, API key complete.
- Support vede solo ciò che serve per rispondere.
- Billing vede fatture/rimborsi ma non raw provider.
- Compliance può vedere flag e motivazioni redatte.

## Retention preliminare

| Dato | Retention proposta |
|---|---|
| Lead non qualificato | 6-12 mesi, da validare legalmente |
| Lead convertito | collegato al cliente/contratto |
| Ticket supporto | 24 mesi o policy contrattuale/fiscale |
| Audit consensi | durata necessaria per prova accettazione |
| Messaggi spam | breve retention tecnica |

## Decisione

Il CRM deve essere privacy-safe by design: utile per vendere e supportare, non per accumulare dati non necessari.
