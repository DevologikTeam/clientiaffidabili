import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash } from 'crypto';
import { Repository } from 'typeorm';
import { PaymentDispute } from './entities/payment-dispute.entity';
import { PaymentWebhookEvent } from './entities/payment-webhook-event.entity';
import { PaymentLedgerEntry } from './entities/payment-ledger-entry.entity';
import { PaymentProviderOrchestrator } from './payment-provider-orchestrator.service';
import { PaymentProviderCode } from './payment-providers-subscriptions.types';

@Injectable()
export class PaymentReconciliationService {
  constructor(
    private readonly providers: PaymentProviderOrchestrator,
    @InjectRepository(PaymentWebhookEvent) private readonly webhooks: Repository<PaymentWebhookEvent>,
    @InjectRepository(PaymentDispute) private readonly disputes: Repository<PaymentDispute>,
    @InjectRepository(PaymentLedgerEntry) private readonly ledger: Repository<PaymentLedgerEntry>,
  ) {}

  async ingestProviderWebhook(provider: PaymentProviderCode, rawBody: Buffer | string, headers: Record<string, string>) {
    const event = await this.providers.adapter(provider).parseWebhook(rawBody, headers);
    const existing = await this.webhooks.findOne({ where: { provider: event.provider, eventId: event.providerEventId } });
    if (existing?.processed) return { processed: false, eventId: event.providerEventId, reason: 'idempotent_duplicate' };
    const webhook = existing ?? this.webhooks.create({ provider: event.provider, eventId: event.providerEventId });
    webhook.eventType = event.eventType;
    webhook.signatureValid = true;
    webhook.payload = event.rawPayloadRedacted;
    webhook.payloadHash = createHash('sha256').update(JSON.stringify(event.rawPayloadRedacted)).digest('hex');
    webhook.processed = true;
    webhook.processedAt = new Date();
    await this.webhooks.save(webhook);
    if (event.eventType.toLowerCase().includes('dispute')) {
      await this.upsertDispute(event);
    }
    await this.ledger.save(this.ledger.create({ orderId: event.providerObjectId, type: 'provider_webhook_reconciled' as any, amountCents: 0, currency: 'EUR', externalRef: event.providerEventId, metadata: { provider: event.provider, eventType: event.eventType, normalizedStatus: event.normalizedStatus } }));
    return { processed: true, eventId: event.providerEventId };
  }

  private async upsertDispute(event: { provider: PaymentProviderCode; providerObjectId: string; normalizedStatus?: string; rawPayloadRedacted: Record<string, unknown> }) {
    const existing = await this.disputes.findOne({ where: { provider: event.provider, providerDisputeId: event.providerObjectId } });
    const dispute = existing ?? this.disputes.create({ provider: event.provider, providerDisputeId: event.providerObjectId, paymentId: event.providerObjectId, status: 'needs_response' });
    dispute.status = this.normalizeDisputeStatus(event.normalizedStatus);
    dispute.redactedProviderSnapshot = event.rawPayloadRedacted;
    await this.disputes.save(dispute);
  }

  private normalizeDisputeStatus(status?: string): PaymentDispute['status'] {
    const value = String(status ?? '').toLowerCase();
    if (value.includes('won')) return 'won';
    if (value.includes('lost')) return 'lost';
    if (value.includes('review')) return 'under_review';
    if (value.includes('warning')) return 'warning_needs_response';
    return 'needs_response';
  }
}
