// launch browser and go to Swag Labs
const { context } = await launch();
const page = await context.newPage();
await page.goto("https://www.saucedemo.com/");

// fill in username and password with invalid credentials
await page.getByRole("textbox", { name: "Username" }).fill("stand_user");
await page.getByRole("textbox", { name: "Password" }).fill("wrongPassword");

// click login
await page.getByRole("button", { name: "Login" }).click();

// assert that the user cannot log in with invalid credentials
await expect(
  page.getByRole("heading", {
    name: "Epic sadface: Username and password do not match any user in this service",
  })
).toHaveText(
  "Epic sadface: Username and password do not match any user in this service"
);
