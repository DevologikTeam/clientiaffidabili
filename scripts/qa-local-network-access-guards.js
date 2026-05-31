#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const failures = [];
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');
const exists = (rel) => fs.existsSync(path.join(root, rel));

function fail(message) { failures.push(message); }
function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.next', 'dist', 'coverage', 'playwright-report', 'test-results'].includes(entry.name)) walk(full, acc);
    } else if (/\.(ts|tsx|js|jsx|mjs)$/.test(entry.name)) {
      acc.push(full);
    }
  }
  return acc;
}

const analyticsRuntime = 'apps/web/lib/analytics/tag-manager-clarity-runtime.ts';
const analyticsRoute = 'apps/web/app/api/analytics/public-config/route.ts';
const nextConfig = 'apps/web/next.config.mjs';
const webDockerfile = 'apps/web/Dockerfile';
for (const rel of [analyticsRuntime, analyticsRoute, nextConfig, webDockerfile]) {
  if (!exists(rel)) fail(`Missing required file: ${rel}`);
}

if (exists(analyticsRuntime)) {
  const content = read(analyticsRuntime);
  if (!content.includes("fetch(`/api/analytics/public-config?pathname=${encodeURIComponent(pathname)}`")) {
    fail('External tracking config must be fetched through same-origin /api/analytics/public-config.');
  }
  for (const forbidden of ['process.env.NEXT_PUBLIC_API_URL', 'http://localhost:3001', 'http://127.0.0.1:3001', 'http://api:3001']) {
    if (content.includes(forbidden)) fail(`${analyticsRuntime} must not expose browser fetch target ${forbidden}.`);
  }
}

if (exists(analyticsRoute)) {
  const content = read(analyticsRoute);
  for (const token of ['INTERNAL_API_URL', '/analytics/public-config', 'defaultExternalTrackingConfig', 'NextResponse.json']) {
    if (!content.includes(token)) fail(`${analyticsRoute} missing server-side proxy token: ${token}`);
  }
  if (content.includes('NEXT_PUBLIC_API_URL')) fail(`${analyticsRoute} must not fall back to NEXT_PUBLIC_API_URL.`);
}

if (exists(nextConfig)) {
  const content = read(nextConfig);
  for (const token of ['Permissions-Policy', 'local-network-access=()', 'publickey-credentials-get=()', 'identity-credentials-get=()']) {
    if (!content.includes(token)) fail(`${nextConfig} missing browser permission policy token: ${token}`);
  }
}

if (exists(webDockerfile)) {
  const content = read(webDockerfile);
  if (content.includes('NEXT_PUBLIC_API_URL')) fail(`${webDockerfile} must not bake public API URLs into browser bundles.`);
}

for (const compose of ['docker-compose.yml', 'docker-compose.coolify.yml']) {
  if (!exists(compose)) {
    fail(`Missing ${compose}`);
    continue;
  }
  const content = read(compose);
  if (content.includes('NEXT_PUBLIC_API_URL')) fail(`${compose} must not inject NEXT_PUBLIC_API_URL into web runtime.`);
  if (!content.includes('INTERNAL_API_URL')) fail(`${compose} must keep server-side INTERNAL_API_URL for web API proxy.`);
}

for (const full of walk(path.join(root, 'apps/web/app'))) {
  const rel = path.relative(root, full).replace(/\\/g, '/');
  const content = fs.readFileSync(full, 'utf8');
  if (rel.startsWith('apps/web/app/api/')) continue;
  for (const forbidden of ['http://localhost', 'http://127.0.0.1', 'http://api:3001', 'NEXT_PUBLIC_API_URL', 'targetAddressSpace']) {
    if (content.includes(forbidden)) fail(`${rel} contains browser/local-network trigger: ${forbidden}`);
  }
}

const artifactDir = path.join(root, 'artifacts/qa');
fs.mkdirSync(artifactDir, { recursive: true });
fs.writeFileSync(path.join(artifactDir, 'local-network-access-guards-latest.json'), JSON.stringify({
  name: 'qa-local-network-access-guards',
  status: failures.length ? 'failed' : 'passed',
  checkedAt: new Date().toISOString(),
  failures,
}, null, 2));

if (failures.length) {
  console.error('Local network access guards failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('Local network access guards passed.');
