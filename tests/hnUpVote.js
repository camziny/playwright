// launch browser and go to Hacker News
const { context } = await launch();
const page = await context.newPage();
await page.goto("https://news.ycombinator.com/");

// click on up vote
await page.locator(`#up_40501021`).click();

// assert that the user is cannot vote unless logged in
await expect(page.locator(`body`)).toContainText(
  "You have to be logged in to vote."
);
