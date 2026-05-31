import { PartnerShell } from '@/components/partner-portal/PartnerShell';
import { DeveloperQuickstart } from '@/components/partner-portal/DeveloperQuickstart';

export default function PartnerDocsPage() {
  return <PartnerShell active="/dashboard/partner/docs"><DeveloperQuickstart /></PartnerShell>;
}
