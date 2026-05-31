import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import type { EmailEventPayload } from './email-notifications-runtime.types';

const forbiddenPayloadKeys = [
  'password',
  'token',
  'apiKey',
  'apiKeySecret',
  'rawProviderPayload',
  'cardNumber',
  'iban',
  'ibanFull',
  'openaiPrompt',
  'openaiRawResponse',
  'reportRawData'
];

@Injectable()
export class EmailRedactionService {
  hashEmail(email: string): string {
    return createHash('sha256').update(email.trim().toLowerCase()).digest('hex');
  }

  redactEmail(email: string): string {
    const [local, domain = ''] = email.trim().toLowerCase().split('@');
    const safeLocal = local.length <= 2 ? `${local[0] ?? '*'}***` : `${local.slice(0, 2)}***`;
    return `${safeLocal}@${domain || 'redacted'}`;
  }

  domain(email: string): string | undefined {
    return email.includes('@') ? email.split('@').pop()?.toLowerCase() : undefined;
  }

  sanitizePayload(payload: EmailEventPayload): EmailEventPayload {
    const sanitized: EmailEventPayload = {};
    for (const [key, value] of Object.entries(payload)) {
      const lower = key.toLowerCase();
      if (forbiddenPayloadKeys.some((forbidden) => lower.includes(forbidden.toLowerCase()))) {
        sanitized[key] = '[redacted]';
        continue;
      }
      if (typeof value === 'string' && /(?:sk-[A-Za-z0-9_-]{16,}|Bearer\s+[A-Za-z0-9_.-]+)/.test(value)) {
        sanitized[key] = '[redacted]';
        continue;
      }
      sanitized[key] = value;
    }
    return sanitized;
  }
}
