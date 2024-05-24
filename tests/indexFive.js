const { chromium } = require("playwright");
const { createObjectCsvWriter } = require("csv-writer");

async function checkPageTitle() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  let testResult = "Failed";
  try {
    await page.goto("https://playwright.dev/");
    const title = await page.title();

    if (/playwright/i.test(title)) {
      console.log("Test passed: Title is correct");
      testResult = "Passed";
    } else {
      console.log(
        `Test failed: Expected title to be 'Playwright', but got ${title}`
      );
      testResult = "Failed";
    }
  } catch (error) {
    console.error("Error during test execution", error);
    testResult = "Error";
  } finally {
    await page.close();
    await browser.close();

    const csvWriter = createObjectCsvWriter({
      path: "./testResults/check-page-title.csv",
      header: [
        { id: "testName", title: "TEST NAME" },
        { id: "result", title: "RESULT" },
        { id: "timestamp", title: "TIMESTAMP" },
      ],
      append: true,
    });

    await csvWriter.writeRecords([
      {
        testName: "Check page title",
        result: testResult,
        timestamp: new Date().toISOString(),
      },
    ]);
  }
}

(async () => {
  await checkPageTitle();
})();
