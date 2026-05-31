import { AuthShell, LoginFormPreview } from '@/components/auth';
import { authFormsCopy } from '@/lib/auth/auth-accounts-runtime';

export default function LoginPage() {
  return <AuthShell title={authFormsCopy.loginTitle} subtitle={authFormsCopy.loginSubtitle}><LoginFormPreview /></AuthShell>;
}
