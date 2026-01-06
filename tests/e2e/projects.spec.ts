import { test, expect } from "@playwright/test";

test("create, edit, delete a project", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("demo@demo.com");
  await page.getByLabel("Password").fill("password");
  await page.getByRole("button", { name: "Sign in" }).click();

  await page.goto("/app/projects");

  await page.getByLabel("Project name").fill("Hello World");
  await page.getByRole("button", { name: "Create" }).click();

  await expect(page.getByText("Hello World")).toBeVisible();

  await page.getByRole("button", { name: "Edit" }).first().click();
  await page.getByLabel("Edit name").fill("Hello World Updated");
  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Hello World Updated")).toBeVisible();

  await page.getByRole("button", { name: "Delete" }).first().click();
});
