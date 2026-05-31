# CI Pipeline & Artifacts Implementation

È stato aggiunto `.github/workflows/production-qa.yml` come pipeline standard:

1. checkout repository;
2. setup PNPM/Node 20;
3. install dipendenze;
4. lint;
5. typecheck;
6. build;
7. install Playwright Chromium;
8. E2E CI;
9. upload artifact `playwright-report`.

## Artifact minimi richiesti

- log build;
- log typecheck;
- log E2E;
- Playwright HTML report;
- screenshot/trace/video in caso di fail.

## Policy

Nessuna release candidate può essere approvata se la pipeline non produce artifact verificabili.
