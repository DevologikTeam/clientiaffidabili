import { Injectable } from '@nestjs/common';
import { createHmac, randomBytes } from 'crypto';

@Injectable()
export class PartnerWebhookService {
  generateSecret() {
    return `whsec_ca_${randomBytes(24).toString('base64url')}`;
  }

  signPayload(payload: unknown, secret: string, timestamp = Math.floor(Date.now() / 1000)) {
    const body = typeof payload === 'string' ? payload : JSON.stringify(payload);
    const signature = createHmac('sha256', secret).update(`${timestamp}.${body}`).digest('hex');
    return {
      timestamp,
      signature,
      headers: {
        'X-CA-Timestamp': String(timestamp),
        'X-CA-Signature': signature,
        'X-CA-Event-Id': `evt_${randomBytes(8).toString('hex')}`,
      },
    };
  }

  buildTestEvent(partnerAccountId: string) {
    return {
      id: `evt_${randomBytes(8).toString('hex')}`,
      type: 'webhook.test',
      partnerAccountId,
      createdAt: new Date().toISOString(),
      data: { message: 'Webhook ClientiAffidabili.it configurato correttamente.' },
    };
  }
}
