import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <p className="text-sm font-medium text-(--accent)">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-(--text)">
        Page not found
      </h1>
      <p className="mt-2 text-(--text-muted)">
        That page does not exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-sm font-medium text-(--accent) underline"
      >
        Back to home
      </Link>
    </div>
  );
}
