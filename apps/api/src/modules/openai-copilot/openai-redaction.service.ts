import { Injectable } from '@nestjs/common';
import type { RedactionResult } from './openai-copilot-runtime.types';

const SENSITIVE_KEY_PATTERN = /(email|phone|telefono|cellulare|iban|card|password|token|secret|api.?key|fiscal|codice.?fiscale|partita.?iva|vat|raw|payload|prompt|ip|user.?agent)/i;
const SENSITIVE_VALUE_PATTERN = /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})|(IT\d{2}[A-Z0-9]{23})|(sk-[A-Za-z0-9_-]{12,})|(GTM-[A-Z0-9]+)|(clarity)/i;

@Injectable()
export class OpenaiRedactionService {
  redact(input: Record<string, unknown>): RedactionResult {
    const redactedKeys: string[] = [];
    const blockedCategories = new Set<string>();

    const visit = (value: unknown, path: string): unknown => {
      if (value === null || value === undefined) return value;
      if (typeof value === 'string') {
        if (SENSITIVE_VALUE_PATTERN.test(value)) {
          redactedKeys.push(path);
          blockedCategories.add('sensitive_value');
          return '[REDACTED]';
        }
        return value.slice(0, 4000);
      }
      if (Array.isArray(value)) return value.slice(0, 20).map((item, index) => visit(item, `${path}.${index}`));
      if (typeof value === 'object') {
        const output: Record<string, unknown> = {};
        for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
          const nestedPath = path ? `${path}.${key}` : key;
          if (SENSITIVE_KEY_PATTERN.test(key)) {
            redactedKeys.push(nestedPath);
            blockedCategories.add('sensitive_key');
            output[key] = '[REDACTED]';
            continue;
          }
          output[key] = visit(nested, nestedPath);
        }
        return output;
      }
      return value;
    };

    return {
      payload: visit(input, '') as Record<string, unknown>,
      summary: {
        redactedFields: redactedKeys.length,
        redactedKeys,
        blockedCategories: [...blockedCategories],
      },
    };
  }
}
