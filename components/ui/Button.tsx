import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/classNames";

type ButtonVariant = "primary" | "light" | "outline";
type ButtonSize = "default" | "compact" | "display";

const baseStyles =
  "inline-flex items-center justify-center rounded-full border transition-[color,background-color,border-color] duration-300 ease-out";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "border-accent bg-accent text-canvas hover:border-foreground hover:bg-foreground hover:text-canvas",
  light: "border-foreground bg-foreground text-canvas hover:border-accent hover:bg-accent hover:text-canvas",
  outline: "border-foreground/25 bg-foreground/5 text-foreground hover:border-foreground hover:bg-foreground hover:text-canvas",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "min-h-12 gap-5 px-5 py-3 font-mono text-[0.62rem] font-bold uppercase tracking-[0.08em]",
  compact: "min-h-10 gap-3 px-4 py-2 font-mono text-[0.58rem] font-bold uppercase tracking-[0.08em]",
  display: "min-h-[clamp(8.75rem,10vw,10rem)] min-w-0 flex-1 gap-5 whitespace-nowrap px-[clamp(1.25rem,2.5vw,3rem)] py-6 text-center font-body text-[clamp(1.9rem,3.8vw,4rem)] font-normal normal-case leading-none tracking-[-0.045em] max-[640px]:min-h-28 max-[640px]:px-5 max-[640px]:text-[clamp(1.45rem,7vw,2.35rem)] max-[640px]:tracking-[-0.035em]",
};

export function buttonStyles({
  variant = "primary",
  size = "default",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}): string {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  magnetic?: boolean;
};

export function ButtonLink({
  variant,
  size,
  magnetic = false,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={buttonStyles({ variant, size, className })}
      data-magnetic={magnetic ? "" : undefined}
      {...props}
    />
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  magnetic?: boolean;
};

export function Button({
  variant,
  size,
  magnetic = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonStyles({ variant, size, className })}
      data-magnetic={magnetic ? "" : undefined}
      {...props}
    />
  );
}

export function TextLink({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[0.62rem] [font-weight:650] uppercase tracking-[0.08em] text-foreground/70 transition-colors hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}
