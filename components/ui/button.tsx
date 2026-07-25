import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover disabled:bg-surface-muted disabled:text-text-muted",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-surface-muted disabled:bg-surface-muted disabled:text-text-muted",
  danger:
    "bg-danger text-primary-foreground hover:bg-danger-foreground disabled:bg-surface-muted disabled:text-text-muted",
  ghost:
    "bg-transparent text-text-secondary hover:bg-surface-muted hover:text-text-primary disabled:text-text-muted",
};

export function Button({
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-control px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
