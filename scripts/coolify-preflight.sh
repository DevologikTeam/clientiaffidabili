#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

# Default is now local/browser mode because this command is normally run by a developer
# before a Coolify deploy. It keeps the same Dockerfiles/build path, but uses the local
# compose file so ports 3000/3001 are published and the app is reachable from the host.
# Use COOLIFY_PREFLIGHT_TARGET=strict, or pass docker-compose.coolify.yml explicitly,
# to test the Coolify-like compose without host-published ports.
PREFLIGHT_TARGET="${COOLIFY_PREFLIGHT_TARGET:-local}"
if [[ "${1:-}" == "strict" || "${1:-}" == "coolify" ]]; then
  PREFLIGHT_TARGET="strict"
  shift || true
fi

if [[ -n "${1:-}" ]]; then
  COMPOSE_FILE="$1"
elif [[ -n "${COOLIFY_COMPOSE_FILE:-}" ]]; then
  COMPOSE_FILE="$COOLIFY_COMPOSE_FILE"
elif [[ "$PREFLIGHT_TARGET" == "strict" ]]; then
  COMPOSE_FILE="docker-compose.coolify.yml"
else
  COMPOSE_FILE="docker-compose.yml"
fi

if [[ ! -f "$COMPOSE_FILE" && "$COMPOSE_FILE" == "docker-compose.coolify.yml" && -f "docker-compose.coolify.yaml" ]]; then
  COMPOSE_FILE="docker-compose.coolify.yaml"
fi
if [[ ! -f "$COMPOSE_FILE" ]]; then
  echo "Compose file not found: $COMPOSE_FILE" >&2
  exit 1
fi

API_HEALTH_URL="${API_HEALTH_URL:-http://localhost:3001/health}"
WEB_HEALTH_URL="${WEB_HEALTH_URL:-http://localhost:3000/healthz}"
WAIT_SECONDS="${WAIT_SECONDS:-90}"
if [[ -z "${HEALTH_CHECK_MODE:-}" ]]; then
  if [[ "$PREFLIGHT_TARGET" == "strict" ]]; then
    HEALTH_CHECK_MODE="container"
  else
    HEALTH_CHECK_MODE="both"
  fi
else
  HEALTH_CHECK_MODE="$HEALTH_CHECK_MODE"
fi

# These exports are only for the local preflight process. The strict/Coolify compose keeps
# production defaults unless the caller intentionally exports overrides.
if [[ "$PREFLIGHT_TARGET" == "local" ]]; then
  export DATABASE_SYNCHRONIZE="${DATABASE_SYNCHRONIZE:-true}"
else
  export DATABASE_SYNCHRONIZE="${DATABASE_SYNCHRONIZE:-false}"
fi
export DATABASE_LOGGING="${DATABASE_LOGGING:-false}"
export POSTGRES_DB="${POSTGRES_DB:-clientiaffidabili}"
export POSTGRES_USER="${POSTGRES_USER:-clientiaffidabili}"
export POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-change_me_local}"
export DATABASE_URL="${DATABASE_URL:-postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}}"
export APP_URL="${APP_URL:-http://localhost:3000}"
export API_URL="${API_URL:-http://localhost:3001}"
export PUBLIC_API_URL="${PUBLIC_API_URL:-http://localhost:3001}"
export JWT_SECRET="${JWT_SECRET:-local_preflight_jwt_secret_change_me}"

mkdir -p artifacts/qa
LOG_FILE="artifacts/qa/coolify-preflight-latest.log"
REPORT_FILE="artifacts/qa/coolify-preflight-latest.json"
: > "$LOG_FILE"

log() { echo "[$(date -Iseconds)] $*" | tee -a "$LOG_FILE"; }
run() { log "+ $*"; "$@" 2>&1 | tee -a "$LOG_FILE"; }

SKIP_INSTALL="${SKIP_INSTALL:-0}"
ensure_dependencies() {
  if [[ "$SKIP_INSTALL" == "1" ]]; then
    log "Skipping pnpm install because SKIP_INSTALL=1"
    return
  fi
  if [[ ! -d "node_modules/.pnpm" || ! -x "apps/api/node_modules/.bin/nest" || ! -x "apps/web/node_modules/.bin/next" ]]; then
    log "Workspace dependencies missing or incomplete; running pnpm install before build"
    run pnpm install --frozen-lockfile=false
  else
    log "Workspace dependencies already installed"
  fi
}

cleanup_report() {
  local status="$1"
  node - <<NODE
const fs = require('fs');
fs.writeFileSync('$REPORT_FILE', JSON.stringify({
  generatedAt: new Date().toISOString(),
  status: '$status',
  preflightTarget: '$PREFLIGHT_TARGET',
  composeFile: '$COMPOSE_FILE',
  apiHealthUrl: '$API_HEALTH_URL',
  webHealthUrl: '$WEB_HEALTH_URL',
  healthCheckMode: '$HEALTH_CHECK_MODE',
  databaseSynchronize: process.env.DATABASE_SYNCHRONIZE || null,
  logFile: '$LOG_FILE'
}, null, 2) + '\n');
NODE
}
trap 'cleanup_report failed' ERR

