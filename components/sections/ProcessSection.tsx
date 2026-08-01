import type { CSSProperties } from "react";

import type { Messages } from "@/i18n/config";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProcessSection({ messages }: { messages: Messages }) {
  const process = messages.process;
  return (
    <section className="page-shell py-section" id="process">
      <SectionHeading eyebrow={process.eyebrow} title={process.title} compact />
      <ol className="mt-[clamp(4rem,7vw,7rem)] grid grid-cols-4 gap-grid max-[940px]:grid-cols-2 max-[640px]:grid-cols-1">
        {process.steps.map((step, index) => (
          <li className="reveal-on-scroll min-h-72 border-t border-foreground/20 pb-5 pt-4 max-[940px]:min-h-60 max-[640px]:min-h-0 max-[640px]:pb-12" style={{ "--stagger": index } as CSSProperties} key={step.title}>
            <span className="font-mono text-[0.58rem] text-accent">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-16 font-display text-[clamp(1.8rem,2.4vw,2.8rem)] font-semibold leading-[1.03] tracking-[-0.035em] max-[640px]:mt-10">{step.title}</h3>
            <p className="mt-5 max-w-[30ch] text-[0.96rem] leading-[1.55] text-foreground/60">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
