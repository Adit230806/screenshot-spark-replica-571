import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-9 w-9", className)} aria-hidden="true">
      <rect width="40" height="40" rx="12" className="fill-primary" />
      <path
        d="M12 28c0-9 6-15 17-16-1 11-7 17-16 17"
        className="fill-primary-foreground/95"
      />
      <path d="M13 28c3-5 7-8 12-11" className="stroke-primary" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="30" cy="27" r="2.4" className="fill-saffron" />
    </svg>
  );
}

export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className={cn("font-display text-[1.45rem] font-semibold tracking-tight", light ? "text-primary-foreground" : "text-primary-deep")}>
        Nutri<span className={light ? "text-mint" : "text-primary"}>AI</span>
      </span>
    </span>
  );
}
