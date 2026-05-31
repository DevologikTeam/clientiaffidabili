# M10-A — Fiscal Legal Source Notes

## Fonti e riferimenti da validare

Queste note non sono un parere fiscale o legale. Servono a orientare il blueprint tecnico e devono essere validate da commercialista/legale prima del go-live.

## Fiscalita e fatturazione

- In Italia la fatturazione elettronica e il ciclo SDI sono il riferimento operativo per molti casi B2B/B2C/PA. Per questo il progetto non deve improvvisare un generatore fiscale fragile: prima deve gestire profili fiscali, documenti, stati, export e review.
- Le note di variazione/credito vanno trattate come documenti collegati a fatture precedenti e non come semplice evento di pagamento.
- Il perimetro UE/extra UE e crediti prepagati richiede validazione fiscale specifica.

## Privacy e GDPR

- GDPR richiede trasparenza, minimizzazione, accountability, diritti interessati e basi giuridiche adeguate.
- Le accettazioni devono essere dimostrabili quando il trattamento o la condizione contrattuale lo richiede.
- Marketing consent deve restare separato dai termini obbligatori.

## Cookie e tracking

- Cookie analytics/marketing e strumenti di tracciamento richiedono una governance separata dal semplice footer legale.
- La piattaforma dovrebbe partire con tracking essenziale/privacy-safe e introdurre marketing tracker solo dopo CMP configurata.

## Sicurezza e continuita

- NIS2 e la security baseline gia introdotta in M9 restano riferimento prudente per incident response, supply chain e continuita operativa.

## Fonti pubbliche consultate

- GDPR, Regolamento UE 2016/679.
- Direttiva UE 2022/2555, NIS2.
- Riferimenti pubblici su fattura elettronica italiana, note di credito/variazione e ciclo IVA.
- Documentazione provider payment gia acquisita nei moduli M4/M4B per refund, chargeback, subscription e webhook.

## Decisione prudente

MVP fiscale: **manual-assisted + export**, non invio SDI automatico.  
MVP legal: **documenti versionati + accettazioni tracciate**, ma testi finali solo dopo revisione professionale.
