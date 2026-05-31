# 16 — RC Evidence Bundle & Sign-off Blueprint

## Obiettivo

Definire un bundle unico che permetta di dire cosa e' stato provato, cosa e' rimasto fuori, quali rischi sono stati accettati e chi ha approvato.

## Struttura bundle

```json
{
  "release": "0.73.0",
  "candidate": "M21-S",
  "generatedAt": "2026-05-30",
  "overallStatus": "blocked|ready_for_rc|failed",
  "gates": [],
  "waivers": [],
  "artifacts": [],
  "riskRegister": [],
  "signoffs": []
}
```

## Sign-off minimi

- Tech Lead: build, typecheck, Docker, dependency freeze.
- Backend Lead: migrazioni, backup, restore, rollback.
- Security/Privacy Lead: secrets, tracking, noindex, dati demo, PII.
- Operations Lead: provider sandbox, email, support runbook.
- Product Owner: perimetro RC, feature off, claim pubblici, readiness pilot.

## Regole finali

- P0 non passato o non waived blocca `ready_for_rc`.
- Waiver senza feature off blocca `ready_for_rc`.
- Evidenza mancante blocca il gate relativo.
- Una RC non puo includere feature non certificate come se fossero disponibili.
- Le note di release devono distinguere chiaramente cio che e' pronto da cio che resta disabilitato.

## Output M21-S

- Generatore evidence bundle.
- UI/endpoint export.
- QA statico e runtime per verificare P0.
- Release candidate checklist derivata dal bundle, non manuale.
