"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import {
  HiOutlineCog6Tooth,
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi2";
import {
  MobileSurahDrawer,
  type MobileSurahDrawerHandle,
} from "./mobile-surah-drawer";
import { SettingsDrawer } from "./settings-drawer";
import { SurahSidebar } from "./surah-sidebar";
import {
  useEffectiveColorScheme,
  useSettingsStore,
} from "@/store/settings-store";
import type { Surah } from "@/types/quran";

const nav = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Search" },
];

export function AppShell({
  children,
  initialSurahs,
}: {
  children: React.ReactNode;
  initialSurahs: Surah[];
}) {
  const pathname = usePathname();
  const setSettingsOpen = useSettingsStore((s) => s.setSettingsOpen);
  const colorScheme = useEffectiveColorScheme();
  const setColorScheme = useSettingsStore((s) => s.setColorScheme);
  const mobileSurahRef = useRef<MobileSurahDrawerHandle>(null);

  return (
    <div className="flex min-h-screen">
      {/* Desktop left sidebar */}
      <aside className="sidebar-scroll sticky top-0 hidden h-screen w-[min(100%,18rem)] shrink-0 overflow-hidden border-r border-(--border) lg:flex lg:flex-col">
        <SurahSidebar initialSurahs={initialSurahs} />
      </aside>

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-(--border) bg-(--header-bg)/95 backdrop-blur-md">
          <div className="flex h-14 items-center justify-between gap-3 px-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-2">
              <MobileSurahDrawer
                ref={mobileSurahRef}
                key={pathname}
                initialSurahs={initialSurahs}
              />
              <Link href="/" className="group flex min-w-0 items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-(--accent) to-(--accent-dark) text-sm font-bold text-white shadow-md">
                  ن
                </span>
                <div className="hidden min-w-0 flex-col sm:flex">
                  <span className="truncate text-sm font-semibold tracking-tight text-(--text)">
                    Nur
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-(--text-muted)">
                    Quran
                  </span>
                </div>
              </Link>
            </div>

            <nav className="flex shrink-0 items-center gap-1 sm:gap-2">
              {nav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-3 py-2 text-sm font-medium transition sm:px-4 ${
                      active
                        ? "bg-(--accent-soft) text-(--accent-dark)"
                        : "text-(--text-muted) hover:bg-(--surface) hover:text-(--text)"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <button
                type="button"
                onClick={() =>
                  setColorScheme(colorScheme === "dark" ? "light" : "dark")
                }
                className="flex h-10 w-10 items-center justify-center rounded-full border border-(--border) bg-(--surface) text-(--text) shadow-sm transition hover:border-(--accent)/40"
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
                onClick={() => {
                  mobileSurahRef.current?.close();
                  setSettingsOpen(true);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-(--border) bg-(--surface) text-(--text) shadow-sm transition hover:border-(--accent)/40 hover:shadow"
                aria-label="Open settings"
              >
                <HiOutlineCog6Tooth
                  className="h-[18px] w-[18px] text-(--text-muted)"
                  aria-hidden
                />
              </button>
            </nav>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>

      <SettingsDrawer />
    </div>
  );
}
