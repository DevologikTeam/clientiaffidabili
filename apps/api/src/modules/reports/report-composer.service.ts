import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash } from 'crypto';
import { Repository } from 'typeorm';
import { ProviderRequest } from '../provider/entities/provider-request.entity';
import { Report } from './report.entity';
import { findReportTemplate } from './report-template.registry';
import { ReportScoreService } from './report-score.service';
import type {
  ComposeReportInput,
  ComposeReportResult,
  ReportEvidenceSnapshot,
  ReportSectionSnapshot,
  ReportSnapshot,
  ReportSubjectSnapshot,
} from './report-composer.types';

@Injectable()
export class ReportComposerService {
  constructor(
    @InjectRepository(Report) private readonly reports: Repository<Report>,
    @InjectRepository(ProviderRequest) private readonly providerRequests: Repository<ProviderRequest>,
    private readonly score: ReportScoreService,
  ) {}

  async composeFromProvider(input: ComposeReportInput): Promise<ComposeReportResult> {
    const template = findReportTemplate(input.templateCode);
    if (!template) throw new NotFoundException(`Template report non configurato: ${input.templateCode}`);

    const providerRows = await this.providerRequests.findByIds(input.providerRequestIds);
    const evidence = this.buildEvidence(providerRows);
    const subject = this.buildSubjectSnapshot(providerRows);
    const score = this.score.calculate(evidence, input.forceReview || providerRows.some((row) => row.status === 'requires_review'));
    const sections = this.buildSections(evidence, template.sections.map((section) => section.code));
    const now = new Date();

    const snapshot: ReportSnapshot = {
      id: 'pending',
      orderId: input.orderId,
      checkId: input.checkId,
      status: score.reviewRequired ? 'review_required' : 'ready',
      templateCode: template.code,
      templateVersion: template.version,
      composerVersion: '0.19.0',
      scoreModelVersion: 'score_v1_prudent_attention',
      subject,
      attentionLevel: score.attentionLevel,
      executiveSummary: score.executiveSummary,
      recommendedActions: score.recommendedActions,
      sections,
      evidence,
      sources: this.collectSources(evidence),
      globalLimits: template.globalLimits,
      generatedAt: now.toISOString(),
      publishedAt: score.reviewRequired ? undefined : now.toISOString(),
    };
    const snapshotHash = this.hashSnapshot(snapshot);
    const htmlSnapshot = this.renderHtmlSnapshot({ ...snapshot, snapshotHash });

    const report = await this.reports.save(this.reports.create({
      orderId: input.orderId,
      checkId: input.checkId,
      title: template.title,
      status: snapshot.status,
      templateCode: template.code,
      templateVersion: template.version,
      composerVersion: snapshot.composerVersion,
      scoreModelVersion: snapshot.scoreModelVersion,
      attentionLevel: score.attentionLevel,
      score: score.score,
      subjectSnapshot: subject as unknown as Record<string, unknown>,
      dataSnapshot: { ...snapshot, id: 'pending', snapshotHash, warnings: score.warnings },
      htmlSnapshot,
      snapshotHash,
      generatedAt: now,
      publishedAt: score.reviewRequired ? undefined : now,
      reviewReason: score.reviewRequired ? score.warnings.join(', ') || 'manual_review_required' : undefined,
    }));

    report.dataSnapshot = { ...report.dataSnapshot, id: report.id };
    await this.reports.save(report);

    return {
      reportId: report.id,
      status: report.status,
      reviewRequired: report.status === 'review_required',
      warnings: score.warnings,
    };
  }

  async getCustomerSnapshot(reportId: string): Promise<ReportSnapshot> {
    const report = await this.reports.findOne({ where: { id: reportId } });
    if (!report) throw new NotFoundException('Report non trovato.');
    const snapshot = report.dataSnapshot as unknown as ReportSnapshot & { warnings?: string[] };
    return {
      ...snapshot,
      id: report.id,
      status: report.status,
      snapshotHash: report.snapshotHash,
      generatedAt: report.generatedAt?.toISOString() ?? snapshot.generatedAt,
      publishedAt: report.publishedAt?.toISOString() ?? snapshot.publishedAt,
    };
  }

