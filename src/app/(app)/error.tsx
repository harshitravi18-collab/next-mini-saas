"use client";
export default function AppError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-xl font-semibold">Something went wrong</h1>
      <p className="mt-2 text-sm text-gray-700">{error.message}</p>
      <button onClick={reset} className="mt-4 rounded-md bg-gray-900 px-4 py-2 text-white">Try again</button>
    </div>
  );
}
