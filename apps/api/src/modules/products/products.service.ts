import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { PriceSnapshot, PublicCatalogProduct } from '@clientiaffidabili/shared';
import { Repository } from 'typeorm';
import { catalogSeedProducts } from './catalog.seed';
import { Product } from './product.entity';
import { PriceGuardService } from './price-guard.service';

function formatEuro(cents: number): string {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(cents / 100);
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>,
    private readonly priceGuard: PriceGuardService,
  ) {}

  async ensureSeeded(): Promise<void> {
    const count = await this.repo.count();
    if (count > 0) return;
    await this.repo.save(catalogSeedProducts.map((item) => this.repo.create(item)));
  }

  async findPublic(): Promise<PublicCatalogProduct[]> {
    await this.ensureSeeded();
    const products = await this.repo.find({
      where: { active: true },
      order: { recommended: 'DESC', publicPriceCents: 'ASC' },
    });
    return products.filter((product) => ['published', 'assisted'].includes(product.status)).map((product) => this.toPublicProduct(product));
  }

  async findAdminCatalog(): Promise<Array<Product & { guard: ReturnType<PriceGuardService['evaluate']> }>> {
    await this.ensureSeeded();
    const products = await this.repo.find({ order: { publicPriceCents: 'ASC' } });
    return products.map((product) => Object.assign(product, { guard: this.priceGuard.evaluate(product) }));
  }

  async findByCode(code: string): Promise<Product> {
    await this.ensureSeeded();
    const product = await this.repo.findOne({ where: { code, active: true } });
    if (!product) throw new NotFoundException('Prodotto non disponibile');
    return product;
  }

  async findPublicBySlug(slug: string): Promise<PublicCatalogProduct> {
    await this.ensureSeeded();
    const product = await this.repo.findOne({ where: { slug, active: true } });
    if (!product || !['published', 'assisted'].includes(product.status)) throw new NotFoundException('Servizio non disponibile');
    return this.toPublicProduct(product);
  }

  async createPriceSnapshot(productCode: string, quantity = 1): Promise<PriceSnapshot> {
    const product = await this.findByCode(productCode);
    const safeQuantity = Math.max(1, Math.min(quantity, 99));
    const subtotalNetCents = product.publicPriceCents * safeQuantity;
    const vatRate = Number(product.taxRate);
    const vatCents = Math.round(subtotalNetCents * (vatRate / 100));
    const totalGrossCents = subtotalNetCents + vatCents;
    return {
      productCode: product.code,
      productName: product.name,
      unitPriceNetCents: product.publicPriceCents,
      quantity: safeQuantity,
      subtotalNetCents,
      vatRate,
      vatCents,
      totalGrossCents,
      currency: 'EUR',
      formatted: {
        unitPriceNet: formatEuro(product.publicPriceCents),
        subtotalNet: formatEuro(subtotalNetCents),
        vat: formatEuro(vatCents),
        totalGross: formatEuro(totalGrossCents),
      },
      guard: this.priceGuard.evaluate(product),
      createdAt: new Date().toISOString(),
    };
  }

  private toPublicProduct(product: Product): PublicCatalogProduct {
    const vatCents = Math.round(product.publicPriceCents * (Number(product.taxRate) / 100));
    const grossCents = product.publicPriceCents + vatCents;
    return {
      code: product.code,
      slug: product.slug,
      name: product.name,
      category: product.category,
      scenario: product.scenario as PublicCatalogProduct['scenario'],
      status: product.status,
      riskLevel: product.riskLevel,
      delivery: product.estimatedDelivery,
      description: product.description,
      publicPromise: product.publicPromise,
      priceNet: { cents: product.publicPriceCents, currency: 'EUR', formatted: formatEuro(product.publicPriceCents) },
      vatRate: Number(product.taxRate),
      priceVat: { cents: vatCents, currency: 'EUR', formatted: formatEuro(vatCents) },
      priceGross: { cents: grossCents, currency: 'EUR', formatted: formatEuro(grossCents) },
      requiredInputs: product.requiredInputs,
      reportOutputs: product.reportOutputs,
      limits: product.limits,
      primaryCta: product.status === 'assisted' ? 'Richiedi verifica assistita' : 'Avvia verifica',
      recommended: product.recommended,
    };
  }
}
