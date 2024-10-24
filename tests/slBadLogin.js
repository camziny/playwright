import { test, expect } from "@playwright/test";

test("Add/Remove Element Test", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/");
  await page.getByRole("link", { name: "Checkboxes" }).click();

  const checkboxOne = page.locator(`input[type="checkbox"]`).nth(0);
  const checkboxTwo = page.locator(`input[type="checkbox"]`).nth(1);
  await expect(checkboxTwo).toBeChecked();
  await expect(checkboxOne).not.toBeChecked();

  await checkboxOne.click();
  await checkboxTwo.click();

  await expect(checkboxOne).toBeChecked();
  await expect(checkboxTwo).not.toBeChecked();
});
