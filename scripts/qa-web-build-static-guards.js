#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const failures = [];
const warnings = [];

function read(file) {
  const abs = path.join(root, file);
  return fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : '';
}

function walk(dir, extensions, acc = []) {
  const abs = path.join(root, dir);
  if (!fs.existsSync(abs)) return acc;
  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === 'dist') continue;
    const full = path.join(abs, entry.name);
    const rel = path.relative(root, full).replace(/\\/g, '/');
    if (entry.isDirectory()) walk(rel, extensions, acc);
    else if (extensions.some((ext) => rel.endsWith(ext))) acc.push(rel);
  }
  return acc;
}

function assertIncludes(file, content, token, message) {
  if (!content.includes(token)) failures.push(`${message || 'Missing token'} in ${file}: ${token}`);
}

function compactSnippet(value) {
  return value.replace(/\s+/g, ' ').slice(0, 220);
}

const tsxFiles = walk('apps/web', ['.tsx']);
const sourceFiles = walk('apps/web', ['.tsx', '.ts', '.css']);


const designSystemComponentFiles = fs.existsSync(path.join(root, 'apps/web/components/ds'))
  ? fs.readdirSync(path.join(root, 'apps/web/components/ds')).filter((entry) => entry.endsWith('.tsx'))
  : [];
const designSystemComponents = designSystemComponentFiles.map((entry) => entry.replace(/\.tsx$/, ''));
const designSystemClassNameUsages = [];
const designSystemClassNameUnsupported = [];
for (const componentName of designSystemComponents) {
  const componentFile = `apps/web/components/ds/${componentName}.tsx`;
  const componentSource = read(componentFile);
  const supportsClassName = /className\??\s*:/.test(componentSource) || /HTMLAttributes</.test(componentSource) || /ComponentProps/.test(componentSource);
  const usageFiles = [];
  const usageRegex = new RegExp('<' + componentName + '\\b[\\s\\S]*?className=');
  for (const file of tsxFiles) {
    if (file === componentFile) continue;
    const content = read(file);
    if (usageRegex.test(content)) usageFiles.push(file);
  }
  if (usageFiles.length) {
    designSystemClassNameUsages.push({ componentName, usageFiles });
    if (!supportsClassName) {
      designSystemClassNameUnsupported.push(`${componentName}: used with className in ${[...new Set(usageFiles)].join(', ')} but ${componentFile} does not expose className?: or an HTMLAttributes-based contract`);
    }
  }
}
if (designSystemClassNameUnsupported.length) {
  failures.push(`Design system components used with className must expose className in their props to avoid Next TypeScript build failures:
${designSystemClassNameUnsupported.join('\n')}`);
}

const readonlyArraySensitiveFiles = tsxFiles.filter((file) => file.startsWith('apps/web/components/'));
const mutableArrayPropPatterns = [];
for (const file of readonlyArraySensitiveFiles) {
  const content = read(file);
  const lines = content.split(/\r?\n/);
  lines.forEach((line, index) => {
    const isComponentContractLine = /export function|type \w+Props|interface \w+Props|items:|rows:|columns:|checks:|documents:|invoices:|notifications:|permissions:|services:|pages:|controls:|members:|steps:|legalPack:|acceptances:|blockedActions:|actions:/.test(line);
    const hasMutableArraySyntax = /(?<!readonly\s)(?<!ReadonlyArray<)\b[A-Za-z0-9_$.<>]+\[\]/.test(line) || /\bArray<[^>]+>/.test(line);
    const allowedNonPropArrayCast = /Array\.from|Object\.keys\([^)]*\) as |window\.dataLayer|useMemo\(/.test(line);
    if (isComponentContractLine && hasMutableArraySyntax && !allowedNonPropArrayCast) {
      mutableArrayPropPatterns.push(`${file}:${index + 1}: ${compactSnippet(line)}`);
    }
  });
}
if (mutableArrayPropPatterns.length) {
  failures.push(`Component prop contracts must accept readonly/as const arrays. Replace mutable []/Array<> props with ReadonlyArray<>:\n${mutableArrayPropPatterns.join('\n')}`);
}


