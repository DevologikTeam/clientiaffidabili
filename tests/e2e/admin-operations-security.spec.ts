import { test, expect } from '@playwright/test';

test.describe('M13-S admin operations and security smoke', () => {
  test('admin operations e security gate sono presenti e non mostrano raw payload', async ({ page }) => {
    for (const path of ['/admin/operations', '/admin/security', '/admin/billing', '/admin/provider', '/admin/reports']) {
      await page.goto(path);
      await expect(page.locator('body')).toBeVisible();
      await expect(page.locator('body')).not.toContainText(/OPENAPI_API_KEY|STRIPE_SECRET_KEY|rawPayload/i);
    }
  });

  test('azioni admin sensibili richiedono reason nel copy/interfaccia', async ({ page }) => {
    await page.goto('/admin/operations');
    await expect(page.locator('body')).toContainText(/reason|motivo|audit|azione/i);
  });
});
