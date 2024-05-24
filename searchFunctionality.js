const { chromium } = require("playwright");
const { createObjectCsvWriter } = require("csv-writer");

async function checkSearchFunctionality() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  let testResult = "Failed";
  try {
    await page.goto("https://playwright.dev/");
    const searchBox = page.locator('input[placeholder="Search"]');
    await searchBox.waitFor({ state: "visible" });

    // Check if search box is visible
    if (await searchBox.isVisible()) {
      console.log("Search box is visible");
      // FIll the search box with a term
      await searchBox.fill("Selectors");
      // Simulate pressing Enter to submit the search
      await searchBox.press("Enter");

      // Wait for search results to appear and check if they contain the term "Selectors"
      const searchResults = await page.locator('article:has-text("Selectors")');
      if (await searchResults.isVisible()) {
        console.log("Search results are visible and contain 'Selectors' .");
        testResult = "Passed";
      } else {
        console.log("Search results do not container 'Selectors' .");
      }
    } else {
      console.log("Search box is not visible.");
    }
  } catch (error) {
    console.error("Error during test execution", error);
    testResult = "Error";
  } finally {
    await page.close();
    await browser.close();

    const csvWriter = createObjectCsvWriter({
      path: "./testResults/check-search-functionality.csv",
      header: [
        { id: "testName", title: "TEST NAME" },
        { id: "result", title: "RESULT" },
        { id: "timestamp", title: "TIMESTAMP" },
      ],
      append: true,
    });

    await csvWriter.writeRecords({
      testName: "Check search functionality",
      result: testResult,
      timestamp: new Date().toISOString(),
    });
    console.log("Test result has been written to CSV");
  }
}

(async () => {
  await checkSearchFunctionality();
})();
