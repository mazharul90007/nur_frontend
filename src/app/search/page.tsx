"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArabicText } from "@/components/arabic-text";
import { searchAyahs } from "@/lib/quran-api";
import { useSettingsStore } from "@/store/settings-store";

export default function SearchPage() {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [page, setPage] = useState(1);
  const edition = useSettingsStore((s) => s.selectedEditionCode);
  const arabicFontId = useSettingsStore((s) => s.arabicFontId);
  const arabicFontSizePx = useSettingsStore((s) => s.arabicFontSizePx);
  const translationFontSizePx = useSettingsStore(
    (s) => s.translationFontSizePx,
  );

  const limit = 20;
  const canSearch = submitted.trim().length >= 2;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["search", submitted, page, edition, limit],
    queryFn: () => searchAyahs(submitted.trim(), page, limit, edition),
    enabled: canSearch,
  });

  const totalPages = useMemo(() => {
    if (!data) return 0;
    return Math.max(1, Math.ceil(data.total / data.limit));
  }, [data]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    setSubmitted(input);
  }

  return (
    <div>
      <div className="mb-10 text-center sm:mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          Search
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
          Find a verse
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-[var(--text-muted)]">
          Search in the translation (minimum two characters).
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="mx-auto mb-10 flex max-w-2xl flex-col gap-3 sm:flex-row"
      >
        <input
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. mercy, guidance, patience…"
          className="min-h-12 flex-1 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-[var(--text)] shadow-sm outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-ring)]"
        />
        <button
          type="submit"
          className="min-h-12 rounded-2xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] px-8 font-semibold text-white shadow-md transition hover:opacity-95"
        >
          Search
        </button>
      </form>

      {submitted.trim().length > 0 && submitted.trim().length < 2 && (
        <p className="text-center text-sm text-[var(--text-muted)]">
          Type at least two characters.
        </p>
      )}

      {isPending && canSearch && (
        <div className="animate-pulse space-y-4">
          <div className="h-24 rounded-2xl bg-[var(--border)]/80" />
          <div className="h-24 rounded-2xl bg-[var(--border)]/80" />
        </div>
      )}

      {isError && canSearch && (
        <div className="rounded-2xl border border-[var(--danger-border)] bg-[var(--danger-bg)] p-6 text-center text-[var(--danger-text)]">
          {error instanceof Error ? error.message : "Search failed"}
        </div>
      )}

      {data && canSearch && (
        <>
          <p className="mb-2 text-sm text-[var(--text-muted)]">
            {data.total} result{data.total === 1 ? "" : "s"} ·{" "}
            {data.edition.name}
          </p>
          <ul className="space-y-4">
            {data.results.length === 0 && (
              <li className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)]/90 p-8 text-center text-[var(--text-muted)]">
                No matches. Try different words.
              </li>
            )}
            {data.results.map((r, i) => (
              <li
                key={`${r.surahNumber}-${r.numberInSurah}-${i}`}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/95 p-5 shadow-sm"
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-medium text-[var(--accent-dark)]">
                    Surah {r.surahNumber} · {r.numberInSurah}
                  </span>
                  <Link
                    href={`/surah/${r.surahNumber}#ayah-${r.numberInSurah}`}
                    className="text-sm font-medium text-[var(--accent)] underline-offset-2 hover:underline"
                  >
                    Open surah
                  </Link>
                </div>
                <ArabicText fontId={arabicFontId} sizePx={arabicFontSizePx}>
                  {r.textArabic}
                </ArabicText>
                <p
                  className="mt-4 leading-relaxed text-[var(--text)]"
                  style={{ fontSize: `${translationFontSizePx}px` }}
                >
                  {r.translation}
                </p>
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-sm text-[var(--text-muted)]">
                Page {page} of {totalPages}
              </span>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
