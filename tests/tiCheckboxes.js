// launch browser and go to the-internet
const { context } = await launch();
const page = await context.newPage();
await page.goto("https://the-internet.herokuapp.com/");

// navigate to Checkboxes
await page.getByRole("link", { name: "Checkboxes" }).click();

// verify that the second checkbox is checked
const checkboxTwo = page.locator(`input[type="checkbox"]`).nth(1);
await expect(checkboxTwo).toBeChecked();

// click checkbox 1
const checkboxOne = page.locator(`input[type="checkbox"]`).nth(0);
await checkboxOne.click();

// assert that checkbox 1 is checked
await expect(checkboxOne).toBeChecked();
