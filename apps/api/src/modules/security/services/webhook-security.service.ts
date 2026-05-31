import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'crypto';

export type WebhookProvider = 'stripe' | 'paypal' | 'openapi';

@Injectable()
export class WebhookSecurityService {
  verifySharedSecretSignature(input: { provider: WebhookProvider; payload: string; signature?: string; secret?: string; toleranceSeconds?: number; timestamp?: number }) {
    if (!input.secret) throw new BadRequestException(`Webhook secret mancante per ${input.provider}.`);
    if (!input.signature) throw new UnauthorizedException('Firma webhook mancante.');
    if (input.timestamp && input.toleranceSeconds) {
      const age = Math.abs(Math.floor(Date.now() / 1000) - input.timestamp);
      if (age > input.toleranceSeconds) throw new UnauthorizedException('Webhook fuori finestra temporale consentita.');
    }
    const expected = createHmac('sha256', input.secret).update(input.payload).digest('hex');
    const expectedBuffer = Buffer.from(expected);
    const receivedBuffer = Buffer.from(input.signature.replace(/^sha256=/, ''));
    if (expectedBuffer.length !== receivedBuffer.length || !timingSafeEqual(expectedBuffer, receivedBuffer)) {
      throw new UnauthorizedException('Firma webhook non valida.');
    }
    return { ok: true, provider: input.provider, verifiedAt: new Date().toISOString() };
  }

  idempotencyKey(provider: WebhookProvider, eventId: string) {
    if (!eventId || eventId.trim().length < 6) throw new BadRequestException('Event id webhook non valido.');
    return `${provider}:${eventId}`;
  }
}
