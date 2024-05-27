// launch browser and go to hacker news
const { context } = await launch();
const page = await context.newPage();
await page.goto("https://news.ycombinator.com/");

// navigate to login page
await page.locator(`[href="login?goto=news"]`).click();

// fill in invalid username and password and click login
await page
  .locator('form:has-text("login") input[name="acct"]')
  .fill(`test@gmail.co`);
await page
  .locator('form:has-text("login") input[type="password"]')
  .fill("12345");
await page.locator(`[value="login"]`).click();

// click reload button on error page
await page.waitForTimeout(1000);
await page.locator('a:has-text("reload")').click();

// assert that the user cannot log in
await expect(page.locator("body")).toContainText("Bad login.");
