export type CommerceMode = 'live' | 'test';

export function isCheckoutEnabled() {
  return process.env.ENABLE_CHECKOUT === 'true';
}

export function areProviderCallsEnabled() {
  return process.env.ENABLE_PROVIDER_CALLS === 'true';
}

export function getCommerceMode(): CommerceMode {
  return isCheckoutEnabled() ? 'live' : 'test';
}

export function isCommerceTestMode() {
  return getCommerceMode() === 'test';
}

export function getCheckoutCtaLabel(defaultLabel: string) {
  return isCommerceTestMode() ? 'Vedi percorso in modalità test' : defaultLabel;
}
