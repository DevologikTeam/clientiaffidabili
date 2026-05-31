# 20 — Report, PDF & Document Email Blueprint

## Report in lavorazione

Evento: `report.processing`  
Template: `report_processing_v1`

Scopo: rassicurare che la verifica e' stata presa in carico.

## Documento pronto

Evento: `report.ready`  
Template: `report_ready_v1`

Scopo: portare il cliente alla dashboard, non allegare automaticamente contenuti sensibili.

Regole:

- CTA "Apri report";
- link autenticato alla dashboard;
- nessun dettaglio sensibile nel corpo email;
- copy prudente: report come supporto decisionale, non garanzia di pagamento.

## PDF pronto

Evento: `report.pdf_ready`  
Template: `report_pdf_ready_v1`

Policy default:

- invio via link sicuro;
- token monouso o scoped;
- scadenza configurabile;
- accesso auditato.

Policy opzionale:

- allegato PDF solo se admin abilita `email.pdf.attachmentsEnabled`;
- dimensione massima;
- watermark opzionale;
- mai allegare su email condivise non verificate.

## Link sicuro PDF

Il link deve avere:

- token hashato lato DB;
- scadenza;
- scope su report/account;
- revoca;
- audit download;
- rigenerazione admin/customer quando consentito.

## Fatture e note credito

Eventi:

- `invoice.available`;
- `credit_note.available`.

Regole:

- link dashboard documenti fiscali;
- allegato opzionale solo se policy lo consente;
- nessun dato fiscale non necessario nel corpo email.

## Documento bloccato o review

Evento: `report.manual_review_required` solo admin nel MVP.  
Email cliente solo se ritardo significativo e policy comunicazione e' definita.
