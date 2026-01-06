"use client";

import type { Project } from "@/lib/db";
import { useI18n } from "@/components/I18nProvider";

function formatStable(iso: string) {
  // stable across server/client (no locale issues)
  return new Date(iso).toISOString().slice(0, 19).replace("T", " ");
}

export function ProjectRow({
  project,
  isPending,
  isEditing,
  onEdit,
  onCancel,
  onDelete,
  onSave,
}: {
  project: Project;
  isPending: boolean;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onSave: (formData: FormData) => void;
}) {
  const { t } = useI18n();
  return (
    <li className="flex items-center justify-between gap-3 px-4 py-3">
      <div className="min-w-0 flex-1">
        {!isEditing ? (
          <>
            <div className="truncate font-medium">{project.name}</div>
            <div className="text-xs text-gray-500">
              {t("projects.createdAt")} {formatStable(project.createdAt)}
            </div>
          </>
        ) : (
          <form action={onSave} className="flex gap-2">
            <label className="sr-only" htmlFor={`edit-${project.id}`}>
              {t("projects.edit")}
            </label>
            <input
              id={`edit-${project.id}`}
              name="name"
              defaultValue={project.name}
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
            <button className="rounded-md bg-gray-900 px-3 py-2 text-sm text-white">
              {t("projects.save")}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md border px-3 py-2 text-sm"
            >
              {t("projects.cancel")}
            </button>
          </form>
        )}
      </div>

      {!isEditing ? (
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-md border px-3 py-2 text-sm"
          >
            {t("projects.edit")}
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded-md border px-3 py-2 text-sm disabled:opacity-60"
            disabled={isPending}
          >
            {t("projects.delete")}
          </button>
        </div>
      ) : null}
    </li>
  );
}
