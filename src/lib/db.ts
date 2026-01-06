export type Project = { id: string; name: string; createdAt: string };

declare global {
  // eslint-disable-next-line no-var
  var __projects: Project[] | undefined;
}

function seed(): Project[] {
  return [{ id: "p1", name: "Demo Project", createdAt: new Date().toISOString() }];
}

export function getProjectsStore(): Project[] {
  if (!globalThis.__projects) globalThis.__projects = seed();
  return globalThis.__projects;
}

export function listProjects(): Project[] {
  return [...getProjectsStore()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function createProject(name: string): Project {
  const p: Project = { id: crypto.randomUUID(), name, createdAt: new Date().toISOString() };
  getProjectsStore().push(p);
  return p;
}

export function updateProject(id: string, name: string): Project | null {
  const store = getProjectsStore();
  const project = store.find((p) => p.id === id);
  if (!project) return null;
  project.name = name;
  return project;
}

export function deleteProject(id: string): boolean {
  const store = getProjectsStore();
  const idx = store.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  store.splice(idx, 1);
  return true;
}
