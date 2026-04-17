import type {
  AyahsResponse,
  SearchResponse,
  Surah,
  TranslationEdition,
} from "@/types/quran";
import { api } from "./api-client";

export async function fetchSurahs(): Promise<Surah[]> {
  const { data } = await api.get<Surah[]>("/quran/surahs");
  return data;
}

export async function fetchEditions(): Promise<TranslationEdition[]> {
  const { data } = await api.get<TranslationEdition[]>("/quran/editions");
  return data;
}

export async function fetchAyahs(
  surahNumber: number,
  edition?: string | null,
): Promise<AyahsResponse> {
  const { data } = await api.get<AyahsResponse>(
    `/quran/surahs/${surahNumber}/ayahs`,
    { params: edition ? { edition } : {} },
  );
  return data;
}

export async function searchAyahs(
  q: string,
  page: number,
  limit: number,
  edition?: string | null,
): Promise<SearchResponse> {
  const { data } = await api.get<SearchResponse>("/quran/search", {
    params: {
      q,
      page,
      limit,
      ...(edition ? { edition } : {}),
    },
  });
  return data;
}
