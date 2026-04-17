"use client";

import Image from "next/image";
import Link from "next/link";
import { ArabicText } from "@/components/arabic-text";
import { revelationListIcon } from "@/lib/revelation-image";
import { useListColorScheme, useSettingsStore } from "@/store/settings-store";
import type { Surah } from "@/types/quran";

export function SurahIndexClient({ surahs }: { surahs: Surah[] }) {
  const colorScheme = useListColorScheme();
  const arabicFontId = useSettingsStore((s) => s.arabicFontId);

  return (
    <div>
      <header className="mb-8 border-b border-(--border) pb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-(--text) sm:text-4xl">
          Surahs
        </h1>
        <p className="mt-2 max-w-xl text-(--text-muted)">
          Choose a chapter to read with Arabic and translation.
        </p>
      </header>

      <ul
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="All surahs"
      >
        {surahs.map((s) => {
          const placeIcon = revelationListIcon(s.revelationPlace, colorScheme);
          return (
            <li key={s.number}>
              <Link
                href={`/surah/${s.number}`}
                className="flex h-full min-h-[6.5rem] flex-col rounded-2xl border border-(--border) bg-(--surface) p-4 shadow-sm transition hover:border-(--accent)/45 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--accent-soft) text-sm font-bold text-(--accent-dark)">
                    {s.number}
                  </span>
                  <span className="relative h-5 w-5 shrink-0 opacity-85">
                    <Image
                      src={placeIcon.src}
                      alt={placeIcon.alt}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </span>
                </div>
                <span className="mt-3 text-sm font-medium text-(--text)">
                  {s.nameEnglish}
                </span>
                <ArabicText
                  fontId={arabicFontId}
                  sizePx={21}
                  className="!mt-1 !leading-snug"
                >
                  {s.nameArabic}
                </ArabicText>
                <span className="mt-auto pt-3 text-xs text-(--text-muted)">
                  {s.versesCount} verses ·{" "}
                  <span className="capitalize">{s.revelationPlace}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
