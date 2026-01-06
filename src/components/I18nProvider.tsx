"use client";

import { createContext, useContext, useMemo } from "react";
import type { Locale, MessageKey } from "@/lib/i18n";
import { getMessage } from "@/lib/i18n";

type I18nCtx = {
  locale: Locale;
  t: (key: MessageKey) => string;
};

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const value = useMemo<I18nCtx>(
    () => ({
      locale,
      t: (key) => getMessage(locale, key),
    }),
    [locale]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useI18n must be used within I18nProvider");
  return v;
}
