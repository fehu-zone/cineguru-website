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
  default: "min-h-12 gap-5 px-6 py-3 font-mono text-[0.62rem] font-bold uppercase tracking-[0.08em]",
  compact: "min-h-10 gap-3 px-4 py-2 font-mono text-[0.58rem] font-bold uppercase tracking-[0.08em]",
  display: "min-h-[3.875rem] min-w-[14.5rem] max-w-[21rem] gap-4 whitespace-nowrap px-8 py-3.5 text-center font-body text-[clamp(1.08rem,1.4vw,1.28rem)] [font-weight:520] normal-case leading-none tracking-[-0.02em] max-[640px]:min-h-[3.5rem] max-[640px]:w-full max-[640px]:min-w-0 max-[640px]:max-w-none max-[640px]:px-6 max-[640px]:text-[1.02rem]",
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
