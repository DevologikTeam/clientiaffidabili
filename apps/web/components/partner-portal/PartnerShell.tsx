import Link from 'next/link';
import type { ReactNode } from 'react';
import { Header } from '@/components/Header';

const items = [
  { href: '/dashboard/partner', label: 'Partner' },
  { href: '/dashboard/partner/api-keys', label: 'API key' },
  { href: '/dashboard/partner/docs', label: 'Docs' },
  { href: '/dashboard/partner/usage', label: 'Usage' },
  { href: '/dashboard/partner/webhooks', label: 'Webhook' },
  { href: '/dashboard/partner/go-live', label: 'Go live' },
];

export function PartnerShell({ children, active = '/dashboard/partner' }: { children: ReactNode; active?: string }) {
  return (
    <>
      <Header />
      <main className="container dashboard">
        <aside className="sidebar" aria-label="Portale partner">
          {items.map((item) => <Link key={item.href} className={active === item.href ? 'active' : undefined} href={item.href}>{item.label}</Link>)}
        </aside>
        <section className="ca-stack ca-stack--lg">{children}</section>
      </main>
    </>
  );
}
