type Props = {
  /** Visible caption under the spinner (omit for icon-only, e.g. inline). */
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClass = {
  sm: "h-5 w-5 border-2",
  md: "h-9 w-9 border-[3px]",
  lg: "h-11 w-11 border-[3px]",
} as const;

export function LoadingSpinner({
  label,
  className = "",
  size = "md",
}: Props) {
  return (
    <div
      className={`inline-flex items-center justify-center ${label ? "flex-col gap-3" : ""} ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={label ?? "Loading"}
    >
      <span
        className={`inline-block rounded-full border-(--border) border-t-(--accent) animate-spin ${sizeClass[size]}`}
        aria-hidden
      />
      {label ? (
        <span className="text-sm text-(--text-muted)">{label}</span>
      ) : null}
    </div>
  );
}
