import { PaymentStatusPanel } from '@/components/billing';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Button, Card, SectionHeader } from '@/components/ds';

export default function CheckoutCancelPage() {
  return (
    <>
      <Header />
      <main className="section ca-section-muted" id="main-content" tabIndex={-1}>
        <div className="container ca-stack ca-stack-lg">
          <SectionHeader
            eyebrow="Checkout annullato"
            title="Nessun pagamento e nessuna verifica avviata."
            description="La verifica non viene avviata finché il pagamento non è confermato."
          />
          <PaymentStatusPanel mode="cancel" />
          <Card>
            <h2>Puoi riprendere quando vuoi</h2>
            <p>Il prezzo verrà ricalcolato dal listino e confermato in un nuovo riepilogo ordine.</p>
            <Button href="/prezzi">Torna ai prezzi</Button>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
