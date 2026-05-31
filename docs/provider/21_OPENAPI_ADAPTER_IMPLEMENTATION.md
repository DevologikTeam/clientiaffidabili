# Openapi adapter — Implementation

L'adapter implementato è **Openapi-first** ma resta volutamente in modalità mock/sandbox finché non vengono certificati endpoint reali, contratti e costi effettivi.

## Funzioni implementate

- `validateInput(mapping, subject)`
- `estimateCost(mapping)`
- `createRequest(mapping, context)`
- `normalize(mapping, providerPayload)`
- `classifyError(error)`
- `verifyCallbackSignature(signature)`

## Modalità

| Configurazione | Comportamento |
|---|---|
| `ENABLE_PROVIDER_CALLS=false` | mock sicuro, nessuna chiamata esterna |
| `ENABLE_PROVIDER_CALLS=true` + sandbox | placeholder sandbox-ready |
| production + mapping non abilitato | review obbligatoria |

## Guardrail

L'adapter non deve mai essere chiamato dal frontend. Ogni richiesta passa da backend, mapping e controllo pagamento.
