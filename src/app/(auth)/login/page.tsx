"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("demo@demo.com");
  const [password, setPassword] = useState("password");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as any;
        setError(data?.message ?? "Login failed");
        return;
      }

      router.push("/app");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <form onSubmit={submit} className="mt-6 rounded-lg border bg-white p-4">
        <label className="block text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="mt-1 w-full rounded-md border px-3 py-2"
          data-testid="emailInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="mt-4 block text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="mt-1 w-full rounded-md border px-3 py-2"
          data-testid="passwordInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error ? (
          <p role="alert" className="mt-3 text-sm text-red-600">
            {error}
          </p>
        ) : null}
        <button
          className="mt-4 w-full rounded-md bg-gray-900 px-4 py-2 text-white disabled:opacity-60"
          data-testid="loginButton"
          disabled={pending}
        >
          {pending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
