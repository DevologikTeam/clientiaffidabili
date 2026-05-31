import { Injectable } from '@nestjs/common';
import { productionGateChecks, securityControls } from '../security-control.registry';

export type RuntimeGateStatus = 'pass' | 'warning' | 'fail';

@Injectable()
export class ProductionReadinessService {
  getControls() {
    return securityControls.map((control) => ({ ...control, status: control.status === 'planned' ? 'implemented' : control.status }));
  }

  getProductionGate() {
    const env = process.env.NODE_ENV ?? 'development';
    const checks = productionGateChecks.map((check) => {
      const status = this.evaluateStaticCheck(check.code);
      return { ...check, status };
    });
    return {
      environment: env,
      productionBlocked: env === 'production' && checks.some((check) => check.blocksProduction && check.status !== 'pass'),
      safeToEnableProviderCalls: process.env.ENABLE_PROVIDER_CALLS === 'true' && checks.every((check) => !check.blocksProduction || check.status === 'pass'),
      checks,
      generatedAt: new Date().toISOString(),
    };
  }

  private evaluateStaticCheck(code: string): RuntimeGateStatus {
    if (code === 'GATE-BUILD') return process.env.REAL_BUILD_VERIFIED === 'true' ? 'pass' : 'warning';
    if (code === 'GATE-BOLA') return process.env.OBJECT_AUTH_VERIFIED === 'true' ? 'pass' : 'warning';
    if (code === 'GATE-WEBHOOKS') return process.env.WEBHOOK_SECURITY_VERIFIED === 'true' ? 'pass' : 'warning';
    if (code === 'GATE-RESTORE') return process.env.RESTORE_DRILL_VERIFIED === 'true' ? 'pass' : 'warning';
    if (code === 'GATE-SECRETS') return process.env.SECRET_SCAN_VERIFIED === 'true' ? 'pass' : 'warning';
    return 'warning';
  }
}
