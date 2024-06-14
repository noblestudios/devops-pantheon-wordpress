// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect } from "@playwright/test"

/*
This is a desktop search test that tests focus trap in the search modal
*/

test("Search Modal Focus Trap", async ({ page }) => {
  await page.goto("/")

  // open search modal
  await page.getByTestId("button-open-search").click()

  // search modal is open
  await expect(page.getByTestId("search-modal")).toBeVisible()

  // check if search field has focus
  await expect(page.getByTestId("search-field")).toBeFocused()

  // press tab key up to 40 times
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press("Tab")

    // get focused element dataset to check if we have returned to the search field
    const focusedDataset = await page.locator(":focus").getAttribute("data-testid")

    // And if it it, exit the loop
    if (focusedDataset === "search-field") i = 40

    // at this point it's safe to say this isn't working
    if (i === 39) throw new Error("Search modal does not appear to have focus trap")
  }
})
