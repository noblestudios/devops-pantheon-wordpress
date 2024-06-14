// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect } from "@playwright/test"

/*
This is a Search Modal test that tests the following:
- Modal opens
- Search field focused on open
- Close button
- Search entry and submit
*/

test("Search Modal", async ({ page }) => {
  await page.goto("/")

  // open search modal
  await page.getByTestId("button-open-search").click()

  // search modal is open
  await expect(page.getByTestId("search-modal")).toBeVisible()

  // check if search field has focus
  await expect(page.getByTestId("search-field")).toBeFocused()

  // close search modal
  await page.getByTestId("button-close-search").click()

  // search modal is closed
  await expect(page.getByTestId("search-modal")).not.toBeVisible()

  // open search modal again and test search
  await page.getByTestId("button-open-search").click()
  await page.getByTestId("search-field").click()
  await page.getByTestId("search-field").fill("post")
  await page.getByTestId("search-modal-submit").click()

  // wait until new page is loaded and url contains the query
  await page.waitForLoadState("networkidle")
  expect(page.url()).toContain("?s=post")
})
