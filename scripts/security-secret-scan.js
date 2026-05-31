#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const ignoreDirs = new Set(['.git', 'node_modules', '.next', 'dist', 'coverage']);
const allowedFiles = new Set(['.env.example', 'apps/web/.env.local.example']);
const dangerousPatterns = [
  { name: 'Stripe live secret key', regex: /sk_live_[A-Za-z0-9]{20,}/ },
  { name: 'PayPal client secret literal', regex: /PAYPAL_CLIENT_SECRET\s*=\s*[^\s#=]{12,}/ },
  { name: 'Openapi API key literal', regex: /OPENAPI_API_KEY\s*=\s*[^\s#=]{12,}/ },
  { name: 'JWT secret literal', regex: /JWT_SECRET\s*=\s*(?!change_me)[^\s#=]{20,}/ },
  { name: 'Private key block', regex: /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoreDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

const findings = [];
for (const file of walk(root)) {
  const rel = path.relative(root, file);
  if (!/\.(ts|tsx|js|mjs|json|md|env|example|yml|yaml|txt)$/.test(rel) && !rel.endsWith('.env.example')) continue;
  const text = fs.readFileSync(file, 'utf8');
  for (const pattern of dangerousPatterns) {
    if (pattern.regex.test(text) && !allowedFiles.has(rel)) findings.push({ file: rel, pattern: pattern.name });
  }
  if (rel.startsWith('apps/web') && /NEXT_PUBLIC_.*(SECRET|TOKEN|KEY)\s*=\s*[^\s#=]+/i.test(text)) {
    findings.push({ file: rel, pattern: 'frontend public secret exposure' });
  }
}

if (findings.length) {
  console.error('Secret scan failed:');
  for (const finding of findings) console.error(`- ${finding.file}: ${finding.pattern}`);
  process.exit(1);
}
console.log('security-secret-scan: passed');
