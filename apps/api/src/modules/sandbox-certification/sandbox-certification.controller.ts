import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSandboxCertificationRunDto } from './dto/create-sandbox-certification-run.dto';
import { RetrySandboxScenarioDto } from './dto/retry-sandbox-scenario.dto';
import { WaiveSandboxScenarioDto } from './dto/waive-sandbox-scenario.dto';
import { SandboxCertificationService } from './sandbox-certification.service';

@Controller('admin/sandbox-certification')
export class SandboxCertificationController {
  constructor(private readonly sandboxCertification: SandboxCertificationService) {}

  @Get('summary')
  summary() {
    return this.sandboxCertification.summary();
  }

  @Get('scenarios')
  scenarios() {
    return this.sandboxCertification.scenarios();
  }

  @Post('runs')
  createRun(@Body() body: CreateSandboxCertificationRunDto) {
    return this.sandboxCertification.createRun(body);
  }

  @Get('runs/:id')
  runDetail(@Param('id') id: string) {
    return this.sandboxCertification.runDetail(id);
  }

  @Post('runs/:id/scenarios/:scenarioId/retry')
  retryScenario(@Param('id') id: string, @Param('scenarioId') scenarioId: string, @Body() body: RetrySandboxScenarioDto) {
    return this.sandboxCertification.retryScenario(id, scenarioId, body);
  }

  @Post('scenarios/:scenarioId/waive')
  waiveScenario(@Param('scenarioId') scenarioId: string, @Body() body: WaiveSandboxScenarioDto) {
    return this.sandboxCertification.waiveScenario(scenarioId, body);
  }

  @Get('runs/:id/evidence')
  evidence(@Param('id') id: string) {
    return this.sandboxCertification.evidence(id);
  }
}
