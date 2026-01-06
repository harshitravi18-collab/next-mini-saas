import { test, expect } from "@playwright/test";

test("user can log in and reach dashboard", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("demo@demo.com");
  await page.getByLabel("Password").fill("password");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page).toHaveURL(/\/app/);
  await expect(page.getByRole("heading", { name: /dashboard/i })).toBeVisible();
});
