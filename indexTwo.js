const { chromium } = require("playwright");
const { createObjectCsvWriter } = require("csv-writer");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const csvWriter = createObjectCsvWriter({
    path: "navigation_and_search_tests_results.csv",
    header: [
      { id: "test", title: "Test" },
      { id: "result", title: "Result" },
      { id: "details", title: "Details" },
    ],
  });

  // Navigate and validate
  await page.goto("https://news.ycombinator.com/newest");
  await csvWriter.writeRecords([
    {
      test: "Navigate to Newest",
      result: "Completed",
      details: await page.title(),
    },
  ]);
  console.log("Navigated to Newest:", await page.title());

  // Search functionality
  await page.fill('input[name="q"]', "Playwright");
  await page.press('input[name="q"]', "Enter");
  await csvWriter.writeRecords([
    {
      test: "Search Functionality",
      result: "Completed",
      details: "Search completed for Playwright",
    },
  ]);
  console.log("Search completed for Playwright");

  // Close browser
  await browser.close();
})();
