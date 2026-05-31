import { Injectable } from '@nestjs/common';
import type { EmailProviderSendInput, EmailProviderSendResult } from './email-notifications-runtime.types';

@Injectable()
export class EmailProviderAdapter {
  async send(input: EmailProviderSendInput): Promise<EmailProviderSendResult> {
    const suffix = Buffer.from(input.providerMessageKey).toString('base64url').slice(0, 12);
    return {
      provider: 'mock',
      providerMessageId: `mock_${Date.now()}_${suffix}`,
      status: 'sent',
      safeMessage: 'Mock provider accepted the email. Replace with Resend, SES or SMTP adapter before production.'
    };
  }
}
