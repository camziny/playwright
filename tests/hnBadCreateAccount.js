// launch browser and go to Hacker News
const { context } = await launch();
const page = await context.newPage();
await page.goto("https://news.ycombinator.com/");

// navigate to log in / create account page
await page.locator(`[href="login?goto=news"]`).click();

// fill in invalid username and password and click create account
await page
  .locator(`form:nth-of-type(2) [type="text"]`)
  .fill(`cameronziny@gmail.co`);
await page
  .locator(`form:nth-of-type(2) [type="password"]`)
  .fill(`testpassword`);
await page.locator(`[value="create account"]`).click();

// click reload button on error page
await page.waitForTimeout(1000);
await page.locator(`:text("reload")`).click();

// assert that the account cannot be created with an invalid username
await expect(page.locator(`body`)).toContainText(
  "Email addresses are not valid usernames. Usernames can only contain letters, digits, dashes and underscores, and should be between 2 and 15 characters long. Please choose another."
);
