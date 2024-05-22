const { chromium } = require("playwright");
const { createObjectCsvWriter } = require("csv-writer");

async function testSearchFunctionality(page, csvWriter) {
  try {
    await page.goto("https://news.ycombinator.com");
    // Fill the search query
    await page.fill('input[name="q"]', "JavaScript");
    // Press enter to submit the form
    await page.press('input[name="q"]', "Enter");

    // Wait for the page to navigate to the search results
    await page.waitForSelector(".SearchResults");

    const url = page.url();
    // Check if search results are visible
    const resultsExist = await page.isVisible(".SearchResults");
    await csvWriter.writeRecords([
      {
        test: "Search Functionality",
        query: "JavaScript",
        results: resultsExist ? "Visible" : "Not visible",
        url: url,
        result: resultsExist ? "Passed" : "Failed",
      },
    ]);
  } catch (error) {
    console.error("Failed search functionality test:", error);
    await csvWriter.writeRecords([
      {
        test: "Search Functionality",
        query: "JavaScript",
        results: error.message,
        url: page.url(),
        result: "Error",
      },
    ]);
  }
}

async function runTests() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const csvWriter = createObjectCsvWriter({
    path: "link_validation_tests_results.csv",
    header: [
      { id: "test", title: "Test" },
      { id: "query", title: "Query" },
      { id: "results", title: "Results" },
      { id: "url", title: "URL" },
      { id: "result", title: "Result" },
    ],
  });

  await testSearchFunctionality(page, csvWriter);

  await browser.close();
  console.log("All tests completed and results have been written to CSV.");
}

runTests();
