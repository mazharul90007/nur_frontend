import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ArabicFontId = "amiri" | "scheherazade" | "noto-naskh";

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
      arabicFontId: "amiri",
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
