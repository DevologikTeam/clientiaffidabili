import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash } from 'crypto';
import { Repository } from 'typeorm';
import { OperationalErrorEvent } from '../settings-admin/entities/operational-error-event.entity';
import type { OperationalErrorCategory } from '../settings-admin/settings-admin-runtime.types';
import { CreateSandboxCertificationRunDto } from './dto/create-sandbox-certification-run.dto';
import { RetrySandboxScenarioDto } from './dto/retry-sandbox-scenario.dto';
import { WaiveSandboxScenarioDto } from './dto/waive-sandbox-scenario.dto';
import { SandboxCertificationRun } from './entities/sandbox-certification-run.entity';
import { SandboxEvidence } from './entities/sandbox-evidence.entity';
import { SandboxScenario } from './entities/sandbox-scenario.entity';
import { SandboxScenarioResult } from './entities/sandbox-scenario-result.entity';
import { SandboxWaiver } from './entities/sandbox-waiver.entity';
import { MockSandboxCertificationAdapter } from './sandbox-certification.adapter';
import type { SandboxCertificationArea, SandboxScenarioStatus } from './sandbox-certification-design.types';
import { sandboxCertificationRuntimeRegistry } from './sandbox-certification-scenario.registry';
import type {
  SandboxCertificationProviderMode,
  SandboxCertificationResultView,
  SandboxCertificationRunDetail,
  SandboxCertificationRunStatus,
  SandboxCertificationScenarioListItem,
  SandboxCertificationSummary,
  SandboxEvidencePayload,
  SandboxWaiverView,
} from './sandbox-certification-runtime.types';

@Injectable()
export class SandboxCertificationService implements OnModuleInit {
  constructor(
    @InjectRepository(SandboxScenario) private readonly scenariosRepo: Repository<SandboxScenario>,
    @InjectRepository(SandboxCertificationRun) private readonly runsRepo: Repository<SandboxCertificationRun>,
    @InjectRepository(SandboxScenarioResult) private readonly resultsRepo: Repository<SandboxScenarioResult>,
    @InjectRepository(SandboxEvidence) private readonly evidenceRepo: Repository<SandboxEvidence>,
    @InjectRepository(SandboxWaiver) private readonly waiversRepo: Repository<SandboxWaiver>,
    @InjectRepository(OperationalErrorEvent) private readonly errorLedgerRepo: Repository<OperationalErrorEvent>,
    private readonly adapter: MockSandboxCertificationAdapter,
  ) {}

  async onModuleInit() {
    await this.seedScenarioRegistry();
  }

  async summary(): Promise<SandboxCertificationSummary> {
    const latestRun = await this.runsRepo.find({ order: { createdAt: 'DESC' }, take: 1 });
    const activeWaivers = await this.activeWaivers();
    if (!latestRun[0]) {
      return {
        status: 'queued',
        generatedAt: new Date().toISOString(),
        totalScenarios: sandboxCertificationRuntimeRegistry.length,
        blockerScenarios: sandboxCertificationRuntimeRegistry.filter((scenario) => scenario.blockerForRc).length,
        passed: 0,
        failed: 0,
        blocked: 0,
        waived: activeWaivers.length,
        notStarted: sandboxCertificationRuntimeRegistry.length,
        nextAction: 'Avviare una suite sandbox mock-first e allegare evidenze manuali per Docker/Coolify prima della RC.',
      };
    }
    const detail = await this.runDetail(latestRun[0].id);
    return detail.summary;
  }

  async scenarios(): Promise<SandboxCertificationScenarioListItem[]> {
    const latestResults = await this.resultsRepo.find({ order: { createdAt: 'DESC' }, take: 500 });
    const activeWaivers = await this.activeWaivers();
    return sandboxCertificationRuntimeRegistry.map((scenario) => {
      const latest = latestResults.find((result) => result.scenarioKey === scenario.id);
      const waiver = activeWaivers.find((item) => item.scenarioKey === scenario.id);
      return {
        ...scenario,
        latestStatus: waiver ? 'waived' : latest?.status ?? 'not_started',
        activeWaiver: waiver ? this.toWaiverView(waiver) : undefined,
        latestRunId: latest?.runId,
      };
    });
  }

