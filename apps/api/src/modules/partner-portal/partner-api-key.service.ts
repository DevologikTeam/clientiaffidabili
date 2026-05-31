import { Injectable } from '@nestjs/common';
import { createHash, randomBytes, timingSafeEqual } from 'crypto';
import type { PartnerEnvironment, PartnerScope } from './partner-portal.types';

export interface GeneratedPartnerApiKey {
  id: string;
  label: string;
  environment: PartnerEnvironment;
  prefix: string;
  secret: string;
  secretHash: string;
  scopes: PartnerScope[];
  warning: string;
}

@Injectable()
export class PartnerApiKeyService {
  generateKey(input: { label: string; environment: PartnerEnvironment; scopes: PartnerScope[] }): GeneratedPartnerApiKey {
    const prefix = input.environment === 'live' ? 'ca_live_' : 'ca_sbox_';
    const token = randomBytes(24).toString('base64url');
    const secret = `${prefix}${token}`;
    return {
      id: `pak_${randomBytes(8).toString('hex')}`,
      label: input.label,
      environment: input.environment,
      prefix: secret.slice(0, 14),
      secret,
      secretHash: this.hashSecret(secret),
      scopes: input.scopes,
      warning: 'Mostra questa chiave una sola volta. ClientiAffidabili.it salva solo hash e prefix.',
    };
  }

  hashSecret(secret: string): string {
    return createHash('sha256').update(secret).digest('hex');
  }

  verifySecret(secret: string, hash: string): boolean {
    const current = Buffer.from(this.hashSecret(secret));
    const expected = Buffer.from(hash);
    return current.length === expected.length && timingSafeEqual(current, expected);
  }

  redact(secretOrPrefix: string): string {
    if (secretOrPrefix.length <= 10) return `${secretOrPrefix.slice(0, 4)}...`;
    return `${secretOrPrefix.slice(0, 10)}...${secretOrPrefix.slice(-4)}`;
  }
}
