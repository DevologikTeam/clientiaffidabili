import { expect, Page } from '@playwright/test';

export async function expectPublicPageReady(page: Page, path: string, heading: RegExp | string) {
  await page.goto(path);
  await expect(page.locator('body')).toBeVisible();
  await expect(page.getByRole('heading', { name: heading })).toBeVisible();
}

export async function expectNoTechnicalLeak(page: Page) {
  const body = await page.locator('body').innerText();
  expect(body).not.toContain('rawPayload');
  expect(body).not.toContain('OPENAPI_API_KEY');
  expect(body).not.toContain('STRIPE_SECRET_KEY');
  expect(body).not.toContain('PAYPAL_CLIENT_SECRET');
}
