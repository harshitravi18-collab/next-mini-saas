import Link from "next/link";
export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-gray-700">The page you requested does not exist.</p>
      <Link className="mt-4 inline-block rounded-md border px-4 py-2" href="/app">Back to dashboard</Link>
    </div>
  );
}
