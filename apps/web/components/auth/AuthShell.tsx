import type { ReactNode } from 'react';
import { Header } from '@/components/Header';

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="container auth-layout">
        <section className="auth-copy">
          <span className="eyebrow">Account sicuro</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <div className="trust-box">Sessioni protette con cookie HttpOnly, Secure e SameSite. Le azioni sensibili richiedono step-up e audit.</div>
        </section>
        <section className="auth-card">{children}</section>
      </main>
    </>
  );
}