  async createRun(body: CreateSandboxCertificationRunDto): Promise<SandboxCertificationRunDetail> {
    const selected = this.resolveScenarios(body.scenarioIds);
    const providerMode = body.providerMode ?? 'mock';
    const run = await this.runsRepo.save(this.runsRepo.create({
      label: body.label ?? `Sandbox certification ${new Date().toISOString()}`,
      providerMode,
      requestedBy: body.requestedBy ?? 'admin',
      status: body.dryRun ? 'queued' : 'running',
      startedAt: body.dryRun ? undefined : new Date(),
      scenarioCount: selected.length,
      summaryJson: { dryRun: Boolean(body.dryRun), selectedScenarioIds: selected.map((scenario) => scenario.id) },
    }));

    if (body.dryRun) return this.runDetail(run.id);

    for (const scenario of selected) {
      await this.executeScenario(run, scenario.id, providerMode, 1);
    }
    await this.recalculateRun(run.id);
    return this.runDetail(run.id);
  }

  async runDetail(id: string): Promise<SandboxCertificationRunDetail> {
    const run = await this.runsRepo.findOne({ where: { id } });
    if (!run) throw new NotFoundException('Run sandbox non trovata.');
    const results = await this.resultsRepo.find({ where: { runId: id }, order: { createdAt: 'ASC' } });
    const activeWaivers = await this.activeWaivers();
    const latestByScenario = this.latestResultByScenario(results);
    const blockerScenarios = sandboxCertificationRuntimeRegistry.filter((scenario) => scenario.blockerForRc).length;
    const passed = latestByScenario.filter((result) => result.status === 'passed').length;
    const failed = latestByScenario.filter((result) => result.status === 'failed').length;
    const blocked = latestByScenario.filter((result) => result.status === 'blocked').length;
    const waived = latestByScenario.filter((result) => result.status === 'waived').length + activeWaivers.filter((waiver) => !latestByScenario.some((result) => result.scenarioKey === waiver.scenarioKey)).length;
    const notStarted = Math.max(0, sandboxCertificationRuntimeRegistry.length - latestByScenario.length);
    const status = this.resolveRunStatus(latestByScenario, activeWaivers);
    const summary: SandboxCertificationSummary = {
      status,
      generatedAt: new Date().toISOString(),
      totalScenarios: sandboxCertificationRuntimeRegistry.length,
      blockerScenarios,
      passed,
      failed,
      blocked,
      waived,
      notStarted,
      lastRunId: run.id,
      nextAction: this.nextActionForSummary(status, notStarted, blocked, failed),
    };
    return {
      id: run.id,
      label: run.label,
      status,
      providerMode: run.providerMode,
      startedAt: run.startedAt?.toISOString(),
      completedAt: run.completedAt?.toISOString(),
      requestedBy: run.requestedBy,
      summary,
      results: results.map((result) => this.toResultView(result)),
    };
  }

  async retryScenario(runId: string, scenarioId: string, body: RetrySandboxScenarioDto): Promise<SandboxCertificationRunDetail> {
    const run = await this.runsRepo.findOne({ where: { id: runId } });
    if (!run) throw new NotFoundException('Run sandbox non trovata.');
    const scenario = this.findScenario(scenarioId);
    const previous = await this.resultsRepo.find({ where: { runId, scenarioKey: scenario.id }, order: { createdAt: 'DESC' }, take: 1 });
    if (!previous[0]) throw new NotFoundException('Scenario non presente nella run selezionata.');
    if (!scenario.retryEligible) throw new BadRequestException('Lo scenario non e marcato come retry-safe. Serve review manuale.');
    const nextAttempt = previous[0].attempt + 1;
    await this.executeScenario(run, scenario.id, run.providerMode, nextAttempt, previous[0].id, body.reason, body.requestedBy);
    await this.recalculateRun(run.id);
    return this.runDetail(run.id);
  }

