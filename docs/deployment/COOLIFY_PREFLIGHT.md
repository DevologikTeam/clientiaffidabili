# Coolify preflight locale e strict

Questo progetto usa un preflight Docker prima del rilascio per evitare che errori di build/runtime emergano solo su Coolify.

## Comando consigliato per sviluppo locale

```bash
pnpm qa:coolify-preflight
```

Da v0.74.19 questo comando usa di default `docker-compose.yml`, quindi pubblica le porte host e lascia l'app raggiungibile dal browser:

- Web: `http://localhost:3000`
- Web health: `http://localhost:3000/healthz`
- API health: `http://localhost:3001/health`

La modalità locale esegue comunque il build Docker no-cache di `api` e `web`, usando gli stessi Dockerfile destinati al deploy.

Sequenza principale:

```bash
pnpm install --frozen-lockfile=false # solo se mancano node_modules o binari locali
pnpm --filter @clientiaffidabili/api build
NEXT_DISABLE_STANDALONE=1 pnpm --filter @clientiaffidabili/web build
docker compose -f docker-compose.yml down --remove-orphans
docker compose -f docker-compose.yml build --no-cache api web
docker compose -f docker-compose.yml up -d
```

Il build web locale usa `NEXT_DISABLE_STANDALONE=1` per evitare su Windows l'errore `EPERM: operation not permitted, symlink` durante la creazione di `.next/standalone`. Il build standalone reale resta validato nel build Docker Linux.

## Modalità strict Coolify-like

Per simulare il file Coolify senza pubblicazione porte host:

```bash
pnpm qa:coolify-preflight:strict
```

oppure:

```bash
COOLIFY_PREFLIGHT_TARGET=strict pnpm qa:coolify-preflight
```

Questa modalità usa `docker-compose.coolify.yml`. In questo caso l'app può non essere raggiungibile dal browser su `localhost`, perché Coolify normalmente espone i servizi tramite proxy e non tramite `ports` nel compose. Il controllo avviene quindi dentro i container.

## Health check

La modalità locale usa:

```bash
HEALTH_CHECK_MODE=both
```

Questo significa che il preflight verifica sia:

- health interno container: `http://127.0.0.1:3001/health` e `http://127.0.0.1:3000/healthz`;
- health host/browser: `http://localhost:3001/health` e `http://localhost:3000/healthz`.

La modalità strict usa di default:

```bash
HEALTH_CHECK_MODE=container
```

Puoi forzare la modalità host solo se stai usando un compose con porte pubblicate:

```bash
HEALTH_CHECK_MODE=host pnpm qa:coolify-preflight
```

## Database locale

Il preflight locale imposta:

```bash
DATABASE_SYNCHRONIZE=true
DATABASE_LOGGING=false
```

Serve solo per il database Postgres effimero locale, così un volume vuoto crea lo schema prima che i seed/runtime service leggano tabelle come `platform_settings`. Previene errori tipo:

```text
relation "platform_settings" does not exist
```

In Coolify/produzione `DATABASE_SYNCHRONIZE` deve restare `false` salvo migrazioni controllate.

## Artifact

Il preflight scrive:

```text
artifacts/qa/coolify-preflight-latest.log
artifacts/qa/coolify-preflight-latest.json
```

Il JSON include target, compose file, health mode, URL controllati e stato finale.
