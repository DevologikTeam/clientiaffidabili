# 13 — Buyer IP Audit & Privacy Analysis

## Requisito

Salvare gli IP degli utenti che acquistano, per supporto, audit, antifrode, sicurezza, dispute e analisi anomalie pagamento.

## Principio privacy

L'indirizzo IP puo' essere dato personale o dato tecnico riferibile all'utente. Va quindi minimizzato, protetto, redatto e conservato solo per finalita' documentate.

## Dati da raccogliere

Nel checkout/acquisto:

- `buyerIpAddressEncrypted` se serve dato completo;
- `buyerIpHash` per correlazione privacy-safe;
- `buyerUserAgent`;
- `buyerAcceptLanguage` opzionale;
- `requestId`;
- `checkoutStartedAt`;
- `paymentConfirmedAt`;
- `legalSnapshotVersion`;
- `consentSnapshot`.

## Dove salvarli

- `Order` o `CheckoutSession`: snapshot tecnico dell'acquisto;
- `Payment`: contesto conferma pagamento;
- `OperationalErrorEvent`: solo hash/redacted quando serve correlazione;
- `AuditLog`: accessi admin al dato completo.

## Accesso admin

Visibilita' consigliata:

- customer support: hash/redacted;
- billing/compliance: completo solo se necessario;
- super admin: completo con audit;
- frontend cliente: mai completo.

## Retention proposta

Da validare legalmente. Proposta MVP:

- hash IP: retention allineata a contratto/audit/fiscale;
- IP completo cifrato: retention piu' breve;
- accessi al dato completo: audit append-only;
- export privacy/accountability disponibile in futuro.

## Copy privacy da aggiornare

La privacy policy deve spiegare che, in fase di acquisto, possono essere trattati dati tecnici come indirizzo IP, user agent, timestamp e identificativi richiesta per sicurezza, prevenzione abusi, gestione pagamenti, assistenza e audit.

## QA richiesto

- Nessun IP completo nelle viste standard.
- Nessun IP completo nei log applicativi.
- Hash IP presente per correlazione.
- Accesso al dato completo auditabile.
- Retention documentata.
