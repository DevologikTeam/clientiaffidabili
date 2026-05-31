# Openapi / Provider Sandbox Certification Analysis

## Flussi obbligatori

- Provider call bloccata se pagamento non confermato.
- Provider call bloccata se `providerCalls.enabled=false` da settings admin.
- Richiesta idempotente per lo stesso ordine/check.
- Cost snapshot salvato prima della chiamata.
- Raw payload salvato solo in vault redatto, mai in UI cliente.
- Risultato normalizzato disponibile al Report Composer.
- Errore provider tracciato in Operational Error Ledger.
- Retry consentito solo per errori sicuri e con reason.

## Casi test MVP

- Company reliability pro.
- KYB compliance.
- IBAN check.
- Email/phone check.
- Provider timeout.
- Provider payload incompleto.
- Provider cost mismatch.

## Criterio RC

Se Openapi reale non è ancora validato, la RC può usare mock/sandbox bloccando le chiamate live. Il prodotto non deve fingere dati reali.
