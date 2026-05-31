import { PartnerShell } from '@/components/partner-portal/PartnerShell';
import { PartnerUsageLedger } from '@/components/partner-portal/PartnerUsageLedger';

export default function PartnerUsagePage() {
  return <PartnerShell active="/dashboard/partner/usage"><PartnerUsageLedger /></PartnerShell>;
}
