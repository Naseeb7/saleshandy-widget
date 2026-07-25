import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type AlertVariant = "info" | "success" | "danger" | "warning";

type AlertProps = HTMLAttributes<HTMLDivElement> & {
  variant?: AlertVariant;
};

const variantClasses: Record<AlertVariant, string> = {
  info: "border-default bg-surface-muted text-text-secondary",
  success: "border-success bg-success-surface text-success-foreground",
  danger: "border-danger bg-danger-surface text-danger-foreground",
  warning: "border-warning bg-warning-surface text-warning-foreground",
};

export function Alert({
  className = "",
  variant = "info",
  ...props
}: AlertProps) {
  return (
    <div
      role="status"
      className={cn(
        "rounded-control border px-4 py-3 text-sm",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
