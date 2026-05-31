import { TrustNotice } from '@/components/ds';

export function ComplianceNotice() {
  return (
    <TrustNotice title="Uso responsabile delle verifiche" tone="warning">
      <p>
        Le verifiche servono per decisioni professionali lecite e proporzionate. Non sostituiscono consulenza legale,
        istruttoria bancaria o garanzia di pagamento.
      </p>
    </TrustNotice>
  );
}
