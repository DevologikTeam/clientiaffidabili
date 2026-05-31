import { test, expect } from '@playwright/test';

test.describe('public funnel blueprint', () => {
  test('home to service checkout', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('public-hero')).toBeVisible();
    await page.goto('/servizi');
    await expect(page.getByTestId('service-card-COMPANY_PRO')).toBeVisible();
    await page.goto('/servizi/check-affidabilita-pro');
    await expect(page.getByTestId('checkout-entry')).toBeVisible();
  });
});
