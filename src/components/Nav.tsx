"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useI18n } from "@/components/I18nProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Nav() {
  const { t } = useI18n();

  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  const Item = ({ href, label }: { href: string; label: string }) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        className={[
          "rounded-md px-3 py-2 text-sm",
          active ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100",
        ].join(" ")}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className="flex items-center justify-between border-b bg-white px-4 py-3">
      <div className="flex items-center gap-2">
        <Link href="/app" className="font-semibold">
          Mini SaaS
        </Link>
        <div className="ml-4 flex gap-1">
          <Item href="/app/projects" label={t("nav.projects")} />
          <Item href="/app/settings" label={t("nav.settings")} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        {/* <ThemeToggle /> */}
        <button
          onClick={logout}
          disabled={loading}
          className="rounded-md bg-gray-900 px-3 py-2 text-sm text-white disabled:opacity-60"
        >
          {loading ? t("nav.SigningOut") : t("nav.signOut")}
        </button>
      </div>
    </nav>
  );
}
