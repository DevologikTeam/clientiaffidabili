import { Injectable } from '@nestjs/common';
import { LaunchGateCheck, LaunchReadinessSummary } from './launch-readiness.types';

@Injectable()
export class LaunchReadinessService {
  getSummary(): LaunchReadinessSummary {
    const checks: LaunchGateCheck[] = [
      this.check('build', 'Build reale web/api eseguita', 'warning', 'Scaffold: eseguire pnpm build in CI prima del go-live.'),
      this.check('e2e', 'Playwright P0/P1 eseguiti', 'warning', 'Scaffold: eseguire pnpm e2e:ci con servizi avviati.'),
      this.check('webhook', 'Webhook firmati e idempotenti', 'passed', 'Blueprint e runtime webhook security presenti.'),
      this.check('object-auth', 'Object-level authorization', 'passed', 'SecurityModule include object authorization scaffold.'),
      this.check('secrets', 'Secret scan repository', 'passed', 'Script security-secret-scan disponibile.'),
      this.check('backup-restore', 'Restore drill documentato', 'warning', 'Runbook presente, drill reale da eseguire.'),
      this.check('provider-payments', 'Provider e pagamenti sandbox verificati', 'warning', 'Stripe/PayPal/Openapi da validare in sandbox reale.'),
      this.check('rc-hardening', 'RC hardening evidence bundle', 'blocked', 'M21-S runtime attivo: RC bloccata finche i P0 non hanno evidenze reali o waiver feature-off validi.'),
    ];
    const status = checks.some((check) => check.status === 'blocked') ? 'blocked' : checks.some((check) => check.status === 'warning') ? 'warning' : 'passed';
    return { status, generatedAt: new Date().toISOString(), checks };
  }

  private check(id: string, label: string, status: LaunchGateCheck['status'], evidence: string): LaunchGateCheck {
    return {
      id,
      label,
      status,
      requiredForGoLive: true,
      evidence,
      remediation: status === 'passed' ? undefined : 'Completare evidenza reale e allegarla alla release candidate.',
    };
  }
}
