import { PageHeader } from "@/components/PageHeader";
import { ActivityPanel } from "@/components/ActivityPanel";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Dashboard" subtitle="Next.js 15 + Server Actions + Testing" />
      <ActivityPanel />
    </div>
  );
}
