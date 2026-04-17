import { notFound } from "next/navigation";
import { SurahPageClient } from "./surah-page-client";
import { getAyahsStatic } from "@/lib/quran-server";

/** Pre-render all 114 surah pages at build time (SSG). */
export function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({
    number: String(i + 1),
  }));
}

export default async function SurahPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const surahNumber = Number(number);

  if (!Number.isFinite(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    notFound();
  }

  let initialData;
  try {
    initialData = await getAyahsStatic(surahNumber);
  } catch {
    notFound();
  }

  return (
    <SurahPageClient surahNumber={surahNumber} initialData={initialData} />
  );
}
