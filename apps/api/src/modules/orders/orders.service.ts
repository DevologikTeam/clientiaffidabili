import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';

const DEMO_ORG_ID = '00000000-0000-0000-0000-000000000001';
const DEMO_USER_ID = '00000000-0000-0000-0000-000000000002';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly repo: Repository<Order>,
    private readonly products: ProductsService,
  ) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    const snapshot = await this.products.createPriceSnapshot(dto.productCode, 1);
    // PriceGuard integration: block order creation when catalog guard fails.
    if (snapshot.guard.status === 'blocked') {
      throw new BadRequestException('Il servizio non può andare a checkout: prezzo o margine da rivedere.');
    }
    const order = this.repo.create({
      organizationId: DEMO_ORG_ID,
      userId: DEMO_USER_ID,
      productCode: snapshot.productCode,
      priceSnapshot: snapshot,
      subjectPayload: dto.subject,
      subtotalNetCents: snapshot.subtotalNetCents,
      totalCents: snapshot.totalGrossCents,
      taxCents: snapshot.vatCents,
      currency: snapshot.currency,
      status: 'pending_payment',
    });
    return this.repo.save(order);
  }

  async findById(id: string): Promise<Order> {
    const order = await this.repo.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Ordine non trovato');
    return order;
  }

  async attachCheckoutSession(id: string, checkoutProvider: string, checkoutSessionId: string): Promise<Order> {
    const order = await this.findById(id);
    order.checkoutProvider = checkoutProvider;
    order.checkoutSessionId = checkoutSessionId;
    return this.repo.save(order);
  }

  async markPaid(id: string, checkoutProvider: string, checkoutSessionId: string): Promise<Order> {
    const order = await this.findById(id);
    if (order.status === 'paid' || order.status === 'processing' || order.status === 'completed') return order;
    order.status = 'paid';
    order.checkoutProvider = checkoutProvider;
    order.checkoutSessionId = checkoutSessionId;
    order.paidAt = new Date();
    return this.repo.save(order);
  }
}
