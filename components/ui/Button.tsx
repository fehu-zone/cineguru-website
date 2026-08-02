import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/classNames";

type ButtonVariant = "primary" | "light" | "outline";
type ButtonSize = "default" | "compact" | "display";

const baseStyles =
  "inline-flex items-center justify-center rounded-full border font-mono [font-weight:650] uppercase tracking-[0.08em] transition-[color,background-color,border-color,transform] duration-300 ease-out [transform:translate3d(var(--mag-x,0),var(--mag-y,0),0)]";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "border-accent bg-accent text-canvas font-bold hover:border-foreground hover:bg-foreground hover:text-canvas",
  light: "border-foreground bg-foreground text-canvas font-bold hover:border-accent hover:bg-accent hover:text-canvas",
  outline: "border-foreground/25 bg-foreground/5 text-foreground hover:border-foreground hover:bg-foreground hover:text-canvas",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "min-h-12 gap-5 px-5 py-3 text-[0.62rem]",
  compact: "min-h-10 gap-3 px-4 py-2 text-[0.58rem]",
  display: "min-h-[clamp(8.75rem,10vw,10rem)] flex-1 whitespace-nowrap px-6 py-6 font-body text-[clamp(1.9rem,3.8vw,4rem)] font-normal normal-case leading-none tracking-[-0.05em] max-[640px]:min-h-28 max-[640px]:text-[clamp(1.55rem,8.5vw,2.8rem)]",
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
  magnetic = true,
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
  magnetic = true,
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
