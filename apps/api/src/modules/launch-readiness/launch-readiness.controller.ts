import { Controller, Get } from '@nestjs/common';
import { LaunchReadinessService } from './launch-readiness.service';
import { RcHardeningService } from './rc-hardening.service';

@Controller('launch-readiness')
export class LaunchReadinessController {
  constructor(private readonly service: LaunchReadinessService, private readonly rcHardening: RcHardeningService) {}

  @Get('summary')
  summary() {
    return this.service.getSummary();
  }

  @Get('rc-hardening/summary')
  rcHardeningSummary() {
    return this.rcHardening.getRuntimeSummary();
  }

  @Get('rc-hardening/evidence-bundle')
  rcHardeningEvidenceBundle() {
    return this.rcHardening.getEvidenceBundle();
  }
}