  async waiveScenario(scenarioId: string, body: WaiveSandboxScenarioDto): Promise<SandboxWaiverView> {
    const scenario = this.findScenario(scenarioId);
    if (!body.featureDisabled) {
      throw new BadRequestException('Il waiver e consentito solo se la feature resta disabilitata da setting o feature flag.');
    }
    if (scenario.featureFlagIfWaived && body.featureFlag !== scenario.featureFlagIfWaived) {
      throw new BadRequestException(`Feature flag atteso per waiver: ${scenario.featureFlagIfWaived}`);
    }
    const active = await this.waiversRepo.find({ where: { scenarioKey: scenario.id, status: 'active' } });
    for (const waiver of active) {
      waiver.status = 'revoked';
      waiver.revokedAt = new Date();
      waiver.auditTrail = [...(waiver.auditTrail ?? []), { action: 'superseded', at: new Date().toISOString(), by: body.approvedBy }];
      await this.waiversRepo.save(waiver);
    }
    const waiver = await this.waiversRepo.save(this.waiversRepo.create({
      scenarioKey: scenario.id,
      area: scenario.area,
      status: 'active',
      reason: body.reason,
      featureFlag: body.featureFlag,
      featureDisabled: body.featureDisabled,
      approvedBy: body.approvedBy,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : undefined,
      auditTrail: [{ action: 'created', at: new Date().toISOString(), by: body.approvedBy, featureDisabled: body.featureDisabled }],
    }));
    return this.toWaiverView(waiver);
  }

  async evidence(runId: string) {
    const run = await this.runsRepo.findOne({ where: { id: runId } });
    if (!run) throw new NotFoundException('Run sandbox non trovata.');
    return this.evidenceRepo.find({ where: { runId }, order: { createdAt: 'ASC' } });
  }

  private async seedScenarioRegistry() {
    for (const scenario of sandboxCertificationRuntimeRegistry) {
      const existing = await this.scenariosRepo.findOne({ where: { scenarioKey: scenario.id } });
      const entity = existing ?? this.scenariosRepo.create({ scenarioKey: scenario.id });
      entity.area = scenario.area;
      entity.title = scenario.title;
      entity.blockerForRc = scenario.blockerForRc;
      entity.requiredEvidence = scenario.requiredEvidence;
      entity.passCriteria = scenario.passCriteria;
      entity.failCriteria = scenario.failCriteria;
      entity.featureFlagIfWaived = scenario.featureFlagIfWaived;
      entity.ownerRole = scenario.ownerRole;
      entity.metadataJson = {
        automationLevel: scenario.automationLevel,
        providerMode: scenario.providerMode,
        refundRelevant: scenario.refundRelevant,
        retryEligible: scenario.retryEligible,
        rollbackAction: scenario.rollbackAction,
      };
      await this.scenariosRepo.save(entity);
    }
  }

  private resolveScenarios(scenarioIds?: string[]) {
    if (!scenarioIds?.length) return sandboxCertificationRuntimeRegistry;
    const selected = sandboxCertificationRuntimeRegistry.filter((scenario) => scenarioIds.includes(scenario.id));
    if (selected.length !== scenarioIds.length) throw new BadRequestException('Uno o piu scenari sandbox non sono registrati.');
    return selected;
  }

  private findScenario(scenarioId: string) {
    const scenario = sandboxCertificationRuntimeRegistry.find((item) => item.id === scenarioId);
    if (!scenario) throw new NotFoundException('Scenario sandbox non trovato.');
    return scenario;
  }

