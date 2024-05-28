// launch browser and go to Swag Labs
const { context } = await launch();
const page = await context.newPage();
await page.goto("https://www.saucedemo.com/");

// fill in username and password with valid credentials and click log in
await page.getByRole("textbox", { name: "Username" }).fill("standard_user");
await page.getByRole("textbox", { name: "Password" }).fill("secret_sauce");
await page.getByRole("button", { name: "Login" }).click();

// open menu and click log out button
await page.getByRole("button", { name: "Open Menu" }).click();
await page.getByRole("link", { name: "Logout" }).click();

// assert that the user was successfully logged out
await expect(page.getByRole("textbox", { name: "Username" })).toBeVisible();
await expect(page.getByRole("textbox", { name: "Password" })).toBeVisible();
await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
