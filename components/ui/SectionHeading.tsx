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
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  titleId?: string;
  compact?: boolean;
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
          "col-span-6 font-display text-[clamp(3.4rem,6.6vw,7.8rem)] [font-weight:580] leading-[0.94] tracking-[-0.045em] text-balance max-[940px]:col-start-3 max-[940px]:col-end-[-1] max-[640px]:col-span-1 max-[640px]:mt-5 max-[640px]:text-[clamp(3rem,13.7vw,4.8rem)]",
          compact && "col-span-8",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className="col-start-10 col-end-[-1] self-end text-[0.98rem] leading-[1.6] text-current/60 max-[940px]:col-start-3 max-[940px]:col-end-[-1] max-[940px]:mt-6 max-[940px]:max-w-[45ch] max-[640px]:col-span-1 max-[640px]:mt-5">
          {description}
        </p>
      ) : null}
    </div>
  );
}
