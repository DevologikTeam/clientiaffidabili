# M13-P — Source Notes

## Playwright
La progettazione usa Playwright come base E2E. La documentazione ufficiale prevede installazione browser/dependencies, esecuzione test in CI, workers ridotti in CI per stabilita', HTML report e upload artifact.

## Coolify/Docker Compose
La progettazione tratta Coolify come ambiente deploy Docker Compose-managed: variabili, healthcheck, log e servizi devono essere espliciti e controllati prima del go-live.

## Docker healthcheck
La progettazione richiede healthcheck per API/Web/DB e smoke test separati: l'app non e' pronta solo perche' il container e' avviato.

## GitHub Actions artifacts
La progettazione prevede artifact di test/report/log per rendere il sign-off verificabile anche dopo la pipeline.
