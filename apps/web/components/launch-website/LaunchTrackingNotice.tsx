import { TrustNotice } from '@/components/ds';

export function LaunchTrackingNotice() {
  return (
    <TrustNotice title="Misurazione privacy-safe" tone="info">
      Il sito deve misurare solo eventi aggregati di funnel, senza inviare dati sensibili, aziende cercate, report ID, codici fiscali, IBAN o dati personali negli analytics.
    </TrustNotice>
  );
}
