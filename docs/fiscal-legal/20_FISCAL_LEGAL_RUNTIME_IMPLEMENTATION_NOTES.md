# Fiscal/legal runtime — note implementative

Il runtime M10-S introduce il modulo `FiscalLegalModule`, pensato per separare chiaramente pagamento, documento fiscale, rimborso, nota credito e accettazioni legali.

## Componenti backend

- `CustomerTaxProfile`: anagrafica fiscale cliente con snapshot e hash.
- `FiscalDocument`: fattura/ricevuta/nota credito/proforma con importi e snapshot.
- `LegalDocumentVersion`: legal pack versionato e pubblicabile.
- `LegalAcceptance`: accettazioni al checkout/account con snapshot hash.
- `FiscalLegalAuditEvent`: audit append-only.

## Componenti frontend

- `TaxProfilePanel`.
- `FiscalDocumentTable`.
- `LegalAcceptancePanel`.
- `AdminFiscalLegalQueue`.
- Pagine `/dashboard/profilo-fiscale`, `/dashboard/legale`, `/admin/fiscal-legal`.

## Non incluso nel MVP

- Invio automatico SDI.
- Conservazione sostitutiva.
- Firma elettronica dei documenti.
- Validazione reale P.IVA/CF/PEC/SDI.
- Workflow commercialista integrato.
