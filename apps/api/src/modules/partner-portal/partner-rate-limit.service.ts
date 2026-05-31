import { Injectable } from '@nestjs/common';

export interface RateLimitDecision {
  allowed: boolean;
  profile: string;
  remaining: number;
  resetAt: string;
  reason?: string;
}

@Injectable()
export class PartnerRateLimitService {
  private readonly counters = new Map<string, { count: number; resetAt: number }>();

  check(input: { partnerAccountId: string; apiKeyPrefix?: string; endpoint: string; profile?: string }): RateLimitDecision {
    const profile = input.profile || 'sandbox_default';
    const limit = profile === 'sandbox_default' ? 60 : profile === 'live_agency' ? 600 : 180;
    const key = `${input.partnerAccountId}:${input.apiKeyPrefix || 'unknown'}:${input.endpoint}`;
    const now = Date.now();
    const current = this.counters.get(key);
    if (!current || current.resetAt < now) {
      this.counters.set(key, { count: 1, resetAt: now + 60_000 });
      return { allowed: true, profile, remaining: limit - 1, resetAt: new Date(now + 60_000).toISOString() };
    }
    if (current.count >= limit) {
      return { allowed: false, profile, remaining: 0, resetAt: new Date(current.resetAt).toISOString(), reason: 'rate_limit_exceeded' };
    }
    current.count += 1;
    return { allowed: true, profile, remaining: limit - current.count, resetAt: new Date(current.resetAt).toISOString() };
  }
}
