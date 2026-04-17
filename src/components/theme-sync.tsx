"use client";

import { useEffect } from "react";
import { useSettingsStore } from "@/store/settings-store";

/** Applies persisted light/dark preference to <html class="dark"> */
export function ThemeSync() {
  const colorScheme = useSettingsStore((s) => s.colorScheme);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      colorScheme === "dark",
    );
  }, [colorScheme]);

  return null;
}
