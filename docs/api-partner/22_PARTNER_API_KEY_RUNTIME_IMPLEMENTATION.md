# Partner API Key Runtime Implementation

## Generazione chiavi
Il runtime genera chiavi con prefisso leggibile:
- `ca_sbox_` per sandbox;
- `ca_live_` per live.

Il secret viene hashato e viene mantenuto un `prefix` per riconoscimento e audit.

## Scope
Gli scope MVP sono:
- `checks:company.read`
- `checks:company.create`
- `checks:company.status`
- `reports:read`
- `webhooks:manage`
- `usage:read`
- `billing:read`

## Revoca
La revoca imposta `revokedAt` e non elimina la riga. Ogni revoca richiede reason in admin runtime.

## Limiti
La verifica di secret e' implementata come servizio scaffold. Prima del go-live servono test crittografici, rotazione chiavi e audit di leakage.
