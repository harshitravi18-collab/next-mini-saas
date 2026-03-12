import { test, expect } from "@playwright/test";

test("create, edit, delete a project", async ({ page }) => {
  await page
    .context()
    .addCookies([
      { name: "locale", value: "en", url: "http://127.0.0.1:3000" },
    ]);

  // Login
  await page.goto("/login");
  await page.getByTestId("emailInput").fill("demo@demo.com");
  await page.getByTestId("passwordInput").fill("password");
  await page.getByTestId("loginButton").click();
  await expect(page).toHaveURL(/\/app/);

  // Projects
  await page.goto("/app/projects");
  await expect(page).toHaveURL(/\/app\/projects/);

  const name = `New Project ${Date.now()}`;
  const updated = `${name} Updated`;

  // Create
  await page.getByTestId("nameInput").fill(name);
  await page.getByTestId("createButton").click();

  // Wait for create transition to finish (button text comes back)
  await expect(page.getByTestId("createButton")).toHaveText(/create/i);

  // Find row by displayed name (display mode)
  const row = page.getByTestId("projectRow").filter({
    has: page.getByTestId("projectName").filter({ hasText: name }),
  });
  await expect(row).toHaveCount(1);

  // Lock to stable id (prevents reorder/flaky text matching)
  const projectId = await row.getAttribute("data-project-id");

  // If id is missing for any reason, fall back to text row
  const rowById = projectId
    ? page.locator(`[data-project-id="${projectId}"]`)
    : row;

  // Edit
  await expect(rowById.getByTestId("editButton")).toBeVisible();
  await rowById.getByTestId("editButton").click();

  const editInput = rowById.getByTestId("editNameInput");
  await expect(editInput).toBeVisible();

  await editInput.fill(updated);

  // Submit via Enter (avoids "Save button detached" flakiness)
  await editInput.press("Enter");

  // Wait for edit mode to close and updated name to appear in display mode
  await expect(rowById.getByTestId("editNameInput")).toHaveCount(0);
  await expect(rowById.getByTestId("projectName")).toHaveText(updated);

  // Delete (same locked row)
  await expect(rowById.getByTestId("deleteButton")).toBeVisible();
  await rowById.getByTestId("deleteButton").click();

  // Confirm deletion
  await expect(page.getByText(updated)).toHaveCount(0);
});