  async publishAfterReview(reportId: string, reviewerUserId: string, reason: string): Promise<ReportSnapshot> {
    const report = await this.reports.findOne({ where: { id: reportId } });
    if (!report) throw new NotFoundException('Report non trovato.');
    if (report.status !== 'review_required') return this.getCustomerSnapshot(report.id);
    report.status = 'ready';
    report.reviewedByUserId = reviewerUserId;
    report.reviewReason = reason;
    report.reviewedAt = new Date();
    report.publishedAt = new Date();
    await this.reports.save(report);
    return this.getCustomerSnapshot(report.id);
  }

  private buildEvidence(providerRows: ProviderRequest[]): ReportEvidenceSnapshot[] {
    if (providerRows.length === 0) {
      return [{
        id: 'provider-data-missing',
        type: 'technical',
        label: 'Dati provider non disponibili',
        severity: 'unavailable',
        sourceName: 'Sistema ClientiAffidabili',
        observedAt: new Date().toISOString(),
        summary: 'Non risultano ancora dati provider utilizzabili per comporre il report.',
        limits: ['Il report non puo essere pubblicato senza almeno una fonte verificabile.'],
      }];
    }

    return providerRows.flatMap((row) => {
      const normalized = (row.normalizedResult ?? {}) as Record<string, unknown>;
      const redFlags = Array.isArray(normalized.redFlags) ? normalized.redFlags as Array<Record<string, unknown>> : [];
      const evidences = Array.isArray(normalized.evidences) ? normalized.evidences as Array<Record<string, unknown>> : [];
      const result: ReportEvidenceSnapshot[] = [];

      if (row.status === 'completed') {
        result.push({
          id: `${row.id}-provider-completed`,
          type: 'registry',
          label: 'Fonte provider completata',
          severity: redFlags.length > 0 ? 'attention' : 'positive',
          sourceName: row.providerName,
          sourceTimestamp: row.completedAt?.toISOString(),
          observedAt: row.updatedAt.toISOString(),
          summary: String(normalized.summary ?? 'Il provider ha restituito dati normalizzati.'),
          limits: ['Informazione normalizzata da fonte provider; il payload grezzo resta interno.'],
        });
      } else if (row.status === 'requires_review') {
        result.push({
          id: `${row.id}-manual-review`,
          type: 'technical',
          label: 'Richiesta in revisione',
          severity: 'unavailable',
          sourceName: row.providerName,
          observedAt: row.updatedAt.toISOString(),
          summary: row.errorMessage ?? 'La richiesta richiede controllo operativo.',
          limits: ['Il cliente non deve visualizzare conclusioni finché la revisione non è completata.'],
        });
      }

      for (const flag of redFlags) {
        result.push({
          id: `${row.id}-${String(flag.code ?? flag.label ?? 'flag')}`,
          type: 'negative_event',
          label: String(flag.label ?? 'Segnale da verificare'),
          severity: this.mapSeverity(String(flag.severity ?? 'medium')),
          sourceName: row.providerName,
          sourceTimestamp: row.completedAt?.toISOString(),
          observedAt: row.updatedAt.toISOString(),
          summary: String(flag.label ?? 'Elemento da valutare'),
          limits: ['Il segnale deve essere interpretato nel contesto commerciale e temporale.'],
        });
      }

      for (const item of evidences) {
        result.push({
          id: `${row.id}-${String(item.label ?? item.value ?? 'evidence')}`.slice(0, 120),
          type: 'registry',
          label: String(item.label ?? 'Evidenza'),
          severity: 'info',
          sourceName: String(item.source ?? row.providerName),
          sourceTimestamp: String(normalized.sourceTimestamp ?? row.completedAt?.toISOString() ?? ''),
          observedAt: row.updatedAt.toISOString(),
          summary: String(item.value ?? 'Dato disponibile'),
          limits: ['Dato informativo, non valutazione predittiva.'],
        });
      }

      return result;
    });
  }

  private buildSubjectSnapshot(providerRows: ProviderRequest[]): ReportSubjectSnapshot {
    const preview = (providerRows[0]?.requestPayloadPreview ?? {}) as Record<string, unknown>;
    return {
      name: String(preview.businessName ?? preview.companyName ?? preview.name ?? 'Soggetto verificato'),
      vatNumber: preview.vatNumber ? String(preview.vatNumber) : undefined,
      taxCode: preview.taxCode ? String(preview.taxCode) : undefined,
      country: preview.country ? String(preview.country) : 'IT',
      legalAddress: preview.address ? String(preview.address) : undefined,
    };
  }

