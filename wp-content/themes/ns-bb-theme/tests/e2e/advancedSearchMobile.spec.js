// eslint-disable-next-line import/no-extraneous-dependencies
import {test, expect} from "@playwright/test"

test.use({
  viewport: {width: 375, height: 700}
});

const rest_endpoint = "/wp-json/ns/v1/adv-search"

test("Mobile Advanced Search Results are Visible", async ({page}) => {
  await page.goto("/?s=post")
  await expect(page.getByTestId("adv-search-results")).toBeVisible()
});

test("Mobile Advanced Search Pagination", async ({page}) => {

  await page.goto("/?s=post")

  await test.step("Next Page", async () => {
    await page.waitForLoadState("networkidle")

    await Promise.all([
      page.getByTestId("next-page").click(),
      page.waitForResponse(response => {
        return response.url().includes(rest_endpoint) && response.status() === 200;
      })
    ]);

    await expect(page.getByTestId("adv-search-results")).toBeVisible()
    await expect(page.url()).toContain("?s=post&page_num=2")
  });

  await test.step("Previous Page", async () => {
    await page.waitForLoadState("networkidle")
    await page.getByTestId("previous-page").click()
    await page.waitForResponse(response => {
      return response.url().includes(rest_endpoint) && response.status() === 200;
    });

    await expect(page.getByTestId("adv-search-results")).toBeVisible()
    await expect(page.url()).toContain("?s=post&page_num=1")
  });
});

test("Mobile Advanced Search Toggle Filter Drawer", async ({page}) => {
  await page.goto("/?s=post")
  await page.waitForLoadState("networkidle")
  await page.getByTestId("mobile-open-filters").click()
  await expect(page.getByTestId("search-filters")).toBeVisible()

  await page.getByTestId("mobile-filter-close").click()
  await expect(page.getByTestId("search-filters")).not.toBeVisible()
});

test("Mobile Advanced Search Filters", async ({page}) => {
  await page.goto("/?s=post")

  await page.waitForLoadState("networkidle")

  await page.getByTestId("mobile-open-filters").click()
  await expect(page.getByTestId("search-filters")).toBeVisible()

  await page.getByTestId("search-filters").locator('input[type="checkbox"][value="post"]').click()
  await page.waitForResponse(response => {
    return response.url().includes(rest_endpoint) && response.status() === 200;
  });

  await expect(page.url()).toContain("?s=post&page_num=1&type=post")
  await page.waitForLoadState("networkidle")

  await page.getByTestId("mobile-filter-close").click()
  await page.getByTestId("mobile-clear-filters").click()
  await page.waitForResponse(response => {
    return response.url().includes(rest_endpoint) && response.status() === 200;
  });

  await expect(page.url()).toContain("?s=post&page_num=1")

});
