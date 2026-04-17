import type { Metadata } from "next";
import { SurahIndexClient } from "./surah-index-client";
import { getSurahsStatic } from "@/lib/quran-server";

export const metadata: Metadata = {
  title: "Surahs — Nur",
  description: "Browse all 114 chapters of the Quran",
};

export default async function SurahIndexPage() {
  const surahs = await getSurahsStatic();

  return <SurahIndexClient surahs={surahs} />;
}
