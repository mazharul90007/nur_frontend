"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
        Al-Qur&apos;ān
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
        Welcome to Nur
      </h1>
      <p className="mx-auto mt-4 text-[var(--text-muted)]">
        Pick a surah from the list on the left to read Arabic text with translation,
        or use Search to find verses by meaning.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/surah/1"
          className="inline-flex rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
        >
          Start with Al-Fatihah
        </Link>
        <Link
          href="/search"
          className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)]/40"
        >
          Search verses
        </Link>
      </div>
      <p className="mt-12 text-xs text-[var(--text-muted)]">
        On small screens, open the menu button (☰) to show the surah list.
      </p>
    </div>
  );
}
