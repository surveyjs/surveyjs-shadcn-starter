import { expect, test } from "@playwright/test"

test("form renders, pages, re-themes and takes an edited definition", async ({
  page,
}) => {
  await page.goto("/")

  // Cart: the demo data fills the matrix, and the row expressions price it.
  await expect(page.getByText("Items").first()).toBeVisible()
  await page.getByRole("button", { name: "Prefill demo data" }).click()
  await expect(page.getByText("$120.00").first()).toBeVisible()
  await page.getByRole("button", { name: "Next" }).click()

  const email = page.getByRole("textbox", { name: "Email address" })
  await expect(email).toBeVisible()
  await email.fill("jane@example.com")
  await page.getByRole("button", { name: "Next" }).click()
  await expect(page.getByText("Shipping address").first()).toBeVisible()

  const input = page.getByRole("textbox", { name: "Full name" }).first()
  const color = () => input.evaluate((el) => getComputedStyle(el).color)
  const before = await color()
  await page.getByRole("button", { name: "Toggle theme" }).click()
  await page.getByRole("menuitem", { name: "Dark" }).click()
  await expect(page.locator("html")).toHaveClass(/\bdark\b/)
  await expect.poll(color).not.toBe(before)

  await page.getByRole("button", { name: "Edit JSON" }).click()
  const json = page.getByLabel("Survey JSON")
  const text = await json.inputValue()
  await json.fill(text.replace('"title": "Checkout"', '"title": "Order form"'))
  await page.getByRole("button", { name: "Apply" }).click()
  await expect(page.getByText("Order form").first()).toBeVisible()
})
