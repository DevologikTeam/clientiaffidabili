import { test, expect } from '@playwright/test';

test.describe('M13-S checkout, billing e report guarded flow', () => {
  test('checkout espone conferme obbligatorie e non chiama provider prima del pagamento', async ({ page }) => {
    await page.goto('/checkout?service=COMPANY_PRO');
    await expect(page.locator('body')).toContainText(/uso lecito|confermo|pagamento/i);
    await expect(page.locator('body')).not.toContainText(/provider completed|raw payload/i);
  });

  test('success e cancel checkout sono customer-safe', async ({ page }) => {
    await page.goto('/checkout/success');
    await expect(page.locator('body')).toContainText(/pagamento|ordine|verifica/i);
    await page.goto('/checkout/cancel');
    await expect(page.locator('body')).toContainText(/annullato|riprendere|checkout/i);
  });

  test('pagina report non espone dati grezzi provider', async ({ page }) => {
    await page.goto('/reports/demo-report');
    await expect(page.locator('body')).not.toContainText(/rawPayload|providerPayload|OPENAPI/i);
  });
});
