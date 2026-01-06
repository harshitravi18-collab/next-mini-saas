export type ProjectInput = { name: string };

export function validateProject(input: ProjectInput) {
  const name = input.name.trim();
  if (name.length < 2) return { ok: false as const, error: "Name must be at least 2 characters" };
  if (name.length > 60) return { ok: false as const, error: "Name must be 60 characters or less" };
  return { ok: true as const, value: { name } };
}
