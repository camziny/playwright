const { chromium } = require("playwright");
const { createObjectCsvWriter } = require("csv-writer");

async function saveHackerNewsArticles() {
  try {
    // Launch a headless browser and open a new page.
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the Hacker News website to fetch the latest articles.
    await page.goto("https://news.ycombinator.com");

    const articles = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".athing"))
        .slice(0, 10)
        .map((el) => {
          const linkElement = el.querySelector("td.title > span.titleline > a");
          if (!linkElement)
            return { title: "No title found", url: "No URL found" };
          const title = linkElement.innerText;
          const url = linkElement.href;
          return { title, url };
        })
        .filter((article) => article.title !== "No title found");
    });

    // Close the browser to free up system resources.
    await browser.close();

    const csvWriter = createObjectCsvWriter({
      path: "top-10-hacker-news-articles.csv",
      header: [
        { id: "title", title: "TITLE" },
        { id: "url", title: "URL" },
      ],
    });

    // Write the scraped data to a CSV file only if one or more articles were found.
    if (articles.length > 0) {
      await csvWriter.writeRecords(articles);
      console.log("CSV file has been written successfully.");
    } else {
      console.log("No articles found to write to CSV.");
    }
  } catch (error) {
    // Catch and log any errors related to scraping, navigation, or writing to the CSV.
    console.error("Failed to scrape and save articles:", error);
  }
}
// Execute the scraping function.
(async () => {
  await saveHackerNewsArticles();
})();
