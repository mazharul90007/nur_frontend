/** Surah routes are fully static (SSG via generateStaticParams + fetch at build). */
export const dynamic = "force-static";

export default function SurahLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
