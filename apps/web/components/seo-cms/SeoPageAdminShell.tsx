import Link from 'next/link';
import type { ReactNode } from 'react';

const nav = [
  { href: '/admin/seo-pages', label: 'Pagine SEO/GEO' },
  { href: '/admin/seo-pages/nuova', label: 'Nuova pagina' },
  { href: '/admin/operations', label: 'Operazioni' },
  { href: '/admin/security', label: 'Sicurezza' },
];

export function SeoPageAdminShell({ children, active }: { children: ReactNode; active: string }) {
  return (
    <main className="dashboard container">
      <aside className="sidebar">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className={active === item.href ? 'active' : undefined}>
            {item.label}
          </Link>
        ))}
      </aside>
      <section className="ca-stack ca-stack--lg">{children}</section>
    </main>
  );
}
