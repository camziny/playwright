// launch browser and go to the-internet
const { context } = await launch();
const page = await context.newPage();
await page.goto("https://the-internet.herokuapp.com/");

// navigate to Add/Remove Elements
await page.getByRole("link", { name: "Add/Remove Elements" }).click();

// declare a variable to hold the value of an element
const element = page.getByRole("button", { name: "Delete" });

// check that there are no elements added yet
await expect(element).toHaveCount(0);

// add an element and confirm it was added successfully
await page.getByRole("button", { name: "Add Element" }).click();
await expect(element).toHaveCount(1);

// remove the element
await page.getByRole("button", { name: "Delete" }).click();

// assert that the element was removed successfully
await expect(element).toHaveCount(0);