  private async executeScenario(
    run: SandboxCertificationRun,
    scenarioId: string,
    providerMode: SandboxCertificationProviderMode,
    attempt: number,
    retryOfResultId?: string,
    retryReason?: string,
    requestedBy?: string,
  ) {
    const scenario = this.findScenario(scenarioId);
    const waiver = await this.activeWaiverFor(scenario.id);
    const startedAt = new Date();
    if (waiver) {
      const waivedResult = await this.resultsRepo.save(this.resultsRepo.create({
        runId: run.id,
        scenarioKey: scenario.id,
        area: scenario.area,
        title: scenario.title,
        blockerForRc: scenario.blockerForRc,
        status: 'waived',
        providerMode,
        attempt,
        retryOfResultId,
        safeMessage: `Scenario coperto da waiver auditato: ${waiver.reason}`,
        evidenceJson: [{ type: 'settings_snapshot', safeLabel: 'Feature disabilitata per waiver', redactedPayload: { featureFlag: waiver.featureFlag, featureDisabled: waiver.featureDisabled } }],
        refundRelevant: scenario.refundRelevant,
        retryEligible: false,
        rollbackAction: scenario.rollbackAction,
        startedAt,
        completedAt: new Date(),
      }));
      await this.saveEvidence(run.id, waivedResult.id, scenario.id, [
        { type: 'settings_snapshot', safeLabel: 'Waiver con feature flag disabilitato', redactedPayload: { featureFlag: waiver.featureFlag, featureDisabled: waiver.featureDisabled, approvedBy: waiver.approvedBy } },
      ], requestedBy ?? run.requestedBy);
      return waivedResult;
    }

    const outcome = await this.adapter.runScenario(scenario, { providerMode, runId: run.id, attempt });
    const result = await this.resultsRepo.save(this.resultsRepo.create({
      runId: run.id,
      scenarioKey: scenario.id,
      area: scenario.area,
      title: scenario.title,
      blockerForRc: scenario.blockerForRc,
      status: outcome.status,
      providerMode: outcome.providerMode,
      attempt,
      retryOfResultId,
      safeMessage: retryReason ? `${outcome.safeMessage} Retry reason: ${retryReason}` : outcome.safeMessage,
      failureSafeMessage: outcome.failureSafeMessage,
      evidenceJson: outcome.evidence,
      refundRelevant: outcome.refundRelevant,
      retryEligible: outcome.retryEligible,
      rollbackAction: outcome.rollbackAction,
      startedAt,
      completedAt: new Date(startedAt.getTime() + outcome.durationMs),
    }));
    await this.saveEvidence(run.id, result.id, scenario.id, outcome.evidence, requestedBy ?? run.requestedBy);
    if (outcome.status === 'failed' || outcome.status === 'blocked') {
      const error = await this.recordOperationalError(run.id, result, outcome.failureSafeMessage ?? outcome.safeMessage);
      result.errorLedgerId = error.id;
      await this.resultsRepo.save(result);
    }
    return result;
  }

  private async saveEvidence(runId: string, resultId: string, scenarioKey: string, evidence: SandboxEvidencePayload[], createdBy?: string) {
    for (const item of evidence) {
      const payloadText = JSON.stringify(item.redactedPayload ?? {});
      await this.evidenceRepo.save(this.evidenceRepo.create({
        runId,
        scenarioResultId: resultId,
        scenarioKey,
        evidenceType: item.type,
        safeLabel: item.safeLabel,
        redactedPayload: item.redactedPayload,
        storageRef: item.storageRef,
        sha256: item.sha256 ?? createHash('sha256').update(payloadText).digest('hex'),
        createdBy,
      }));
    }
  }

  private async recordOperationalError(runId: string, result: SandboxScenarioResult, safeMessage: string) {
    return this.errorLedgerRepo.save(this.errorLedgerRepo.create({
      category: this.areaToErrorCategory(result.area),
      severity: result.blockerForRc ? 'critical' : 'error',
      status: result.refundRelevant ? 'refund_pending' : 'fix_pending',
      sourceModule: 'sandbox-certification',
      sourceAction: result.scenarioKey,
      safeMessage,
      technicalSummary: `Sandbox certification ${result.status} for ${result.scenarioKey}. Raw payload redacted.`,
      redactedPayload: {
        runId,
        scenarioKey: result.scenarioKey,
        area: result.area,
        status: result.status,
        refundRelevant: result.refundRelevant,
        retryEligible: result.retryEligible,
        rollbackAction: result.rollbackAction,
        rawProviderPayload: 'redacted',
      },
      linkedObjects: { runId, scenarioResultId: result.id, scenarioKey: result.scenarioKey },
      refundRelevant: result.refundRelevant,
      events: [{ at: new Date().toISOString(), event: 'sandbox_scenario_blocked_or_failed', source: 'M19-S' }],
    }));
  }

  private async recalculateRun(runId: string) {
    const run = await this.runsRepo.findOne({ where: { id: runId } });
    if (!run) return;
    const results = await this.resultsRepo.find({ where: { runId }, order: { createdAt: 'ASC' } });
    const activeWaivers = await this.activeWaivers();
    const latest = this.latestResultByScenario(results);
    run.passedCount = latest.filter((result) => result.status === 'passed').length;
    run.failedCount = latest.filter((result) => result.status === 'failed').length;
    run.blockedCount = latest.filter((result) => result.status === 'blocked').length;
    run.waivedCount = latest.filter((result) => result.status === 'waived').length;
    run.status = this.resolveRunStatus(latest, activeWaivers);
    run.completedAt = new Date();
    run.summaryJson = {
      passed: run.passedCount,
      failed: run.failedCount,
      blocked: run.blockedCount,
      waived: run.waivedCount,
      latestResults: latest.map((result) => ({ scenarioKey: result.scenarioKey, status: result.status })),
    };
    await this.runsRepo.save(run);
  }

