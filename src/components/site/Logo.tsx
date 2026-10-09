import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function LeafMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <circle cx="16" cy="16" r="15" className="fill-primary" />
      <path d="M9 22c0-8 5-13 14-13 0 9-5 14-13 14" className="fill-leaf" />
      <path d="M10 22.5c3-4 6-6.5 10-9" className="stroke-accent" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" aria-label="GeoLeaf home" className="flex shrink-0 items-center gap-2.5">
      <LeafMark className="h-9 w-9" />
      <span
        className={cn(
          "font-display text-2xl font-semibold tracking-tight",
          light ? "text-primary-foreground" : "text-primary",
        )}
      >
        Geo<span className="text-leaf">Leaf</span>
      </span>
    </Link>
  );
}
