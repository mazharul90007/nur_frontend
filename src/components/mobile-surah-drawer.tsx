"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiOutlineBars3 } from "react-icons/hi2";
import { SurahSidebar } from "./surah-sidebar";
import { useSettingsStore } from "@/store/settings-store";
import type { Surah } from "@/types/quran";

export type MobileSurahDrawerHandle = {
  close: () => void;
};

/**
 * Hamburger + surah drawer portaled to `document.body`.
 * Parent should set `key={pathname}` so route changes remount and close the drawer.
 * Call `ref.current?.close()` before opening settings so the surah drawer closes.
 */
export const MobileSurahDrawer = forwardRef<
  MobileSurahDrawerHandle,
  { initialSurahs: Surah[] }
>(function MobileSurahDrawer({ initialSurahs }, ref) {
  const [open, setOpen] = useState(false);
  const setSettingsOpen = useSettingsStore((s) => s.setSettingsOpen);

  useImperativeHandle(ref, () => ({
    close: () => setOpen(false),
  }));

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const canPortal = typeof document !== "undefined";
  const drawer =
    open &&
    canPortal &&
    createPortal(
      <>
        <button
          type="button"
          aria-label="Close surah list"
          className="fixed inset-0 z-[100] bg-(--overlay) backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
        <aside className="sidebar-scroll fixed inset-y-0 left-0 z-[101] flex h-full w-[min(75vw,20rem)] flex-col border-r border-(--border) bg-(--surface) shadow-2xl lg:hidden">
          <SurahSidebar
            initialSurahs={initialSurahs}
            onNavigate={() => setOpen(false)}
          />
        </aside>
      </>,
      document.body,
    );

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setSettingsOpen(false);
          setOpen(true);
        }}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-(--border) bg-(--surface) text-(--text) lg:hidden"
        aria-label="Open surah list"
      >
        <HiOutlineBars3 className="h-[22px] w-[22px]" aria-hidden />
      </button>
      {drawer}
    </>
  );
});