  private latestResultByScenario(results: SandboxScenarioResult[]) {
    const map = new Map<string, SandboxScenarioResult>();
    for (const result of results) {
      const current = map.get(result.scenarioKey);
      if (!current || result.createdAt.getTime() >= current.createdAt.getTime()) map.set(result.scenarioKey, result);
    }
    return Array.from(map.values());
  }

  private resolveRunStatus(results: SandboxScenarioResult[], activeWaivers: SandboxWaiver[]): SandboxCertificationRunStatus {
    const hasBlockingFailure = results.some((result) => {
      if (result.status !== 'failed' && result.status !== 'blocked') return false;
      if (!result.blockerForRc) return false;
      return !activeWaivers.some((waiver) => waiver.scenarioKey === result.scenarioKey);
    });
    if (hasBlockingFailure) return 'blocked';
    if (results.some((result) => result.status === 'failed')) return 'failed';
    const covered = new Set([...results.map((result) => result.scenarioKey), ...activeWaivers.map((waiver) => waiver.scenarioKey)]);
    if (covered.size >= sandboxCertificationRuntimeRegistry.length && results.every((result) => result.status === 'passed' || result.status === 'waived')) return 'passed';
    return results.length ? 'running' : 'queued';
  }

  private nextActionForSummary(status: SandboxCertificationRunStatus, notStarted: number, blocked: number, failed: number) {
    if (blocked > 0) return 'Aprire il blocker panel, allegare evidenza reale o disabilitare feature con waiver auditato.';
    if (failed > 0) return 'Rieseguire gli scenari retry-safe e collegare ogni errore al ledger operativo.';
    if (notStarted > 0) return 'Completare gli scenari non eseguiti prima della Release Candidate.';
    if (status === 'passed') return 'Preparare handoff RC con evidenze, runbook rollback e smoke reali.';
    return 'Avviare o completare la suite sandbox certification.';
  }

  private toResultView(result: SandboxScenarioResult): SandboxCertificationResultView {
    return {
      id: result.id,
      scenarioKey: result.scenarioKey,
      area: result.area,
      title: result.title,
      status: result.status,
      blockerForRc: result.blockerForRc,
      providerMode: result.providerMode,
      attempt: result.attempt,
      safeMessage: result.safeMessage,
      failureSafeMessage: result.failureSafeMessage,
      errorLedgerId: result.errorLedgerId,
      evidenceCount: result.evidenceJson?.length ?? 0,
      startedAt: result.startedAt?.toISOString(),
      completedAt: result.completedAt?.toISOString(),
      retryEligible: result.retryEligible,
      refundRelevant: result.refundRelevant,
      rollbackAction: result.rollbackAction,
    };
  }

  private toWaiverView(waiver: SandboxWaiver): SandboxWaiverView {
    return {
      id: waiver.id,
      scenarioKey: waiver.scenarioKey,
      area: waiver.area,
      status: waiver.status,
      reason: waiver.reason,
      featureFlag: waiver.featureFlag,
      featureDisabled: waiver.featureDisabled,
      approvedBy: waiver.approvedBy,
      expiresAt: waiver.expiresAt?.toISOString(),
      createdAt: waiver.createdAt.toISOString(),
    };
  }

  private async activeWaivers() {
    const now = new Date();
    const rows = await this.waiversRepo.find({ where: { status: 'active' }, order: { createdAt: 'DESC' } });
    return rows.filter((waiver) => !waiver.expiresAt || waiver.expiresAt.getTime() > now.getTime());
  }

  private async activeWaiverFor(scenarioKey: string) {
    const rows = await this.activeWaivers();
    return rows.find((waiver) => waiver.scenarioKey === scenarioKey);
  }

  private areaToErrorCategory(area: SandboxCertificationArea): OperationalErrorCategory {
    if (area === 'payments.stripe' || area === 'payments.paypal') return 'payment';
    if (area === 'provider.openapi') return 'openapi_provider';
    if (area === 'ai.openai') return 'openai_api';
    if (area === 'email.delivery') return 'email_delivery';
    if (area === 'report.pdf') return 'report_generation';
    if (area === 'auth.accounts') return 'auth';
    if (area === 'partner.api') return 'partner_api';
    if (area === 'seo.cms') return 'cms_publish';
    return 'checkout';
  }
}
