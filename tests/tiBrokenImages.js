// launch browser and to go the-internet
const { context } = await launch();
const page = await context.newPage();
await page.goto("https://the-internet.herokuapp.com/");

// navigate to Broken Images
await page.getByRole("link", { name: "Broken Images" }).click();

// declare variable to hold image elements
const images = page.locator("img");

for (const image of images) {
  const brokenImages = [];
  const response = await fetch(image.src, { method: "HEAD" }).catch(() => null);
  if (!response || response.status != 200) {
    brokenImages.push(image);
  }
  return brokenImages;
}

// assert that two of the images are broken
