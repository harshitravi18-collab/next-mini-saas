"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LOCALES, type Locale, DEFAULT_LOCALE } from "@/lib/i18n";
import { setLocaleAction } from "@/app/actions/set-locale";
import { useI18n } from "@/components/I18nProvider";

export function LanguageSwitcher() {
  const router = useRouter();
  const { locale } = useI18n();
  const [pending, startTransition] = useTransition();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = e.target.value as Locale;

    startTransition(() => {
      void setLocaleAction(nextLocale).then(() => {
        router.refresh(); // re-render server components with new locale
      });
    });
  }

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="sr-only">Language</span>
      <select
        value={locale ?? DEFAULT_LOCALE}
        onChange={onChange}
        disabled={pending}
        className="rounded-md border px-3 py-2 text-sm bg-white disabled:opacity-60"
      >
        {LOCALES.map((l) => (
          <option key={l} value={l}>
            {l.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
