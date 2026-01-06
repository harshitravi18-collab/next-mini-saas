import "./globals.css";
import type { Metadata } from "next";
import { ToastProvider } from "@/components/Toast";
import { I18nProvider } from "@/components/I18nProvider";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Next Mini-SaaS (Next 15)",
  description: "Next.js 15 + React 19 showcase",
};

function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = await cookies();
  const raw = store.get("locale")?.value;
  const locale = raw && isLocale(raw) ? raw : DEFAULT_LOCALE;

  return (
    <html lang={locale}>
      <body>
        <ToastProvider>
          <I18nProvider locale={locale}>{children}</I18nProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
