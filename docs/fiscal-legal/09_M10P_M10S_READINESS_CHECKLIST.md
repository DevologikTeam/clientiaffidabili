# 09 — M10-P / M10-S Readiness Checklist

## Pronto per M10-P quando

- [x] Separazione pagamento/documento fiscale definita.
- [x] Profili fiscali cliente definiti.
- [x] Stati fattura/nota credito/rimborso definiti.
- [x] Legal pack definito.
- [x] Accettazioni e versioning definiti.
- [x] Admin fiscal/legal operations definite.
- [x] Data model preliminare definito.
- [x] Rischi da validare con commercialista/legale esplicitati.

## M10-P dovra progettare

- Blueprint `FiscalLegalModule`;
- entita TypeORM;
- API customer/admin;
- UI profilo fiscale cliente;
- UI documenti fiscali dashboard;
- UI admin fiscal/legal queue;
- legal document registry;
- acceptance component;
- refund/fiscal adjustment flow;
- export commercialista/provider;
- copy definitivo ma marcato `needs legal review`.

## M10-S dovra implementare

- `CustomerTaxProfile`;
- `FiscalDocument`;
- `FiscalAdjustment`;
- `LegalDocumentVersion`;
- `LegalAcceptance`;
- API customer/admin;
- pagine dashboard profilo fiscale/documenti;
- pagine admin fiscal/legal;
- componenti checkbox/legal acceptance;
- script QA fiscale/legal;
- production gate fiscale/legal.

## Blocchi go-live da non ignorare

- testi legali non revisionati;
- processo fatturazione non validato;
- note credito/rimborsi non governati;
- checkout senza accettazione termini/privacy/refund;
- documenti legali senza versione/hash;
- profilo fiscale cliente non snapshot-based;
- assenza export per commercialista/provider esterno.
