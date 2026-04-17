export type Surah = {
  number: number;
  nameArabic: string;
  nameEnglish: string;
  nameEnglishLong: string | null;
  revelationPlace: string;
  revelationOrder: number;
  versesCount: number;
  bismillahPre: boolean;
};

export type TranslationEdition = {
  id: number;
  code: string;
  language: string;
  name: string;
};

export type AyahLine = {
  numberInSurah: number;
  textArabic: string;
  bismillah: string | null;
  translation: string | null;
};

export type AyahsResponse = {
  surah: Surah;
  edition: TranslationEdition;
  ayahs: AyahLine[];
};

export type SearchResult = {
  surahNumber: number;
  numberInSurah: number;
  textArabic: string;
  translation: string;
};

export type SearchResponse = {
  edition: TranslationEdition;
  results: SearchResult[];
  total: number;
  page: number;
  limit: number;
};
