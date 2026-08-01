import { cn } from "@/lib/classNames";

export function BrandLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn("brand-logo-mask block h-7 w-[clamp(7.875rem,10.5vw,10.5rem)] bg-foreground", className)}
      aria-hidden="true"
    />
  );
}
