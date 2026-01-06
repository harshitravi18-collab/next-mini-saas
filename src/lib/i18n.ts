export const LOCALES = ["en", "de"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

// All translations in ONE file
export const MESSAGES = {
  en: {
    nav: {
      projects: "Projects",
      settings: "Settings",
      signOut: "Sign out",
      SigningOut: "Signing out...",
    },
    projects: {
      title: "Projects",
      subtitle: "Server-rendered list + Server Actions mutations.",
      search: "Search",
      projectName: "Project name",
      create: "Create",
      working: "Working...",
      createdAt: "Created",
      edit: "Edit",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      noMatch: "No projects match.",
      createdToast: "Project created",
      updatedToast: "Project updated",
      deletedToast: "Project deleted",
      deleteFailed: "Delete failed. Restoring…",
      nameRequired: "Name is required",
      notFound: "Project not found",
      searchPlaceholder: "Search by project name…",
    },
  },
  de: {
    nav: {
      projects: "Projekte",
      settings: "Einstellungen",
      signOut: "Abmelden",
      SigningOut: "Logger ud...",
    },
    projects: {
      title: "Projekte",
      subtitle: "Server-gerenderte Liste + Server Actions Mutationen.",
      search: "Suchen",
      projectName: "Projektname",
      create: "Erstellen",
      working: "Bitte warten...",
      createdAt: "Erstellt",
      edit: "Bearbeiten",
      save: "Speichern",
      cancel: "Abbrechen",
      delete: "Löschen",
      noMatch: "Keine passenden Projekte gefunden.",
      createdToast: "Projekt erstellt",
      updatedToast: "Projekt aktualisiert",
      deletedToast: "Projekt gelöscht",
      deleteFailed: "Löschen fehlgeschlagen. Wiederherstellen…",
      nameRequired: "Name ist erforderlich",
      notFound: "Projekt nicht gefunden",
      searchPlaceholder: "Søg efter projektnavn…",
    },
  },
} as const;

export type MessageKey = string;

/**
 * Get nested message by dot-key, e.g. "projects.title"
 * Falls back to DEFAULT_LOCALE, and finally to the key itself.
 */
export function getMessage(locale: Locale, key: MessageKey): string {
  const parts = key.split(".");
  const pick = (obj: unknown) => {
    let cur: any = obj;
    for (const p of parts) cur = cur?.[p];
    return cur;
  };

  const fromLocale = pick(MESSAGES[locale]);
  if (typeof fromLocale === "string") return fromLocale;

  const fromDefault = pick(MESSAGES[DEFAULT_LOCALE]);
  if (typeof fromDefault === "string") return fromDefault;

  return key;
}
