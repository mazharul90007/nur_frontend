"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineCog6Tooth,
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi2";
import { SettingsDrawer } from "./settings-drawer";
import {
  useEffectiveColorScheme,
  useSettingsStore,
} from "@/store/settings-store";

const nav = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Search" },
];

const navPill = (active: boolean, isHome: boolean) =>
  isHome
    ? `rounded-full px-3 py-2 text-sm font-medium transition sm:px-4 ${
        active
          ? "bg-white/20 text-white shadow-sm ring-1 ring-white/25"
          : "text-white/90 hover:bg-white/10 hover:text-white"
      }`
    : `rounded-full px-3 py-2 text-sm font-medium transition sm:px-4 ${
        active
          ? "bg-(--accent-soft) text-(--accent-dark)"
          : "text-(--text-muted) hover:bg-(--surface) hover:text-(--text)"
      }`;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const setSettingsOpen = useSettingsStore((s) => s.setSettingsOpen);
  const colorScheme = useEffectiveColorScheme();
  const setColorScheme = useSettingsStore((s) => s.setColorScheme);
  const surahNavActive = pathname === "/surah" || pathname.startsWith("/surah/");
  const isHome = pathname === "/";

  return (
    <div className="flex min-h-screen min-w-0 flex-col">
      <header
        className={`sticky top-0 border-b ${
          isHome
            ? "z-40 border-transparent bg-transparent"
            : "z-30 border-(--border) bg-(--header-bg)/95 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-[min(100%,90rem)] items-center justify-between gap-3 px-3 sm:px-5">
          <Link href="/" className="group flex min-w-0 shrink items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-(--accent) to-(--accent-dark) text-sm font-bold text-white shadow-md">
              ن
            </span>
            <div className="hidden min-w-0 flex-col sm:flex">
              <span
                className={`truncate text-sm font-semibold tracking-tight ${
                  isHome ? "text-white" : "text-(--text)"
                }`}
              >
                Nur
              </span>
              <span
                className={`text-[10px] uppercase tracking-widest ${
                  isHome ? "text-white/65" : "text-(--text-muted)"
                }`}
              >
                Quran
              </span>
            </div>
          </Link>

          <nav
            className="flex min-w-0 shrink-0 items-center justify-end gap-0.5 sm:gap-1"
            aria-label="Main"
          >
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={navPill(active, isHome)}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link href="/surah" className={navPill(surahNavActive, isHome)}>
              Surah
            </Link>

            <button
              type="button"
              onClick={() =>
                setColorScheme(colorScheme === "dark" ? "light" : "dark")
              }
              className={`ml-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-sm transition sm:ml-1 ${
                isHome
                  ? "border border-white/25 bg-white/10 text-white hover:border-white/40 hover:bg-white/20"
                  : "border border-(--border) bg-(--surface) text-(--text) hover:border-(--accent)/40"
              }`}
              aria-label={
                colorScheme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {colorScheme === "dark" ? (
                <HiOutlineSun className="h-[18px] w-[18px]" aria-hidden />
              ) : (
                <HiOutlineMoon className="h-[18px] w-[18px]" aria-hidden />
              )}
            </button>

            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm transition hover:shadow ${
                isHome
                  ? "border border-white/25 bg-white/10 text-white hover:border-white/40 hover:bg-white/20"
                  : "border border-(--border) bg-(--surface) text-(--text) hover:border-(--accent)/40"
              }`}
              aria-label="Open settings"
            >
              <HiOutlineCog6Tooth
                className={`h-[18px] w-[18px] ${isHome ? "text-white/90" : "text-(--text-muted)"}`}
                aria-hidden
              />
            </button>
          </nav>
        </div>
      </header>

      <main
        className={`mx-auto w-full flex-1 ${
          isHome
            ? "max-w-none px-0 py-0"
            : "max-w-[min(100%,90rem)] px-4 py-6 sm:px-8 sm:py-8"
        }`}
      >
        {children}
      </main>

      <SettingsDrawer />
    </div>
  );
}