const statCardFile = 'apps/web/components/ds/StatCard.tsx';
const statCard = read(statCardFile);
if (!statCard) {
  failures.push(`Missing ${statCardFile}`);
} else {
  assertIncludes(statCardFile, statCard, 'value: ReactNode', 'StatCard must accept numeric/string/renderable values');
  assertIncludes(statCardFile, statCard, 'description?: ReactNode', 'StatCard description must accept renderable copy');
  assertIncludes(statCardFile, statCard, 'helper?: ReactNode', 'StatCard must keep helper alias for legacy pages');
  assertIncludes(statCardFile, statCard, 'description ?? helper', 'StatCard must normalize description/helper copy');
  if (/value\s*:\s*string\s*;/.test(statCard)) {
    failures.push('StatCard value is string-only: this recreates Next build errors when value={someNumber}.');
  }
  if (!/helper\s*,/.test(statCard) && tsxFiles.some((file) => read(file).includes('<StatCard') && read(file).includes('helper='))) {
    failures.push('StatCard helper= is used in the app but the component does not destructure helper.');
  }
}

const statCardUsages = [];
for (const file of tsxFiles) {
  const content = read(file);
  if (!content.includes('<StatCard')) continue;
  const matches = content.match(/<StatCard\b[^>]*>/gs) || [];
  for (const match of matches) {
    statCardUsages.push({ file, match });
    if (!/\bvalue=/.test(match)) failures.push(`StatCard usage without value prop in ${file}: ${compactSnippet(match)}`);
  }
}
const numericStatCardUsages = statCardUsages.filter(({ match }) => /value=\{[^}]*\b(length|Count|total|Credits|Available|pending|open|failed|summary\.|\.summary|reserved|critical|blocked)[^}]*\}/i.test(match));
if (numericStatCardUsages.length && !statCard.includes('value: ReactNode')) {
  failures.push(`Found ${numericStatCardUsages.length} numeric StatCard value usages while StatCard is not number-safe.`);
}

const providerPage = read('apps/web/app/admin/provider/page.tsx');
if (!providerPage.includes('value={String(providerRuntimeDemoQueue.length)}')) {
  failures.push('Admin provider page must keep the original Docker build failure guarded with String(providerRuntimeDemoQueue.length).');
}
if (!providerPage.includes('value={String(reviewItems.length)}')) {
  failures.push('Admin provider page must stringify reviewItems.length.');
}
if (providerPage.includes('helper="Ultime richieste provider"')) {
  failures.push('Admin provider page still uses helper on the line that triggered the build failure; use description there and keep helper only as compatibility alias.');
}

const dataTableFile = 'apps/web/components/ds/DataTable.tsx';
const dataTable = read(dataTableFile);
if (!dataTable) {
  failures.push(`Missing ${dataTableFile}`);
} else {
  for (const token of [
    'LegacyDataTableColumn',
    'caption?: string',
    'ReadonlyArray<DataTableColumn<Row> | LegacyDataTableColumn>',
    'renderLegacyCell',
    'Array.isArray(row)',
    'normalizedColumns',
  ]) {
    assertIncludes(dataTableFile, dataTable, token, 'DataTable legacy column compatibility missing');
  }
  if (/columns\s*:\s*DataTableColumn<Row>\[\]/.test(dataTable)) {
    failures.push('DataTable columns are object-only: this recreates Next build errors for columns={["..."]}.');
  }
}

