import { Injectable } from '@nestjs/common';
import { pbkdf2Sync, randomBytes, timingSafeEqual } from 'crypto';

@Injectable()
export class AuthPasswordService {
  hashPassword(password: string): string {
    this.assertPasswordPolicy(password);
    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, 180000, 32, 'sha256').toString('hex');
    return `pbkdf2_sha256$180000$${salt}$${hash}`;
  }

  verifyPassword(password: string, storedHash: string): boolean {
    const [scheme, iterationsRaw, salt, expected] = storedHash.split('$');
    if (scheme !== 'pbkdf2_sha256' || !iterationsRaw || !salt || !expected) return false;
    const actual = pbkdf2Sync(password, salt, Number(iterationsRaw), 32, 'sha256');
    const expectedBuffer = Buffer.from(expected, 'hex');
    return expectedBuffer.length === actual.length && timingSafeEqual(expectedBuffer, actual);
  }

  assertPasswordPolicy(password: string): void {
    const longEnough = password.length >= 12;
    const varied = /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password);
    if (!longEnough || !varied) {
      throw new Error('Password non conforme: usa almeno 12 caratteri con maiuscole, minuscole e numeri.');
    }
  }
}
