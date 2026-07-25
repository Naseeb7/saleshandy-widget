"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";

type DialogProps = {
  children: ReactNode;
  onClose: () => void;
  open: boolean;
  title: string;
};

export function Dialog({ children, onClose, open, title }: DialogProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    dialogRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      aria-labelledby={titleId}
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
    >
      <div
        className={cn(
          "dialog-panel max-h-[min(90vh,42rem)] w-full max-w-2xl overflow-y-auto rounded-card border border-default bg-surface p-6 shadow-card sm:p-8",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        )}
        ref={dialogRef}
        tabIndex={-1}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold text-text-primary" id={titleId}>
            {title}
          </h2>
          <button
            aria-label="Close dialog"
            className="rounded-control p-2 text-xl leading-none text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            onClick={onClose}
            type="button"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
