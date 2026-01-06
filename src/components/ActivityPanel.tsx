"use client";
import { useEffect, useState } from "react";

type Activity = { id: string; message: string; createdAt: string };

export function ActivityPanel() {
  const [items, setItems] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch("/api/activity");
      if (res.ok) {
        const data = (await res.json()) as { items: Activity[] };
        setItems(data.items);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="rounded-lg border bg-white">
      <div className="border-b px-4 py-3 font-medium">Activity</div>
      {loading ? (
        <div className="px-4 py-4 text-sm text-gray-600">Loading…</div>
      ) : items.length === 0 ? (
        <div className="px-4 py-4 text-sm text-gray-600">No activity yet.</div>
      ) : (
        <ul className="divide-y">
          {items.map((a) => (
            <li key={a.id} className="px-4 py-3 text-sm">
              <div className="font-medium">{a.message}</div>
              <div className="text-xs text-gray-500">{new Date(a.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
