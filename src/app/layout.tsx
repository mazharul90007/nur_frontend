import type { Metadata } from "next";
import {
  Amiri,
  DM_Sans,
  Noto_Naskh_Arabic,
  Scheherazade_New,
} from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { Providers } from "@/components/providers";
import { getSurahsStatic } from "@/lib/quran-server";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-arabic-amiri",
});

const scheherazade = Scheherazade_New({
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-arabic-scheherazade",
});

const notoNaskh = Noto_Naskh_Arabic({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-arabic-noto",
});

export const metadata: Metadata = {
  title: "Nur — Quran Reader",
  description: "Read the Quran with translations and search",
};

/** Root layout is statically generated; surah list is fetched at build time for SSG. */
export const dynamic = "force-static";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialSurahs = await getSurahsStatic();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${amiri.variable} ${scheherazade.variable} ${notoNaskh.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Providers>
          <AppShell initialSurahs={initialSurahs}>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
