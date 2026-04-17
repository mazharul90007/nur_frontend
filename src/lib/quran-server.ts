import type { AyahsResponse, Surah } from "@/types/quran";

/**
 * Server-only base URL for build-time / RSC fetch.
 * Set API_URL or NEXT_PUBLIC_API_URL; API must be reachable when running `next build`.
 */
function getApiBase(): string {
  const base =
    process.env.API_URL?.replace(/\/$/, "") ??
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
    "http://localhost:3001";
  return base;
}

export async function getSurahsStatic(): Promise<Surah[]> {
  const res = await fetch(`${getApiBase()}/quran/surahs`, {
    next: { revalidate: false },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch surahs: ${res.status}`);
  }
  return res.json() as Promise<Surah[]>;
}

export async function getAyahsStatic(surahNumber: number): Promise<AyahsResponse> {
  const res = await fetch(
    `${getApiBase()}/quran/surahs/${surahNumber}/ayahs`,
    { next: { revalidate: false } },
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch ayahs: ${res.status}`);
  }
  return res.json() as Promise<AyahsResponse>;
}
