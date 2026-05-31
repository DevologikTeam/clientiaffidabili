#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const roots = ['apps', 'packages'];
const extensions = new Set(['.ts', '.tsx', '.js', '.jsx']);
const ignored = new Set(['node_modules', '.next', 'dist', 'build', 'coverage']);

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (extensions.has(path.extname(entry.name))) files.push(full);
  }
  return files;
}

function checkSource(file) {
  const source = fs.readFileSync(file, 'utf8');
  const errors = [];
  let state = 'code';
  let quote = null;
  let templateDepth = 0;
  const stack = [];
  let line = 1;
  let col = 0;
  let stringStart = null;

  function push(c) { stack.push({ c, line, col }); }
  function pop(expected, c) {
    const last = stack.pop();
    if (!last || last.c !== expected) {
      errors.push(`${file}:${line}:${col} unexpected '${c}'`);
    }
  }

  for (let i = 0; i < source.length; i++) {
    const ch = source[i];
    const next = source[i + 1];
    col++;

    if (ch === '\n') {
      if (state === 'line-comment') { state = 'code'; }
      if (state === 'string') {
        errors.push(`${file}:${stringStart.line}:${stringStart.col} string literal crosses a newline. Use \\n or a template literal.`);
        state = 'code';
        quote = null;
      }
      line++;
      col = 0;
      continue;
    }

    if (state === 'line-comment') {
      continue;
    }

    if (state === 'block-comment') {
      if (ch === '*' && next === '/') { i++; col++; state = 'code'; }
      continue;
    }

    if (state === 'string') {
      if (ch === '\\') { i++; col++; continue; }
      if (ch === quote) { state = 'code'; quote = null; stringStart = null; }
      continue;
    }

    if (state === 'template') {
      if (ch === '\\') { i++; col++; continue; }
      if (ch === '`' && templateDepth === 0) { state = 'code'; continue; }
      if (ch === '$' && next === '{') { templateDepth++; i++; col++; continue; }
      if (ch === '}' && templateDepth > 0) { templateDepth--; continue; }
      continue;
    }

    // code state
    if (ch === '/' && next === '/') { state = 'line-comment'; i++; col++; continue; }
    if (ch === '/' && next === '*') { state = 'block-comment'; i++; col++; continue; }
    if (ch === "'" || ch === '"') {
      const prev = source[i - 1] || '';
      if (ch === "'" && /[A-Za-z0-9_]/.test(prev)) continue;
      state = 'string'; quote = ch; stringStart = { line, col }; continue;
    }
    if (ch === '`') { state = 'template'; templateDepth = 0; continue; }
    if (ch === '(' || ch === '[' || ch === '{') push(ch);
    if (ch === ')') pop('(', ch);
    if (ch === ']') pop('[', ch);
    if (ch === '}') pop('{', ch);
  }

  if (state === 'string') errors.push(`${file}:${stringStart.line}:${stringStart.col} unterminated string literal.`);
  if (state === 'block-comment') errors.push(`${file}: unterminated block comment.`);
  if (state === 'template') errors.push(`${file}: unterminated template literal.`);
  if (stack.length) {
    const last = stack[stack.length - 1];
    errors.push(`${file}:${last.line}:${last.col} unclosed '${last.c}'.`);
  }
  return errors;
}

const files = roots.flatMap((r) => walk(path.join(process.cwd(), r)));
const errors = files.flatMap(checkSource);
if (errors.length) {
  console.error('Source syntax smoke check failed:');
  for (const e of errors.slice(0, 50)) console.error(`- ${e}`);
  if (errors.length > 50) console.error(`... ${errors.length - 50} more`);
  process.exit(1);
}
console.log(`Source syntax smoke check passed on ${files.length} source files.`);
