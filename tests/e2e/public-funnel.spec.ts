import { test, expect } from '@playwright/test';
import { expectNoTechnicalLeak, expectPublicPageReady } from './helpers/navigation';

test.describe('M13-S public funnel smoke', () => {
  test('homepage, catalogo, prezzi e API partner sono navigabili', async ({ page }) => {
    await expectPublicPageReady(page, '/', /Verifica clienti e fornitori/i);
    await expectNoTechnicalLeak(page);

    await page.getByRole('link', { name: /Scegli una verifica/i }).click();
    await expect(page).toHaveURL(/\/servizi/);
    await expect(page.getByRole('heading')).toContainText(/servizi|verifiche/i);

    await page.goto('/prezzi');
    await expect(page.locator('body')).toContainText(/prezzo|pacchetto|checkout/i);

    await page.goto('/api');
    await expect(page.locator('body')).toContainText(/API|partner/i);
    await expectNoTechnicalLeak(page);
  });
});
