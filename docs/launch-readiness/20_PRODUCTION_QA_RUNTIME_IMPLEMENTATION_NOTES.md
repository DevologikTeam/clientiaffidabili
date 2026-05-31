# Production QA Runtime Implementation Notes

M13-S introduce un runtime leggero per mostrare e controllare la readiness di lancio. Il runtime non sostituisce CI/CD né audit esterno: serve a rendere visibili i blocchi prima della produzione.

## Componenti

- `LaunchReadinessModule` backend.
- `/launch-readiness/summary` per stato sintetico.
- `/admin/launch-readiness` lato web.
- `launch-production-gate.js` per controlli statici obbligatori.
- `launch-smoke-check.js` per controlli HTTP su web e API.

## Stati

- `passed`: evidenza progettuale o runtime presente.
- `warning`: evidenza presente ma test reale non eseguito.
- `blocked`: requisito mancante o configurazione pericolosa.

## Go-live

Il prodotto non può essere marcato production-ready se resta almeno un warning sui gate obbligatori.
