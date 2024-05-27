// launch browser and go to Hacker News
const { context } = await launch();
const page = await context.newPage();
await page.goto("https://news.ycombinator.com/");

const searchTerm = "test";

// fill in search bar and perform search
await page.locator(`[type="text"]`).fill(`${searchTerm}`);
await page.keyboard.press("Enter");

// assert that the search was performed
await expect(page.locator(`p`)).toContainText("results");
await expect(page.locator(`body`)).toContainText(`${searchTerm}`);
