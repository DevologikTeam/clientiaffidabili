import Link from 'next/link';
import type { ReactNode } from 'react';
import { Header } from '@/components/Header';

const items = [
  { href: '/admin/operations', label: 'Centro operativo' },
  { href: '/admin/billing', label: 'Billing' },
  { href: '/admin/provider', label: 'Provider' },
  { href: '/admin/reports', label: 'Report' },
  { href: '/admin/catalog', label: 'Catalogo' },
  { href: '/admin/partners', label: 'Partner/API' },
];

export function AdminOperationsShell({ children, active = '/admin/operations' }: { children: ReactNode; active?: string }) {
  return (
    <>
      <Header />
      <main className="container dashboard">
        <aside className="sidebar" aria-label="Console admin">
          {items.map((item) => (
            <Link key={item.href} className={active === item.href ? 'active' : undefined} href={item.href}>{item.label}</Link>
          ))}
        </aside>
        <section className="ca-stack ca-stack--lg">{children}</section>
      </main>
    </>
  );
}
