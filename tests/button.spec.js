const { test, expect } = require('@playwright/test');

// Selectors
const theDefaultButton = '#defaultbutton';
const theDefaultButtonCounter = '#defaultbuttoncounter';
const theButton = '#countbutton';
const theButtonCounter = '#buttoncounter';
const theDiv = '#countdiv';
const theDivCounter = '#divcounter';
const theCheckbox = '#enablecontrols';

test.describe("Button vs Div tutorial tests - if these fail it means the actual tutorial is broken", () => {
  test.beforeEach(async ({ page }) => {
    // Note the localhost is defined in test config
    await page.goto("/");
  });

  test('Smoke test to ensure the test page is actually running and has the fixtures', async ({ page }) => {
    await expect(page).toHaveTitle("The Amazing Clickatron");
    await expect(page.locator(theButton)).toHaveCount(1)
    await expect(page.locator(theDiv)).toHaveCount(1)
    await expect(page.locator(theCheckbox)).toHaveCount(1)
  });

  test('Does the standard button accept click events and increment the counter?', async ({ page }) => {
    await expect(page.locator(theDefaultButtonCounter)).toHaveText("0")
    await page.locator(theDefaultButton).click()
    await expect(page.locator(theDefaultButtonCounter)).toHaveText("1")
    await page.locator(theDefaultButton).click()
    await expect(page.locator(theDefaultButtonCounter)).toHaveText("2")
  });

  test('Does the styled button accept click events and increment the counter?', async ({ page }) => {
    await expect(page.locator(theButtonCounter)).toHaveText("0")
    await page.locator(theButton).click()
    await expect(page.locator(theButtonCounter)).toHaveText("1")
    await page.locator(theButton).click()
    await expect(page.locator(theButtonCounter)).toHaveText("2")
  });

  test('Does the disable controls checkbox work', async ({ page }) => {
    const cb = page.locator(theCheckbox);

    // Initial state check
    await expect(cb).toBeChecked();
    await expect(page.locator(theButtonCounter)).toHaveText("0")

    // Disable controls
    cb.uncheck()
    await expect(cb).not.toBeChecked();

    // Force click required because the checkbox is disabled
    await page.locator(theButton).click({ force: true })
    // Forced click should have had no effect
    await expect(page.locator(theButtonCounter)).toHaveText("0")

    // Re-enable controls
    cb.check()
    await expect(cb).toBeChecked();

    await page.locator(theButton).click({ force: true })
    await expect(page.locator(theButtonCounter)).toHaveText("1")
    await page.locator(theButton).click({ force: true })
    await expect(page.locator(theButtonCounter)).toHaveText("2")
  });

});

