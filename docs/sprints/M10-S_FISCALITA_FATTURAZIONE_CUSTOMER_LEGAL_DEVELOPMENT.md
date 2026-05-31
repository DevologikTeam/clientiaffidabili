# M10-S — Fiscalita, Fatturazione e Customer Legal Development

## Obiettivo

Implementare il primo runtime fiscal/legal della piattaforma: profilo fiscale cliente, documenti fiscali manual-assisted, legal pack versionato, accettazioni checkout, coda admin e superfici cliente.

## Perimetro sviluppato

- Modulo NestJS `FiscalLegalModule`.
- Entita TypeORM per profilo fiscale, documenti fiscali, legal document version, accettazioni e audit fiscal/legal.
- API customer/admin per snapshot fiscale, legal pack, documenti, accettazioni e azioni amministrative.
- UI cliente `/dashboard/profilo-fiscale` e `/dashboard/legale`.
- UI admin `/admin/fiscal-legal`.
- Pagine legal pubbliche placeholder versionate.
- QA antiregressione M10-S.

## Decisione MVP

Resta confermato approccio **manual-assisted**: il sistema raccoglie dati, snapshot, consensi e code operative, ma non invia automaticamente documenti a SDI e non sostituisce revisione di commercialista/legale.

## Guardrail

- Nessuna modifica retroattiva ai documenti gia emessi.
- Ogni documento conserva snapshot fiscale.
- Rimborsi collegabili a nota credito quando necessario.
- Legal pack pubblicato obbligatorio prima del checkout.
- Azioni admin fiscal/legal con reason obbligatoria.
- Audit append-only per profili, documenti, legal pack e consensi.
- Testi legal pubblici considerati placeholder fino a validazione professionale.
