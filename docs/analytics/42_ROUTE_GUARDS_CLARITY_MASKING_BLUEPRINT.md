# 42 — Route Guards, Clarity & Masking Blueprint

## Clarity route policy

```ts
export const clarityPolicy = {
  defaultEnabled: false,
  allowPrefixes: ['/', '/servizi', '/prezzi', '/guide', '/garanzia-operativa'],
  blockPrefixes: [
    '/admin',
    '/dashboard',
    '/checkout',
    '/reports',
    '/fatture',
    '/api',
    '/invito',
    '/reset-password',
    '/legal'
  ]
};
```

## Regola precedence

La denylist vince sempre sull'allowlist.

## Masking CSS

Su pagine pubbliche dove Clarity puo' essere caricato, campi e aree sensibili devono avere classi tipo:

```html
<input class="ca-mask ca-sensitive" />
<textarea class="ca-mask ca-sensitive" />
```

## Route contatti

La pagina `/contatti` resta borderline: Clarity puo' essere ammesso solo se:

- consenso valido;
- masking forzato su tutti i campi;
- nessun contenuto input viene inviato a event payload;
- QA conferma assenza dati personali negli eventi.

## Admin warning

Quando un admin abilita Clarity deve vedere:

> Clarity registra interazioni utente. ClientiAffidabili.it lo blocca automaticamente su aree sensibili, ma devi verificare cookie policy, consenso e configurazione CMP prima della produzione.
