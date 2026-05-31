import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('admin/partners')
export class PartnerAdminController {
  @Get()
  list() {
    return {
      summary: { pendingLiveReviews: 2, sandboxPartners: 8, livePartners: 0, suspendedPartners: 0 },
      items: [
        {
          id: 'partner_demo',
          legalName: 'Partner Sandbox Demo Srl',
          status: 'sandbox_testing',
          pricingTier: 'starter',
          nextAction: 'Verificare webhook e uso dichiarato prima del live.',
          risk: 'medium',
        },
      ],
    };
  }

  @Get(':id')
  detail(@Param('id') id: string) {
    return {
      id,
      legalName: 'Partner Sandbox Demo Srl',
      status: 'sandbox_testing',
      useCase: 'Integrazione verifiche affidabilita in CRM B2B.',
      apiKeys: [{ id: 'pak_demo', prefix: 'ca_sbox_8f3...', environment: 'sandbox', scopes: ['checks:company.create', 'usage:read'], revokedAt: null }],
      usage: { monthCents: 0, reservedCents: 0, calls: 12 },
      webhooks: [{ id: 'pwe_demo', url: 'https://partner.example/webhooks/clientiaffidabili', status: 'ok' }],
      blockedActions: ['create_live_key_without_approval'],
      allowedActions: ['request_changes', 'approve_live_access', 'revoke_api_key', 'adjust_credits'],
      audit: [
        { action: 'sandbox_enabled', actor: 'system', createdAt: new Date().toISOString(), reason: 'Profilo iniziale creato.' },
      ],
    };
  }

  @Post(':id/actions')
  execute(@Param('id') id: string, @Body() body: { action: string; reason?: string }) {
    if (['approve_live_access', 'revoke_api_key', 'adjust_credits', 'suspend_live_access'].includes(body.action) && (!body.reason || body.reason.length < 8)) {
      return { ok: false, code: 'reason_required', message: 'Motivazione obbligatoria per azioni partner sensibili.' };
    }
    return { ok: true, partnerId: id, action: body.action, audit: 'created', executedAt: new Date().toISOString() };
  }
}
