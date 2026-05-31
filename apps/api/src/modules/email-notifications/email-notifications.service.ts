import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailDelivery } from './entities/email-delivery.entity';
import { EmailEvent } from './entities/email-event.entity';
import { EmailProviderWebhookEvent } from './entities/email-provider-webhook-event.entity';
import { EmailSecureLink } from './entities/email-secure-link.entity';
import { EmailSuppression } from './entities/email-suppression.entity';
import { EmailTemplate } from './entities/email-template.entity';
import { emailEventBlueprints, emailTemplateBlueprints } from './email-template.registry';
import { EmailProviderAdapter } from './email-provider.adapter';
import { EmailRedactionService } from './email-redaction.service';
import { EmailRendererService } from './email-renderer.service';
import { EmailSecureLinkService } from './email-secure-link.service';
import type { EmailAdminOverview, EmailDeliveryStatus, QueueEmailInput } from './email-notifications-runtime.types';

@Injectable()
export class EmailNotificationsService {
  constructor(
    @InjectRepository(EmailTemplate) private readonly templateRepo: Repository<EmailTemplate>,
    @InjectRepository(EmailEvent) private readonly eventRepo: Repository<EmailEvent>,
    @InjectRepository(EmailDelivery) private readonly deliveryRepo: Repository<EmailDelivery>,
    @InjectRepository(EmailSuppression) private readonly suppressionRepo: Repository<EmailSuppression>,
    @InjectRepository(EmailSecureLink) private readonly secureLinkRepo: Repository<EmailSecureLink>,
    @InjectRepository(EmailProviderWebhookEvent) private readonly webhookRepo: Repository<EmailProviderWebhookEvent>,
    private readonly provider: EmailProviderAdapter,
    private readonly redaction: EmailRedactionService,
    private readonly renderer: EmailRendererService,
    private readonly secureLinks: EmailSecureLinkService
  ) {}

  async queue(input: QueueEmailInput): Promise<EmailDelivery> {
    const blueprint = emailEventBlueprints.find((item) => item.eventKey === input.eventKey);
    if (!blueprint) throw new Error(`Email event not registered: ${input.eventKey}`);

    const recipientHash = this.redaction.hashEmail(input.recipientEmail);
    const recipientRedacted = this.redaction.redactEmail(input.recipientEmail);
    const suppression = await this.suppressionRepo.findOne({ where: { recipientHash } });
    const payloadJson = this.redaction.sanitizePayload(input.variables);

    const event = await this.eventRepo.save(this.eventRepo.create({
      eventKey: input.eventKey,
      category: blueprint.category,
      priority: blueprint.priority,
      status: suppression ? 'suppressed' : 'queued',
      templateKey: blueprint.templateKey,
      templateVersion: 1,
      recipientHash,
      recipientDomain: this.redaction.domain(input.recipientEmail),
      recipientRedacted,
      payloadJson,
      relatedEntities: input.relatedEntities ?? {},
      idempotencyKey: input.idempotencyKey,
      requestedBy: input.requestedBy
    }));

    const delivery = await this.deliveryRepo.save(this.deliveryRepo.create({
      eventId: event.id,
      templateKey: blueprint.templateKey,
      recipientHash,
      recipientRedacted,
      status: suppression ? 'suppressed' : 'queued',
      provider: 'mock',
      metadataJson: suppression ? { suppressionReason: suppression.reason } : {}
    }));

    if (suppression) return delivery;
    return this.sendDelivery(delivery.id, input.recipientEmail);
  }

  async sendDelivery(deliveryId: string, recipientEmail?: string): Promise<EmailDelivery> {
    const delivery = await this.deliveryRepo.findOneOrFail({ where: { id: deliveryId } });
    const event = await this.eventRepo.findOneOrFail({ where: { id: delivery.eventId } });
    const to = recipientEmail ?? delivery.recipientRedacted;
    const rendered = this.renderer.render(event.templateKey, event.payloadJson);
    delivery.status = 'sending';
    delivery.attemptCount += 1;
    await this.deliveryRepo.save(delivery);
    try {
      const result = await this.provider.send({
        to,
        subject: rendered.subject,
        html: rendered.html,
        text: rendered.text,
        providerMessageKey: delivery.id,
        tags: { eventKey: event.eventKey, templateKey: event.templateKey }
      });
      delivery.provider = result.provider;
      delivery.providerMessageId = result.providerMessageId;
      delivery.status = result.status === 'failed' ? 'failed' : 'sent';
      delivery.lastErrorSafe = result.status === 'failed' ? result.safeMessage : undefined;
      event.status = result.status === 'failed' ? 'failed' : 'completed';
      await this.eventRepo.save(event);
      return this.deliveryRepo.save(delivery);
    } catch (error) {
      delivery.status = 'failed';
      delivery.lastErrorSafe = error instanceof Error ? error.message : 'Unknown email provider error';
      delivery.nextRetryAt = new Date(Date.now() + 15 * 60 * 1000);
      event.status = 'failed';
      event.failureReason = delivery.lastErrorSafe;
      await this.eventRepo.save(event);
      return this.deliveryRepo.save(delivery);
    }
  }

