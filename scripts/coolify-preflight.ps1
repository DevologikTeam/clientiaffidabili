param(
  [string]$Target = $(if ($env:COOLIFY_PREFLIGHT_TARGET) { $env:COOLIFY_PREFLIGHT_TARGET } else { "local" }),
  [string]$ComposeFile = $env:COOLIFY_COMPOSE_FILE,
  [string]$ApiHealthUrl = $(if ($env:API_HEALTH_URL) { $env:API_HEALTH_URL } else { "http://localhost:3001/health" }),
  [string]$WebHealthUrl = $(if ($env:WEB_HEALTH_URL) { $env:WEB_HEALTH_URL } else { "http://localhost:3000/healthz" }),
  [string]$HealthCheckMode = $env:HEALTH_CHECK_MODE,
  [int]$WaitSeconds = $(if ($env:WAIT_SECONDS) { [int]$env:WAIT_SECONDS } else { 90 })
)
$ErrorActionPreference = "Stop"
$Root = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $Root

if ([string]::IsNullOrWhiteSpace($Target)) { $Target = "local" }
if ([string]::IsNullOrWhiteSpace($ComposeFile)) {
  if ($Target -eq "strict" -or $Target -eq "coolify") { $ComposeFile = "docker-compose.coolify.yml" } else { $ComposeFile = "docker-compose.yml" }
}
if (!(Test-Path $ComposeFile) -and $ComposeFile -eq "docker-compose.coolify.yml" -and (Test-Path "docker-compose.coolify.yaml")) { $ComposeFile = "docker-compose.coolify.yaml" }
if (!(Test-Path $ComposeFile)) { throw "Compose file not found: $ComposeFile" }
if ([string]::IsNullOrWhiteSpace($HealthCheckMode)) { if ($Target -eq "strict" -or $Target -eq "coolify") { $HealthCheckMode = "container" } else { $HealthCheckMode = "both" } }
if ([string]::IsNullOrWhiteSpace($env:DATABASE_SYNCHRONIZE)) { if ($Target -eq "local") { $env:DATABASE_SYNCHRONIZE = "true" } else { $env:DATABASE_SYNCHRONIZE = "false" } }
if ([string]::IsNullOrWhiteSpace($env:DATABASE_LOGGING)) { $env:DATABASE_LOGGING = "false" }
if ([string]::IsNullOrWhiteSpace($env:POSTGRES_DB)) { $env:POSTGRES_DB = "clientiaffidabili" }
if ([string]::IsNullOrWhiteSpace($env:POSTGRES_USER)) { $env:POSTGRES_USER = "clientiaffidabili" }
if ([string]::IsNullOrWhiteSpace($env:POSTGRES_PASSWORD)) { $env:POSTGRES_PASSWORD = "change_me_local" }
if ([string]::IsNullOrWhiteSpace($env:DATABASE_URL)) { $env:DATABASE_URL = "postgresql://$($env:POSTGRES_USER):$($env:POSTGRES_PASSWORD)@postgres:5432/$($env:POSTGRES_DB)" }
if ([string]::IsNullOrWhiteSpace($env:APP_URL)) { $env:APP_URL = "http://localhost:3000" }
if ([string]::IsNullOrWhiteSpace($env:API_URL)) { $env:API_URL = "http://localhost:3001" }
if ([string]::IsNullOrWhiteSpace($env:PUBLIC_API_URL)) { $env:PUBLIC_API_URL = "http://localhost:3001" }
if ([string]::IsNullOrWhiteSpace($env:JWT_SECRET)) { $env:JWT_SECRET = "local_preflight_jwt_secret_change_me" }

New-Item -ItemType Directory -Force -Path "artifacts/qa" | Out-Null
$LogFile = "artifacts/qa/coolify-preflight-latest.log"
$ReportFile = "artifacts/qa/coolify-preflight-latest.json"
Set-Content -Path $LogFile -Value ""
function Log($Message) { $line = "[$((Get-Date).ToString('o'))] $Message"; Write-Host $line; Add-Content -Path $LogFile -Value $line }
function Run($CommandLine) { Log "+ $CommandLine"; cmd /c $CommandLine 2>&1 | Tee-Object -FilePath $LogFile -Append; if ($LASTEXITCODE -ne 0) { throw "Command failed: $CommandLine" } }

function Ensure-Dependencies {
  if ($env:SKIP_INSTALL -eq "1") { Log "Skipping pnpm install because SKIP_INSTALL=1"; return }
  $rootPnpm = Test-Path "node_modules/.pnpm"
  $apiNest = (Test-Path "apps/api/node_modules/.bin/nest") -or (Test-Path "apps/api/node_modules/.bin/nest.cmd")
  $webNext = (Test-Path "apps/web/node_modules/.bin/next") -or (Test-Path "apps/web/node_modules/.bin/next.cmd")
  if (!$rootPnpm -or !$apiNest -or !$webNext) {
    Log "Workspace dependencies missing or incomplete; running pnpm install before build"
    Run "pnpm install --frozen-lockfile=false"
  } else {
    Log "Workspace dependencies already installed"
  }
}

