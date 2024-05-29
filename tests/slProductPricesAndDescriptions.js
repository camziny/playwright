// launch browser and go to Swag Labs
const { context } = await launch();
const page = await context.newPage();
await page.goto("https://www.saucedemo.com/");

// log in with valid credentials
await page.getByRole("textbox", { name: "Username" }).fill("standard_user");
await page.getByRole("textbox", { name: "Password" }).fill("secret_sauce");
await page.getByRole("button", { name: "Login" }).click();

// assert that each item has the correct price and description
// Sauce Labs Backpack
await page.getByText("Sauce Labs Backpack", { exact: true }).click();
await expect(page.locator(`[data-test="inventory-item-desc"]`)).toHaveText(
  `carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.`
);
await expect(page.locator(`[data-test="inventory-item-price"]`)).toHaveText(
  "$29.99"
);
await page.getByRole("button", { name: "Go back Back to products" }).click();

// Sauce Labs Bike Light
await page.getByText("Sauce Labs Bike Light", { exact: true }).click();
await expect(page.locator(`[data-test="inventory-item-desc"]`)).toHaveText(
  `A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.`
);
await expect(page.locator(`[data-test="inventory-item-price"]`)).toHaveText(
  "$9.99"
);
await page.getByRole("button", { name: "Go back Back to products" }).click();

// Sauce Labs Bolt T-Shirt
await page.getByText("Sauce Labs Bolt T-Shirt", { exact: true }).click();
await expect(page.locator(`[data-test="inventory-item-desc"]`)).toHaveText(
  `Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.`
);
await expect(page.locator(`[data-test="inventory-item-price"]`)).toHaveText(
  "$15.99"
);
await page.getByRole("button", { name: "Go back Back to products" }).click();

// Sauce Labs Fleece Jacket
await page.getByText("Sauce Labs Fleece Jacket", { exact: true }).click();
await expect(page.locator(`[data-test="inventory-item-desc"]`)).toHaveText(
  `It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.`
);
await expect(page.locator(`[data-test="inventory-item-price"]`)).toHaveText(
  "$49.99"
);
await page.getByRole("button", { name: "Go back Back to products" }).click();

// Sauce Labs Onesie
await page.getByText("Sauce Labs Onesie", { exact: true }).click();
await expect(page.locator(`[data-test="inventory-item-desc"]`)).toHaveText(
  `Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.`
);
await expect(page.locator(`[data-test="inventory-item-price"]`)).toHaveText(
  "$7.99"
);
await page.getByRole("button", { name: "Go back Back to products" }).click();

// Test.allTheThings() T-Shirt (Red)
await page
  .getByText("Test.allTheThings() T-Shirt (Red)", { exact: true })
  .click();
await expect(page.locator(`[data-test="inventory-item-desc"]`)).toHaveText(
  `This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.`
);
await expect(page.locator(`[data-test="inventory-item-price"]`)).toHaveText(
  "$15.99"
);
await page.getByRole("button", { name: "Go back Back to products" }).click();
