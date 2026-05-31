import { Injectable } from '@nestjs/common';
import type { PriceGuardResult, PriceGuardStatus } from '@clientiaffidabili/shared';
import { Product } from './product.entity';

@Injectable()
export class PriceGuardService {
  evaluate(product: Product, unitPriceNetCents = product.publicPriceCents): PriceGuardResult {
    const reservesCents = product.checkoutFeeReserveCents + product.supportReserveCents + product.retryReserveCents;
    const totalInternalCost = product.estimatedProviderCostCents + reservesCents;
    const grossMarginRatio = unitPriceNetCents <= 0 ? -1 : (unitPriceNetCents - totalInternalCost) / unitPriceNetCents;
    const target = Number(product.targetGrossMarginRatio);
    const minimum = Number(product.minimumGrossMarginRatio);
    const messages: string[] = [];
    let status: PriceGuardStatus = 'pass';

    if (unitPriceNetCents <= product.estimatedProviderCostCents) {
      status = 'blocked';
      messages.push('Prezzo netto uguale o inferiore al costo provider stimato: pubblicazione bloccata.');
    } else if (grossMarginRatio < minimum) {
      status = 'blocked';
      messages.push('Margine sotto la soglia minima: serve revisione prezzo/costo prima del checkout.');
    } else if (grossMarginRatio < target) {
      status = 'warning';
      messages.push('Margine sotto il target: consentito solo con monitoraggio e motivazione commerciale.');
    } else {
      messages.push('Margine coerente con i guardrail del catalogo.');
    }

    if (product.riskLevel === 'high' || product.requiresComplianceReview) {
      messages.push('Servizio sensibile: mantenere conferma finalità lecita e review copy/compliance.');
    }

    return {
      status,
      grossMarginRatio: Number(grossMarginRatio.toFixed(4)),
      targetGrossMarginRatio: target,
      minimumGrossMarginRatio: minimum,
      estimatedProviderCostCents: product.estimatedProviderCostCents,
      reservesCents,
      messages,
    };
  }
}
