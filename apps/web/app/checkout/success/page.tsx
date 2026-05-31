import { PaymentStatusPanel } from '@/components/billing';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Button, Card, SectionHeader, Stepper } from '@/components/ds';
import { checkoutSteps } from '@/lib/billing/checkout';

export default function CheckoutSuccessPage() {
  return (
    <>
      <Header />
      <main className="section ca-section-muted" id="main-content" tabIndex={-1}>
        <div className="container ca-stack ca-stack-lg">
          <SectionHeader
            eyebrow="Pagamento confermato"
            title="La verifica può partire in modo controllato."
            description="Dopo la conferma del pagamento, il sistema registra ordine, pagamento e documento amministrativo, poi abilita l’avvio della verifica."
          />
          <Stepper steps={checkoutSteps.map((step) => step.label)} currentStep={5} />
          <PaymentStatusPanel mode="success" />
          <Card>
            <h2>Prossima azione</h2>
            <p>Vai all’area cliente per seguire stato richiesta, report e documenti amministrativi.</p>
            <Button href="/dashboard">Apri area cliente</Button>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
