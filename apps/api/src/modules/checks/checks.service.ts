import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersService } from '../orders/orders.service';
import { ProviderRuntimeService } from '../provider/provider-runtime.service';
import { Check } from './check.entity';

@Injectable()
export class ChecksService {
  constructor(
    @InjectRepository(Check) private readonly repo: Repository<Check>,
    private readonly orders: OrdersService,
    private readonly providerRuntime: ProviderRuntimeService,
  ) {}

  async createFromPaidOrder(orderId: string): Promise<Check> {
    const order = await this.orders.findById(orderId);
    if (order.status !== 'paid' && order.status !== 'processing' && order.status !== 'completed') {
      throw new BadRequestException('La verifica puo partire solo dopo pagamento confermato.');
    }
    const subjectType = String(order.subjectPayload.type ?? 'company') as Check['subjectType'];
    const check = await this.repo.save(this.repo.create({
      organizationId: order.organizationId,
      orderId: order.id,
      productCode: order.productCode ?? 'COMPANY_PRO',
      requestedByUserId: order.userId,
      subjectType,
      subjectPayload: order.subjectPayload,
      status: 'queued',
    }));

    const result = await this.providerRuntime.dispatchAfterPayment({
      organizationId: order.organizationId,
      orderId: order.id,
      checkId: check.id,
      productCode: check.productCode,
      subject: check.subjectPayload,
      paymentConfirmedAt: order.paidAt ?? new Date(),
    });

    check.status = result.checkStatus;
    check.providerName = result.providerRequest.providerName;
    check.providerRequestId = result.providerRequest.providerExternalId ?? result.providerRequest.id;
    if (result.normalizedResult) {
      check.normalizedResult = result.normalizedResult as unknown as Record<string, unknown>;
      check.riskLevel = result.normalizedResult.riskLevel as Check['riskLevel'];
      if (result.checkStatus === 'completed') check.completedAt = new Date();
    }
    return this.repo.save(check);
  }
}
