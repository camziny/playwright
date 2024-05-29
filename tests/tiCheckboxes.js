// launch browser and go to the-internet
const { context } = await launch();
const page = await context.newPage();
await page.goto("https://the-internet.herokuapp.com/");

// navigate to Checkboxes
await page.getByRole("link", { name: "Checkboxes" }).click();

// verify that the checkbox 2 is checked and checkbox 1 is not
const checkboxOne = page.locator(`input[type="checkbox"]`).nth(0);
const checkboxTwo = page.locator(`input[type="checkbox"]`).nth(1);
await expect(checkboxTwo).toBeChecked();
await expect(checkboxOne).not.toBeChecked();

// click checkbox 1 and checkbox 2
await checkboxOne.click();
await checkboxTwo.click();

// assert that checkbox 1 is checked and checkbox 2 is not
await expect(checkboxOne).toBeChecked();
await expect(checkboxTwo).not.toBeChecked();
