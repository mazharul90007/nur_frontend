"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect } from "react";
import { ArabicText } from "@/components/arabic-text";
import { fetchAyahs } from "@/lib/quran-api";
import { useSettingsStore } from "@/store/settings-store";
import type { AyahsResponse } from "@/types/quran";

type Props = {
  surahNumber: number;
  initialData: AyahsResponse;
};

export function SurahPageClient({ surahNumber, initialData }: Props) {
  const edition = useSettingsStore((s) => s.selectedEditionCode);
  const arabicFontId = useSettingsStore((s) => s.arabicFontId);
  const arabicFontSizePx = useSettingsStore((s) => s.arabicFontSizePx);
  const translationFontSizePx = useSettingsStore(
    (s) => s.translationFontSizePx,
  );

  const editionMatches =
    edition == null ||
    edition === "" ||
    edition === initialData.edition.code;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["ayahs", surahNumber, edition ?? "default"],
    queryFn: () => fetchAyahs(surahNumber, edition),
    initialData: editionMatches ? initialData : undefined,
    staleTime: editionMatches ? Infinity : 60_000,
  });

  useEffect(() => {
    if (!data || typeof window === "undefined") return;
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [data]);

  if (isPending) {
    return <AyahSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="rounded-2xl border border-[var(--danger-border)] bg-[var(--danger-bg)] p-6 text-center text-[var(--danger-text)]">
        <p className="font-medium">Could not load verses</p>
        <p className="mt-2 text-sm">
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm font-medium text-[var(--accent)] underline"
        >
          Back to surahs
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4 border-b border-[var(--border)] pb-8">
        <div>
          <Link
            href="/"
            className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--accent)]"
          >
            ← All surahs
          </Link>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
            Surah {data.surah.number}
          </p>
          <h1 className="mt-1 text-3xl font-semibold sm:text-4xl">
            <ArabicText
              fontId={arabicFontId}
              sizePx={Math.min(42, arabicFontSizePx + 10)}
              className="!font-semibold text-[var(--arabic-ink)]"
            >
              {data.surah.nameArabic}
            </ArabicText>
          </h1>
          <p className="mt-1 text-xl font-medium text-[var(--text)]">
            {data.surah.nameEnglish}
          </p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            {data.edition.name} · {data.ayahs.length} verses shown
          </p>
        </div>
      </div>

      <ol className="space-y-3">
        {data.ayahs.map((a) => (
          <li
            key={a.numberInSurah}
            id={`ayah-${a.numberInSurah}`}
            className="scroll-mt-24 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/95 p-5 shadow-sm sm:p-6"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-sm font-semibold text-[var(--accent-dark)]">
                {a.numberInSurah}
              </span>
            </div>
            <ArabicText fontId={arabicFontId} sizePx={arabicFontSizePx}>
              {a.textArabic}
            </ArabicText>
            {a.translation && (
              <p
                className="mt-5 border-t border-[var(--border)] pt-5 leading-relaxed text-[var(--text)]"
                style={{ fontSize: `${translationFontSizePx}px` }}
              >
                {a.translation}
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

function AyahSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-10 w-40 rounded-lg bg-[var(--border)]" />
      <div className="h-32 rounded-2xl bg-[var(--border)]/80" />
      <div className="h-32 rounded-2xl bg-[var(--border)]/80" />
    </div>
  );
}
