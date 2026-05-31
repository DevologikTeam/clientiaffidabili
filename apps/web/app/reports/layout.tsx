import type { ReactNode } from 'react';
import { buildSensitiveMetadata } from '@/lib/seo/metadata';

export const metadata = buildSensitiveMetadata({
  title: 'Report riservato | ClientiAffidabili.it',
  description: 'Report consultabile solo da utenti autorizzati e non indicizzabile.',
});

export default function ReportsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
