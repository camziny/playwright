// launch browser and go to Swag Labs
const { context } = await launch();
const page = await context.newPage();
await page.goto("https://www.saucedemo.com/");

// fill in username and password with valid credentials
await page.getByRole("textbox", { name: "Username" }).fill("standard_user");
await page.getByRole("textbox", { name: "Password" }).fill("secret_sauce");

// click log in button
await page.getByRole("button", { name: "Login" }).click();

// assert that the user was able to successfully log in
await page.getByRole("button", { name: "Open Menu" }).click();
await expect(page.getByRole("link", { name: "Logout" })).toBeVisible();
