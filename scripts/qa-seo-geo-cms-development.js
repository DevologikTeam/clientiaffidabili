const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const required = [
  'apps/api/src/modules/seo-cms/seo-cms.module.ts',
  'apps/api/src/modules/seo-cms/seo-cms.controller.ts',
  'apps/api/src/modules/seo-cms/seo-cms.service.ts',
  'apps/api/src/modules/seo-cms/entities/seo-page.entity.ts',
  'apps/api/src/modules/seo-cms/entities/seo-page-version.entity.ts',
  'apps/web/components/seo-cms/SeoPageRichEditor.tsx',
  'apps/web/app/admin/seo-pages/page.tsx',
  'apps/web/app/admin/seo-pages/nuova/page.tsx',
  'apps/web/app/admin/seo-pages/[id]/page.tsx',
  'apps/web/app/guide/[slug]/page.tsx',
  'apps/web/lib/seo-geo/seo-cms-runtime.ts',
  'docs/sprints/M14B-S_SEO_GEO_CMS_ADMIN_PAGES_DEVELOPMENT.md',
  'docs/seo-geo/04_CMS_EDITOR_SELECTION_AND_GUARDRAILS.md',
  'docs/releases/0.43.0.md',
];

const missing = required.filter((rel) => !fs.existsSync(path.join(root, rel)));
if (missing.length) {
  console.error('Missing files:', missing.join('\n'));
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'apps/web/package.json'), 'utf8'));
for (const dep of ['@tiptap/react', '@tiptap/starter-kit', '@tiptap/extension-link', '@tiptap/extension-placeholder']) {
  if (!pkg.dependencies || !pkg.dependencies[dep]) {
    console.error(`Missing dependency ${dep}`);
    process.exit(1);
  }
}

const editor = fs.readFileSync(path.join(root, 'apps/web/components/seo-cms/SeoPageRichEditor.tsx'), 'utf8');
for (const needle of ['use client', 'immediatelyRender: false', 'StarterKit', 'Placeholder']) {
  if (!editor.includes(needle)) {
    console.error(`Editor missing ${needle}`);
    process.exit(1);
  }
}

const guardrails = fs.readFileSync(path.join(root, 'apps/api/src/modules/seo-cms/seo-cms.guardrails.ts'), 'utf8');
for (const blocked of ['rischio zero', 'solvibilità garantita', 'pagamento garantito']) {
  if (!guardrails.includes(blocked)) {
    console.error(`Guardrail missing blocked claim: ${blocked}`);
    process.exit(1);
  }
}

const appModule = fs.readFileSync(path.join(root, 'apps/api/src/app.module.ts'), 'utf8');
if (!appModule.includes('SeoCmsModule') || !appModule.includes('SeoPage') || !appModule.includes('SeoPageVersion')) {
  console.error('AppModule missing SeoCmsModule or entities');
  process.exit(1);
}

console.log('qa-seo-geo-cms-development: passed');
