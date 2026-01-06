"use server";

import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { createProject, deleteProject, updateProject } from "@/lib/db";
import { validateProject } from "@/lib/validation";
import { addActivity } from "@/lib/activity";
import type { Project } from "@/lib/db";

export async function createProjectAction(formData: FormData) {
  const name = String(formData.get("name") ?? "");
  const result = validateProject({ name });
  if (!result.ok) return { ok: false as const, message: result.error };

  const created = createProject(result.value.name);

  after(() => addActivity(`Created project "${created.name}"`));

  revalidatePath("/app/projects");
  revalidatePath("/app");

  return { ok: true as const, item: created satisfies Project };
}

export async function updateProjectAction(id: string, formData: FormData) {
  const name = String(formData.get("name") ?? "");
  const result = validateProject({ name });
  if (!result.ok) return { ok: false as const, message: result.error };

  const updated = updateProject(id, result.value.name);
  if (!updated) return { ok: false as const, message: "Not found" };

  after(() => addActivity(`Updated project "${updated.name}"`));

  revalidatePath("/app/projects");
  revalidatePath("/app");

  return { ok: true as const, item: updated satisfies Project };
}

export async function deleteProjectAction(id: string) {
  const ok = deleteProject(id);

  after(() => addActivity("Deleted a project"));

  revalidatePath("/app/projects");
  revalidatePath("/app");

  return { ok: true as const, deleted: ok };
}
