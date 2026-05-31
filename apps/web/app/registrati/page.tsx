import { AuthShell, RegisterCompanyFormPreview } from '@/components/auth';
import { authFormsCopy } from '@/lib/auth/auth-accounts-runtime';

export default function RegisterPage() {
  return <AuthShell title={authFormsCopy.registerTitle} subtitle={authFormsCopy.registerSubtitle}><RegisterCompanyFormPreview /></AuthShell>;
}
