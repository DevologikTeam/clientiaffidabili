import { test, expect } from '@playwright/test';

test.describe('M13-S partner portal and SEO CMS smoke', () => {
  test('portale partner e CMS SEO sono disponibili in sandbox/admin', async ({ page }) => {
    await page.goto('/dashboard/partner');
    await expect(page.locator('body')).toContainText(/sandbox|API|partner/i);

    await page.goto('/admin/seo-pages');
    await expect(page.locator('body')).toContainText(/SEO|GEO|pagina/i);

    await page.goto('/guide/garanzie-limiti-report-affidabilita');
    await expect(page.locator('body')).not.toContainText(/rischio zero|pagamento garantito|solvibilità garantita/i);
  });
});
