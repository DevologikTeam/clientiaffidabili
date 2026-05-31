# 21 — Database, Provider and E2E Blockers Runtime

## Database

Il progetto contiene molte entity TypeORM e non deve arrivare a RC senza baseline migration, backup log, restore drill e rollback plan.

M21-S aggiunge slot artifact in `artifacts/rc-hardening/database/`.

## Provider

Il gate provider aggrega Stripe, PayPal, Openapi, OpenAI, email e PDF. La sandbox M19-S e mock-first: utile per struttura, non sufficiente per RC.

Provider non certificati possono rimanere fuori perimetro solo con waiver `waived_with_feature_off`.

## Browser E2E

Il gate Playwright resta blocked finche non viene allegato un report reale generato con servizi avviati e screenshot redatti.
