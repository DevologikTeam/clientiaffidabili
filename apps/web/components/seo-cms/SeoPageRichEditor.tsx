'use client';

import { useMemo, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';

type SeoPageRichEditorProps = {
  initialHtml: string;
};

export function SeoPageRichEditor({ initialHtml }: SeoPageRichEditorProps) {
  const [html, setHtml] = useState(initialHtml);
  const extensions = useMemo(() => [
    StarterKit.configure({ heading: { levels: [2, 3] } }),
    Link.configure({ openOnClick: false, autolink: true, protocols: ['http', 'https', 'mailto'] }),
    Placeholder.configure({ placeholder: 'Scrivi una guida chiara: problema, cosa si può verificare, limiti, garanzia operativa e prossima azione.' }),
  ], []);

  const editor = useEditor({
    extensions,
    content: initialHtml,
    immediatelyRender: false,
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
  });

  return (
    <div className="card ca-stack">
      <div className="ca-table-head">
        <div>
          <h3>Editor contenuto</h3>
          <p>Editor controllato per pagine SEO/GEO. Usa sezioni brevi, titoli chiari e limiti espliciti.</p>
        </div>
        <div className="ca-editor-toolbar" aria-label="Toolbar editor">
          <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()}>Bold</button>
          <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()}>Italic</button>
          <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
          <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>
          <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()}>Lista</button>
        </div>
      </div>
      <div className="ca-rich-editor">
        <EditorContent editor={editor} />
      </div>
      <details className="ca-editor-preview">
        <summary>Anteprima HTML salvabile</summary>
        <textarea readOnly rows={8} value={html} />
      </details>
    </div>
  );
}
