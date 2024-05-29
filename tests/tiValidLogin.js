// launch browser and to to the-internet
const { context } = await launch();
const page = await context.newPage();
// navigate to the-internet with username and password passed in to auth headers
const username = "admin";
const password = "admin";
const authHeader = "Basic " + btoa(username + ":" + password);
await page.setExtraHTTPHeaders({ Authorization: authHeader });
await page.goto("https://the-internet.herokuapp.com/basic_auth");

// assert that the user was successfully logged in
await expect(
  page.getByText("Congratulations! You must have the proper credentials.")
).toBeVisible();
