import { NextRequest, NextResponse } from 'next/server';

import { defaultExternalTrackingConfig } from '@/lib/analytics/tag-manager-clarity-runtime';

export const dynamic = 'force-dynamic';

function apiBaseUrl() {
  // Server-side only. INTERNAL_API_URL may point to the Docker service name.
  // Do not expose this URL to the browser.
  return process.env.INTERNAL_API_URL ?? 'http://api:3001';
}

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get('pathname') ?? '/';

  try {
    const response = await fetch(`${apiBaseUrl().replace(/\/$/, '')}/analytics/public-config?pathname=${encodeURIComponent(pathname)}`, {
      cache: 'no-store',
    });
    if (!response.ok) return NextResponse.json(defaultExternalTrackingConfig, { status: 200 });
    const data = await response.json();
    return NextResponse.json({ ...defaultExternalTrackingConfig, ...data }, { status: 200 });
  } catch {
    return NextResponse.json(defaultExternalTrackingConfig, { status: 200 });
  }
}
