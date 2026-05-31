# E2E Test Suite Blueprint

Questa cartella nasce in M13-P come blueprint. In M13-S verra' trasformata in suite Playwright eseguibile.

## Regole
- Usare `data-testid` stabili.
- Non usare dati reali.
- Non chiamare provider reali senza sandbox e flag esplicito.
- In CI usare worker ridotti.
- Conservare report HTML/JUnit come artifact.
