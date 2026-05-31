import { PartnerShell } from '@/components/partner-portal/PartnerShell';
import { PartnerGoLiveChecklist } from '@/components/partner-portal/PartnerGoLiveChecklist';

export default function PartnerGoLivePage() {
  return <PartnerShell active="/dashboard/partner/go-live"><PartnerGoLiveChecklist /></PartnerShell>;
}
