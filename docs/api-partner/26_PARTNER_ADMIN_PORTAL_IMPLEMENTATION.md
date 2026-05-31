# Partner Admin Portal Implementation

## Console admin
Pagine aggiunte:
- `/admin/partners`
- `/admin/partners/[id]`

## Funzioni scaffold
- lista partner;
- stato onboarding/live;
- usage summary;
- API key redatte;
- webhook status;
- live access queue;
- azioni admin con reason obbligatoria.

## Azioni sensibili
- approva live;
- respingi live;
- sospendi live;
- revoca API key;
- adjustment crediti;
- cambia tier;
- replay webhook.

## Guardrail
Le viste admin non mostrano secret, raw payload o dati provider grezzi. Ogni azione sensibile deve produrre audit.
