// launch browser and go to Hacker News
const { context } = await launch();
const page = await context.newPage();
await page.goto("https://news.ycombinator.com/");

// click on the submit button
await page.getByRole("link", { name: "submit" }).click();

// assert that the user must be logged in to submit
await expect(page.locator(`body`)).toContainText(
  "You have to be logged in to submit"
);
