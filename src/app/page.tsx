import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowRight, HiOutlineMagnifyingGlass } from "react-icons/hi2";

/** Viewport below sticky header (h-14 = 3.5rem). */
const heroH = "min-h-[calc(100dvh-3.5rem)]";

export default function HomePage() {
  return (
    <div className={`-mx-4 -mt-6 -mb-6 sm:-mx-8 sm:-mt-8 sm:-mb-8 ${heroH}`}>
      <section className={`relative w-full overflow-hidden ${heroH}`}>
        <div className={`absolute inset-0 ${heroH}`}>
          <Image
            src="/images/quran-img.jpg"
            alt="Decorative photograph of a Quran with gold calligraphy on a dark cover"
            fill
            priority
            className="object-cover object-[55%_center] sm:object-[65%_center] lg:object-right"
            sizes="100vw"
          />
          {/* Readable band on the left for dark text (light) / light text (dark); photo stays visible on the right */}
          <div
            className="absolute inset-0 bg-linear-to-r from-(--background)/95 from-0% via-(--background)/55 via-42% to-transparent sm:via-48% md:from-(--background)/95 md:via-(--background)/70 md:via-42% md:to-transparent dark:from-(--background)/92 dark:via-(--background)/55 dark:via-45% dark:to-(--background)/15"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-linear-to-t from-(--background)/25 via-transparent to-transparent dark:from-(--background)/35 dark:to-transparent"
            aria-hidden
          />
        </div>

        <div
          className={`relative z-10 flex ${heroH} flex-col justify-center px-5 py-8 sm:px-8 md:px-12 lg:max-w-[min(100%,42rem)] lg:pl-14 lg:pr-8`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-(--accent)">
            Al-Qur&apos;ān al-Karīm
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-(--text) sm:text-5xl">
            Welcome to{" "}
            <span className="bg-linear-to-r from-(--accent) to-(--accent-dark) bg-clip-text text-transparent dark:from-teal-300 dark:to-emerald-300">
              Nur
            </span>
          </h1>
          <p className="mt-2 text-lg font-medium text-(--text-muted) sm:text-xl">
            Read, reflect, and search — Arabic with translation.
          </p>
          <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-(--text-muted) sm:text-[17px]">
            Choose a surah from the sidebar to begin, or find verses by meaning
            with Search. Your reading preferences are saved on this device.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/surah/1"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-(--accent) to-(--accent-dark) px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-(--accent)/20 transition hover:opacity-95 hover:shadow-xl dark:shadow-teal-900/30"
            >
              Start with Al-Fātiḥah
              <HiOutlineArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-(--border) bg-(--surface)/80 px-7 py-3.5 text-sm font-semibold text-(--text) backdrop-blur-sm transition hover:border-(--accent)/50 hover:bg-(--surface)"
            >
              <HiOutlineMagnifyingGlass className="h-4 w-4 text-(--accent)" />
              Search verses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
