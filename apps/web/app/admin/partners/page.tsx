import { AdminOperationsShell } from '@/components/admin-operations/AdminOperationsShell';
import { AdminPartnerList } from '@/components/partner-portal/AdminPartnerList';

export default function AdminPartnersPage() {
  return <AdminOperationsShell active="/admin/partners"><AdminPartnerList /></AdminOperationsShell>;
}
