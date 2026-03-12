"use client";

import type { Project } from "@/lib/db";

type Props = {
  project: Project;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (fd: FormData) => void;
  onDelete: () => void;
};

export function ProjectRow({
  project,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  onDelete,
}: Props) {
  return (
    <li
      data-testid="projectRow"
      data-project-id={project.id}
      className="flex items-center justify-between gap-3 px-4 py-3"
    >
      <div className="min-w-0 flex-1">
        {!isEditing ? (
          <>
            <div data-testid="projectName" className="truncate font-medium">
              {project.name}
            </div>
            <div className="text-xs text-gray-500">
              Created{" "}
              {new Date(project.createdAt)
                .toISOString()
                .slice(0, 19)
                .replace("T", " ")}
            </div>
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget); // ✅ correct form
              onSave(fd);
            }}
            className="flex gap-2"
          >
            <input
              data-testid="editNameInput"
              name="name"
              defaultValue={project.name}
              className="w-full rounded-md border px-3 py-2 text-sm"
              autoComplete="on"
            />

            <button
              type="submit"
              data-testid="saveButton"
              className="rounded-md bg-gray-900 px-3 py-2 text-sm text-white"
            >
              Save
            </button>

            <button
              type="button"
              data-testid="cancelEditButton"
              onClick={onCancel}
              className="rounded-md border px-3 py-2 text-sm"
            >
              Cancel
            </button>
          </form>
        )}
      </div>

      {!isEditing && (
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            data-testid="editButton"
            onClick={onEdit}
            className="rounded-md border px-3 py-2 text-sm"
          >
            Edit
          </button>

          <button
            type="button"
            data-testid="deleteButton"
            onClick={onDelete}
            className="rounded-md border px-3 py-2 text-sm"
          >
            Delete
          </button>
        </div>
      )}
    </li>
  );
}