  private buildSections(evidence: ReportEvidenceSnapshot[], sectionCodes: string[]): ReportSectionSnapshot[] {
    return sectionCodes.map((code) => {
      const related = this.relatedEvidenceIds(code, evidence);
      return {
        code,
        title: this.sectionTitle(code),
        summary: this.sectionSummary(code, evidence, related),
        completeness: related.length > 0 ? 'complete' : code === 'economic_profile' || code === 'compliance_kyb' ? 'partial' : 'unavailable',
        evidenceIds: related,
        limits: this.sectionLimits(code),
      };
    });
  }

  private relatedEvidenceIds(code: string, evidence: ReportEvidenceSnapshot[]): string[] {
    if (code === 'company_identity') return evidence.filter((item) => item.type === 'registry' || item.type === 'identity').map((item) => item.id);
    if (code === 'compliance_kyb') return evidence.filter((item) => item.type === 'compliance' || item.severity === 'critical').map((item) => item.id);
    if (code === 'economic_profile') return evidence.filter((item) => item.type === 'credit').map((item) => item.id);
    if (code === 'main_signals' || code === 'executive_summary') return evidence.slice(0, 6).map((item) => item.id);
    return [];
  }

  private sectionTitle(code: string): string {
    const titles: Record<string, string> = {
      executive_summary: 'Sintesi operativa',
      main_signals: 'Segnali principali',
      company_identity: 'Identità azienda',
      economic_profile: 'Informazioni economiche e commerciali',
      compliance_kyb: 'Compliance e KYB',
      sources_limits: 'Fonti e limiti',
      next_actions: 'Prossime azioni consigliate',
      technical_result: 'Esito tecnico',
    };
    return titles[code] ?? code;
  }

  private sectionSummary(code: string, evidence: ReportEvidenceSnapshot[], relatedIds: string[]): string {
    if (code === 'sources_limits') return 'Il report mostra solo dati normalizzati e fonti utili alla decisione. I payload grezzi restano interni.';
    if (code === 'next_actions') return 'Le azioni consigliate aiutano a scegliere una condizione commerciale prudente, senza automatismi decisionali.';
    if (relatedIds.length === 0) return 'Sezione non completa con le fonti disponibili.';
    const critical = evidence.filter((item) => relatedIds.includes(item.id) && item.severity === 'critical').length;
    const attention = evidence.filter((item) => relatedIds.includes(item.id) && item.severity === 'attention').length;
    if (critical > 0) return 'La sezione contiene segnali rilevanti da valutare.';
    if (attention > 0) return 'La sezione contiene elementi da verificare prima di procedere.';
    return 'La sezione non presenta segnali bloccanti nel perimetro verificato.';
  }

  private sectionLimits(code: string): string[] {
    const common = ['Informazioni valide rispetto alle fonti disponibili al momento della richiesta.'];
    if (code === 'sources_limits') return ['Il report non sostituisce consulenza legale, fiscale o creditizia.', 'Il report non garantisce comportamenti futuri.'];
    if (code === 'economic_profile') return [...common, 'Eventuali dati economici possono dipendere da fonti e aggiornamenti disponibili.'];
    return common;
  }

  private collectSources(evidence: ReportEvidenceSnapshot[]): string[] {
    return Array.from(new Set(evidence.map((item) => item.sourceName).filter(Boolean)));
  }

  private hashSnapshot(snapshot: ReportSnapshot): string {
    return createHash('sha256').update(JSON.stringify(snapshot)).digest('hex');
  }

  private mapSeverity(value: string): ReportEvidenceSnapshot['severity'] {
    if (['high', 'critical'].includes(value)) return 'critical';
    if (['medium', 'attention'].includes(value)) return 'attention';
    if (['low', 'info'].includes(value)) return 'info';
    return 'unavailable';
  }

  private renderHtmlSnapshot(snapshot: ReportSnapshot): string {
    return `<article data-report-template="${snapshot.templateCode}" data-snapshot-hash="${snapshot.snapshotHash ?? ''}">
      <h1>${snapshot.subject.name}</h1>
      <p>${snapshot.executiveSummary}</p>
      <p>Livello attenzione: ${snapshot.attentionLevel}</p>
    </article>`;
  }
}
