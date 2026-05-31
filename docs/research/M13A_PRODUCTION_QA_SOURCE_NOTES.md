# M13-A Source Notes

## Playwright
Fonti ufficiali consultate:
- Playwright Continuous Integration: https://playwright.dev/docs/ci
- Playwright Test Configuration: https://playwright.dev/docs/test-configuration

Principi usati:
- Esecuzione in CI con installazione browser/dependencies.
- Worker ridotti in CI per stabilita'.
- Artifact/report HTML da conservare.
- Base URL esplicito e test riproducibili.

## Coolify
Fonte ufficiale consultata:
- Docker Compose in Coolify: https://coolify.io/docs/knowledge-base/docker/compose

Principi usati:
- Docker Compose come base deploy.
- Variabili ambiente gestite da Coolify/secrets.
- Smoke e healthcheck espliciti per dichiarare deploy riuscito.

## OWASP ASVS
Fonte ufficiale consultata:
- OWASP Application Security Verification Standard: https://owasp.org/www-project-application-security-verification-standard/

Principi usati:
- Verification mindset.
- Object-level authorization e access control come gate, non come suggerimento.
- Produzione bloccata se controlli security minimi non verificati.
