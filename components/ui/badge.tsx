import type { HTMLAttributes } from "react";

type BadgeVariant = "default" | "success" | "danger" | "warning";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-surface-muted text-text-secondary",
  success: "bg-success-surface text-success-foreground",
  danger: "bg-danger-surface text-danger-foreground",
  warning: "bg-warning-surface text-warning-foreground",
};

export function Badge({
  className = "",
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
