const { test, expect } = require('@playwright/test');

// Selectors
const theDefaultButton = '#defaultbutton';
const theDefaultButtonCounter = '#defaultbuttoncounter';
const theButton = '#countbutton';
const theButtonCounter = '#buttoncounter';
const theDiv = '#countdiv';
const theDivItem = '#divitem';
const theDivCounter = '#divcounter';
const theCheckbox = '#enablecontrols';


test.describe("DIV tests", () => {
  test.beforeEach(async ({ page }) => {
    // Note the localhost is defined in test config
    await page.goto("/");
  });

  test('Does the DIV accept click events and increment the counter?', async ({ page }) => {
    await expect(page.locator(theDivCounter)).toHaveText("0")
    await page.locator(theDiv).click()
    await expect(page.locator(theDivCounter)).toHaveText("1")
    await page.locator(theDiv).click()
    await expect(page.locator(theDivCounter)).toHaveText("2")
  });

  test('Does the DIV increment by hitting enter with keyboard focus?', async ({ page }) => {
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.locator(theDiv)).toBeFocused();

    await expect(page.locator(theDivCounter)).toHaveText("0")
    await page.keyboard.press('Enter');
    await expect(page.locator(theDivCounter)).toHaveText("1")
  });

  test('Does the DIV increment by hitting spacebar with keyboard focus?', async ({ page }) => {
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.locator(theDiv)).toBeFocused();

    await expect(page.locator(theDivCounter)).toHaveText("0")
    await page.keyboard.press(' '); // Spacebar
    await expect(page.locator(theDivCounter)).toHaveText("1")
  });

  test('Does the DIV *not* increment by hitting keys other than spacebar or enter?', async ({ page }) => {
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.locator(theDiv)).toBeFocused();

    await expect(page.locator(theDivCounter)).toHaveText("0")
    await page.keyboard.press('a');
    await page.keyboard.press('b');
    await page.keyboard.press('c');
    await expect(page.locator(theDivCounter)).toHaveText("0")
  });

  test('Is it possible to reach the DIV using the keyboard?', async ({ page }) => {
    await expect(page.locator(theDiv)).toHaveAttribute('tabindex', '0');
  });

  test('Can you move past the DIV in both directions, using tab and shift+tab?', async ({ page }) => {
    /**
     * You should be able to move through the page using TAB to move forwards/down; and SHIFT+TAB to move backwards/up.
     * This test tabs down to the checkbox then back up to the button using shift+tab.
     */
    await page.keyboard.press('Tab');
    await expect(page.locator(theDefaultButton)).toBeFocused();
    await expect(page.locator(theButton)).not.toBeFocused();
    await expect(page.locator(theDiv)).not.toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator(theButton)).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator(theDiv)).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator(theCheckbox)).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(page.locator(theDiv)).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(page.locator(theButton)).toBeFocused();
  });

  test('Has the DIV been set to the role of button?', async ({ page }) => {
    await expect(page.locator(theDiv)).toHaveAttribute('role', 'button');
  });

  test('Does the DIV expose its disabled state to assistive technology?', async ({ page }) => {
    const cb = page.locator(theCheckbox);
    await expect(page.locator(theDiv)).toHaveAttribute('aria-disabled', 'false');
    cb.uncheck() // Disable controls
    await expect(page.locator(theDiv)).toHaveAttribute('aria-disabled', 'true');
    cb.check() // Re-enable controls
    await expect(page.locator(theDiv)).toHaveAttribute('aria-disabled', 'false');
  });

  test('When disabled, the DIV should not increment the counter if clicked', async ({ page }) => {
    const cb = page.locator(theCheckbox);
    await expect(page.locator(theDivCounter)).toHaveText("0")

    // Disable controls
    cb.uncheck()
    await expect(cb).not.toBeChecked();

    // Force click the control and it should not increment
    await page.locator(theDiv).click({ force: true })
    await expect(page.locator(theDivCounter)).toHaveText("0")
    await page.locator(theDiv).click({ force: true })
    await expect(page.locator(theDivCounter)).toHaveText("0")

    // Enable controls
    cb.check()
    await expect(cb).toBeChecked();

    // Force click the control and it should now increment
    await page.locator(theDiv).click({ force: true })
    await expect(page.locator(theDivCounter)).toHaveText("1")
    await page.locator(theDiv).click({ force: true })
    await expect(page.locator(theDivCounter)).toHaveText("2")

  });

  test('Disabled DIV should not be focusable', async ({ page }) => {
    const cb = page.locator(theCheckbox);
    let tabbable;

    cb.uncheck() // Disable controls
    await expect(page.locator(theDiv)).toHaveAttribute('aria-disabled', 'true');
    tabbable = await page.locator(theDiv).getAttribute('tabindex');
    expect(tabbable).toBeNull()

    cb.check() // Re-enable controls
    await expect(page.locator(theDiv)).toHaveAttribute('aria-disabled', 'false');
    await expect(page.locator(theDiv)).toHaveAttribute('tabindex', '0');

  });


  test("Does the DIV's layout work the same as a button's layout?", async ({ page }) => {
    await expect(page.locator(theDiv)).toHaveCSS('display', 'inline-block');
    // playwright test if an html's width is less than 100% of its parent's width
    // const divWidth = await page.locator(theDiv).getProperty('offsetWidth');
    // const itemWidth = await page.locator(theDivItem).getProperty('offsetWidth');


    // const divWidth = await page.evaluate(() => document.getElementById("countdiv").offsetWidth);
    // const itemWidth = await page.evaluate(() => document.getElementById("divitem").offsetWidth);
    // await expect(divWidth < itemWidth).toBeTruthy();
  });

  test('Does the DIV get the correct cursor when you hover over it?', async ({ page }) => {
    await expect(page.locator(theDiv)).toHaveCSS('cursor', 'default');
  });

  test('Does the DIV prevent text selection?', async ({ page }) => {
    await expect(page.locator(theDiv)).toHaveCSS('user-select', 'none');
  });


});
