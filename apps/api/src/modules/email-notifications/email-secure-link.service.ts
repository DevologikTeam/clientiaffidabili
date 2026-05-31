import { Injectable } from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';
import type { EmailSecureLinkPurpose } from './email-notifications-runtime.types';

export type GeneratedSecureLink = {
  token: string;
  tokenHash: string;
  url: string;
  expiresAt: Date;
};

@Injectable()
export class EmailSecureLinkService {
  createSecureLink(input: { purpose: EmailSecureLinkPurpose; baseUrl: string; ttlMinutes?: number; pathPrefix?: string }): GeneratedSecureLink {
    const token = randomBytes(32).toString('base64url');
    const tokenHash = createHash('sha256').update(token).digest('hex');
    const expiresAt = new Date(Date.now() + (input.ttlMinutes ?? 60 * 24) * 60 * 1000);
    const pathPrefix = input.pathPrefix ?? '/download/sicuro';
    return {
      token,
      tokenHash,
      expiresAt,
      url: `${input.baseUrl.replace(/\/$/, '')}${pathPrefix}/${token}`
    };
  }
}
