import { test, expect } from '@playwright/test';

test.describe('M13-S customer dashboard smoke', () => {
  test('dashboard, verifiche, fatture, account e team sono raggiungibili', async ({ page }) => {
    for (const path of ['/dashboard', '/dashboard/verifiche', '/dashboard/fatture', '/dashboard/account', '/dashboard/team']) {
      await page.goto(path);
      await expect(page.locator('body')).toBeVisible();
      await expect(page.locator('body')).not.toContainText(/rawPayload|secret|tokenHash/i);
    }
  });
});
