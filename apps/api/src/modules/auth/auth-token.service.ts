import { Injectable } from '@nestjs/common';
import { createHash, randomBytes, timingSafeEqual } from 'crypto';

@Injectable()
export class AuthTokenService {
  createToken(prefix = 'ca'): { token: string; tokenHash: string; preview: string } {
    const token = `${prefix}_${randomBytes(32).toString('base64url')}`;
    return { token, tokenHash: this.hashToken(token), preview: `${token.slice(0, 8)}...${token.slice(-4)}` };
  }

  hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  safeCompare(rawToken: string, tokenHash: string): boolean {
    const actual = Buffer.from(this.hashToken(rawToken), 'hex');
    const expected = Buffer.from(tokenHash, 'hex');
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  }
}