function Write-Report($Status) {
  @{ generatedAt = (Get-Date).ToUniversalTime().ToString('o'); status = $Status; preflightTarget = $Target; composeFile = $ComposeFile; apiHealthUrl = $ApiHealthUrl; webHealthUrl = $WebHealthUrl; healthCheckMode = $HealthCheckMode; databaseSynchronize = $env:DATABASE_SYNCHRONIZE; logFile = $LogFile } | ConvertTo-Json -Depth 5 | Set-Content -Path $ReportFile
}

function Test-ContainerHealth($Service, $Url) {
  cmd /c "docker compose -f `"$ComposeFile`" exec -T $Service node -e `"fetch(process.argv[1]).then((res)=>process.exit(res.ok?0:1)).catch(()=>process.exit(1))`" `"$Url`"" | Out-Null
  return $LASTEXITCODE -eq 0
}

function Test-HostHealth($Url) {
  try { Invoke-WebRequest -UseBasicParsing -Uri $Url -TimeoutSec 3 | Out-Null; return $true } catch { return $false }
}

try {
  Log "ClientiAffidabili.it preflight started"
  Log "Target=$Target; compose=$ComposeFile; health=$HealthCheckMode"
  if ($Target -eq "local") { Log "Local/browser preflight publishes host ports via docker-compose.yml. Open http://localhost:3000 after success." } else { Log "Strict Coolify-like preflight may not publish host ports; use container health checks or Coolify proxy." }
  Log "Preflight DATABASE_SYNCHRONIZE=$($env:DATABASE_SYNCHRONIZE); Coolify production should keep DATABASE_SYNCHRONIZE=false unless migrations are executed."
  Ensure-Dependencies
  Run "pnpm --filter @clientiaffidabili/api build"
  Log "Running local web build with NEXT_DISABLE_STANDALONE=1 to avoid Windows symlink EPERM; Docker build still validates standalone in Linux"
  Run "set NEXT_DISABLE_STANDALONE=1&& pnpm --filter @clientiaffidabili/web build"
  Run "docker compose -f `"$ComposeFile`" down --remove-orphans"
  Run "docker compose -f `"$ComposeFile`" build --no-cache api web"
  Run "docker compose -f `"$ComposeFile`" up -d"
  Run "docker compose -f `"$ComposeFile`" ps"
  Log "Waiting for health endpoints for up to $WaitSeconds seconds using $HealthCheckMode mode"
  $deadline = (Get-Date).AddSeconds($WaitSeconds)
  $apiContainerOk = $false
  $webContainerOk = $false
  $apiHostOk = $false
  $webHostOk = $false
  while ((Get-Date) -lt $deadline) {
    if ($HealthCheckMode -eq "container" -or $HealthCheckMode -eq "both") {
      if (Test-ContainerHealth "api" "http://127.0.0.1:3001/health") { $apiContainerOk = $true }
      if (Test-ContainerHealth "web" "http://127.0.0.1:3000/healthz") { $webContainerOk = $true }
    }
    if ($HealthCheckMode -eq "host" -or $HealthCheckMode -eq "both") {
      if (Test-HostHealth $ApiHealthUrl) { $apiHostOk = $true }
      if (Test-HostHealth $WebHealthUrl) { $webHostOk = $true }
    }
    if ($HealthCheckMode -eq "container" -and $apiContainerOk -and $webContainerOk) { break }
    if ($HealthCheckMode -eq "host" -and $apiHostOk -and $webHostOk) { break }
    if ($HealthCheckMode -eq "both" -and $apiContainerOk -and $webContainerOk -and $apiHostOk -and $webHostOk) { break }
    Start-Sleep -Seconds 3
  }
  Run "docker compose -f `"$ComposeFile`" ps"
  Run "docker compose -f `"$ComposeFile`" logs --tail=200 api web"
  if (($HealthCheckMode -eq "container" -or $HealthCheckMode -eq "both") -and !$apiContainerOk) { throw "API container health failed: http://127.0.0.1:3001/health" }
  if (($HealthCheckMode -eq "container" -or $HealthCheckMode -eq "both") -and !$webContainerOk) { throw "Web container health failed: http://127.0.0.1:3000/healthz" }
  if (($HealthCheckMode -eq "host" -or $HealthCheckMode -eq "both") -and !$apiHostOk) { throw "API host health failed: $ApiHealthUrl" }
  if (($HealthCheckMode -eq "host" -or $HealthCheckMode -eq "both") -and !$webHostOk) { throw "Web host health failed: $WebHealthUrl" }
  Write-Report "passed"
  Log "ClientiAffidabili.it preflight passed"
  if ($Target -eq "local") { Log "Browser ready: http://localhost:3000"; Log "API health: http://localhost:3001/health" }
} catch {
  Write-Report "failed"
  throw
}
