"use client";

import type { ArabicFontId } from "@/store/settings-store";

export const ARABIC_FONT_STACK: Record<ArabicFontId, string> = {
  amiri: "var(--font-arabic-amiri), serif",
  scheherazade: "var(--font-arabic-scheherazade), serif",
  "noto-naskh": "var(--font-arabic-noto), serif",
  indopak: "var(--font-arabic-indopak), serif",
};

/** Resolves font stack; falls back to Amiri for unknown or removed ids (e.g. old localStorage). */
export function arabicFontFamily(fontId: string): string {
  const map = ARABIC_FONT_STACK as Record<string, string>;
  return map[fontId] ?? map.amiri;
}

type Props = {
  fontId: ArabicFontId;
  sizePx: number;
  className?: string;
  children: React.ReactNode;
};

export function ArabicText({
  fontId,
  sizePx,
  className = "",
  children,
}: Props) {
  return (
    <span
      className={`block leading-[1.85] text-right text-(--arabic-ink) ${className}`}
      dir="rtl"
      style={{
        fontFamily: arabicFontFamily(fontId),
        fontSize: `${sizePx}px`,
      }}
    >
      {children}
    </span>
  );
}