check_container_health() {
  local service="$1"
  local url="$2"
  docker compose -f "$COMPOSE_FILE" exec -T "$service" node -e "fetch(process.argv[1]).then((res) => process.exit(res.ok ? 0 : 1)).catch(() => process.exit(1))" "$url"
}

check_host_health() {
  local url="$1"
  curl -fsS "$url" >/dev/null 2>&1
}

log "ClientiAffidabili.it preflight started"
log "Target=${PREFLIGHT_TARGET}; compose=${COMPOSE_FILE}; health=${HEALTH_CHECK_MODE}"
if [[ "$PREFLIGHT_TARGET" == "local" ]]; then
  log "Local/browser preflight publishes host ports via docker-compose.yml. Open http://localhost:3000 after success."
else
  log "Strict Coolify-like preflight may not publish host ports; use container health checks or Coolify proxy."
fi
log "Preflight DATABASE_SYNCHRONIZE=${DATABASE_SYNCHRONIZE}; Coolify production should keep DATABASE_SYNCHRONIZE=false unless migrations are executed."
ensure_dependencies
run pnpm --filter @clientiaffidabili/api build
log "Running local web build with NEXT_DISABLE_STANDALONE=1 to avoid Windows symlink EPERM; Docker build still validates standalone in Linux"
run env NEXT_DISABLE_STANDALONE=1 pnpm --filter @clientiaffidabili/web build
run docker compose -f "$COMPOSE_FILE" down --remove-orphans
run docker compose -f "$COMPOSE_FILE" build --no-cache api web
run docker compose -f "$COMPOSE_FILE" up -d
run docker compose -f "$COMPOSE_FILE" ps

log "Waiting for health endpoints for up to ${WAIT_SECONDS}s using ${HEALTH_CHECK_MODE} mode"
deadline=$((SECONDS + WAIT_SECONDS))
api_container_ok=0
web_container_ok=0
api_host_ok=0
web_host_ok=0
while (( SECONDS < deadline )); do
  if [[ "$HEALTH_CHECK_MODE" == "container" || "$HEALTH_CHECK_MODE" == "both" ]]; then
    if check_container_health api "http://127.0.0.1:3001/health" >/dev/null 2>&1; then api_container_ok=1; fi
    if check_container_health web "http://127.0.0.1:3000/healthz" >/dev/null 2>&1; then web_container_ok=1; fi
  fi
  if [[ "$HEALTH_CHECK_MODE" == "host" || "$HEALTH_CHECK_MODE" == "both" ]]; then
    if check_host_health "$API_HEALTH_URL"; then api_host_ok=1; fi
    if check_host_health "$WEB_HEALTH_URL"; then web_host_ok=1; fi
  fi
  if [[ "$HEALTH_CHECK_MODE" == "container" && "$api_container_ok" == "1" && "$web_container_ok" == "1" ]]; then break; fi
  if [[ "$HEALTH_CHECK_MODE" == "host" && "$api_host_ok" == "1" && "$web_host_ok" == "1" ]]; then break; fi
  if [[ "$HEALTH_CHECK_MODE" == "both" && "$api_container_ok" == "1" && "$web_container_ok" == "1" && "$api_host_ok" == "1" && "$web_host_ok" == "1" ]]; then break; fi
  sleep 3
done

run docker compose -f "$COMPOSE_FILE" ps
run docker compose -f "$COMPOSE_FILE" logs --tail=200 api web

if [[ "$HEALTH_CHECK_MODE" == "container" || "$HEALTH_CHECK_MODE" == "both" ]]; then
  if [[ "$api_container_ok" != "1" ]]; then log "API container health failed: http://127.0.0.1:3001/health"; exit 1; fi
  if [[ "$web_container_ok" != "1" ]]; then log "Web container health failed: http://127.0.0.1:3000/healthz"; exit 1; fi
fi
if [[ "$HEALTH_CHECK_MODE" == "host" || "$HEALTH_CHECK_MODE" == "both" ]]; then
  if [[ "$api_host_ok" != "1" ]]; then log "API host health failed: $API_HEALTH_URL"; exit 1; fi
  if [[ "$web_host_ok" != "1" ]]; then log "Web host health failed: $WEB_HEALTH_URL"; exit 1; fi
fi

cleanup_report passed
log "ClientiAffidabili.it preflight passed"
if [[ "$PREFLIGHT_TARGET" == "local" ]]; then
  log "Browser ready: http://localhost:3000"
  log "API health: http://localhost:3001/health"
fi
