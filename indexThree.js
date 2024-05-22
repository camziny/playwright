const { chromium } = require("playwright");
const { createObjectCsvWriter } = require("csv-writer");

async function performStressTest() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const csvWriter = createObjectCsvWriter({
    path: "stress_tests_results.csv",
    header: [
      { id: "test", title: "Test" },
      { id: "result", title: "Result" },
      { id: "details", title: "Details" },
    ],
  });

  // Open multiple pages in parallel to simulate stress
  const pages = await Promise.all([
    context.newPage(),
    context.newPage(),
    context.newPage(),
  ]);

  const urls = [
    "https://news.ycombinator.com/newest",
    "https://news.ycombinator.com/ask",
    "https://news.ycombinator.com/show",
  ];

  // Load different sections in each page to simulate user behavior under load
  await Promise.all(pages.map((page, index) => page.goto(urls[index])));
  await csvWriter.writeRecords(
    urls.map((url, index) => ({
      test: "Load Page",
      result: "Loaded",
      details: url,
    }))
  );
  console.log("Pages loaded under stress:");

  // Simulate continuous navigation on one of the pages
  const testPage = await context.newPage();
  for (const url of urls) {
    await testPage.goto(url);
    await csvWriter.writeRecords([
      {
        test: "Continuous Navigation",
        result: "Navigated",
        details: url,
      },
    ]);
    console.log(`Navigated to ${url}`);
  }

  // Close all pages and the browser
  await Promise.all(pages.map((page) => page.close()));
  await testPage.close();
  await browser.close();
}

(async () => {
  await performStressTest();
})();
