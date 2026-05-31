# 14 — CI Workflow and Artifacts Blueprint

## Obiettivo
Disegnare una pipeline CI ripetibile che produca evidenze, non solo esiti verdi/rossi.

## Workflow proposto

```yaml
name: production-qa
on:
  pull_request:
  push:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v6
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm -r typecheck
      - run: pnpm -r lint
      - run: pnpm run release:check
      - run: pnpm build

  e2e:
    needs: quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v6
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm exec playwright install --with-deps
      - run: pnpm exec playwright test --config=playwright.config.ts
      - uses: actions/upload-artifact@v5
        if: ${{ !cancelled() }}
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

## Artifacts obbligatori
- Playwright HTML report.
- JUnit XML.
- Docker compose logs su failure.
- Production gate JSON.
- Secret scan result.
- Smoke test JSON.

## Permessi GitHub Actions
Usare permessi minimi:

```yaml
permissions:
  contents: read
```

Permessi extra solo se necessari.

## Note M13-S
M13-S dovra' decidere se introdurre la workflow attiva o tenerla come workflow staging fino al primo pass reale.
