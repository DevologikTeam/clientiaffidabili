import { PartnerShell } from '@/components/partner-portal/PartnerShell';
import { PartnerStatusHero } from '@/components/partner-portal/PartnerStatusHero';
import { PartnerApiKeyTable } from '@/components/partner-portal/PartnerApiKeyTable';
import { PartnerUsageLedger } from '@/components/partner-portal/PartnerUsageLedger';
import { PartnerWebhookPanel } from '@/components/partner-portal/PartnerWebhookPanel';

export default function PartnerDashboardPage() {
  return <PartnerShell active="/dashboard/partner"><PartnerStatusHero /><PartnerApiKeyTable /><PartnerUsageLedger /><PartnerWebhookPanel /></PartnerShell>;
}
