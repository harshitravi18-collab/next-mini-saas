"use server";

import { cookies } from "next/headers";
import { LOCALES, type Locale } from "@/lib/i18n";

function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}

export async function setLocaleAction(locale: string) {
  if (!isLocale(locale)) return { ok: false as const };

  const store = await cookies();
  store.set("locale", locale, { path: "/", sameSite: "lax" });
  return { ok: true as const };
}
