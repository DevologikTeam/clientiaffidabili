#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const release = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).version;
const generatedAt = new Date().toISOString();

const requiredArtifacts = [
  { id: 'artifact-build-log', gateId: 'rc-build-typecheck-docker', path: 'artifacts/rc-hardening/build/pnpm-build.log', requiredForRc: true },
  { id: 'artifact-docker-log', gateId: 'rc-build-typecheck-docker', path: 'artifacts/rc-hardening/build/docker-build.log', requiredForRc: true },
  { id: 'artifact-lockfile', gateId: 'rc-dependency-freeze', path: 'pnpm-lock.yaml', requiredForRc: true },
  { id: 'artifact-restore-drill', gateId: 'rc-database-migration-restore', path: 'artifacts/rc-hardening/database/restore-drill.log', requiredForRc: true },
  { id: 'artifact-provider-sandbox-real', gateId: 'rc-provider-sandbox-certification', path: 'artifacts/rc-hardening/providers/sandbox-certification-real.json', requiredForRc: true },
  { id: 'artifact-playwright-report', gateId: 'rc-browser-e2e-real', path: 'playwright-report/index.html', requiredForRc: true },
  { id: 'artifact-security-privacy-signoff', gateId: 'rc-security-privacy-freeze', path: 'artifacts/rc-hardening/security-privacy-freeze.json', requiredForRc: true },
  { id: 'artifact-owner-signoff', gateId: 'rc-evidence-bundle-signoff', path: 'artifacts/rc-hardening/owner-signoffs.json', requiredForRc: true },
];

const gates = [
  { id: 'rc-build-typecheck-docker', blockerCode: 'RC-P0-001', label: 'Build/typecheck/Docker reali', owner: 'Tech Lead', blocksReleaseCandidate: true, waiverAllowed: false },
  { id: 'rc-dependency-freeze', blockerCode: 'RC-P0-002', label: 'Dependency freeze e lockfile', owner: 'Tech Lead', blocksReleaseCandidate: true, waiverAllowed: false },
  { id: 'rc-env-secrets-feature-flags', blockerCode: 'RC-P0-003', label: 'ENV, secrets e feature flag', owner: 'Security Lead', blocksReleaseCandidate: true, waiverAllowed: false },
  { id: 'rc-database-migration-restore', blockerCode: 'RC-P0-004', label: 'Migrazioni, backup e restore', owner: 'Backend Lead', blocksReleaseCandidate: true, waiverAllowed: false },
  { id: 'rc-provider-sandbox-certification', blockerCode: 'RC-P0-005', label: 'Provider sandbox reali', owner: 'Operations Lead', blocksReleaseCandidate: true, waiverAllowed: true },
  { id: 'rc-browser-e2e-real', blockerCode: 'RC-P0-006', label: 'Playwright reale', owner: 'QA Lead', blocksReleaseCandidate: true, waiverAllowed: false },
  { id: 'rc-security-privacy-freeze', blockerCode: 'RC-P0-007', label: 'Security/privacy freeze', owner: 'Security Lead', blocksReleaseCandidate: true, waiverAllowed: false },
  { id: 'rc-evidence-bundle-signoff', blockerCode: 'RC-P0-008', label: 'Evidence bundle e sign-off', owner: 'Product Owner', blocksReleaseCandidate: true, waiverAllowed: false },
  { id: 'rc-observability-support-runbook', blockerCode: 'RC-P1-001', label: 'Observability/support runbook', owner: 'Operations Lead', blocksReleaseCandidate: false, waiverAllowed: true },
];

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function gateStatus(gate) {
  if (gate.id === 'rc-env-secrets-feature-flags') return exists('artifacts/rc-hardening/m21s-production-env-guard.sample.json') ? 'ready_to_run' : 'blocked';
  if (gate.id === 'rc-observability-support-runbook') return exists('docs/rc-hardening/22_OBSERVABILITY_SUPPORT_RUNBOOK_RUNTIME.md') ? 'ready_to_run' : 'blocked';
  if (gate.id === 'rc-security-privacy-freeze') return exists('scripts/security-secret-scan.js') && exists('apps/web/app/robots.ts') ? 'ready_to_run' : 'blocked';
  const related = requiredArtifacts.filter((artifact) => artifact.gateId === gate.id && artifact.requiredForRc);
  return related.length > 0 && related.every((artifact) => exists(artifact.path)) ? 'passed' : 'blocked';
}

const evaluatedGates = gates.map((gate) => {
  const related = requiredArtifacts.filter((artifact) => artifact.gateId === gate.id);
  const missingEvidence = related.filter((artifact) => !exists(artifact.path)).map((artifact) => artifact.path);
  const attachedArtifacts = related.filter((artifact) => exists(artifact.path)).map((artifact) => artifact.path);
  const status = gateStatus(gate);
  return {
    ...gate,
    status,
    attachedArtifacts,
    missingEvidence,
    requiredEvidence: related.map((artifact) => artifact.path),
    nextAction: status === 'passed' ? 'Mantenere evidenza nel bundle finale.' : 'Allegare evidenza reale redatta o mantenere gate bloccante.',
  };
});

const openBlockingGateCount = evaluatedGates.filter((gate) => gate.blocksReleaseCandidate && gate.status !== 'passed' && gate.status !== 'waived_with_feature_off').length;
const result = {
  release,
  sprint: 'M21-S RC Hardening Development',
  generatedAt,
  overallStatus: openBlockingGateCount === 0 ? 'ready_for_rc' : 'blocked',
  blockingGateCount: evaluatedGates.filter((gate) => gate.blocksReleaseCandidate).length,
  openBlockingGateCount,
  gates: evaluatedGates,
  artifactInventory: requiredArtifacts.map((artifact) => ({ ...artifact, presentInPackage: exists(artifact.path) })),
  signoffPolicy: 'No RC sign-off while openBlockingGateCount > 0. Provider waiver is valid only as waived_with_feature_off.',
};

const outDir = path.join(root, 'artifacts/rc-hardening');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'm21s-rc-gate-run.json'), `${JSON.stringify(result, null, 2)}\n`);
fs.writeFileSync(path.join(outDir, 'm21s-rc-evidence-bundle.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(`M21-S RC hardening gate runner completed: ${result.overallStatus} (${openBlockingGateCount} open blocking gates).`);
if (process.argv.includes('--fail-on-blocked') && openBlockingGateCount > 0) {
  process.exit(2);
}
