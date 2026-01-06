export type Activity = { id: string; message: string; createdAt: string };

declare global {
  // eslint-disable-next-line no-var
  var __activity: Activity[] | undefined;
}

function store(): Activity[] {
  if (!globalThis.__activity) globalThis.__activity = [];
  return globalThis.__activity;
}

export function addActivity(message: string) {
  store().unshift({ id: crypto.randomUUID(), message, createdAt: new Date().toISOString() });
}

export function listActivity(): Activity[] {
  return [...store()].slice(0, 20);
}
