// launch browser and go to Swag Labs
const { context } = await launch();
const page = await context.newPage();
await page.goto("https://www.saucedemo.com/");

// log in with valid credentials
await page.getByRole("textbox", { name: "Username" }).fill("standard_user");
await page.getByRole("textbox", { name: "Password" }).fill("secret_sauce");
await page.getByRole("button", { name: "Login" }).click();

// assert that there are 6 products
const product = page.locator(`[data-test="inventory-item"]`);
await expect(product).toHaveCount(6);
