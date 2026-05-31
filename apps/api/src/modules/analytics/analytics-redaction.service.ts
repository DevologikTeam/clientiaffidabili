import { Injectable } from '@nestjs/common';
import { analyticsForbiddenPayloadKeys } from './analytics-event-registry';

@Injectable()
export class AnalyticsRedactionService {
  sanitizePayload(payload: Record<string, unknown>): { payload: Record<string, unknown>; redactionSummary: Record<string, unknown> } {
    const removed: string[] = [];
    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(payload ?? {})) {
      const normalizedKey = key.toLowerCase();
      const isForbidden = analyticsForbiddenPayloadKeys.some((forbidden) => normalizedKey.includes(forbidden.toLowerCase()));
      if (isForbidden) {
        removed.push(key);
        continue;
      }
      sanitized[key] = this.safeValue(value);
    }

    return {
      payload: sanitized,
      redactionSummary: {
        removedKeys: removed,
        removedCount: removed.length,
        policy: 'analytics_no_pii_no_raw_payload_no_secret',
      },
    };
  }

  private safeValue(value: unknown): unknown {
    if (value === null || value === undefined) {
      return value;
    }
    if (typeof value === 'string') {
      return value.slice(0, 500);
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
      return value;
    }
    if (Array.isArray(value)) {
      return value.filter((item) => ['string', 'number', 'boolean'].includes(typeof item)).slice(0, 20);
    }
    return '[redacted_non_scalar_payload]';
  }
}
