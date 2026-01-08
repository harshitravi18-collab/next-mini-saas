import type { Project } from "@/lib/db";

export type OptimisticAction =
  | { type: "create"; item: Project }
  | { type: "update"; item: Project }
  | { type: "delete"; id: string };
