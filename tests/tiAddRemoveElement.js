const { test, expect } = require("@playwright/test");

test("Add/Remove Element Test", async ({ page }) => {
  // Go to the-internet page
  await page.goto("https://the-internet.herokuapp.com/");

  // Navigate to Checkboxes
  await page.getByRole("link", { name: "Checkboxes" }).click();

  // Verify that the second checkbox is checked and the first one is not
  const checkboxOne = page.locator(`input[type="checkbox"]`).nth(0);
  const checkboxTwo = page.locator(`input[type="checkbox"]`).nth(1);
  await expect(checkboxTwo).toBeChecked();
  await expect(checkboxOne).not.toBeChecked();

  // Click checkbox 1 and checkbox 2
  await checkboxOne.click();
  await checkboxTwo.click();

  // Assert that checkbox 1 is checked and checkbox 2 is not
  await expect(checkboxOne).toBeChecked();
  await expect(checkboxTwo).not.toBeChecked();
});
