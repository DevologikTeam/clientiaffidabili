#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const root = process.cwd();
const failures = [];
function read(file) {
  const p = path.join(root, file);
  if (!fs.existsSync(p)) {
    failures.push(`Missing required file: ${file}`);
    return '';
  }
  return fs.readFileSync(p, 'utf8');
}
const doc = read('docs/deployment/GIT_FLOW_COOLIFY.md');
for (const token of ['develop', 'main', 'v0.75.1', 'pnpm qa:coolify-preflight', 'COOLIFY_STAGING_WEBHOOK_URL', 'COOLIFY_PRODUCTION_WEBHOOK_URL']) {
  if (!doc.includes(token)) failures.push(`Git flow doc missing token: ${token}`);
}
const workflow = read('.github/workflows/coolify-deploy.yml');
for (const token of ['branches:', 'develop', 'main', "tags:", "'v*'", 'pnpm release:pre-zip-check', 'COOLIFY_STAGING_WEBHOOK_URL', 'COOLIFY_PRODUCTION_WEBHOOK_URL', 'curl -fsS -X POST']) {
  if (!workflow.includes(token)) failures.push(`Coolify workflow missing token: ${token}`);
}
const pkg = JSON.parse(read('package.json') || '{}');
if (!pkg.scripts || pkg.scripts['qa:git-flow-coolify'] !== 'node scripts/qa-git-flow-coolify.js') {
  failures.push('package.json missing qa:git-flow-coolify script.');
}
const artifact = { status: failures.length ? 'failed' : 'passed', checkedAt: new Date().toISOString(), failures };
fs.mkdirSync(path.join(root, 'artifacts/qa'), { recursive: true });
fs.writeFileSync(path.join(root, 'artifacts/qa/git-flow-coolify-latest.json'), JSON.stringify(artifact, null, 2));
if (failures.length) {
  console.error('Git flow Coolify QA failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('Git flow Coolify QA passed.');
