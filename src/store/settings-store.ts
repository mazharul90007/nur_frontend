import { useEffect, useLayoutEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ArabicFontId =
  | "amiri"
  | "scheherazade"
  | "noto-naskh"
  | "indopak";

export type ColorScheme = "light" | "dark";

type SettingsState = {
  colorScheme: ColorScheme;
  arabicFontId: ArabicFontId;
  arabicFontSizePx: number;
  translationFontSizePx: number;
  selectedEditionCode: string | null;
  settingsOpen: boolean;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleColorScheme: () => void;
  setArabicFontId: (id: ArabicFontId) => void;
  setArabicFontSizePx: (n: number) => void;
  setTranslationFontSizePx: (n: number) => void;
  setSelectedEditionCode: (code: string | null) => void;
  setSettingsOpen: (open: boolean) => void;
};

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      colorScheme: "light",
      arabicFontId: "indopak",
      arabicFontSizePx: 24,
      translationFontSizePx: 16,
      selectedEditionCode: null,
      settingsOpen: false,
      setColorScheme: (colorScheme) => set({ colorScheme }),
      toggleColorScheme: () =>
        set((s) => ({
          colorScheme: s.colorScheme === "light" ? "dark" : "light",
        })),
      setArabicFontId: (id) => set({ arabicFontId: id }),
      setArabicFontSizePx: (n) =>
        set({ arabicFontSizePx: clamp(Math.round(n), 18, 40) }),
      setTranslationFontSizePx: (n) =>
        set({ translationFontSizePx: clamp(Math.round(n), 12, 24) }),
      setSelectedEditionCode: (code) => set({ selectedEditionCode: code }),
      setSettingsOpen: (open) => set({ settingsOpen: open }),
    }),
    {
      name: "nur-quran-settings",
      version: 2,
      migrate: (persistedState) => {
        if (!persistedState || typeof persistedState !== "object") {
          return persistedState;
        }
        const ps = persistedState as { state?: { arabicFontId?: string } };
        const id = ps.state?.arabicFontId;
        if (
          id === "uthmanic-hafs-v22" ||
          id === "kfgqpc-nastaleeq"
        ) {
          return {
            ...ps,
            state: {
              ...ps.state,
              arabicFontId: "amiri",
            },
          };
        }
        return persistedState;
      },
      partialize: (s) => ({
        colorScheme: s.colorScheme,
        arabicFontId: s.arabicFontId,
        arabicFontSizePx: s.arabicFontSizePx,
        translationFontSizePx: s.translationFontSizePx,
        selectedEditionCode: s.selectedEditionCode,
      }),
    },
  ),
);

/** True after zustand persist has loaded from localStorage (SSR is always false). */
export function useSettingsHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const finish = () => setHydrated(true);
    const unsub = useSettingsStore.persist.onFinishHydration(finish);
    if (useSettingsStore.persist.hasHydrated()) {
      queueMicrotask(finish);
    }
    return unsub;
  }, []);

  return hydrated;
}

/**
 * Theme for header toggle (icon/label): first render matches SSR (`light`), then
 * `useLayoutEffect` syncs from `<html class="dark">` or the store before paint.
 */
export function useEffectiveColorScheme(): ColorScheme {
  const storeScheme = useSettingsStore((s) => s.colorScheme);
  const hydrated = useSettingsHydrated();
  const [scheme, setScheme] = useState<ColorScheme>("light");

  useLayoutEffect(() => {
    // Initial render must stay "light" to match SSR; then sync before paint.
    if (!hydrated) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync DOM with SSR-safe first paint
      setScheme(
        document.documentElement.classList.contains("dark") ? "dark" : "light",
      );
    } else {
      setScheme(storeScheme);
    }
  }, [hydrated, storeScheme]);

  return scheme;
}

/** List/row UI that must match SSR: use store only after persist rehydrates. */
export function useListColorScheme(): ColorScheme {
  const hydrated = useSettingsHydrated();
  const storeScheme = useSettingsStore((s) => s.colorScheme);
  return hydrated ? storeScheme : "light";
}
