import { Header } from '@/components/Header';
import { AdminFiscalLegalQueue } from '@/components/fiscal-legal';
import { adminFiscalLegalQueue } from '@/lib/fiscal-legal/fiscal-legal-runtime';

export default function AdminFiscalLegalPage() {
  return (
    <>
      <Header />
      <main className="container ca-stack ca-stack--lg" style={{ paddingTop: 32, paddingBottom: 64 }} id="main-content" tabIndex={-1}>
        <AdminFiscalLegalQueue items={adminFiscalLegalQueue} />
      </main>
    </>
  );
}
