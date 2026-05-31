import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { RefundRequest } from './entities/refund-request.entity';
import { PaymentLedgerEntry } from './entities/payment-ledger-entry.entity';
import { PaymentProviderOrchestrator } from './payment-provider-orchestrator.service';
import { evaluateRefundPolicy } from './refund-policy.registry';

@Injectable()
export class RefundService {
  constructor(
    private readonly providers: PaymentProviderOrchestrator,
    @InjectRepository(Payment) private readonly payments: Repository<Payment>,
    @InjectRepository(RefundRequest) private readonly refunds: Repository<RefundRequest>,
    @InjectRepository(PaymentLedgerEntry) private readonly ledger: Repository<PaymentLedgerEntry>,
  ) {}

  async requestRefund(input: { paymentId: string; amountCents: number; reason: string; idempotencyKey?: string }) {
    if (!input.reason || input.reason.trim().length < 10) throw new BadRequestException('Reason obbligatoria e descrittiva per richiedere un rimborso.');
    const payment = await this.payments.findOne({ where: { id: input.paymentId } });
    if (!payment) throw new NotFoundException('Pagamento non trovato.');
    const alreadyRefundedAmountCents = await this.sumRefunded(payment.id);
    const decision = evaluateRefundPolicy({
      paymentId: payment.id,
      paidAmountCents: payment.amountCents,
      alreadyRefundedAmountCents,
      requestedAmountCents: input.amountCents,
      providerCostIncurredCents: Number((payment.rawPayload as any)?.providerCostIncurredCents ?? 0),
      reportPublished: Boolean((payment.rawPayload as any)?.reportPublished),
      reportDownloaded: Boolean((payment.rawPayload as any)?.reportDownloaded),
      creditsConsumedValueCents: Number((payment.rawPayload as any)?.creditsConsumedValueCents ?? 0),
      hasOpenDispute: Boolean((payment.rawPayload as any)?.hasOpenDispute),
      subscriptionRenewalUnused: Boolean((payment.rawPayload as any)?.subscriptionRenewalUnused),
    });
    const refund = await this.refunds.save(this.refunds.create({ paymentId: payment.id, orderId: payment.orderId, provider: payment.provider as any, status: decision.outcome === 'eligible' ? 'approved' : decision.outcome === 'blocked' ? 'rejected' : 'policy_review', amountCents: input.amountCents, currency: payment.currency as 'EUR', reason: input.reason, policyDecision: decision, providerPaymentReference: payment.providerPaymentId, idempotencyKey: input.idempotencyKey ?? `refund_${payment.id}_${randomUUID()}` }));
    await this.ledger.save(this.ledger.create({ orderId: payment.orderId, type: 'refund_requested' as any, amountCents: -input.amountCents, currency: 'EUR', externalRef: refund.id, metadata: { decision, reason: input.reason } }));
    if (decision.outcome !== 'eligible') return refund;
    return this.executeRefund(refund.id);
  }

  async executeRefund(refundId: string) {
    const refund = await this.refunds.findOne({ where: { id: refundId } });
    if (!refund) throw new NotFoundException('Richiesta rimborso non trovata.');
    if (!['approved', 'provider_pending', 'failed'].includes(refund.status)) throw new BadRequestException('Rimborso non eseguibile nello stato attuale.');
    const result = await this.providers.adapter(refund.provider).createRefund({ provider: refund.provider, paymentId: refund.paymentId, providerPaymentReference: refund.providerPaymentReference ?? refund.paymentId, amountCents: refund.amountCents, currency: 'EUR', reason: refund.reason, idempotencyKey: refund.idempotencyKey ?? `refund_${refund.id}` });
    refund.providerRefundId = result.providerRefundId;
    refund.status = result.status;
    refund.providerSnapshot = { result };
    refund.completedAt = result.status === 'succeeded' ? new Date() : undefined;
    await this.refunds.save(refund);
    await this.ledger.save(this.ledger.create({ orderId: refund.orderId ?? refund.paymentId, type: result.status === 'succeeded' ? 'refund_succeeded' as any : 'refund_provider_pending' as any, amountCents: -refund.amountCents, currency: 'EUR', externalRef: result.providerRefundId, metadata: { refundId: refund.id, provider: refund.provider } }));
    return refund;
  }

  async listAdminRefunds() {
    return this.refunds.find({ order: { createdAt: 'DESC' }, take: 50 });
  }

  private async sumRefunded(paymentId: string): Promise<number> {
    const rows = await this.refunds.find({ where: { paymentId, status: 'succeeded' as any } });
    return rows.reduce((sum, row) => sum + row.amountCents, 0);
  }
}
