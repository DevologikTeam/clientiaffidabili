import { Module } from '@nestjs/common';
import { LaunchReadinessController } from './launch-readiness.controller';
import { LaunchReadinessService } from './launch-readiness.service';
import { RcHardeningService } from './rc-hardening.service';

@Module({
  controllers: [LaunchReadinessController],
  providers: [LaunchReadinessService, RcHardeningService],
  exports: [LaunchReadinessService, RcHardeningService],
})
export class LaunchReadinessModule {}
