"use client";

import { useEffect } from "react";
import { useSettingsHydrated, useSettingsStore } from "@/store/settings-store";

/**
 * Applies persisted light/dark to <html class="dark"> after localStorage rehydration.
 * Initial paint uses the inline script in layout.tsx; we skip syncing until hydrated so
 * we do not strip "dark" while the store still has default "light".
 */
export function ThemeSync() {
  const colorScheme = useSettingsStore((s) => s.colorScheme);
  const hydrated = useSettingsHydrated();

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle(
      "dark",
      colorScheme === "dark",
    );
  }, [colorScheme, hydrated]);

  return null;
}
