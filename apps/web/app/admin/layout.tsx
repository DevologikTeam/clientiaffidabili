import type { ReactNode } from 'react';
import { buildSensitiveMetadata } from '@/lib/seo/metadata';

export const metadata = buildSensitiveMetadata({
  title: 'Admin riservato | ClientiAffidabili.it',
  description: 'Area operativa interna non indicizzabile.',
});

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
