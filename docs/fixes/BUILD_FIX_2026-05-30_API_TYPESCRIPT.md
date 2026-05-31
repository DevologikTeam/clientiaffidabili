# Build fix — API TypeScript Docker build

Data: 2026-05-30  
Pacchetto: 0.50.0

## Problema rilevato

Durante `RUN pnpm --filter @clientiaffidabili/api build` nel Dockerfile API, il build NestJS falliva con 7 errori TypeScript:

- collisione tra repository privato `workItems` e metodo `workItems()` in `AdminOperationsService`;
- assegnazione di `NormalizedCheckResult` a campo `Record<string, unknown>`;
- chiamata `estimateCost(mapping, subject)` non coerente con la firma runtime;
- cast diretto `ReportSubjectSnapshot` → `Record<string, unknown>`.

## Fix applicato

- Rinominato repository TypeORM interno da `workItems` a `workItemRepo`, evitando il conflitto con il metodo pubblico `workItems()`.
- Mantenuto il metodo pubblico usato dal controller, così non cambia il contratto API admin.
- Cast esplicito `NormalizedCheckResult as unknown as Record<string, unknown>` per persistenza JSONB.
- Resa la firma `OpenapiAdapterService.estimateCost(mapping, _subject?)` compatibile con l’interfaccia adapter e corretta la chiamata runtime.
- Cast `ReportSubjectSnapshot as unknown as Record<string, unknown>` per evitare errore TS2352.

## File modificati

```text
apps/api/src/modules/admin-operations/admin-operations.service.ts
apps/api/src/modules/checks/checks.service.ts
apps/api/src/modules/provider/provider-runtime.service.ts
apps/api/src/modules/provider/openapi-adapter.service.ts
apps/api/src/modules/reports/report-composer.service.ts
```

## QA

Aggiunto controllo statico `scripts/qa-build-fix-2026-05-30.js` per evitare regressioni sui punti corretti.

Nota: questo controllo non sostituisce il build reale `pnpm --filter @clientiaffidabili/api build`, che va rieseguito nell’ambiente Docker/Coolify.
