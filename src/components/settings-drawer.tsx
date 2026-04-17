"use client";

import { useQuery } from "@tanstack/react-query";
import { HiOutlineXMark } from "react-icons/hi2";
import { LoadingSpinner } from "@/components/loading-spinner";
import { fetchEditions } from "@/lib/quran-api";
import type { ArabicFontId } from "@/store/settings-store";
import { useSettingsStore } from "@/store/settings-store";

const FONT_OPTIONS: { id: ArabicFontId; label: string }[] = [
  { id: "indopak", label: "IndoPak (local)" },
  { id: "amiri", label: "Amiri" },
  { id: "scheherazade", label: "Scheherazade New" },
  { id: "noto-naskh", label: "Noto Naskh Arabic" },
];

export function SettingsDrawer() {
  const open = useSettingsStore((s) => s.settingsOpen);
  const setOpen = useSettingsStore((s) => s.setSettingsOpen);
  const arabicFontId = useSettingsStore((s) => s.arabicFontId);
  const setArabicFontId = useSettingsStore((s) => s.setArabicFontId);
  const arabicFontSizePx = useSettingsStore((s) => s.arabicFontSizePx);
  const setArabicFontSizePx = useSettingsStore((s) => s.setArabicFontSizePx);
  const translationFontSizePx = useSettingsStore(
    (s) => s.translationFontSizePx,
  );
  const setTranslationFontSizePx = useSettingsStore(
    (s) => s.setTranslationFontSizePx,
  );
  const selectedEditionCode = useSettingsStore((s) => s.selectedEditionCode);
  const setSelectedEditionCode = useSettingsStore(
    (s) => s.setSelectedEditionCode,
  );

  const {
    data: editions = [],
    isError: editionsError,
    isPending: editionsPending,
    refetch: refetchEditions,
  } = useQuery({
    queryKey: ["editions"],
    queryFn: fetchEditions,
    retry: 2,
  });

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Close settings"
        className="fixed inset-0 z-[90] bg-(--overlay) transition-opacity"
        onClick={() => setOpen(false)}
      />
      <aside
        className="fixed top-0 right-0 z-[95] flex h-full w-[min(75vw,28rem)] flex-col border-l border-(--border) bg-(--surface-elevated) shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <div className="flex items-center justify-between border-b border-(--border) px-5 py-4">
          <h2
            id="settings-title"
            className="font-semibold tracking-tight text-(--text)"
          >
            Reading settings
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full p-2 text-(--text-muted) transition hover:bg-(--surface) hover:text-(--text)"
            aria-label="Close"
          >
            <HiOutlineXMark className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8">
          <section>
            <div className="mb-2 flex items-center gap-2">
              <label className="block text-xs font-medium uppercase tracking-wider text-(--text-muted)">
                Translation
              </label>
              {editionsPending && <LoadingSpinner size="sm" />}
            </div>
            {editionsError && (
              <div className="mb-3 rounded-xl border border-(--danger-border) bg-(--danger-bg) px-3 py-2 text-xs text-(--danger-text)">
                <p>Could not load translation editions from the API.</p>
                <p className="mt-1 text-(--danger-muted)">
                  Set <code className="rounded bg-(--surface) px-1">NEXT_PUBLIC_API_URL</code> on
                  your host (e.g.{" "}
                  <code className="rounded bg-(--surface) px-1">
                    https://nur-server.vercel.app
                  </code>
                  ) and redeploy, or check CORS on the server.
                </p>
                <button
                  type="button"
                  onClick={() => void refetchEditions()}
                  className="mt-2 text-xs font-medium text-(--accent) underline"
                >
                  Retry
                </button>
              </div>
            )}
            <select
              value={selectedEditionCode ?? ""}
              onChange={(e) => setSelectedEditionCode(e.target.value || null)}
              disabled={editionsPending}
              className="w-full rounded-xl border border-(--border) bg-(--surface) px-4 py-3 text-sm text-(--text) outline-none transition focus:border-(--accent) focus:ring-2 focus:ring-(--accent-ring) disabled:opacity-60"
            >
              <option value="">
                {editionsPending
                  ? "Loading editions…"
                  : "Default (first in list)"}
              </option>
              {editions.map((e) => (
                <option key={e.id} value={e.code}>
                  {e.name} ({e.language})
                </option>
              ))}
            </select>
          </section>

          <section>
            <label className="mb-3 block text-xs font-medium uppercase tracking-wider text-(--text-muted)">
              Arabic font
            </label>
            <div className="flex flex-col gap-2">
              {FONT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setArabicFontId(opt.id)}
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                    arabicFontId === opt.id
                      ? "border-(--accent) bg-(--accent-soft) text-(--text)"
                      : "border-(--border) bg-(--surface) text-(--text-muted) hover:border-(--accent)/50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-xs font-medium uppercase tracking-wider text-(--text-muted)">
                Arabic size
              </label>
              <span className="text-sm tabular-nums text-(--text)">
                {arabicFontSizePx}px
              </span>
            </div>
            <input
              type="range"
              min={18}
              max={40}
              value={arabicFontSizePx}
              onChange={(e) => setArabicFontSizePx(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-(--border) accent-(--accent)"
            />
          </section>

          <section>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-xs font-medium uppercase tracking-wider text-(--text-muted)">
                Translation size
              </label>
              <span className="text-sm tabular-nums text-(--text)">
                {translationFontSizePx}px
              </span>
            </div>
            <input
              type="range"
              min={12}
              max={24}
              value={translationFontSizePx}
              onChange={(e) => setTranslationFontSizePx(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-(--border) accent-(--accent)"
            />
          </section>
        </div>
      </aside>
    </>
  );
}
