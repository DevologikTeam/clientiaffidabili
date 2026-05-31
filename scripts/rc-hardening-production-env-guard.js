#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const release = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).version;
const envFile = process.env.RC_ENV_FILE || (fs.existsSync(path.join(root, '.env')) ? '.env' : '.env.example');
const failOnProductionIssue = process.argv.includes('--fail-on-production-issue');

function parseEnv(content) {
  const result = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#') || !line.includes('=')) continue;
    const index = line.indexOf('=');
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim().replace(/^['"]|['"]$/g, '');
    result[key] = value;
  }
  return result;
}

const envPath = path.join(root, envFile);
const fileEnv = fs.existsSync(envPath) ? parseEnv(fs.readFileSync(envPath, 'utf8')) : {};
const merged = { ...fileEnv, ...process.env };
const nodeEnv = merged.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const checks = [
  { key: 'ENABLE_DEMO_DATA', expectedProductionValue: 'false', severity: 'P0' },
  { key: 'ENABLE_PROVIDER_CALLS', expectedProductionValue: 'false', severity: 'P0_UNTIL_PROVIDER_CERTIFIED' },
  { key: 'ENABLE_CHECKOUT', expectedProductionValue: 'false', severity: 'P0_UNTIL_PAYMENT_CERTIFIED' },
  { key: 'OPENAI_FEATURES_ENABLED', expectedProductionValue: 'false', severity: 'P0_UNTIL_AI_CERTIFIED' },
  { key: 'ENABLE_PRODUCTION_QA_GATE', expectedProductionValue: 'true', severity: 'P1' },
];

const evaluated = checks.map((check) => {
  const value = merged[check.key];
  const present = typeof value !== 'undefined' && value !== '';
  const productionSafe = !isProduction || value === check.expectedProductionValue;
  return {
    key: check.key,
    present,
    expectedProductionValue: check.expectedProductionValue,
    severity: check.severity,
    productionSafe,
  };
});

const failures = evaluated.filter((check) => isProduction && !check.productionSafe && check.severity.startsWith('P0'));
const output = {
  release,
  sprint: 'M21-S RC Hardening Development',
  generatedAt: new Date().toISOString(),
  source: envFile,
  nodeEnv,
  isProduction,
  status: failures.length ? 'blocked' : 'ready_to_run',
  checks: evaluated,
  redaction: 'Only key presence and boolean safety are exported. Values are never written.',
};

fs.mkdirSync(path.join(root, 'artifacts/rc-hardening'), { recursive: true });
fs.writeFileSync(path.join(root, 'artifacts/rc-hardening/m21s-production-env-guard.sample.json'), `${JSON.stringify(output, null, 2)}\n`);
console.log(`M21-S production env guard completed: ${output.status} (${envFile}).`);
if (failOnProductionIssue && failures.length) {
  console.error('Production env guard failures:');
  for (const failure of failures) console.error(`- ${failure.key} must be ${failure.expectedProductionValue} in production until certified.`);
  process.exit(2);
}
