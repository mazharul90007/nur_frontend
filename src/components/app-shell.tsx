"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SettingsDrawer } from "./settings-drawer";
import { SurahSidebar } from "./surah-sidebar";
import { useSettingsStore } from "@/store/settings-store";
import type { Surah } from "@/types/quran";

const nav = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Search" },
];

function MobileSurahNav({ initialSurahs }: { initialSurahs: Surah[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-(--border) bg-(--surface) text-(--text) lg:hidden"
        aria-label="Open surah list"
      >
        <MenuIcon />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close surah list"
            className="fixed inset-0 z-40 bg-(--overlay) backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          />
          <aside className="sidebar-scroll fixed inset-y-0 left-0 z-50 flex h-full w-[min(100%,18rem)] flex-col border-r border-(--border) shadow-2xl lg:hidden">
            <SurahSidebar
              initialSurahs={initialSurahs}
              onNavigate={() => setOpen(false)}
            />
          </aside>
        </>
      )}
    </>
  );
}

export function AppShell({
  children,
  initialSurahs,
}: {
  children: React.ReactNode;
  initialSurahs: Surah[];
}) {
  const pathname = usePathname();
  const setSettingsOpen = useSettingsStore((s) => s.setSettingsOpen);
  const colorScheme = useSettingsStore((s) => s.colorScheme);
  const toggleColorScheme = useSettingsStore((s) => s.toggleColorScheme);

  return (
    <div className="flex min-h-screen">
      {/* Desktop left sidebar */}
      <aside className="sidebar-scroll sticky top-0 hidden h-screen w-[min(100%,18rem)] shrink-0 overflow-hidden border-r border-(--border) lg:flex lg:flex-col">
        <SurahSidebar initialSurahs={initialSurahs} />
      </aside>

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-(--border) bg-(--header-bg)/95 backdrop-blur-md">
          <div className="flex items-center justify-between gap-3 px-3 py-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-2">
              <MobileSurahNav key={pathname} initialSurahs={initialSurahs} />
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
                onClick={toggleColorScheme}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-(--border) bg-(--surface) text-(--text) shadow-sm transition hover:border-(--accent)/40"
                aria-label={
                  colorScheme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                {colorScheme === "dark" ? <SunIcon /> : <MoonIcon />}
              </button>

              <button
                type="button"
                onClick={() => setSettingsOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-(--border) bg-(--surface) text-(--text) shadow-sm transition hover:border-(--accent)/40 hover:shadow"
                aria-label="Open settings"
              >
                <GearIcon />
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

function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      className="h-[18px] w-[18px]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      className="h-[18px] w-[18px]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg
      className="h-[18px] w-[18px] text-(--text-muted)"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
