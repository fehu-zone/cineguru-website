import type { ReactNode } from "react";

import { cn } from "@/lib/classNames";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  titleId,
  compact = false,
  wideTitle = false,
  titleClassName,
  descriptionClassName,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  titleId?: string;
  compact?: boolean;
  wideTitle?: boolean;
  titleClassName?: string;
  descriptionClassName?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "reveal-on-scroll grid grid-cols-12 gap-x-grid max-[640px]:grid-cols-1",
        className,
      )}
    >
      <Eyebrow className="col-span-3 max-[940px]:col-span-2 max-[640px]:col-span-1">{eyebrow}</Eyebrow>
      <h2
        id={titleId}
        className={cn(
          wideTitle
            ? "col-span-6 -translate-x-40 whitespace-pre-line font-display text-[clamp(3.4rem,6.6vw,7.8rem)] [font-weight:580] leading-[1.02] tracking-[-0.045em] text-balance max-[640px]:translate-x-0"
            : "col-span-6 whitespace-pre-line font-display text-[clamp(3.4rem,6.6vw,7.8rem)] [font-weight:580] leading-[0.94] tracking-[-0.045em] text-balance",
          compact && "col-span-8",
          "max-[940px]:col-start-3 max-[940px]:col-end-[-1] max-[640px]:col-span-1 max-[640px]:mt-5",
          wideTitle
            ? "max-[640px]:text-[clamp(2rem,8.8vw,4.8rem)]"
            : "max-[640px]:text-[clamp(3rem,13.7vw,4.8rem)]",
          titleClassName,
        )}
      >
        {wideTitle && title.includes("\n")
          ? title.split("\n").map((line) => (
              <span className="block whitespace-nowrap" key={line}>{line}</span>
            ))
          : title}
      </h2>
      {description ? (
        <p className={cn(
          "self-end text-[0.98rem] leading-[1.6] text-current/60 max-[940px]:col-start-3 max-[940px]:col-end-[-1] max-[940px]:mt-6 max-[940px]:max-w-[45ch] max-[640px]:col-span-1 max-[640px]:mt-5",
          wideTitle
            ? "col-start-10 col-end-[-1] self-start mt-96 max-w-[38ch] justify-self-start"
            : "col-start-10 col-end-[-1]",
          descriptionClassName,
        )}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
