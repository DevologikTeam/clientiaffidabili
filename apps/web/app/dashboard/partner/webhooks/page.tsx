import { PartnerShell } from '@/components/partner-portal/PartnerShell';
import { PartnerWebhookPanel } from '@/components/partner-portal/PartnerWebhookPanel';

export default function PartnerWebhooksPage() {
  return <PartnerShell active="/dashboard/partner/webhooks"><PartnerWebhookPanel /></PartnerShell>;
}