const legacyDataTableUsages = [];
for (const file of tsxFiles) {
  const content = read(file);
  const matches = content.match(/<DataTable\b[\s\S]*?columns=\{\s*\[/g) || [];
  if (matches.length) legacyDataTableUsages.push(file);
}
if (legacyDataTableUsages.length && !dataTable.includes('LegacyDataTableColumn')) {
  failures.push(`Found legacy DataTable string columns in ${legacyDataTableUsages.join(', ')} but compatibility bridge is missing.`);
}

const implicitAnyDataTableRenderPatterns = [];
for (const file of tsxFiles) {
  if (file === dataTableFile) continue;
  const content = read(file);
  const lines = content.split(/\r?\n/);
  lines.forEach((line, index) => {
    if (/render:\s*\(\s*[A-Za-z_$][\w$]*\s*\)\s*=>/.test(line)) {
      implicitAnyDataTableRenderPatterns.push(`${file}:${index + 1}: ${compactSnippet(line)}`);
    }
  });
}
if (implicitAnyDataTableRenderPatterns.length) {
  failures.push(`DataTable column render callbacks must type the parameter or use a typed column definition; untyped render callbacks recreate noImplicitAny Docker build failures:\n${implicitAnyDataTableRenderPatterns.join('\n')}`);
}
if (dataTable.includes('ReadonlyReadonlyArray')) {
  failures.push('DataTable contains invalid ReadonlyReadonlyArray typo; use ReadonlyArray to keep web builds type-safe.');
}

const stepperFile = 'apps/web/components/ds/Stepper.tsx';
const stepper = read(stepperFile);
if (!stepper) {
  failures.push(`Missing ${stepperFile}`);
} else {
  assertIncludes(stepperFile, stepper, 'items?: ReadonlyArray<StepperItem>', 'Stepper must keep typed item contract optional and readonly-safe for legacy compatibility');
  assertIncludes(stepperFile, stepper, 'steps?: ReadonlyArray<string>', 'Stepper must support checkout legacy steps shorthand and readonly arrays');
  assertIncludes(stepperFile, stepper, 'currentStep?: number', 'Stepper must support checkout legacy currentStep shorthand');
  assertIncludes(stepperFile, stepper, 'normalizeStepperItems', 'Stepper must normalize items/steps before rendering');
  if (/items\s*:\s*StepperItem\[\]/.test(stepper)) {
    failures.push('Stepper items are required/object-only: this recreates Next build errors for steps={...} currentStep={...}.');
  }
}
const legacyStepperUsages = [];
for (const file of tsxFiles) {
  const content = read(file);
  if (!content.includes('<Stepper')) continue;
  const matches = content.match(/<Stepper\b[\s\S]*?(?:\/>|<\/Stepper>)/g) || [];
  for (const match of matches) {
    if (/\bsteps=/.test(match) || /\bcurrentStep=/.test(match)) legacyStepperUsages.push(file);
  }
}
if (legacyStepperUsages.length && (!stepper.includes('steps?: ReadonlyArray<string>') || !stepper.includes('currentStep?: number'))) {
  failures.push(`Found legacy Stepper props in ${[...new Set(legacyStepperUsages)].join(', ')} but Stepper does not support steps/currentStep.`);
}

const statusPillFile = 'apps/web/components/ds/StatusPill.tsx';
const statusPill = read(statusPillFile);
if (!statusPill) {
  failures.push(`Missing ${statusPillFile}`);
} else {
  assertIncludes(statusPillFile, statusPill, 'label?: ReactNode', 'StatusPill must keep label optional for children shorthand');
  assertIncludes(statusPillFile, statusPill, 'children?: ReactNode', 'StatusPill must support legacy children shorthand');
  assertIncludes(statusPillFile, statusPill, 'label ?? children', 'StatusPill must normalize label/children');
  if (/label\s*:\s*string\s*;/.test(statusPill)) {
    failures.push('StatusPill label is required/string-only: this breaks legacy <StatusPill>Text</StatusPill> usages.');
  }
}
const statusPillChildrenUsages = [];
for (const file of tsxFiles) {
  const content = read(file);
  if (!content.includes('<StatusPill')) continue;
  const matches = content.match(/<StatusPill\b[\s\S]*?<\/StatusPill>/g) || [];
  for (const match of matches) {
    if (!/\blabel=/.test(match)) statusPillChildrenUsages.push(file);
  }
}
if (statusPillChildrenUsages.length && !statusPill.includes('children?: ReactNode')) {
  failures.push(`Found StatusPill children shorthand in ${[...new Set(statusPillChildrenUsages)].join(', ')} but StatusPill does not support children.`);
}

const progressBarFile = 'apps/web/components/ds/ProgressBar.tsx';
const progressBar = read(progressBarFile);
if (!progressBar) {
  failures.push(`Missing ${progressBarFile}`);
} else {
  assertIncludes(progressBarFile, progressBar, 'max?: number', 'ProgressBar must support wallet/usage max prop');
  assertIncludes(progressBarFile, progressBar, 'normalizeProgressValue', 'ProgressBar must normalize value/max to percentage');
}
const progressBarMaxUsages = [];
for (const file of tsxFiles) {
  const content = read(file);
  if (!content.includes('<ProgressBar')) continue;
  const matches = content.match(/<ProgressBar\b[^>]*>/g) || [];
  for (const match of matches) {
    if (/\bmax=/.test(match)) progressBarMaxUsages.push(file);
  }
}
if (progressBarMaxUsages.length && !progressBar.includes('max?: number')) {
  failures.push(`Found ProgressBar max prop in ${[...new Set(progressBarMaxUsages)].join(', ')} but ProgressBar does not support max.`);
}

const alertFile = 'apps/web/components/ds/Alert.tsx';
const alert = read(alertFile);
if (!alert) {
  failures.push(`Missing ${alertFile}`);
} else {
  assertIncludes(alertFile, alert, 'children?: ReactNode', 'Alert must allow description-only usages');
  assertIncludes(alertFile, alert, 'description?: ReactNode', 'Alert must support description shorthand');
  assertIncludes(alertFile, alert, 'children ?? description', 'Alert must normalize children/description');
}
const alertDescriptionUsages = [];
for (const file of tsxFiles) {
  const content = read(file);
  if (!content.includes('<Alert')) continue;
  const matches = content.match(/<Alert\b[\s\S]*?(?:\/>|<\/Alert>)/g) || [];
  for (const match of matches) {
    if (/\bdescription=/.test(match)) alertDescriptionUsages.push(file);
  }
}
if (alertDescriptionUsages.length && !alert.includes('description?: ReactNode')) {
  failures.push(`Found Alert description shorthand in ${[...new Set(alertDescriptionUsages)].join(', ')} but Alert does not support it.`);
}

const checklistFile = 'apps/web/components/ds/Checklist.tsx';
const checklist = read(checklistFile);
if (!checklist) {
  failures.push(`Missing ${checklistFile}`);
} else {
  assertIncludes(checklistFile, checklist, 'type ChecklistItem = string | { label: string; done?: boolean }', 'Checklist must support object items used by QA/status pages');
  assertIncludes(checklistFile, checklist, 'getChecklistItemLabel', 'Checklist must normalize string/object labels');
  assertIncludes(checklistFile, checklist, 'className?: string', 'Checklist must support className because subscription plan cards and future layout wrappers use it');
  assertIncludes(checklistFile, checklist, "['ca-checklist', className ?? ''].filter(Boolean).join(' ')", 'Checklist must merge className with the base ca-checklist class');
  if (/items\s*:\s*string\[\]/.test(checklist)) {
    failures.push('Checklist items are string-only: this breaks pages passing { label, done } status objects.');
  }
}
const checklistObjectUsages = [];
for (const file of tsxFiles) {
  const content = read(file);
  if (!content.includes('<Checklist')) continue;
  const matches = content.match(/<Checklist\b[^>]*items=\{[\s\S]*?\}\s*\/?\>/g) || [];
  for (const match of matches) {
    if (/\{\s*label\s*:/.test(match) || /done\s*:/.test(match)) checklistObjectUsages.push(file);
  }
}
if (checklistObjectUsages.length && !checklist.includes('ChecklistItem = string |')) {
  failures.push(`Found Checklist object items in ${[...new Set(checklistObjectUsages)].join(', ')} but Checklist is not object-compatible.`);
}
const checklistClassNameUsages = [];
for (const file of tsxFiles) {
  const content = read(file);
  if (!content.includes('<Checklist')) continue;
  const matches = content.match(/<Checklist\b[^>]*>/g) || [];
  for (const match of matches) {
    if (/\bclassName=/.test(match)) checklistClassNameUsages.push(file);
  }
}
if (checklistClassNameUsages.length && !/className\??\s*:/.test(checklist)) {
  failures.push(`Found Checklist className usage in ${[...new Set(checklistClassNameUsages)].join(', ')} but Checklist does not expose className?: string.`);
}


for (const file of sourceFiles.filter((file) => file.endsWith('.css') || file.endsWith('.tsx'))) {
  const content = read(file);
  const badFlexEnd = content.match(/(?:align-items|align-self|justify-content|justify-self|place-items|place-content)\s*:\s*end\b/g);
  if (badFlexEnd) failures.push(`${file} contains mixed-support CSS end alignment: ${badFlexEnd.join(', ')}. Use flex-end.`);
}


for (const generatedCache of ['apps/web/tsconfig.tsbuildinfo', 'apps/api/tsconfig.tsbuildinfo', 'packages/shared/tsconfig.tsbuildinfo']) {
  if (fs.existsSync(path.join(root, generatedCache))) {
    failures.push(`${generatedCache} is a generated TypeScript cache and must not be shipped in the ZIP; it can preserve stale build diagnostics.`);
  }
}

const webTsconfig = (() => {
  try { return JSON.parse(read('apps/web/tsconfig.json') || '{}'); }
  catch (error) { failures.push(`Invalid apps/web/tsconfig.json: ${error.message}`); return {}; }
})();
const plugins = (((webTsconfig.compilerOptions || {}).plugins) || []);
if (!plugins.some((plugin) => plugin && plugin.name === 'next')) {
  failures.push('apps/web/tsconfig.json is missing compilerOptions.plugins[{ name: "next" }], causing Next build to mutate tsconfig during Docker builds.');
}
if ((webTsconfig.compilerOptions || {}).strict !== true) {
  warnings.push('apps/web/tsconfig.json strict mode is not true.');
}

const packageJson = (() => {
  try { return JSON.parse(read('package.json') || '{}'); }
  catch (error) { failures.push(`Invalid package.json: ${error.message}`); return {}; }
})();
if (!packageJson.scripts || !packageJson.scripts['qa:web-build-static-guards']) {
  failures.push('package.json missing qa:web-build-static-guards script.');
}
if (!packageJson.scripts || !packageJson.scripts['release:pre-zip-check'] || !packageJson.scripts['release:pre-zip-check'].includes('qa-web-build-static-guards.js')) {
  failures.push('package.json release:pre-zip-check must include qa-web-build-static-guards.js.');
}

const workflow = read('.github/workflows/production-qa.yml');
if (!workflow.includes('node scripts/qa-web-build-static-guards.js')) {
  failures.push('Production QA workflow must run qa-web-build-static-guards.js before pnpm build.');
}



const webPackage = (() => {
  try { return JSON.parse(read('apps/web/package.json') || '{}'); }
  catch (error) { failures.push(`Invalid apps/web/package.json: ${error.message}`); return {}; }
})();
const sharedPackage = (() => {
  try { return JSON.parse(read('packages/shared/package.json') || '{}'); }
  catch (error) { failures.push(`Invalid packages/shared/package.json: ${error.message}`); return {}; }
})();
const webSharedImportFiles = sourceFiles.filter((file) => read(file).includes("@clientiaffidabili/shared"));
if (webSharedImportFiles.length) {
  if (sharedPackage.name !== '@clientiaffidabili/shared') {
    failures.push('packages/shared/package.json must expose name "@clientiaffidabili/shared" because web/API import it.');
  }
  const webDeps = { ...((webPackage || {}).dependencies || {}), ...((webPackage || {}).devDependencies || {}) };
  if (webDeps['@clientiaffidabili/shared'] !== 'workspace:*') {
    failures.push(`apps/web imports @clientiaffidabili/shared in ${webSharedImportFiles.length} files but apps/web/package.json does not declare "@clientiaffidabili/shared": "workspace:*". Docker pnpm --filter @clientiaffidabili/web... will not link it.`);
  }
  const sharedPath = (((webTsconfig.compilerOptions || {}).paths || {})['@clientiaffidabili/shared'] || []);
  if (!sharedPath.includes('../../packages/shared/src/index.ts')) {
    failures.push('apps/web/tsconfig.json must map @clientiaffidabili/shared to ../../packages/shared/src/index.ts as a build-safety fallback.');
  }
  const nextConfig = read('apps/web/next.config.mjs');
  if (!nextConfig.includes("transpilePackages: ['@clientiaffidabili/shared']") && !nextConfig.includes('transpilePackages: ["@clientiaffidabili/shared"]')) {
    failures.push('apps/web/next.config.mjs must include transpilePackages for @clientiaffidabili/shared so future runtime imports from the workspace package remain Docker-build safe.');
  }
  const webDockerfile = read('apps/web/Dockerfile');
  for (const token of [
    'COPY packages/shared/package.json packages/shared/package.json',
    'RUN pnpm install --filter @clientiaffidabili/web... --frozen-lockfile=false'
  ]) {
    if (!webDockerfile.includes(token)) failures.push(`apps/web/Dockerfile missing workspace shared install support token: ${token}`);
  }
  if (webDockerfile.includes('COPY --from=deps /app/packages/shared/node_modules ./packages/shared/node_modules') ||
      webDockerfile.includes('COPY --from=prod-deps /app/packages/shared/node_modules ./packages/shared/node_modules')) {
    failures.push('apps/web/Dockerfile must not COPY packages/shared/node_modules from deps/prod-deps: pnpm may not create that optional path for a source-only workspace package, causing Docker checksum failures.');
  }
}



const customerEducationRuntimeFile = 'apps/web/lib/seo-geo/customer-education-runtime.ts';
const customerEducationRuntime = read(customerEducationRuntimeFile);
const seoCmsRuntimeFile = 'apps/web/lib/seo-geo/seo-cms-runtime.ts';
const seoCmsRuntime = read(seoCmsRuntimeFile);
function extractUnionLiterals(source, typeName) {
  const match = source.match(new RegExp('export\\s+type\\s+' + typeName + '\\s*=\\s*([\\s\\S]*?);'));
  return match ? [...match[1].matchAll(/'([^']+)'/g)].map((item) => item[1]) : [];
}
const educationIntentLiterals = extractUnionLiterals(customerEducationRuntime, 'EducationIntent');
const educationIntentUsageValues = [...customerEducationRuntime.matchAll(/intent:\s*'([^']+)'/g)].map((item) => item[1]);
const invalidEducationIntentUsages = educationIntentUsageValues.filter((intent) => !educationIntentLiterals.includes(intent));
if (!educationIntentLiterals.includes('informational')) {
  failures.push('EducationIntent must include informational because customer education SEO/GEO runtime pages use intent: \'informational\' and Next typecheck otherwise fails.');
}
if (invalidEducationIntentUsages.length) {
  failures.push(`customer-education-runtime contains intent values not declared in EducationIntent: ${[...new Set(invalidEducationIntentUsages)].join(', ')}`);
}
const intentMapKeys = [...seoCmsRuntime.matchAll(/^\s*([a-zA-Z0-9_]+):\s*'[^']+'/gm)].map((item) => item[1]);
const missingSeoCmsIntentMappings = educationIntentUsageValues.filter((intent) => !intentMapKeys.includes(intent));
if (missingSeoCmsIntentMappings.length) {
  failures.push(`seo-cms-runtime intentMap is missing mappings for customer education intents: ${[...new Set(missingSeoCmsIntentMappings)].join(', ')}`);
}



const dockerRuntimeGuardScript = read('scripts/qa-docker-runtime-static-guards.js');
if (!dockerRuntimeGuardScript.includes('MODULE_NOT_FOUND reflect-metadata') || !dockerRuntimeGuardScript.includes('/app/apps/web/server.js')) {
  failures.push('scripts/qa-docker-runtime-static-guards.js must guard the latest Docker runtime restart failures: reflect-metadata and /app/apps/web/server.js.');
}
if (!packageJson.scripts || !packageJson.scripts['qa:docker-runtime-static-guards']) {
  failures.push('package.json missing qa:docker-runtime-static-guards script.');
}
if (!packageJson.scripts || !packageJson.scripts['release:pre-zip-check'] || !packageJson.scripts['release:pre-zip-check'].includes('qa-docker-runtime-static-guards.js')) {
  failures.push('package.json release:pre-zip-check must include qa-docker-runtime-static-guards.js after the web build static guard.');
}

const report = {
  generatedAt: new Date().toISOString(),
  status: failures.length ? 'failed' : 'passed',
  scanned: {
    tsxFiles: tsxFiles.length,
    sourceFiles: sourceFiles.length,
    statCardUsages: statCardUsages.length,
    numericStatCardUsages: numericStatCardUsages.length,
    legacyDataTableUsageFiles: legacyDataTableUsages.length,
    legacyStepperUsageFiles: [...new Set(legacyStepperUsages)].length,
    statusPillChildrenUsageFiles: [...new Set(statusPillChildrenUsages)].length,
    progressBarMaxUsageFiles: [...new Set(progressBarMaxUsages)].length,
    checklistClassNameUsageFiles: [...new Set(checklistClassNameUsages)].length,
    webSharedImportFiles: webSharedImportFiles.length,
    educationIntentUsageValues: educationIntentUsageValues.length,
    invalidEducationIntentUsages: invalidEducationIntentUsages.length,
    missingSeoCmsIntentMappings: missingSeoCmsIntentMappings.length,
    dockerRuntimeGuardPresent: dockerRuntimeGuardScript.length > 0,
    designSystemClassNameUsageComponents: designSystemClassNameUsages.length,
    designSystemClassNameUnsupportedComponents: designSystemClassNameUnsupported.length,
    readonlyArrayMutablePropPatterns: mutableArrayPropPatterns.length,
    implicitAnyDataTableRenderPatterns: implicitAnyDataTableRenderPatterns.length,
  },
  guardedBuildErrors: [
    'StatCard numeric value must not fail TypeScript build',
    'StatCard legacy helper alias must not fail TypeScript build',
    'DataTable legacy string columns must not fail TypeScript build',
    'DataTable render callbacks must not recreate implicit-any build failures',
    'Stepper steps/currentStep legacy shorthand must not fail TypeScript build',
    'StatusPill children shorthand must not fail TypeScript build',
    'ProgressBar max prop must not fail TypeScript build',
    'Readonly/as const arrays must be accepted by component prop contracts',
    'Generated TypeScript tsbuildinfo caches must not be shipped',
    'CSS end alignment must not recreate Autoprefixer warning',
    'Next tsconfig plugin must be committed to avoid Docker build mutation',
    'Alert description shorthand must not fail TypeScript build',
    'Checklist { label, done } items must not fail TypeScript build',
    'Checklist className shorthand must not fail TypeScript build',
    'Design system className usages must be backed by props contracts',
    'DataTable contract must not contain invalid ReadonlyReadonlyArray typos',
    'Web imports from @clientiaffidabili/shared must declare workspace dependency, tsconfig path fallback and Next transpilePackages',
    'Customer education runtime intent literals must be declared in EducationIntent and mapped to SeoSearchIntent',
    'Docker runtime start guards must prevent API reflect-metadata and web standalone server.js MODULE_NOT_FOUND restart loops',
  ],
  warnings,
  failures,
};
fs.mkdirSync(path.join(root, 'artifacts/qa'), { recursive: true });
fs.writeFileSync(path.join(root, 'artifacts/qa/web-build-static-guards-latest.json'), `${JSON.stringify(report, null, 2)}\n`);

if (failures.length) {
  console.error('Web build static guards QA failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Web build static guards QA passed (${statCardUsages.length} StatCard usages, ${legacyDataTableUsages.length} legacy DataTable files, ${legacyStepperUsages.length} legacy Stepper usages, ${mutableArrayPropPatterns.length} mutable readonly-sensitive prop patterns, ${implicitAnyDataTableRenderPatterns.length} implicit DataTable render callbacks, ${designSystemClassNameUnsupported.length} unsupported design-system className usages, ${webSharedImportFiles.length} shared workspace import files).`);
if (warnings.length) {
  for (const warning of warnings) console.warn(`Warning: ${warning}`);
}
