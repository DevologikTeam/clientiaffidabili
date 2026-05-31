import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationalErrorEvent } from '../settings-admin/entities/operational-error-event.entity';
import { SandboxCertificationRun } from './entities/sandbox-certification-run.entity';
import { SandboxEvidence } from './entities/sandbox-evidence.entity';
import { SandboxScenario } from './entities/sandbox-scenario.entity';
import { SandboxScenarioResult } from './entities/sandbox-scenario-result.entity';
import { SandboxWaiver } from './entities/sandbox-waiver.entity';
import { MockSandboxCertificationAdapter } from './sandbox-certification.adapter';
import { SandboxCertificationController } from './sandbox-certification.controller';
import { SandboxCertificationService } from './sandbox-certification.service';

@Module({
  imports: [TypeOrmModule.forFeature([SandboxScenario, SandboxCertificationRun, SandboxScenarioResult, SandboxEvidence, SandboxWaiver, OperationalErrorEvent])],
  controllers: [SandboxCertificationController],
  providers: [SandboxCertificationService, MockSandboxCertificationAdapter],
  exports: [SandboxCertificationService],
})
export class SandboxCertificationModule {}
