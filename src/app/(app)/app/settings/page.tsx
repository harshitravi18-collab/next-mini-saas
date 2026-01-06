import { PageHeader } from "@/components/PageHeader";
export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Settings" subtitle="Placeholder settings page for multi-page app structure." />
      <div className="rounded-lg border bg-white p-6 text-sm text-gray-700">Add theme toggles, profile settings, feature flags, etc.</div>
    </div>
  );
}
