// launch browser and go to mdn
const { context } = await launch();
const page = await context.newPage();
await page.goto("https://developer.mozilla.org/en-US/");

const searchTerm = "fdsDfdg4g2";

// search for a term that will yield 0 results
await page.locator(`#top-nav-search-input`).fill(`${searchTerm}`);
await page.locator(`#top-nav-search-form [type="submit"]`).click();

// verify that the correct search was performed
await expect(
  page.locator(`:text("Search results for: fdsDfdg4g2")`)
).toHaveText(`Search results for: ${searchTerm}`);

// assert that 0 matches were found using a regular expression
await page.waitForSelector('p:has-text("Found 0 matches in")');
const searchResultsText = await page.innerText(
  'p:has-text("Found 0 matches in")'
);
const regex = /Found 0 matches in \d+ milliseconds\./;
expect(searchResultsText).toMatch(regex);
