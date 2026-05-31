# RBAC e object-level authorization implementation

## Implementazione aggiunta

- `RbacGuard`
- `ObjectAuthorizationGuard`
- `Roles` decorator
- `ResourceAccess` decorator
- `ObjectAuthorizationService`

## Policy

Le policy sono centralizzate in `security-control.registry.ts` e coprono:

- ordini;
- report;
- rimborsi;
- provider request.

Ogni policy definisce ruoli cliente, ruoli admin, campo ownership, audit read/write e divieto raw payload.

## Regola BOLA/IDOR

Un cliente può accedere a una risorsa solo se:

1. ha un ruolo compatibile;
2. l'`accountId` dell'attore coincide con l'`accountId` della risorsa;
3. la risorsa è customer-facing.

Gli admin interni passano da ruoli dedicati e non possono vedere raw payload nella UI operativa.

## Prossimo consolidamento

Nel modulo M11 il guard dovrà leggere identità reale da session/JWT e non da header scaffold.
