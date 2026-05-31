#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const failures = [];
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');
const exists = (rel) => fs.existsSync(path.join(root, rel));

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.next', 'dist', 'coverage'].includes(entry.name)) walk(full, acc);
    } else if (/\.(ts|tsx|js|jsx|mjs)$/.test(entry.name)) {
      acc.push(full);
    }
  }
  return acc;
}

function fail(message) {
  failures.push(message);
}

const nextConfigRel = 'apps/web/next.config.mjs';
if (!exists(nextConfigRel)) {
  fail('Missing apps/web/next.config.mjs');
} else {
  const config = read(nextConfigRel);
  for (const token of ['Permissions-Policy', 'publickey-credentials-get=()', 'identity-credentials-get=()']) {
    if (!config.includes(token)) fail(`next.config.mjs must include ${token}`);
  }
}

const forbiddenRuntimePatterns = [
  /navigator\.credentials\s*\./,
  /PublicKeyCredential\b/,
  /credentials\.get\s*\(/,
  /credentials\.create\s*\(/,
  /autocomplete=["']webauthn["']/i,
  /autoComplete=["']webauthn["']/i,
  /identityCredential/i,
  /FederatedCredential/i,
  /PasswordCredential/i
];

for (const full of walk(path.join(root, 'apps/web'))) {
  const rel = path.relative(root, full).replace(/\\/g, '/');
  const content = fs.readFileSync(full, 'utf8');
  for (const pattern of forbiddenRuntimePatterns) {
    if (pattern.test(content)) fail(`${rel} contains browser credential/permission trigger: ${pattern}`);
  }
}

const authFiles = [
  ['apps/web/components/auth/LoginFormPreview.tsx', ['autoComplete="username email"', 'autoComplete="current-password"']],
  ['apps/web/components/auth/RegisterCompanyFormPreview.tsx', ['autoComplete="email"', 'autoComplete="new-password"']],
  ['apps/web/app/invito/[token]/page.tsx', ['autoComplete="new-password"']]
];
for (const [rel, tokens] of authFiles) {
  if (!exists(rel)) {
    fail(`Missing ${rel}`);
    continue;
  }
  const content = read(rel);
  for (const token of tokens) if (!content.includes(token)) fail(`${rel} must include ${token}`);
}

const artifactDir = path.join(root, 'artifacts/qa');
fs.mkdirSync(artifactDir, { recursive: true });
const report = {
  name: 'qa-browser-permission-public-guards',
  status: failures.length ? 'failed' : 'passed',
  checkedAt: new Date().toISOString(),
  failures
};
fs.writeFileSync(path.join(artifactDir, 'browser-permission-public-guards-latest.json'), JSON.stringify(report, null, 2));

if (failures.length) {
  console.error('Browser permission public guards failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('Browser permission public guards passed.');
