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
    if (entry.name === 'node_modules' || entry.name === 'dist') continue;
    const full = path.join(abs, entry.name);
    const rel = path.relative(root, full).replace(/\\/g, '/');
    if (entry.isDirectory()) walk(rel, extensions, acc);
    else if (extensions.some((ext) => rel.endsWith(ext))) acc.push(rel);
  }
  return acc;
}

function compact(value) {
  return value.replace(/\s+/g, ' ').trim().slice(0, 240);
}

function collectDecorator(lines, start) {
  let decorator = lines[start].trim();
  let end = start;
  while (!decorator.includes(')') && end + 1 < lines.length) {
    end += 1;
    decorator += ` ${lines[end].trim()}`;
  }
  return { decorator, end };
}

function nextProperty(lines, start) {
  let i = start + 1;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line || line.startsWith('@')) {
      i += 1;
      continue;
    }
    return { line, index: i };
  }
  return null;
}

const primitiveRuntimeTypes = new Set(['string', 'number', 'boolean', 'Date']);
const entityFiles = walk('apps/api/src', ['.entity.ts']);
const riskyColumns = [];

for (const file of entityFiles) {
  const content = read(file);
  const lines = content.split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    if (!lines[i].includes('@Column(')) continue;
    const { decorator, end } = collectDecorator(lines, i);
    const property = nextProperty(lines, end);
    if (!property) continue;
    const match = property.line.match(/(?:public |private |protected )?(\w+)[!?]?:?\s*([^=;]+)(?:[=;]|$)/);
    if (!match) continue;
    const typeName = match[2].trim();
    const hasExplicitType = /\btype\s*:/.test(decorator);
    const isPrimitive = primitiveRuntimeTypes.has(typeName);
    const isJsonColumn = /jsonb|simple-json/.test(decorator);
    const isEnumColumn = /\benum\s*:/.test(decorator);
    const isGeneratedRelationOrDate = /CreateDateColumn|UpdateDateColumn|PrimaryGeneratedColumn/.test(decorator);
    const looksLikeAliasOrUnion = !isPrimitive || /['"|\[\]]/.test(typeName);

    if (!isGeneratedRelationOrDate && !hasExplicitType && !isJsonColumn && !isEnumColumn && looksLikeAliasOrUnion) {
      riskyColumns.push(`${file}:${i + 1}: ${compact(decorator)} -> ${compact(property.line)}`);
    }
  }
}

if (riskyColumns.length) {
  failures.push(`TypeORM/Postgres columns using union, literal, indexed-access, or type-alias properties must declare an explicit column type such as { type: 'varchar' }. Otherwise reflect-metadata reports design:type Object and runtime fails with DataTypeNotSupportedError.\n${riskyColumns.join('\n')}`);
}

const supportTicket = read('apps/api/src/modules/customer-dashboard/entities/support-ticket.entity.ts');
for (const token of [
  "@Column({ type: 'varchar', default: 'other' })",
  "@Column({ type: 'varchar', default: 'open' })",
  "@Column({ type: 'varchar', default: 'normal' })",
  "@Column({ type: 'varchar', nullable: true })",
]) {
  if (!supportTicket.includes(token)) {
    failures.push(`SupportTicket entity must keep explicit varchar metadata for Postgres runtime: ${token}`);
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  status: failures.length ? 'failed' : 'passed',
  guardedRuntimeErrors: [
    'DataTypeNotSupportedError: Data type Object in SupportTicket.category is not supported by postgres',
    'TypeORM columns typed with TypeScript unions/type aliases/indexed access must not rely on reflect-metadata inference',
  ],
  scanned: {
    entityFiles: entityFiles.length,
    riskyColumnCount: riskyColumns.length,
  },
  warnings,
  failures,
};
fs.mkdirSync(path.join(root, 'artifacts/qa'), { recursive: true });
fs.writeFileSync(path.join(root, 'artifacts/qa/api-typeorm-postgres-static-guards-latest.json'), `${JSON.stringify(report, null, 2)}\n`);

if (failures.length) {
  console.error('API TypeORM/Postgres static guards QA failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('API TypeORM/Postgres static guards QA passed.');
