// Launch browser and go to Hacker News
const { context } = await launch();
const page = await context.newPage();
await page.goto("https://news.ycombinator.com/");

// navigate to login page
await page.locator(`:text("login")`).click();

// fill in username and password with random input
await page.locator(`[autofocus="true"]`).fill(`randomUsername`);

// click login button
await page.locator(`[value="login"]`).click();

// assert that the user cannot login
