import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  Amiri,
  Cormorant_Garamond,
  DM_Sans,
  Noto_Naskh_Arabic,
  Scheherazade_New,
} from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { Providers } from "@/components/providers";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const heroSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-hero-serif",
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

const indopak = localFont({
  src: "../../public/data/quran_assets/indopakfont.ttf",
  variable: "--font-arabic-indopak",
  display: "swap",
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
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${heroSerif.variable} ${amiri.variable} ${scheherazade.variable} ${notoNaskh.variable} ${indopak.variable} h-full antialiased`}
    >
      <head>
        {/* Runs before paint so dark mode matches localStorage (zustand rehydrates async). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var r=localStorage.getItem("nur-quran-settings");if(!r)return;var p=JSON.parse(r);var s=p&&p.state;if(s&&s.colorScheme==="dark")document.documentElement.classList.add("dark");}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full">
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
