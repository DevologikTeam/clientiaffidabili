import { PartnerShell } from '@/components/partner-portal/PartnerShell';
import { PartnerApiKeyTable } from '@/components/partner-portal/PartnerApiKeyTable';
import { TrustNotice } from '@/components/ds';

export default function PartnerApiKeysPage() {
  return <PartnerShell active="/dashboard/partner/api-keys"><PartnerApiKeyTable /><TrustNotice tone="warning" title="Secret mostrato una sola volta">Le chiavi vengono salvate solo come hash. Usa rotazione e revoca se sospetti esposizione.</TrustNotice></PartnerShell>;
}
