"use client";
import { createContext, useContext, useMemo, useState } from "react";

type Toast = { id: string; message: string };
type ToastCtx = { toast: (message: string) => void };

const Ctx = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const api = useMemo<ToastCtx>(
    () => ({
      toast(message) {
        const id = crypto.randomUUID();
        setToasts((t) => [...t, { id, message }]);
        setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2500);
      },
    }),
    []
  );

  return (
    <Ctx.Provider value={api}>
      {children}
      <div
        className="fixed bottom-4 right-4 space-y-2"
        data-testid="toastContainer"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white shadow"
          >
            {t.message}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function useToast() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useToast must be used within ToastProvider");
  return v;
}
