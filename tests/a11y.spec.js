const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

/**
 * 
 * CAVEAT!
 * This test is extremely general. Do not use this as a template for
 * Axe testing. This is just a very quick test to give a bit of
 * belt-and-braces QA to the tutorial.
 * 
 */

test.describe('Axe accessibility test - general test', () => {
    test('The page should not have any automatically-detectable accessibility issues', async ({ page }) => {
        await page.goto('/');
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });
});