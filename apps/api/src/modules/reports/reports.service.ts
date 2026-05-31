import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { ReportAdminQueueItem } from '@clientiaffidabili/shared';
import { Report } from './report.entity';
import { ReportComposerService } from './report-composer.service';
import type { ComposeReportInput, ComposeReportResult, ReportSnapshot } from './report-composer.types';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private readonly reports: Repository<Report>,
    private readonly composer: ReportComposerService,
  ) {}

  compose(input: ComposeReportInput): Promise<ComposeReportResult> {
    return this.composer.composeFromProvider(input);
  }

  async findOne(id: string): Promise<ReportSnapshot> {
    return this.composer.getCustomerSnapshot(id);
  }

  async publishAfterReview(id: string, reviewerUserId: string, reason: string): Promise<ReportSnapshot> {
    return this.composer.publishAfterReview(id, reviewerUserId, reason);
  }

  async adminQueue(): Promise<ReportAdminQueueItem[]> {
    const rows = await this.reports.find({ order: { createdAt: 'DESC' }, take: 50 });
    return rows.map((row) => ({
      id: row.id,
      orderId: row.orderId,
      checkId: row.checkId,
      status: row.status,
      attentionLevel: row.attentionLevel,
      nextAction: this.nextAction(row),
      createdAt: row.createdAt.toISOString(),
    }));
  }

  async demoReport(): Promise<ReportSnapshot> {
    const existing = await this.reports.findOne({ where: { orderId: '00000000-0000-0000-0000-000000000099' } });
    if (existing) return this.findOne(existing.id);
    const report = await this.reports.save(this.reports.create({
      orderId: '00000000-0000-0000-0000-000000000099',
      checkId: '00000000-0000-0000-0000-000000000098',
      title: 'Check Affidabilità Pro',
      status: 'ready',
      templateCode: 'company_reliability_pro_v1',
      templateVersion: '1.0.0',
      composerVersion: '0.19.0',
      scoreModelVersion: 'score_v1_prudent_attention',
      attentionLevel: 'low_attention',
      score: 82,
      subjectSnapshot: { name: 'ACME Italia S.p.A.', vatNumber: 'IT00000000000', country: 'IT', legalAddress: 'Milano, Italia' },
      dataSnapshot: {
        id: 'demo',
        orderId: '00000000-0000-0000-0000-000000000099',
        checkId: '00000000-0000-0000-0000-000000000098',
        status: 'ready',
        title: 'Check Affidabilità Pro',
        templateCode: 'company_reliability_pro_v1',
        templateVersion: '1.0.0',
        composerVersion: '0.19.0',
        scoreModelVersion: 'score_v1_prudent_attention',
        subject: { name: 'ACME Italia S.p.A.', vatNumber: 'IT00000000000', country: 'IT', legalAddress: 'Milano, Italia' },
        score: 82,
        attentionLevel: 'low_attention',
        attentionLabel: 'Attenzione bassa',
        executiveSummary: 'Nel perimetro verificato non emergono segnali bloccanti. Il report resta un supporto decisionale e non una garanzia sui comportamenti futuri.',
        recommendedActions: ['Procedi con controlli ordinari.', 'Valuta monitoraggio periodico per rapporti ricorrenti.'],
        sections: [
          { code: 'executive_summary', title: 'Sintesi operativa', summary: 'Profilo coerente nel perimetro verificato.', completeness: 'complete', evidenceIds: ['demo-e1'], limits: ['Informazione dimostrativa non usabile in produzione.'] },
          { code: 'sources_limits', title: 'Fonti e limiti', summary: 'Payload grezzi non mostrati al cliente.', completeness: 'complete', evidenceIds: [], limits: ['Il report non garantisce comportamenti futuri.'] },
        ],
        evidence: [
          { id: 'demo-e1', type: 'registry', label: 'Anagrafica aziendale', severity: 'positive', sourceName: 'Provider configurato', observedAt: new Date().toISOString(), summary: 'Dati normalizzati disponibili.', limits: ['Dato demo.'] },
        ],
        sources: ['Provider configurato'],
        globalLimits: ['Il report non sostituisce consulenza legale, fiscale o creditizia.'],
        generatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
      },
      htmlSnapshot: '<article><h1>Check Affidabilita Pro</h1></article>',
      generatedAt: new Date(),
      publishedAt: new Date(),
    }));
    return this.findOne(report.id);
  }

  private nextAction(row: Report): string {
    if (row.status === 'review_required') return 'Revisiona evidenze, limiti e copy prima della pubblicazione.';
    if (row.status === 'ready') return 'Report pronto: verifica download/audit se richiesto dal cliente.';
    if (row.status === 'failed') return 'Analizza errore composizione e valuta rimborso se il provider non e stato consumato.';
    if (row.status === 'composing') return 'Attendi completamento composizione.';
    return 'Nessuna azione urgente.';
  }
}
