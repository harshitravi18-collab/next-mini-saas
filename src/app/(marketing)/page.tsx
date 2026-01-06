import Link from "next/link";
export default function MarketingHome() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Next Mini-SaaS</h1>
      <p className="mt-4 text-lg text-gray-700">
        Next.js 15 + React 19 showcase: App Router, protected routes, Server Actions, Vitest, and Playwright.
      </p>
      <div className="mt-8 flex gap-3">
        <Link className="rounded-md bg-gray-900 px-4 py-2 text-white" href="/login">Sign in</Link>
        <Link className="rounded-md border px-4 py-2" href="/register">Create account</Link>
      </div>
      <div className="mt-10 rounded-lg border bg-white p-4 text-sm text-gray-700">
        Demo credentials: <span className="font-mono">demo@demo.com</span> / <span className="font-mono">password</span>
      </div>
    </main>
  );
}
