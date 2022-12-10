const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Axe accessibility test - general test', () => {
    test('The page should not have any automatically-detectable accessibility issues', async ({ page }) => {
        await page.goto('/');
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });
});