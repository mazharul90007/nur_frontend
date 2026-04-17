import { SurahSidebar } from "@/components/surah-sidebar";
import { getSurahsStatic } from "@/lib/quran-server";

export default async function SurahDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialSurahs = await getSurahsStatic();

  return (
    <div className="flex w-full flex-col gap-6 md:flex-row md:items-start md:gap-8">
      <aside className="hidden w-[min(100%,18rem)] shrink-0 self-start md:sticky md:top-[4.5rem] md:z-20 md:block md:h-[calc(100dvh-4.5rem)] md:min-h-0">
        <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-(--border) bg-(--surface) shadow-sm">
          <SurahSidebar initialSurahs={initialSurahs} />
        </div>
      </aside>
      <section className="min-w-0 flex-1">{children}</section>
    </div>
  );
}
