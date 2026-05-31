import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function apiBaseUrl() {
  return process.env.INTERNAL_API_URL ?? 'http://api:3001';
}

function redirectTo(request: NextRequest, outcome: 'success' | 'error') {
  const url = new URL('/contatti', request.url);
  if (outcome === 'success') url.searchParams.set('inviata', '1');
  if (outcome === 'error') url.searchParams.set('errore', '1');
  return NextResponse.redirect(url, { status: 303 });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const payload = {
    sourceType: String(formData.get('sourceType') ?? 'contact'),
    sourcePath: String(formData.get('sourcePath') ?? '/contatti'),
    ctaId: String(formData.get('ctaId') ?? 'contatto-generico'),
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    companyName: String(formData.get('companyName') ?? '').trim() || undefined,
    phone: String(formData.get('phone') ?? '').trim() || undefined,
    message: String(formData.get('message') ?? '').trim(),
    privacyAccepted: formData.get('privacyAccepted') === 'true' || formData.get('privacyAccepted') === 'on',
    marketingAccepted: formData.get('marketingAccepted') === 'true' || formData.get('marketingAccepted') === 'on',
  };

  const response = await fetch(`${apiBaseUrl().replace(/\/$/, '')}/sales-crm/contact-messages`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  }).catch(() => null);

  if (!response?.ok) return redirectTo(request, 'error');
  return redirectTo(request, 'success');
}
