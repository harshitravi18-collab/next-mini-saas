"use client";

import {
  useEffect,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import type { Project } from "@/lib/db";
import { useDebouncedValue } from "@/lib/useDebouncedValue";
import { useToast } from "@/components/Toast";
import {
  createProjectAction,
  deleteProjectAction,
  updateProjectAction,
} from "./actions";
import type { OptimisticAction } from "./project-types";
import { ProjectRow } from "./project-row";
import { useI18n } from "@/components/I18nProvider";

export function ProjectsClient({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const { t } = useI18n();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [serverItems, setServerItems] = useState<Project[]>(initialProjects);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [createKey, setCreateKey] = useState(0);

  function applyOptimisticTransition(action: OptimisticAction) {
    startTransition(() => applyOptimistic(action));
  }

  const [items, applyOptimistic] = useOptimistic<Project[], OptimisticAction>(
    serverItems,
    (state, action) => {
      switch (action.type) {
        case "create":
          return [action.item, ...state];
        case "update":
          return state.map((p) => (p.id === action.item.id ? action.item : p));
        case "delete":
          return state.filter((p) => p.id !== action.id);

        default:
          return state;
      }
    }
  );

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 200);

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return items;
    return items.filter((p) => p.name.toLowerCase().includes(q));
  }, [items, debouncedQuery]);

  async function onCreate(formData: FormData) {
    const rawName = String(formData.get("name") ?? "").trim();
    if (!rawName) return toast("Name is required");

    const tempId = `optimistic-${crypto.randomUUID()}`;
    const optimisticItem: Project = {
      id: tempId,
      name: rawName,
      createdAt: new Date().toISOString(),
    };

    applyOptimisticTransition({ type: "create", item: optimisticItem });

    const res = await createProjectAction(formData);
    if (!res.ok) {
      toast(res.message);
      applyOptimisticTransition({ type: "delete", id: tempId });
      return;
    }

    // remove temp optimistic row
    applyOptimisticTransition({ type: "delete", id: tempId });

    // add real server row (so UI ids are stable)
    applyOptimisticTransition({ type: "create", item: res.item });

    // commit server row
    setServerItems((prev) => [res.item, ...prev]);

    setEditingId(null);
    toast("Project created");
    setCreateKey((k) => k + 1);
    setEditingId(null);
  }

  async function onUpdate(id: string, formData: FormData) {
    const rawName = String(formData.get("name") ?? "").trim();
    if (!rawName) return toast("Name is required");

    const prevItem =
      serverItems.find((p) => p.id === id) ?? items.find((p) => p.id === id);
    if (!prevItem) return toast("Project not found");

    const optimisticItem: Project = { ...prevItem, name: rawName };
    applyOptimisticTransition({ type: "update", item: optimisticItem });

    const res = await updateProjectAction(id, formData);
    if (!res.ok) {
      toast(res.message);
      applyOptimisticTransition({ type: "update", item: prevItem }); // rollback optimistic update
      return;
    }

    // ✅ commit to serverItems ONLY
    setServerItems((prev) => prev.map((p) => (p.id === id ? res.item : p)));

    toast("Project updated");
    setEditingId(null);
  }

  function onDelete(id: string) {
    const prevItem = serverItems.find((p) => p.id === id);
    if (!prevItem) return;

    applyOptimisticTransition({ type: "delete", id });

    void deleteProjectAction(id).then((res) => {
      if (!res.deleted) {
        toast("Delete failed. Restoring…");
        applyOptimisticTransition({ type: "create", item: prevItem }); // rollback optimistic delete
        return;
      }

      // ✅ commit to serverItems ONLY
      setServerItems((prev) => prev.filter((p) => p.id !== id));
      toast("Project deleted");
    });
  }
  // tempoerary logging to help debug e2e test issues
  useEffect(() => {
    console.log("editingId:", editingId);
  }, [editingId]);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-white p-4">
        <label className="block text-sm font-medium" htmlFor="search">
          {t("projects.search")}
        </label>
        <input
          data-testid="searchInput"
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mt-1 w-full rounded-md border px-3 py-2"
          placeholder={t("projects.searchPlaceholder")}
        />
      </div>

      <form
        key={createKey}
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          void onCreate(fd);
        }}
        className="rounded-lg border bg-white p-4"
      >
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium" htmlFor="name">
              {t("projects.projectName")}
            </label>
            <input
              data-testid="nameInput"
              id="name"
              name="name"
              className="mt-1 w-full rounded-md border px-3 py-2"
              placeholder={t("projects.projectName")}
            />
          </div>
          <button
            className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white disabled:opacity-60"
            disabled={isPending}
            data-testid="createButton"
            type="submit"
          >
            {isPending ? t("projects.working") : t("projects.create")}
          </button>
        </div>
      </form>

      <div className="rounded-lg border bg-white">
        <div className="border-b px-4 py-3 font-medium">
          {t("projects.title")}
        </div>

        {filtered.length === 0 ? (
          <div className="px-4 py-6 text-sm text-gray-600">
            {t("projects.noMatch")}
          </div>
        ) : (
          <ul className="divide-y">
            {filtered.map((p) => (
              <ProjectRow
                key={p.id}
                project={p}
                isEditing={editingId === p.id}
                onEdit={() => {
                  console.log("EDIT CLICKED", p.id);
                  setEditingId(p.id);
                }}
                onCancel={() => setEditingId(null)}
                onSave={(fd) => onUpdate(p.id, fd)}
                onDelete={() => onDelete(p.id)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
