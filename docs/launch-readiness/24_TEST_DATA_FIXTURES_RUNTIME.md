# Test Data Fixtures Runtime

Le fixture E2E sono in `tests/e2e/fixtures/test-data.ts`.

## Regole

- vietato usare dati personali reali;
- vietato usare partite IVA reali non autorizzate;
- vietato inviare chiamate provider reali da E2E standard;
- sandbox e demo devono essere separati dalla produzione;
- i dati seed devono essere cancellabili/ripetibili.

## Variabili

- `LAUNCH_TEST_ACCOUNT_EMAIL`
- `LAUNCH_TEST_ACCOUNT_PASSWORD`
- `ENABLE_E2E_FIXTURE_SEED`

## Produzione

`ENABLE_E2E_FIXTURE_SEED` deve restare `false` in produzione.
