# 44 — QA Anti-PII Tagging Blueprint

## QA statico richiesto in M16B-S

Il prossimo sprint di sviluppo deve aggiungere un controllo che verifichi:

1. nessun GTM ID hardcoded fuori dai settings/example;
2. nessun Clarity ID hardcoded fuori dai settings/example;
3. event registry contiene solo eventi whitelist;
4. forbidden fields non appaiono nei payload evento esterno;
5. Clarity blockPrefixes contiene route sensibili;
6. Consent Mode default contiene tutti i parametri v2 a `denied`;
7. `dataLayer.push` non viene chiamato direttamente fuori da helper controllato;
8. `window.clarity` non viene chiamato direttamente fuori da helper controllato.

## QA runtime futuro

- test public config default disabled;
- test GTM non caricato senza consenso;
- test Clarity non caricato su `/checkout`;
- test sanitizer rimuove PII;
- test UTM sanitizer;
- test audit settings.

## Forbidden keys

```ts
const forbiddenExternalEventKeys = [
  'email',
  'phone',
  'taxCode',
  'vatNumber',
  'iban',
  'ip',
  'token',
  'apiKey',
  'authorization',
  'password',
  'prompt',
  'completion',
  'rawPayload',
  'reportContent',
  'documentBody',
  'messageBody'
];
```

## Release blocker

Qualsiasi violazione del QA anti-PII blocca lo ZIP/sprint.
