import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";

/** Hero fills viewport below header (h-14); fixed image still covers full screen incl. navbar. */
const mainMinH = "min-h-[calc(100dvh-3.5rem)]";

/** Cormorant Garamond — manuscript-style English (see --font-hero-serif in layout). */
const heroSerif = "font-[family-name:var(--font-hero-serif),serif]";
/** Scheherazade — classical Quranic Arabic display. */
const heroArabic = "font-[family-name:var(--font-arabic-scheherazade),serif]";

export default function HomePage() {
  return (
    <div className={`relative w-full ${mainMinH}`}>
      {/* Viewport-fixed layer — covers navbar + page */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <Image
          src="/images/quran-img.jpg"
          alt="Quran with ornamental Arabic calligraphy on the cover"
          fill
          priority
          className="object-cover object-[52%_center] sm:object-[62%_center] lg:object-[68%_center]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-linear-to-r from-stone-950/78 from-0% via-stone-950/38 via-[40%] to-transparent sm:via-[44%] md:via-[42%] dark:from-stone-950/88 dark:via-stone-950/48 dark:via-[44%] dark:to-stone-950/15"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-stone-950/45 via-transparent to-stone-950/25 dark:from-black/50 dark:to-stone-950/35"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-linear-to-br from-teal-950/25 via-transparent to-transparent dark:from-teal-950/35"
          aria-hidden
        />
      </div>

      <div className={`relative z-10 flex w-full flex-col ${mainMinH}`}>
        <div className="flex flex-1 flex-col justify-center px-5 py-10 sm:px-10 md:px-12 lg:pl-16 lg:pr-10">
          <div className="mx-auto w-full max-w-6xl">
            <div className={`max-w-lg ${heroSerif}`}>
              {/* Ornamental rule */}
              <div className="mb-7 flex items-center gap-3 sm:mb-8">
                <div
                  className="h-px flex-1 bg-linear-to-r from-transparent via-teal-400/35 to-teal-300/25"
                  aria-hidden
                />
                <span
                  className={`${heroArabic} select-none text-lg text-teal-300/80 sm:text-xl`}
                  aria-hidden
                >
                  ۞
                </span>
                <div
                  className="h-px flex-1 bg-linear-to-l from-transparent via-teal-400/35 to-teal-300/25"
                  aria-hidden
                />
              </div>

              {/* Arabic title — calligraphic script */}
              <p
                dir="rtl"
                className={`${heroArabic} text-[1.85rem] leading-[2.1] text-teal-100/95 sm:text-[2.15rem] sm:leading-[2.2]`}
              >
                القرآن الكريم
              </p>
              <p className="mt-3 text-[0.68rem] font-medium uppercase tracking-[0.48em] text-teal-300/70">
                Al-Qur&apos;ān al-Karīm
              </p>

              <h1 className="mt-9 text-[2.35rem] font-normal leading-[1.12] tracking-tight text-stone-50 sm:mt-10 sm:text-[2.85rem] lg:text-[3.1rem]">
                <span className="italic text-stone-200/95">Welcome</span>
                <span className="font-light text-stone-400/95"> to </span>
                <span className="bg-linear-to-r from-teal-200 to-emerald-300 bg-clip-text font-semibold text-transparent">
                  Nur
                </span>
              </h1>

              {/* Manuscript-style block */}
              <div className="mt-10 border-l-[3px] border-teal-400/40 pl-5 sm:mt-11 sm:pl-6">
                <p className="text-[1.125rem] font-normal italic leading-[1.65] text-stone-200/95 sm:text-[1.25rem] sm:leading-[1.7]">
                  A home for recitation &mdash; the Arabic revelation, line by line,
                  with translation that illumines each verse.
                </p>
                <p className="mt-6 text-[1.02rem] font-normal leading-[1.8] text-stone-400 sm:text-[1.0625rem]">
                  When you are ready, step into the chapters:{" "}
                  <span className="text-stone-200/95">Surah</span> in the bar
                  above leads the way. Your reading rests gently on this device.
                </p>
              </div>

              <div className="mt-11 sm:mt-12">
                <Link
                  href="/surah"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-teal-600 to-emerald-700 px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-white shadow-lg shadow-black/25 transition hover:opacity-95 hover:shadow-xl dark:from-teal-500 dark:to-emerald-600"
                >
                  Read the Quran
                  <HiOutlineArrowRight
                    className="h-4 w-4 transition group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
