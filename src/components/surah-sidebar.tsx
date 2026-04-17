"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ARABIC_FONT_STACK } from "@/components/arabic-text";
import { fetchSurahs } from "@/lib/quran-api";
import { revelationListIcon } from "@/lib/revelation-image";
import {
  useListColorScheme,
  useSettingsStore,
} from "@/store/settings-store";
import type { Surah } from "@/types/quran";

type Props = {
  initialSurahs: Surah[];
  onNavigate?: () => void;
};

export function SurahSidebar({ initialSurahs, onNavigate }: Props) {
  const pathname = usePathname();
  const colorScheme = useListColorScheme();
  const arabicFontId = useSettingsStore((s) => s.arabicFontId);
  const {
    data: surahs,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["surahs"],
    queryFn: fetchSurahs,
    initialData: initialSurahs,
    staleTime: Infinity,
  });

  return (
    <div className="flex h-full min-h-0 flex-col bg-(--surface)">
      <div className="flex h-14 shrink-0 flex-col justify-center border-b border-(--border) bg-(--header-bg)/95 px-4 backdrop-blur-md">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-(--accent)">
          Surahs
        </p>
        <p className="text-xs font-medium leading-tight text-(--text-muted)">
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
                className="h-14 animate-pulse rounded-xl bg-(--border)/60"
              />
            ))}
          </ul>
        )}

        {isError && (
          <p className="px-2 text-xs text-(--text-muted)">
            Could not load list. Check API.
          </p>
        )}

        {surahs && (
          <ul className="space-y-0.5">
            {surahs.map((s) => {
              const href = `/surah/${s.number}`;
              const match = pathname.match(/^\/surah\/(\d+)/);
              const active = match !== null && Number(match[1]) === s.number;
              const placeIcon = revelationListIcon(s.revelationPlace, colorScheme);
              return (
                <li key={s.number}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    className={`flex min-w-0 items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                      active
                        ? "bg-(--accent-soft) text-(--accent-dark) ring-1 ring-(--accent)/20"
                        : "text-(--text) hover:bg-(--border)/40"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                        active
                          ? "bg-(--accent) text-white"
                          : "bg-(--border)/80 text-(--text-muted)"
                      }`}
                    >
                      {s.number}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className="block truncate text-[15px] leading-tight text-(--arabic-ink)"
                        dir="rtl"
                        style={{
                          fontFamily: ARABIC_FONT_STACK[arabicFontId],
                        }}
                      >
                        {s.nameArabic}
                      </span>
                      <span className="mt-0.5 inline-flex min-w-0 max-w-full items-center gap-2">
                        <span className="min-w-0 truncate text-xs text-(--text-muted)">
                          {s.nameEnglish}
                        </span>
                        <span className="relative h-4 w-4 shrink-0 opacity-90">
                          <Image
                            src={placeIcon.src}
                            alt={placeIcon.alt}
                            width={16}
                            height={16}
                            className="object-contain"
                          />
                        </span>
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
