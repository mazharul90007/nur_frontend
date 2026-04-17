"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ARABIC_FONT_STACK } from "@/components/arabic-text";
import { fetchSurahs } from "@/lib/quran-api";
import { useSettingsStore } from "@/store/settings-store";
import type { Surah } from "@/types/quran";

type Props = {
  initialSurahs: Surah[];
  onNavigate?: () => void;
};

export function SurahSidebar({ initialSurahs, onNavigate }: Props) {
  const pathname = usePathname();
  const arabicFontId = useSettingsStore((s) => s.arabicFontId);
  const { data: surahs, isPending, isError } = useQuery({
    queryKey: ["surahs"],
    queryFn: fetchSurahs,
    initialData: initialSurahs,
    staleTime: Infinity,
  });

  return (
    <div className="flex h-full min-h-0 flex-col bg-[var(--surface)]">
      <div className="shrink-0 border-b border-[var(--border)] px-4 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          Surahs
        </p>
        <p className="mt-1 text-sm font-medium text-[var(--text-muted)]">
          114 chapters
        </p>
      </div>

      <nav
        className="sidebar-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-3"
        aria-label="Surah list"
      >
        {isPending && (
          <ul className="space-y-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <li
                key={i}
                className="h-14 animate-pulse rounded-xl bg-[var(--border)]/60"
              />
            ))}
          </ul>
        )}

        {isError && (
          <p className="px-2 text-xs text-[var(--text-muted)]">
            Could not load list. Check API.
          </p>
        )}

        {surahs && (
          <ul className="space-y-0.5">
            {surahs.map((s) => {
              const href = `/surah/${s.number}`;
              const match = pathname.match(/^\/surah\/(\d+)/);
              const active =
                match !== null && Number(match[1]) === s.number;
              return (
                <li key={s.number}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                      active
                        ? "bg-[var(--accent-soft)] text-[var(--accent-dark)] ring-1 ring-[var(--accent)]/20"
                        : "text-[var(--text)] hover:bg-[var(--border)]/40"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                        active
                          ? "bg-[var(--accent)] text-white"
                          : "bg-[var(--border)]/80 text-[var(--text-muted)]"
                      }`}
                    >
                      {s.number}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className="block truncate text-[15px] leading-tight text-[var(--arabic-ink)]"
                        dir="rtl"
                        style={{
                          fontFamily: ARABIC_FONT_STACK[arabicFontId],
                        }}
                      >
                        {s.nameArabic}
                      </span>
                      <span className="block truncate text-xs text-[var(--text-muted)]">
                        {s.nameEnglish}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </div>
  );
}
