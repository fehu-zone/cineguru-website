import { siteConfig } from "@/data/site";
import { cn } from "@/lib/classNames";

function SocialIcon({ label }: { label: (typeof siteConfig.social)[number]["label"] }) {
  if (label === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect width="21" height="21" x="1.5" y="1.5" rx="6" />
        <rect width="11" height="11" x="6.5" y="6.5" rx="5.5" fill="var(--color-canvas)" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <circle cx="17.5" cy="6.5" r="1.25" fill="var(--color-canvas)" />
      </svg>
    );
  }

  if (label === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="4.5" cy="4.5" r="2.5" />
        <rect x="2" y="8" width="5" height="13" rx="1" />
        <path d="M10 8h4.5v1.8A5.4 5.4 0 0 1 18.8 8c3.2 0 5.2 2.1 5.2 6.1V21h-5v-6.2c0-1.7-.6-2.8-2-2.8s-2 1.1-2 2.8V21h-5V8Z" />
      </svg>
    );
  }

  if (label === "YouTube") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z" />
        <path d="m9.6 15.5 6.3-3.5-6.3-3.5v7Z" fill="var(--color-canvas)" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" />
    </svg>
  );
}

export function SocialLinks({ iconOnly = false, className }: { iconOnly?: boolean; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-x-4 gap-y-2", className)}>
      {siteConfig.social.map((social) => (
        <a
          key={social.label}
          className={cn(
            "transition-colors hover:text-accent",
            iconOnly && "grid size-10 place-items-center rounded-full border border-foreground/20 bg-foreground/5",
          )}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          aria-label={social.label}
        >
          {iconOnly ? <span className="size-[1.125rem]"><SocialIcon label={social.label} /></span> : `${social.label} ↗`}
        </a>
      ))}
    </div>
  );
}
