import { PageHeader } from "@/components/PageHeader";
import { listProjects } from "@/lib/db";
import { ProjectsClient } from "./projects-client";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALES, getMessage, type Locale } from "@/lib/i18n";

function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}

export default async function ProjectsPage() {
  const store = await cookies();
  const raw = store.get("locale")?.value;
  const locale = raw && isLocale(raw) ? raw : DEFAULT_LOCALE;

  const projects = listProjects();

  return (
    <div className="space-y-4">
      <PageHeader
        title={getMessage(locale, "projects.title")}
        subtitle={getMessage(locale, "projects.subtitle")}
      />
      <ProjectsClient initialProjects={projects} />
    </div>
  );
}