  async retryDelivery(deliveryId: string, reason: string): Promise<EmailDelivery> {
    const delivery = await this.deliveryRepo.findOneOrFail({ where: { id: deliveryId } });
    if (!reason || reason.trim().length < 8) throw new Error('Retry reason is required.');
    delivery.status = 'queued_retry';
    delivery.metadataJson = { ...delivery.metadataJson, retryReason: reason };
    await this.deliveryRepo.save(delivery);
    return this.sendDelivery(deliveryId);
  }

  async createReportSecureLink(input: { reportId: string; recipientEmail: string; baseUrl: string; createdBy?: string }): Promise<EmailSecureLink> {
    const generated = this.secureLinks.createSecureLink({ purpose: 'report_pdf', baseUrl: input.baseUrl, ttlMinutes: 60 * 24 * 7 });
    return this.secureLinkRepo.save(this.secureLinkRepo.create({
      purpose: 'report_pdf',
      tokenHash: generated.tokenHash,
      relatedEntityType: 'report',
      relatedEntityId: input.reportId,
      recipientHash: this.redaction.hashEmail(input.recipientEmail),
      expiresAt: generated.expiresAt,
      createdBy: input.createdBy
    }));
  }

  async recordProviderWebhook(input: { provider: string; providerEventId: string; providerMessageId?: string; eventType: string; payload: Record<string, unknown>; signatureValid: boolean }) {
    const event = await this.webhookRepo.save(this.webhookRepo.create({
      provider: input.provider,
      providerEventId: input.providerEventId,
      providerMessageId: input.providerMessageId,
      eventType: input.eventType,
      signatureValid: input.signatureValid,
      redactedPayload: this.redactWebhookPayload(input.payload),
      processedAt: new Date()
    }));
    if (input.providerMessageId) {
      const delivery = await this.deliveryRepo.findOne({ where: { providerMessageId: input.providerMessageId } });
      if (delivery) {
        const mappedStatus = this.mapWebhookStatus(input.eventType);
        if (mappedStatus) {
          delivery.status = mappedStatus;
          await this.deliveryRepo.save(delivery);
        }
      }
    }
    return event;
  }

  async suppressRecipient(input: { email: string; reason: 'bounce' | 'complaint' | 'manual' | 'unsubscribe' | 'security_hold'; note?: string; createdBy?: string }) {
    const recipientHash = this.redaction.hashEmail(input.email);
    const existing = await this.suppressionRepo.findOne({ where: { recipientHash } });
    if (existing) return existing;
    return this.suppressionRepo.save(this.suppressionRepo.create({
      recipientHash,
      recipientRedacted: this.redaction.redactEmail(input.email),
      reason: input.reason,
      note: input.note,
      createdBy: input.createdBy
    }));
  }

  async overview(): Promise<EmailAdminOverview> {
    const [queued, failed, bounced, complained, suppressed, sentLast24h] = await Promise.all([
      this.deliveryRepo.count({ where: { status: 'queued' } }),
      this.deliveryRepo.count({ where: { status: 'failed' } }),
      this.deliveryRepo.count({ where: { status: 'bounced' } }),
      this.deliveryRepo.count({ where: { status: 'complained' } }),
      this.suppressionRepo.count(),
      this.deliveryRepo.createQueryBuilder('delivery').where('delivery.status = :status', { status: 'sent' }).andWhere('delivery.created_at > :since', { since: new Date(Date.now() - 24 * 60 * 60 * 1000) }).getCount()
    ]);
    const criticalTemplatesActive = emailTemplateBlueprints.filter((template) => template.priority === 'critical').length;
    return { queued, failed, bounced, complained, suppressed, sentLast24h, criticalTemplatesActive };
  }

  deliveries(status?: EmailDeliveryStatus): Promise<EmailDelivery[]> {
    return this.deliveryRepo.find({
      where: status ? { status } : {},
      order: { createdAt: 'DESC' },
      take: 100
    });
  }

  events(): Promise<EmailEvent[]> {
    return this.eventRepo.find({ order: { createdAt: 'DESC' }, take: 100 });
  }

  suppressions(): Promise<EmailSuppression[]> {
    return this.suppressionRepo.find({ order: { createdAt: 'DESC' }, take: 100 });
  }

  templates() {
    return emailTemplateBlueprints;
  }

  private redactWebhookPayload(payload: Record<string, unknown>): Record<string, unknown> {
    const clone: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(payload)) {
      clone[key] = key.toLowerCase().includes('email') || key.toLowerCase().includes('token') ? '[redacted]' : value;
    }
    return clone;
  }

  private mapWebhookStatus(eventType: string): EmailDeliveryStatus | undefined {
    if (eventType.includes('delivered')) return 'delivered';
    if (eventType.includes('bounce')) return 'bounced';
    if (eventType.includes('complaint')) return 'complained';
    if (eventType.includes('failed')) return 'failed';
    return undefined;
  }
}
