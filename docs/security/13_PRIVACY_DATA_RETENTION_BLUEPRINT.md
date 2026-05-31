# Privacy, Data Protection & Retention Blueprint

## Obiettivo

Definire dati, finalita', retention, minimizzazione, accesso e cancellazione in modo coerente con GDPR e con il modello di reportistica affidabilita'.

## Classificazione dati

| Categoria | Esempi | Sensibilita' | Regola |
|---|---|---:|---|
| Account | nome, email, azienda cliente | media | cifrare in transito, accesso RBAC |
| Billing | ragione sociale, P.IVA, indirizzo, fatture | media | retention fiscale separata |
| Payment metadata | provider payment id, status, fee | media | no carte salvate |
| Check input | P.IVA, CF aziendale, PEC, IBAN | media/alta | minimizzazione per servizio |
| Provider raw payload | risposta integrale Openapi/provider | alta | vault backend, redaction, no frontend |
| Normalized evidence | score, protesti, bilancio, fonti | alta | visibile solo nel report autorizzato |
| Audit | azioni admin/customer, reason, timestamp | media/alta | append-only |
| Logs tecnici | errori, request id, status | bassa/media | no PII quando possibile |

## Retention MVP proposta

| Dato | Retention proposta | Note |
|---|---:|---|
| Ordini/pagamenti/fatture | termini fiscali applicabili | confermare con consulente fiscale |
| Report acquistati | 24 mesi default | configurabile/policy futura |
| Raw provider payload | 90-180 giorni | solo per audit/debug/reclami |
| Audit security/billing | 24-60 mesi | dipende da rischio e obblighi |
| Log applicativi | 30-90 giorni | redatti |
| Ticket supporto | 24 mesi | salvo richieste legali |

## GDPR operational design

- registro trattamenti interno;
- informative privacy/cookie in M10;
- DPA/accordi provider da validare;
- privacy by design per checkout/report;
- data subject request flow: accesso, rettifica, cancellazione dove applicabile, limitazione;
- data breach runbook con valutazione rischio e comunicazione entro finestre normative quando richiesto;
- export dati account senza raw provider payload se non necessario/legittimo.

## Guardrail copy

Non promettere mai: “dati sempre esatti”, “rischio zero”, “cliente sicuramente affidabile”, “garanzia di pagamento”.
