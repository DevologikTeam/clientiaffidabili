import type { ReactNode } from 'react';
import { buildSensitiveMetadata } from '@/lib/seo/metadata';

export const metadata = buildSensitiveMetadata({
  title: 'Area cliente riservata | ClientiAffidabili.it',
  description: 'Area cliente non indicizzabile.',
});

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
