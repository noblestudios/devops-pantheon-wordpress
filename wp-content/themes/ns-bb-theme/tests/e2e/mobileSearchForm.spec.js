// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect } from "@playwright/test"

test.use({
  viewport: { width: 375, height: 700 }
})

test("Mobile Search Form", async ({ page }) => {
  await page.goto("/")

  // open search modal
  await page.getByTestId("open-mobile-nav-button").click()

  // search modal is open
  await expect(page.getByTestId("mobile-search-field")).toBeVisible()
  await page.getByTestId("mobile-search-field").click()
  await page.getByTestId("mobile-search-field").fill("post")
  await page.getByTestId("mobile-search-submit").click()

  // wait until new page is loaded and url contains the query
  await page.waitForLoadState("networkidle")
  expect(page.url()).toContain("?s=post")
})
