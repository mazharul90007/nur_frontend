"use client";

import type { ArabicFontId } from "@/store/settings-store";

export const ARABIC_FONT_STACK: Record<ArabicFontId, string> = {
  amiri: "var(--font-arabic-amiri), serif",
  scheherazade: "var(--font-arabic-scheherazade), serif",
  "noto-naskh": "var(--font-arabic-noto), serif",
};

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
        fontFamily: ARABIC_FONT_STACK[fontId],
        fontSize: `${sizePx}px`,
      }}
    >
      {children}
    </span>
  );
}
