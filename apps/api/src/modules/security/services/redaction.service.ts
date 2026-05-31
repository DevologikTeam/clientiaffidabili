import { Injectable } from '@nestjs/common';

const SECRET_KEYS = ['authorization', 'password', 'secret', 'token', 'apiKey', 'api_key', 'rawPayload', 'card', 'iban', 'taxCode'];

@Injectable()
export class RedactionService {
  redact<T>(value: T): T {
    if (Array.isArray(value)) return value.map((item) => this.redact(item)) as T;
    if (!value || typeof value !== 'object') return value;
    const copy: Record<string, unknown> = {};
    for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
      if (SECRET_KEYS.some((sensitive) => key.toLowerCase().includes(sensitive.toLowerCase()))) {
        copy[key] = '[redacted]';
      } else if (raw && typeof raw === 'object') {
        copy[key] = this.redact(raw);
      } else {
        copy[key] = raw;
      }
    }
    return copy as T;
  }

  safeLogContext(context: Record<string, unknown>) {
    return this.redact({ ...context, generatedAt: new Date().toISOString() });
  }
}
