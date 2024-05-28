// launch browser and go to Hacker News
const { context } = await launch();
const page = await context.newPage();
await page.goto("https://news.ycombinator.com/");

// check that there are 30 articles displayed on the home page and the first one is labeled as number 1
const firstArticle = await page.locator("span.rank").first().textContent();
expect(firstArticle).toBe("1.");
await expect(page.locator(`span.rank`)).toHaveCount(30);
await expect(page.locator("span.rank").first()).toContainText(
  `${firstArticle}`
);

// click on the "more" button to render 30 more articles
await page.locator(`:text("More")`).click();
const thirtyFirstArticle = await page
  .locator("span.rank")
  .first()
  .textContent();
expect(thirtyFirstArticle).toBe("31.");

// assert that the page shows 30 more articles and the article on top is labeled as number 31
await expect(page.locator(`span.rank`)).toHaveCount(30);
await expect(page.locator("span.rank").first()).toContainText(
  `${thirtyFirstArticle}`
);
