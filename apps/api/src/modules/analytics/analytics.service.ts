import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { analyticsEventBlueprintRegistry } from './analytics-event-registry';
import { AnalyticsKpiService } from './analytics-kpi.service';
import { AnalyticsRedactionService } from './analytics-redaction.service';
import { TrackAnalyticsEventDto } from './dto/track-analytics-event.dto';
import { AnalyticsAttributionSnapshot } from './entities/analytics-attribution-snapshot.entity';
import { AnalyticsEvent } from './entities/analytics-event.entity';
import { AnalyticsKpiSnapshot } from './entities/analytics-kpi-snapshot.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(AnalyticsEvent) private readonly events: Repository<AnalyticsEvent>,
    @InjectRepository(AnalyticsAttributionSnapshot) private readonly attributionSnapshots: Repository<AnalyticsAttributionSnapshot>,
    @InjectRepository(AnalyticsKpiSnapshot) private readonly kpiSnapshots: Repository<AnalyticsKpiSnapshot>,
    private readonly redaction: AnalyticsRedactionService,
    private readonly kpi: AnalyticsKpiService,
  ) {}

  async trackEvent(input: TrackAnalyticsEventDto): Promise<AnalyticsEvent> {
    const registryItem = analyticsEventBlueprintRegistry.find((event) => event.name === input.name);
    if (!registryItem) {
      throw new BadRequestException(`Analytics event not registered: ${input.name}`);
    }

    const payload = input.payload as Record<string, unknown>;
    this.assertNoForbiddenPayloadKeys(payload, registryItem.forbiddenPayload);
    const sanitized = this.redaction.sanitizePayload(payload);

    const event = this.events.create({
      name: input.name,
      category: input.category,
      origin: input.origin,
      consentState: input.consentState ?? 'unknown',
      routeTemplate: input.routeTemplate,
      contentCluster: input.contentCluster,
      attributionSnapshotId: input.attributionSnapshotId,
      accountId: input.accountId,
      orderId: input.orderId,
      errorLedgerId: input.errorLedgerId,
      serverAuthoritative: Boolean(input.serverAuthoritative || registryItem.serverAuthoritative),
      status: sanitized.redactionSummary.removedCount ? 'redacted' : 'accepted',
      payloadJson: sanitized.payload,
      redactionSummary: sanitized.redactionSummary,
    });

    return this.events.save(event);
  }

  async adminEvents(limit = 50): Promise<AnalyticsEvent[]> {
    return this.events.find({ order: { createdAt: 'DESC' }, take: Math.min(limit, 200) });
  }

  async summary() {
    return this.kpi.buildDashboardSummary();
  }

  async funnel() {
    const summary = this.kpi.buildDashboardSummary();
    return { period: summary.period, rows: summary.funnel, guardrail: 'Funnel aggregato senza PII.' };
  }

  async seoGeo() {
    const summary = this.kpi.buildDashboardSummary();
    return { period: summary.period, rows: summary.seoGeo, guardrail: 'Search Console futura; nessuna query personale salvata in chiaro.' };
  }

  async errorInsights() {
    const summary = this.kpi.buildDashboardSummary();
    return { period: summary.period, rows: summary.errorInsights, guardrail: 'Dettagli tecnici nel ledger, analytics solo aggregata.' };
  }

  async createAttributionSnapshot(input: {
    conversionType: AnalyticsAttributionSnapshot['conversionType'];
    conversionId?: string;
    accountId?: string;
    firstTouchJson?: Record<string, unknown>;
    lastTouchJson?: Record<string, unknown>;
    contentAssistJson?: Record<string, unknown>;
  }): Promise<AnalyticsAttributionSnapshot> {
    const first = this.redaction.sanitizePayload(input.firstTouchJson ?? {});
    const last = this.redaction.sanitizePayload(input.lastTouchJson ?? {});
    const assist = this.redaction.sanitizePayload(input.contentAssistJson ?? {});
    const snapshot = this.attributionSnapshots.create({
      conversionType: input.conversionType,
      conversionId: input.conversionId,
      accountId: input.accountId,
      firstTouchJson: first.payload,
      lastTouchJson: last.payload,
      contentAssistJson: assist.payload,
      redactionSummary: {
        firstTouch: first.redactionSummary,
        lastTouch: last.redactionSummary,
        contentAssist: assist.redactionSummary,
      },
    });
    return this.attributionSnapshots.save(snapshot);
  }

  async saveKpiSnapshot(metricKey: string, metricGroup: string, valueJson: Record<string, unknown>, periodKey = 'manual'): Promise<AnalyticsKpiSnapshot> {
    const sanitized = this.redaction.sanitizePayload(valueJson);
    const snapshot = this.kpiSnapshots.create({ periodKey, metricKey, metricGroup, valueJson: sanitized.payload, source: 'internal_runtime' });
    return this.kpiSnapshots.save(snapshot);
  }

  private assertNoForbiddenPayloadKeys(payload: Record<string, unknown>, forbiddenKeys: string[]) {
    const keys = Object.keys(payload ?? {}).map((key) => key.toLowerCase());
    const forbidden = forbiddenKeys.find((key) => keys.some((payloadKey) => payloadKey.includes(key.toLowerCase())));
    if (forbidden) {
      throw new BadRequestException(`Forbidden analytics payload key detected: ${forbidden}`);
    }
  }
}
