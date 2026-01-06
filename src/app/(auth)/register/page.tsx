import Link from "next/link";
export default function RegisterPage() {
  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-2xl font-semibold">Create account</h1>
      <p className="mt-2 text-sm text-gray-700">This demo uses mock auth. Use the provided demo credentials to sign in.</p>
      <div className="mt-6 rounded-lg border bg-white p-4 text-sm">
        <p>Demo credentials: <span className="font-mono">demo@demo.com</span> / <span className="font-mono">password</span></p>
        <Link href="/login" className="mt-3 inline-block rounded-md bg-gray-900 px-4 py-2 text-white">Go to sign in</Link>
      </div>
    </main>
  );
}
