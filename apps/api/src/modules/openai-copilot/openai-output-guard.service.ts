import { Injectable } from '@nestjs/common';

const BANNED_CLAIMS = [
  'rischio zero',
  'pagamento garantito',
  'solvibilita garantita',
  'solvibilità garantita',
  'cliente sicuro al 100%',
  'garantiamo che paghera',
  'garantiamo che pagherà',
];

@Injectable()
export class OpenaiOutputGuardService {
  validateOutput(output: Record<string, unknown>): string[] {
    const text = JSON.stringify(output).toLowerCase();
    const warnings: string[] = [];
    for (const claim of BANNED_CLAIMS) {
      if (text.includes(claim.toLowerCase())) warnings.push(`Claim vietato rilevato: ${claim}`);
    }
    if (/(sk-[a-z0-9_-]{12,})/i.test(text)) warnings.push('Possibile API key rilevata nell output.');
    if (/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(text)) warnings.push('Possibile email rilevata nell output.');
    return warnings;
  }

  shouldBlock(warnings: string[]): boolean {
    return warnings.some((warning) => warning.toLowerCase().includes('claim vietato') || warning.toLowerCase().includes('api key'));
  }
}
